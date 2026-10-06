#!/usr/bin/env python3
"""Submit sitemap URLs to IndexNow; --dry-run performs no network requests."""
import argparse
import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "indexnow.json"
SITEMAP_PATH = ROOT / "sitemap.xml"
ENDPOINT = "https://api.indexnow.org/indexnow"
SITEMAP_NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"


class SubmitError(Exception):
    pass


def fail(message):
    raise SubmitError(message)


def read_config_and_sitemap():
    try:
        config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
        tree = ET.parse(SITEMAP_PATH)
    except (OSError, UnicodeError, json.JSONDecodeError, ET.ParseError) as exc:
        fail(f"Configuration/sitemap read failed: {exc}")
    host = config.get("host")
    key = config.get("key")
    key_file = config.get("keyFile")
    key_location = config.get("keyLocation")
    if host != "www.octo-brain.com":
        fail("indexnow.json host must be www.octo-brain.com")
    if not isinstance(key, str) or not re.fullmatch(r"[0-9a-f]{32}", key):
        fail("IndexNow key must be the generated 32-character lowercase UUID hex value")
    if key_file != key + ".txt" or Path(key_file).name != key_file:
        fail("keyFile must be the root key filename matching the configured key")
    expected_location = f"https://{host}/{key_file}"
    if key_location != expected_location:
        fail("keyLocation must be the full HTTPS URL for the root key file")
    try:
        local_key = (ROOT / key_file).read_text(encoding="utf-8").strip()
    except (OSError, UnicodeError) as exc:
        fail(f"Local key file read failed: {exc}")
    if local_key != key:
        fail("Local key file content does not match indexnow.json")

    urls = []
    for loc in tree.getroot().iter(SITEMAP_NS + "loc"):
        url = (loc.text or "").strip()
        parts = urlsplit(url)
        if parts.scheme == "https" and parts.netloc == host and not parts.username and not parts.password:
            if url not in urls:
                urls.append(url)
    if not urls:
        fail("Sitemap contains no same-host HTTPS URLs")
    return config, urls


def changed_urls(sitemap_urls):
    try:
        result = subprocess.run(
            ["git", "diff", "--name-status", "--find-renames", "HEAD~1", "HEAD"],
            cwd=ROOT, check=True, capture_output=True, text=True, encoding="utf-8",
        )
    except (OSError, subprocess.CalledProcessError) as exc:
        fail(f"Cannot inspect HEAD~1..HEAD changes: {exc}")
    entries = []
    all_pages = False
    page_by_path = {}
    for url in sitemap_urls:
        path = urlsplit(url).path
        page_by_path[path.lstrip("/") or "index.html"] = url
    for row in result.stdout.splitlines():
        fields = row.split("\t")
        if len(fields) < 2:
            continue
        status, paths = fields[0], fields[1:]
        path = paths[-1] if status.startswith(("R", "C")) else paths[0]
        normalized = path.replace("\\", "/")
        if normalized in {"sitemap.xml", "indexnow.json"} or re.fullmatch(r"[0-9a-f]{32}\.txt", Path(normalized).name):
            all_pages = True
            continue
        if normalized == "assets/js/i18n.js" or (normalized.startswith("assets/css/") and normalized.endswith(".css")):
            all_pages = True
            continue
        if not normalized.lower().endswith(".html") or status.startswith("D"):
            continue
        relative = normalized.lstrip("./")
        if relative in page_by_path:
            entries.append(page_by_path[relative])
    if all_pages:
        return sitemap_urls
    return list(dict.fromkeys(entries))


def verify_live_key(config):
    request = urllib.request.Request(config["keyLocation"], headers={"User-Agent": "OctoBrain-IndexNow/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            content = response.read(4096).decode("utf-8").strip()
    except (OSError, UnicodeError, urllib.error.URLError) as exc:
        fail(f"Live public key verification failed: {exc}")
    if content != config["key"]:
        fail("Live public key file does not match the local IndexNow key")


def submit(config, urls):
    payload = {"host": config["host"], "key": config["key"], "keyLocation": config["keyLocation"], "urlList": urls}
    request = urllib.request.Request(
        ENDPOINT, data=json.dumps(payload).encode("utf-8"), method="POST",
        headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "OctoBrain-IndexNow/1.0"},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            status = response.status
            body = response.read(4096).decode("utf-8", errors="replace").strip()
    except urllib.error.HTTPError as exc:
        status = exc.code
        body = exc.read(4096).decode("utf-8", errors="replace").strip()
    except (OSError, urllib.error.URLError) as exc:
        fail(f"IndexNow POST failed: {exc}")
    if status == 200:
        print("IndexNow: received (HTTP 200)")
    elif status == 202:
        print("IndexNow: received; key validation pending (HTTP 202)")
    elif status == 429:
        fail("IndexNow rate limited (HTTP 429); no automatic retry was attempted")
    else:
        fail(f"IndexNow rejected request (HTTP {status})" + (f": {body}" if body else ""))


def main():
    parser = argparse.ArgumentParser(description="Submit same-host HTTPS sitemap URLs to IndexNow")
    parser.add_argument("--dry-run", action="store_true", help="validate local files and print URLs; make no network requests")
    parser.add_argument("--changed", action="store_true", help="submit changed sitemap HTML pages from HEAD~1..HEAD")
    args = parser.parse_args()
    config, sitemap_urls = read_config_and_sitemap()
    urls = changed_urls(sitemap_urls) if args.changed else sitemap_urls
    if not urls:
        print("No eligible sitemap URLs to submit.")
        return 0
    if args.dry_run:
        print("Dry run (offline); URLs:")
        for url in urls:
            print(url)
        return 0
    verify_live_key(config)
    submit(config, urls)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except SubmitError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
