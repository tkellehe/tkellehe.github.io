# tkellehe.github.io
Personal site and technical writing by Mitchell Kelleher.

## Jekyll structure
- Home page source: `index.md`
- Layouts: `_layouts/default.html`, `_layouts/home.html`, `_layouts/post.html`, `_layouts/experiment.html`
- Reusable content components: `_includes/components/`
- Styles: `assets/css/main.css`
- Blog posts: `_posts/YYYY-MM-DD-title.md`
- Experiment data files: `assets/data/experiments/YYYY-MM-DD/`

## Local development
Install dependencies, then serve:

```bash
bundle install
bundle exec jekyll serve
```

## Post authoring notes
- Front matter must start and end with plain ASCII `---` on its own line.
- Use straight quotes (`"`) in front matter values.
- In post bodies, use `---` (with blank lines around it) when you want a horizontal section break.

Code is Apache-2.0 licensed. Posts and images are CC BY 4.0 unless otherwise noted.
