# Calvin Painting & Decorating — website concept

A premium, responsive website proposal for **Calvin Painting & Decorating, Manchester**.

**Public demo:** https://timok05.github.io/calvinpaintingdecorating/

This is an independent presentation concept, not the official company website. The demo is marked `noindex` and contains no invented testimonials, ratings, prices, phone numbers, or completed-project claims.

## Experience

- Original editorial design with an ivory, olive and forest-green palette.
- Responsive layouts and mobile navigation.
- Residential, commercial, development, education and healthcare service sections.
- Expandable service descriptions and FAQs.
- Concept-image gallery with keyboard-accessible lightbox.
- Interactive five-colour room illustration.
- Project enquiry builder with service and colour prefilling, validation, editable message, clipboard copying, and a link to the real Instagram profile.
- Self-hosted fonts and optimised WebP images; no runtime dependencies, analytics, cookies or external font requests.
- Reduced-motion support, labelled inputs, skip navigation, native dialog focus handling and visible keyboard focus states.

## Run locally

Requires Node.js 18 or later. There are no packages to install.

```sh
npm run dev
```

Open http://127.0.0.1:4175/calvinpaintingdecorating/.

```sh
npm run check
npm run build
```

The optional build copies the public files into `dist/`. GitHub Pages serves the repository root on the `main` branch; `.nojekyll` disables Jekyll processing. All runtime paths are relative, so the site works under the repository subpath.

## Enquiries

The form creates a message locally. It does not submit or store personal data. A visitor explicitly copies their brief and sends it to **@calvinpaintingdecorating** on Instagram. Instagram may require sign-in. No message is sent automatically, and there is no simulated success response claiming delivery.

Before using this as an official production website, the company should confirm all service copy and its preferred enquiry channel, replace concept imagery with its approved portfolio, and approve branding and contact details. Remove the demo labels and `noindex` only after that approval.

## Content provenance

Public profile: https://www.instagram.com/calvinpaintingdecorating/

The profile's public HTML metadata, accessed 23 October 2026, lists:

> Residential & Commercial Painting / Private Developments · Education · Healthcare / Professional · Reliable · Scalable / Manchester.

These are the verified business facts used in the demo. Additional descriptive copy is proposal copy. No business telephone, email, exact address, history, customer statistics or certificates were verified or invented.

See [ASSETS.md](ASSETS.md) for image-generation prompts and font sources.

## Validation

Checked in Chromium at 320, 360, 390, 768, 1024, 1440 and 1920px widths. Verified mobile menu and Escape handling, all five palette controls, all gallery dialogs, image loading, native form validation, service/colour prefilling, enquiry generation, copying and editing. Static checks verify local asset references, navigation anchors, unique IDs, syntax and demo metadata.
