# Search discovery maintenance

The public site uses Google Search Console, Naver Search Advisor, a canonical sitemap and IndexNow. Submission receipts indicate that a search engine received a URL; they do not guarantee indexing or ranking.

## After changing public pages

1. Keep page titles, descriptions, canonical URLs and visible content consistent. For localized Modbus pages, keep reciprocal `ko`, `en` and `x-default` links in HTML and `sitemap.xml`.
2. Update `lastmod` only for pages whose content actually changed. Preserve the Google/Naver verification files, `CNAME`, `.nojekyll` and the sitemap declaration in `robots.txt`.
3. Commit and push to `main`, and wait for the **pages build and deployment** workflow to succeed. Check the live content before requesting Google/Naver refreshes.
4. **IndexNow submission** automatically runs after a successful Pages deployment. It checks the public host-verification file, submits changed eligible pages, and shares the notification with participating search engines such as Bing and Naver. Documentation-only changes submit no URLs. A manual run submits the entire sitemap.
5. In Google Search Console, select `https://www.octo-brain.com/`, submit `sitemap.xml` under **Sitemaps**, and use **URL inspection** for changed important pages. Request indexing once; inspect any live-test, quota or authentication failure instead of repeatedly resubmitting.
6. In Naver Search Advisor, select the site under **웹마스터 도구**, confirm **요청 → 사이트맵 제출**, and request important changed pages under **요청 → 웹 페이지 수집**.

## IndexNow commands

Run from this repository with Python 3; no third-party package is required:

```powershell
python scripts/submit_indexnow.py --dry-run
python scripts/submit_indexnow.py --changed --dry-run
```

To submit the already published sitemap manually, use the workflow's **Run workflow** action or `python scripts/submit_indexnow.py`. Avoid duplicating a successful automatic submission. The UUID file and `indexnow.json` are public host-verification data, independent of application licensing secrets.

- HTTP 200: URLs received.
- HTTP 202: URLs received; key validation is pending.
- HTTP 403: check that the live key file is accessible and matches the configuration.
- HTTP 429: rate limited; the script fails without automatically repeating the request.

The workflow has read-only repository permissions, uses a pinned official checkout action and submits public sitemap URLs only. It does not use license keys, customer data or OAuth tokens.

## Video metadata

The Korean and English product pages contain the same publicly uploaded introduction video. `VideoObject` metadata uses the actual YouTube thumbnail, upload timestamp and duration. When replacing the video, update the iframe, both structured-data blocks and the visible caption information together. The video is supplementary to a product page, so a Google video rich result is not guaranteed.

## References

- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google video structured data](https://developers.google.com/search/docs/appearance/structured-data/video)
- [Naver collection requests](https://searchadvisor.naver.com/guide/request-crawl)
- [IndexNow protocol and response meanings](https://www.indexnow.org/documentation)
