# Project page — deployment

Static site, no build step. Files:

```
index.html
style.css
script.js
figure1_failure_modes.jpg
figure2_pipeline.png
figure3_vlm_agreement.png
paper.pdf
.nojekyll
```

## Deploy to GitHub Pages (free, no domain needed)

```bash
mkdir my-project-page && cd my-project-page
git init
# copy all files above into this folder
git add .
git commit -m "Project page"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Then: repo → **Settings → Pages → Source: `main` branch, `/root`** → Save.
Live in ~1 min at `https://<user>.github.io/<repo>/`.

## Before making the repo public

- [ ] If under double-blind review: use a GitHub account/repo not tied to your
      real name, and check your venue's specific policy on public project
      pages during review — this varies by venue and isn't something to
      assume is fine.
- [ ] Reconcile the abstract vs. Table 6 discrepancy flagged in an HTML
      comment inside `index.html` (search `NOTE for the authors`), then
      delete that comment.
- [ ] Replace the BibTeX placeholder once a venue/year is assigned.
- [ ] Swap the "Code" button for a real link once the repo is public.
