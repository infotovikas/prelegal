# Mutual NDA Creator

A Next.js prototype (JIRA [PL-3](https://vslearning.atlassian.net/browse/PL-3)) that lets a user fill in a short
form and generates a ready-to-review Mutual Non-Disclosure Agreement, based on the
[Common Paper Mutual NDA](https://commonpaper.com/standards/mutual-nda/1.0/) (Version 1.0, CC BY 4.0)
templates in [`../templates`](../templates).

## What it does

- A form on the left collects each party's signatory details (name, title, company, notice
  address) and the deal terms (purpose, effective date, MNDA term, confidentiality term,
  governing law, jurisdiction, and any modifications).
- A live preview on the right renders the completed Cover Page and Standard Terms, with the
  entered values substituted inline wherever the source template references a Cover Page
  variable.
- **Download PDF** renders the preview to a PDF file the user can save locally.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the form.

## Project structure

- `src/types/nda.ts` — form data model and defaults.
- `src/lib/nda-content.ts` — the Standard Terms clauses, with `{{TOKEN}}` placeholders for
  Cover Page variables.
- `src/lib/nda-format.ts` — turns form data into the display strings used to fill those
  placeholders.
- `src/components/NdaForm.tsx` — the input form.
- `src/components/NdaPreview.tsx` / `FilledText.tsx` — renders the filled-in document.
- `src/components/DownloadPdfButton.tsx` — client-side PDF export via `html2canvas` + `jspdf`.

## Scripts

- `npm run dev` — start the dev server.
- `npm run build` — production build.
- `npm run lint` — run ESLint.
