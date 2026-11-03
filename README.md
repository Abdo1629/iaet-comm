# IAET · Electronics & Communications

A bilingual (Arabic / English) institutional landing page for the Electronics & Communications Engineering Department at the Institute of Aviation Engineering & Technology.

## Stack
- Next.js App Router + React + TypeScript
- Framer Motion + GSAP
- Responsive RTL/LTR interface
- Gemini 2.5 Flash assistant through a server-only API route

## Local setup
```bash
npm install
cp .env.example .env.local
```
Add your Gemini API key to `.env.local`:
```env
GEMINI_API_KEY=your_key_here
```
Then run `npm run dev`.

The key is read only by `app/api/assistant/route.ts`. Do not use a `NEXT_PUBLIC_` prefix and never commit `.env.local`.

## Vercel setup
1. Open the project in Vercel.
2. Go to **Settings → Environment Variables**.
3. Add `GEMINI_API_KEY` with the value created in Google AI Studio.
4. Enable it for Preview and Production.
5. Redeploy the latest deployment.

If the key is missing, the page still builds and renders; the assistant endpoint returns a clear configuration message.

## Knowledge base and content review
The assistant uses a curated knowledge base assembled from `data/program-content.ts` and `data/leadership.ts`, plus institute facts currently visible on the official IAET website. Its navigation links are allowlisted in the API route; it cannot invent arbitrary page URLs.

Before public launch, the department should review and supply:
- Department head's approved title, profile, welcome message and portrait.
- Current staff and teaching-assistant directory.
- Approved program specification, course descriptions and study regulations.
- Academic calendar, announcements, forms and student guides.
- Laboratory names, equipment, facilities and research activity.
- Correct official URLs for each resource and institute-wide pages.
- Approved Arabic and English wording for institutional content.

Until that review is complete, treat academic details and the chatbot knowledge base as a presentation prototype, not a source of official student guidance.

## Validation
Run `npm run build` before release. Also test Arabic/English switching, keyboard navigation, mobile menu, chatbot with and without the API key, and all external links on real mobile and desktop viewports.
