# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Parents and guardians in CABA / Buenos Aires seeking a neurodevelopmental (autism / TEA) diagnostic evaluation for a child. They are typically mid-journey in an emotionally charged process — worried, comparing professionals, and looking for clinical authority they can trust. The entire page is built to convert this visitor.

**Secondary (present in content, not the primary funnel):**
- Deaf / hard-of-hearing individuals and their families who need mental-health care and psychodiagnosis delivered directly in Lengua de Señas Argentina (LSA), served through Fundación Psico_LSA.
- Professionals and institutions seeking training in accessible, LSA-inclusive diagnosis.

## Product Purpose

A single-page professional landing that projects clinical authority for **Lic. Giuliana Covello** and converts families into a diagnostic-evaluation consultation. Every CTA funnels to one private WhatsApp channel. Success = qualified WhatsApp inquiries for neurodevelopmental evaluations.

## Positioning

The claim a neighboring practice cannot truthfully copy: Giuliana pairs **internationally-certified, gold-standard autism-diagnostic credentials** — ADOS-2 (Lincoln Institute) and ADI-R (Weill Cornell Medical College) — with being a **certified LSA interpreter and co-founder/director of Fundación Psico_LSA**, the first organization in Argentina providing mental-health access to the deaf community in sign language. The result is precision neurodevelopmental diagnosis that is *also* accessible to deaf/HoH clients — a combination unique in the local market.

## Operating Context

- **Conversion:** all CTAs ("Solicitar Evaluación Diagnóstica", "Solicitar Turno", "Consultá tu lugar") funnel to a single WhatsApp deep link (`wa.me/5491164369172`) with a prefilled message. There is **no contact form, no booking/calendar, and no backend**. Do not fragment this funnel.
- **Payment modality:** private pay ("modalidad particular"). Invoice is provided so families can pursue reintegro from their obra social / prepaga (percentage varies by plan).
- **Diagnostic engagement:** typically 3–5 encuentros — anamnesis / historia del desarrollo → 1–2 presential evaluation sessions → devolución with a detailed written, signed report (pautas for family, school, and interdisciplinary team). Sessions are presential, in an environment adapted to each child.
- **Events subsystem:** beyond the single page, an events data layer (`lib/eventos.ts`) powers an `/eventos` archive and `/eventos/[slug]` pages, plus an on-page "Agenda" section. Content is jornadas de capacitación (e.g. "Evaluación de Autismo en la Sordera", 2026-05-16).

## Capabilities and Constraints

**Confirmed services / instruments** (load-bearing product terms):
- Neuropsychological child evaluation and psychodiagnosis using standardized instruments: **ADOS-2, ADI-R, WPPSI-IV, WISC-V, WAIS-IV, MMPI, Vineland, Leiter-3**.
- Deliverable: informe escrito detallado, firmado, con matrícula **M.N. 76827**; valid for escuela, salud, and obras sociales / prepagas.
- Fundación Psico_LSA pillars: attention in LSA, accessible psychodiagnosis by communicative modality, and professional training.

**Terminology to preserve verbatim:**
- Clinical: neurodesarrollo, Trastorno del Espectro Autista (TEA), Psicodiagnóstico, anamnesis / Historia del Desarrollo, conducta adaptativa, Psicoterapia Cognitiva Integrativa, Análisis Conductual Aplicado; all instrument names above.
- Deaf/LSA: Lengua de Señas Argentina (LSA), comunidad sorda, hipoacusia, discapacidad auditiva, intérprete de LSA.
- Identity: **Fundación Psico_LSA** (exact underscore styling), **Lic.**, **M.N. 76827**.
- Institutions (keep exact): UBA, UAI, UNLP, Fundación Aigle, Lincoln Institute, Weill Cornell Medical College, Instituto Villasoles, AASM.

**Technical / content constraints:**
- Web only; responsive (mobile-first). No native app, no PWA/service worker.
- Content is hardcoded in component arrays (no CMS) except the events data layer (`lib/eventos.ts`).
- Stack is already established in the codebase (see `CLAUDE.md`): Next.js 16 App Router, React 19, Tailwind CSS v4, Framer Motion, Lenis, Bun. Theming is a light/dark CSS-custom-property system via `data-theme` — do **not** use Tailwind's `dark:` variant.

**Production domain:** `https://giulianacovello.com.ar`. Not yet wired into the app — `metadataBase`, canonical URLs, sitemap, robots, manifest, and absolute-URL OG/Twitter images all still need to be set against it. The homepage currently has no OG image and no Twitter card (only per-event pages do).

## Brand Commitments

- **Name & title:** "Lic. Giuliana Covello" · "M.N. 76827" · "Psicóloga Clínica · Especialista en Neurodesarrollo · Directora de Fundación Psico_LSA".
- **No logo file.** The brand mark is a kinetic typographic treatment of "Giuliana Covello" in the Hero — not an image.
- **Voice:** Argentine Spanish with voseo ("Solicitá", "Consultá tu lugar", "Comenzá"), es-AR date/time formatting ("hs"). Professional and authoritative, yet empathetic toward families going through a diagnostic process.
- Fundación Psico_LSA is a binding brand relationship; it links to `https://www.psicolsa.com.ar`.

## Evidence on Hand

- **Strong, verifiable:** the academic trajectory, credentials, and institutions (UBA, UAI, UNLP, Fundación Aigle, Lincoln Institute, Weill Cornell, Instituto Villasoles, AASM), awards (Premio Facultad de Psicología — UBA, 2023 and 2025), and congress participation. These are the site's real trust assets.
- **Real channels:** WhatsApp `+54 9 11 6436 9172` (`wa.me/5491164369172`), email `lic.giulianacovello@gmail.com`, Instagram `@lic.giulianacovello`, LinkedIn `giuliana-covello`, Fundación `psicolsa.com.ar`.
- **No testimonials, no press, no case studies exist.** Future work must not fabricate them.
- **Fabricated metrics — do NOT use.** The counters in `Foundation.tsx` ("500+ Evaluaciones realizadas", "8 Años de experiencia", "50+ Profesionales capacitados") are **not real data**. They are currently unrendered and are slated for deletion. No verified statistic exists to display; never surface these numbers as fact.
- **Portrait photo:** `public/photos/profile.jpeg` is a real portrait but is currently unused. Confirm intent and permission before displaying it in any surface.
- Event flyer imagery is hosted on Cloudinary (whitelisted in `next.config.ts`).

## Product Principles

1. **Every path leads to WhatsApp.** Conversion is a single, low-friction private channel — never fragment or gate it behind forms or backends.
2. **Authority is earned by verifiable credentials, never inflated metrics.** No fabricated numbers, testimonials, or claims. When in doubt, cite the real institution.
3. **Accessibility is the differentiator, not decoration.** LSA / deaf access and the accessibility widget are core identity — treat them as first-class, not an afterthought.
4. **Speak to families mid-diagnosis** with clinical precision *and* empathy, in rioplatense Spanish.
5. **Preserve clinical terminology exactly.** Instrument names and credentials are the trust signals — do not paraphrase or anglicize them.

## Accessibility & Inclusion

- The core audience includes the **deaf / hard-of-hearing community**; LSA is central to the brand's purpose. The site currently ships a general accessibility widget (text scaling, high-contrast palettes, reduce-motion) plus descriptive LSA copy — but **no sign-language video and no captions yet**. An approved design spec proposed an LSA captioned video in the Foundation section and an LSA-specific FAQ item; neither is implemented. Future work serving the deaf audience should close this gap.
- General a11y commitments already in place: keyboard operability, ARIA roles/labels, visible focus rings, `prefers-reduced-motion` support, and high-contrast light/dark palettes.
