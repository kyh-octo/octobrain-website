# Free software signed release verification — 2026-10-06

## Release artifacts

Signing and packaging were completed in each application's existing project thread. The website coordinator verified local installer Authenticode status, timestamps, source commits, public release metadata and HTTPS download availability before updating the website.

| Product | Version | Source commit | Installer bytes | Installer SHA256 |
| --- | --- | --- | ---: | --- |
| OctoPlayer | 1.3.1 | 003fbeb974dea09611efa7fe5753fa94dada5f3b | 75180864 | 711404b7f38633766e19b7887bd6ea36a987b117de66c64928dcf2c7351a343d |
| OctoCapture | 1.6.1 | 89fdbf5ecf1cd6b131a1f4afb5fe50326b4c5e4f | 53800184 | 47df37e88d7399f96d88f24109d8cd0dca1296e62cec728ee25746dd18645645 |
| OctoConverter | 1.2.1 | 4f33990d757f9f6369c5d221ce2e50463452572f | 45626976 | 0c77b4c8b911473e15e84bbef07bb0e409b7985c423c4fdecd8768b53f6eb912 |

- Application executable, installer and installed uninstaller signatures are Valid and timestamped in each project's final packaging QA. Publisher is 옥토브레인. Signing uses the existing Microsoft Artifact Signing account/profile; no new signing resource was created.
- Each project committed and pushed its source and patch tag, and published the installer and SHA256SUMS in both its project repository and the octobrain-website release mirror. Mirror tags are octoplayer-v1.3.1, octocapture-v1.6.1 and octoconverter-v1.2.1, without changing the existing Latest release.
- Project workers downloaded both public installers and checked hashes and signatures against their local final packages. Website integration checks confirmed HTTP 200 and exact installer byte lengths; GitHub asset digests match the hashes above.
- Each project verified isolated installation, application startup and uninstallation, with existing user data restored/preserved. Player verified WAV playback progression from 6 to 8 seconds; Converter passed 32 regression checks and an isolated 1.2.0 to 1.2.1 upgrade. Capture packaging included six original notice files; Player included eight.
- Own MIT license and original runtime/vendor notices are bundled. Vendor binaries were not re-signed as OctoBrain code. Player releases also provide corresponding LibVLC source at 79128878ddb2c280bbb6c89c76a46b31a80ade1c and LibVLCSharp source at 59d70e96026229e7c232ce5074ecefbf6f8959b6. External optional FFmpeg downloads are not represented as bundled components.

## Website verification

- Updated only the three utility cards, installation/license guidance, translation cache version and store sitemap date. Octo Modbus remains 1.0.0 with existing USD 25/65/99/179 offers and downloads.
- Displayed approximate decimal download sizes are 75.2MB, 53.8MB and 45.6MB, derived from final installer bytes.
- Installation guidance in Korean, English and Japanese identifies Microsoft Artifact Signing and the verified publisher, distinguishes own MIT source from third-party licenses, and avoids promising a particular SmartScreen outcome.
- Chrome local preview: desktop content width 1905px and 360px viewport (345px content width), Korean/English/Japanese; no outer horizontal overflow or clipped utility headings/download links detected. After final file-size integration, English at 360px was rechecked: document/content width 345px; all three sizes and versions are correct. Temporary viewport override is reset after QA.
- JavaScript syntax check, Git whitespace check and sitemap XML parse passed.
- Personal mobile/tel links were not found in the reviewed public source and live home/engineering pages. User instructed us to skip removal if absent; no telephone-related edits were made.

## Limits

These checks do not establish warning-free SmartScreen reputation, clean-VM behavior, full media-format regression, all elevated installation paths or legal certification. Player's vendor static dependency builds were not independently reproduced. Existing project QA reports record detailed application-specific limits.

## Deployment

Public website verification is recorded after the Pages deployment completes.
