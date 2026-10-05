# Octo Modbus launch checklist

This checklist records the launch blockers for the local-only Korean and English product-page draft. The pages intentionally provide no purchase or download action.

## Required before sales or public launch

- [ ] Produce the Windows x64 v1.0.0 installer and verify its contents and clean-machine installation.
- [ ] Sign the installer with the approved publisher certificate; document signing and timestamp verification.
- [ ] Finalize the proposed Pro USD price packs ($25/1 PC, $65/3 PCs, $99/5 PCs, $179/10 PCs), tax treatment, and any multi-PC discount terms; obtain final approval before presenting them as final/live prices.
- [ ] Deploy and secure the hosted license and activation service; connect it to the Lemon Squeezy checkout flow and test order-to-license issuance, initial online activation, and subsequent offline use.
- [ ] Establish the paid order-to-license issuance flow, including order reconciliation, support ownership, and failure handling, as part of Lemon Squeezy integration.
- [ ] Approve and publish the refund/cancellation flow and business policies required for the sales jurisdictions.
- [ ] Verify the final product claims, supported Windows versions, system requirements, and release build against the shipped artifact.
- [ ] Before publishing the pages, add them to the site navigation and sitemap, then validate canonical/hreflang URLs and the live pages.

## Product facts represented in this draft

- Product/version: Octo Modbus 1.0.0, Windows x64.
- Free: one connection, up to three Poll windows, basic Modbus read/write, and raw frame viewer.
- Pro feature set: multiple connections and Poll windows, server simulator, advanced data types and byte order, charts/logging, CSV export, register maps, workspace save/load, and automation API.
- Master and Server protocol modes: TCP, UDP, RTU, and ASCII. Standalone Windows service hosting is mentioned based on the repository service host implementation.
- Planned license: perpetual, one PC; first activation online, with offline use after activation. Multi-PC discount is planned and not yet a confirmed offer.
- Proposed prices are explicitly pre-launch and pending final review; there are no purchase or download links, structured-data offers, reviews, ratings, hardware-certification claims, lifetime-update promises, refund promises, or instant offline revocation claims.

## Evidence checked

- `src/OctoModbus.Core/Licensing/LicenseContracts.cs` defines Free capabilities and limits (one connection and three Poll windows) and gates Pro-only features.
- Repository UI, simulator, docking, and service-host source was searched for the functionality described above.
- Existing site brand assets and design tokens were read from `store.html`, `assets/css/style.css`, and `assets/css/store.css`.
