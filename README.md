# ZOS Learning

Personal study site for the ZO System (PVSRA + ZOS): reading pages, the MT4 tool download with its guides, and
private pages built from the ZO Discord history.

Stack: Vite + React + TypeScript, `react-router` (hash routes, works on any static host), `react-markdown` + GFM.

## Content

| Path | What |
|---|---|
| `content/public/hoc/*.md` | Reading pages (public) |
| `content/public/cong-cu/*.md` | Tool guides (public) |
| `public/downloads/ZO-Tool.zip` | MT4 tools, **without** the personal Telegram token / chat id |
| `content/private/*.md` | Discord-derived pages - **git-ignored**, only their encrypted form is committed |
| `src/generated/private.enc.json` | Encrypted private pages (committed) |
| `src/content.ts` | Page registry: titles, sections, which pages are private, link mapping between Markdown files |

## Private pages

The bundle never contains the plaintext of the private pages:

1. `npm run encrypt` reads `content/private/*.md`, encrypts each page with a random 256-bit content key
   (AES-256-GCM) and stores that key wrapped with a key derived from `ZOS_PASSWORD` (PBKDF2-SHA256, 600k rounds).
2. **Password**: the browser unwraps the content key and decrypts the pages locally.
3. **Google sign-in**: the browser sends the Google ID token to `POST /api/unlock`; the server verifies it
   (Google JWKS, audience = client id, verified email = `ALLOWED_EMAIL`) and returns the content key.
   It runs from `vite.config.ts` in dev and from `api/unlock.ts` on Vercel. On a host without that function only
   the password works.
4. "Remember on this device" keeps the content key in `localStorage`; "Khoá lại" clears it.

Changing the password: edit `ZOS_PASSWORD` in `.env.local`, run `npm run encrypt`, commit the new
`private.enc.json`. Rotating the content key: delete `ZOS_CONTENT_KEY` from `.env.local` first, then update it on
the server too.

## Setup

```sh
cp .env.example .env.local   # set ZOS_PASSWORD; `npm run encrypt` adds ZOS_CONTENT_KEY
npm install
npm run encrypt              # only when content/private changed (needs the plaintext files)
npm run dev                  # http://localhost:5173
npm run build                # dist/
```

Google OAuth client: in Google Cloud Console add the page origins under **Authorised JavaScript origins**
(`http://localhost:5173` and the deployed domain). Redirect URIs and the client secret are not used - the secret
must never be committed.

## Deploy (Vercel)

Import the repo, then set the env vars `VITE_GOOGLE_CLIENT_ID`, `VITE_ALLOWED_EMAIL`, `GOOGLE_CLIENT_ID`,
`ALLOWED_EMAIL`, `ZOS_CONTENT_KEY` (value from `.env.local`). Any static host serving `dist/` works for the
password path (Cloudflare Pages, Netlify, ...).
