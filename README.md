# IAET · Electronics & Communications

A bilingual (Arabic / English) multi-page academic website for the Electronics & Communications Engineering Program at the Institute of Aviation Engineering & Technology. The project is designed to live under an IAET-approved subdomain and remain visually and institutionally connected to the main IAET website.

## Website pages

- Home
- Program overview
- Academic program and study resources
- Faculty and supporting staff
- Laboratories and facilities
- Research and graduation projects
- Student services and resources
- Quality assurance
- News and events
- Alumni
- Contact
- Full site directory

All page templates support Arabic RTL and English LTR. The interface is light-mode only, responsive, and includes the IAET program assistant.

## Stack

- Next.js App Router + React + TypeScript
- Framer Motion + GSAP
- Responsive RTL/LTR interface
- Gemini assistant through a server-only API route
- Page-specific metadata, Open Graph / Twitter metadata, JSON-LD organization data, robots and sitemap routes

## Local setup

```bash
npm install
cp .env.example .env.local
```

Set the following values in `.env.local`:

```env
GEMINI_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

- `GEMINI_API_KEY` is used only by `app/api/assistant/route.ts`. Never expose it through a `NEXT_PUBLIC_` variable and never commit `.env.local`.
- `NEXT_PUBLIC_SITE_URL` must be the exact, approved department subdomain after IAET IT provisions it. It is used to generate the sitemap. Do not set it to the parent IAET domain unless that is where this project is actually deployed.

Run `npm run dev` for local development.

## Vercel and subdomain launch

1. Import the repository into the IAET-approved Vercel project.
2. Add `GEMINI_API_KEY` in Vercel Environment Variables for the required environments.
3. Set `NEXT_PUBLIC_SITE_URL` to the final department subdomain URL, including `https://`.
4. Add the exact same subdomain in Vercel Project Settings → Domains.
5. Ask IAET IT to create the required DNS record and confirm SSL provisioning.
6. Redeploy after the domain and environment variables are configured.
7. Verify the sitemap at `/sitemap.xml`, crawler rules at `/robots.txt`, and all canonical/social metadata against the live subdomain.

The final subdomain is not assumed in source code. It must be approved and provisioned by IAET.

## Assistant and knowledge base

The assistant uses `data/program-content.ts`, `data/leadership.ts`, `data/site-pages.ts` and institute facts currently visible on the official IAET website. Internal page links and official external links are allowlisted in the API route. The assistant must not invent staff details, fees, admission dates, schedules, regulations, course plans, room numbers or unsupported URLs.

The department data request is documented in [English](docs/DEPARTMENT_DATA_REQUEST.md) and [Arabic](docs/طلب-بيانات-قسم-الإلكترونيات-والاتصالات.md). These documents list the information, source files, approvals and assets required before public launch.

## Content status

Some pages are populated with information already visible on the public IAET website. Academic documents, staff lists, laboratory inventories, research records, accreditation evidence, news archives and department-specific contact channels must be verified and updated by the department. Old or restricted SharePoint links are not treated as current approved downloads.

Until that review is complete, the website is a developed bilingual implementation with clearly identified content-verification requirements, not an official source for student decisions.

## Validation before launch

Run:

```bash
npm run lint
npm run build
```

Then test:
- All routes and internal/external links.
- Arabic/English switching and RTL/LTR layout.
- Mobile navigation and responsive layouts.
- Assistant with and without a configured API key.
- Keyboard navigation, focus states and reduced-motion behavior.
- Metadata, structured data, robots and sitemap on the final subdomain.
- Every academic document and public-facing claim with the department's approver.
