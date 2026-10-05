# Octo Modbus website release content QA — 2026-10-05

## Scope and changes

This follow-up changed only `octo-modbus.html`, `octo-modbus.en.html`, `assets/css/modbus.css`, and this QA report. Other files changed during the earlier website pass were not modified in this follow-up. The four policy HTML files were not edited. No Git operation, browser, deployment, or publication was used.

The Korean and English product pages now present Octo Modbus 1.0.0, a shared Free installer with Pro key unlock, four Pro checkout packs, the supplied installation/manual/Windows service download URLs, perpetual-use and free 1.x update terms, one-PC-per-key and deactivate-before-transfer guidance, and links to the existing refund/privacy pages. Product structured data includes a USD 0 Free download offer and the four USD Pro price offers. Hero download/pricing CTAs and the `#guides` anchor are present. License delivery copy says the key is emailed separately by Octo Modbus and entered under Help → License. Sitemap lastmod values are 2026-10-05.

## Feature-policy source check

Compared the feature table with `src/OctoModbus.Core/Licensing/LicenseContracts.cs` (`FeaturePolicy`) and `Services/LicenseService.cs` in the Octo Modbus source checkout. BasicModbus, BasicReadWrite, MultiPolling, and RawFrameViewer are enabled in Free; Free limits are one connection and three Poll windows. Other listed edition features are disabled in Free and enabled for licensed editions by the policy. The main release pass reconciled the AdvancedDisplayFormats/ByteOrder policy gates and restored the advanced data type and Endian comparison row (Pro). The comparison retains simulator, chart/logging/CSV, and register map/workspace/automation API features. No test-build wording is present.

## Static checks

- Parsed both product-page JSON-LD blocks as JSON and confirmed the USD 0 Free offer plus four USD Pro offers and the supplied checkout UUIDs.
- Read `publish/Standard/release-manifest.json` generated 2026-10-05: `OctoModbus.exe` and `OctoModbus-Setup-1.0.0.exe` each have `signatureStatus: Valid` and `timestamped: true`. `Get-AuthenticodeSignature` on the installer also returned `Valid`; signer subject is `CN=옥토브레인` and the timestamp certificate is Microsoft Public RSA Time Stamping Authority. The manifest does not list the independent Server Service ZIP as a signed artifact.
- Confirmed product-page download URLs use the requested release base URL and filenames for the installer, both-language PDF/DOCX guides, and Standard Windows service ZIP.
- Confirmed Korean and English hero CTAs target the installer and `#editions`; navigation links to the existing `#guides` section. Both pages have refund/privacy links and canonical/hreflang metadata. Korean keeps technical terms such as Modbus, Master, Server, Register, Poll, and Endian in English.
- Confirmed source has no release-preparation/coming-soon purchase copy in the product pages or Modbus store listing; no Test-build or test-license language was added.
- Confirmed sitemap parses as XML and both product URLs have lastmod `2026-10-05`.
- CSS review covers four-to-two-column price cards and stacked downloads on narrow screens, including a 360px rule; minimum-width tables retain horizontal scrolling. Installer copy reflects the current signing evidence and does not guarantee a SmartScreen outcome. The separate Server Service note states administrator rights, no automatic start on install by default, and device-specific signed-license issuance through support.
- Confirmed no other file in the requested website directory was written by this task.

## Outstanding pre-publication checks

These changes are local website edits only. No browser rendering, remote download/checkout verification, Git operation, deployment, or public-site check was performed; browser rendering and remote asset/checkout checks remain for the main release pass. The current `publish/Standard/release-manifest.json`, generated 2026-10-05, records both the application executable and installer as signature `Valid` and timestamped; the installer certificate subject is `CN=옥토브레인` and the timestamp is from Microsoft Public RSA Time Stamping Authority. It records release status `not-published`; this is not an unsigned-artifact claim. The independent Server Service ZIP is not listed as a signed artifact in this manifest. The customer server guide documents administrator rights for service registration/management, no automatic start on install by default, and a device-specific signed license token for Standard. Verify linked release assets and filenames, checkout price/tax behavior, automatic license email delivery and Help → License activation, policy text, and production transfer flow before publication.
The four pre-existing untracked policy files (`modbus-refund.html`, `modbus-refund.en.html`, `modbus-privacy.html`, `modbus-privacy.en.html`) were left untouched as requested. Their terms and consistency with live checkout/data handling remain a separate review item.

## Main release browser pass

- Desktop (1905px content width), Korean and English product pages at 320px browser viewport: document has no horizontal overflow; headings, purchase links and download controls have no detected clipping.
- Four policy pages checked at 360px browser viewport. Privacy tables intentionally scroll inside their own containers; the outer document remains within the viewport.
- Removed a duplicate Korean Downloads navigation item, normalized technical English terms, and used the actual Korean Help/License menu wording.
- Completed translations for the newly added store download button and prices, added product-card styling, and corrected an extra closing div. Existing utility versions remain unchanged.
- GitHub download release published 2026-10-05; six product artifacts plus SHA256SUMS. Separate remote byte/hash verification is recorded by the application release QA.
- Final live-site and Lemon Squeezy publication verification will be appended after deployment.

## Public verification complete

GitHub Pages deployment `8bf8c2e` succeeded. Both product pages, four policy pages, store, sitemap and robots.txt returned HTTP 200. Lemon Squeezy live product 1399853 is Published with four correctly selected packs at USD25/65/99/179; each variant includes the signed 70,511,688-byte installer. No real payment was submitted. All six public release downloads and the checksum file matched their source artifacts. Google Search Console accepted the refreshed sitemap and indexing requests for both product languages; search indexing and ranking remain pending Google processing.

Final deep-link review found that the pricing heading could sit beneath the fixed header. Pricing and policy section anchors now reserve 100px header clearance; the English pricing section has the same anchor. Static-page content and existing utility releases are preserved.
