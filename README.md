# Ar. Haseeb Ullah — Architectural Practice Website

A static website. No build step, no dependencies to install, no server code.
Upload the files as they are and it runs.

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero slider, studio teaser, Design Index, CTA strip |
| `portfolio.html` | Project index by typology + gallery + lightbox |
| `ebooks.html` | E-Books & research papers + in-page PDF viewer |
| `about.html` | Studio profile |
| `services.html` | Services offered |
| `process.html` | Design process |
| `location.html` | Studio location + map |
| `admin.html` | Content management dashboard (password-gated) |

Everything else lives in `assets/` — one stylesheet, two scripts, one image.
Bootstrap 5, Font Awesome and Google Fonts load from public CDNs, so the site
needs an internet connection but nothing installed.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com) → **Add New… → Project** → import that repo.
3. When asked for a framework preset, choose **Other**.
4. Leave **Build Command** and **Output Directory** empty.
5. Click **Deploy**.

There is no configuration file to add. Vercel serves the files directly and
`index.html` becomes your home page. Every later `git push` redeploys
automatically.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo **Settings → Pages**.
3. Under **Source**, pick **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`, then **Save**.

The included `.nojekyll` file stops GitHub from running Jekyll over the
folder, which would otherwise ignore some files. Give it a minute, then your
site is live at `https://<username>.github.io/<repo>/`.

## Deploying anywhere else

Netlify, Cloudflare Pages, cPanel, or any shared host: upload the whole
folder to the web root. It is plain HTML — nothing special is required.

## Running it locally

Double-clicking `index.html` mostly works, but some browsers block
`localStorage` on `file://`, which breaks the admin panel. Serve the folder
instead:

```
python -m http.server 8124
```

Then open `http://localhost:8124`.

---

## The admin panel

Reachable at `/admin.html`, or via the small "Studio Access" link in the
footer. Default password: `haseeb2026` — change it inside the panel under
**Site Text & Settings → Change Admin Password**.

Editable from the dashboard:

- **Profile & Hero** — name, title, profile photo (paste a URL *or* upload a
  JPG/PNG with a live preview), and the "Upcoming / In Progress" hero slides
  (add / edit / remove; editing keeps the existing image unless you drop in a
  new one)
- **Social & Profile Links** — add, rename, remove any platform you like
  (YouTube, Behance, a personal site), each with its own icon. Shows in the
  footer and the home hero chip.
- **About** — heading, both paragraphs, the three stat highlights
- **Services** — add / edit / remove, with a Font Awesome icon *or* an
  uploaded image icon
- **Design Process** — add / edit / remove steps, with an editable step number
  and an optional image in place of the numeral
- **Portfolio** — typology categories (add, reorder, rename — renaming
  re-files every project automatically), plus projects with multi-photo upload
- **E-Books & Papers** — add / edit / delete, PDF upload or URL
- **Location & Contact** — address, hours, email, phone, directions, map embed
- **Site Text & Settings** — taglines, page intro copy, browser tab titles,
  and the admin password

---

## IMPORTANT — how to publish your content changes

**Edits made in the admin panel are saved only in the browser you made them
in.** They are stored in `localStorage`, not on the server. Visitors to your
deployed site will see the content baked into `assets/js/data.js`, not your
local edits.

To publish your edits so everyone sees them:

1. Open the admin panel and make your changes.
2. Go to **Site Text & Settings → Publish Content For Every Visitor**.
3. Click **Download Content For Publishing**.
4. Open the downloaded file, and paste its contents over the `DEFAULT_DATA`
   object in `assets/js/data.js`.
5. Commit and push. Vercel redeploys automatically.

Your admin password is deliberately excluded from that download file.

---

## Two things to know before going public

**1. The admin password is not real security.** The check runs in the
visitor's browser, so anyone who opens `assets/js/data.js` or the browser
devtools can read it. It keeps casual visitors out of the dashboard; it does
not keep a determined person out. If the site holds anything sensitive, the
admin panel needs a real server-side login. A simple alternative: delete
`admin.html` from the deployed copy, edit `data.js` directly, and keep the
panel for local use only.

**2. Uploaded files are stored as base64 in `localStorage`, which holds only
about 5 MB.** Large photos will fill it quickly and saving will start
failing. Resize images before uploading — roughly 1600px wide for project
photos, 400×400 for the profile picture, 128×128 for icons. For a large
catalogue, host images properly and paste URLs instead.

## If a change doesn't show up after deploying

Browsers cache `.css` and `.js` harder than `.html`, so a stale stylesheet can
sit behind a fresh page. Hard-reload with **Ctrl+Shift+R** (Cmd+Shift+R on
Mac) before assuming something is broken.

## Resetting

Clearing the site's `localStorage` (or running `Store.reset()` in the browser
console) restores all content to the defaults in `data.js` and puts the admin
password back to `haseeb2026`.
