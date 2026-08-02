---
title: Static badge images
---

The plugin also publishes plain SVG badge images. Use an image badge in a place that cannot show
an Astro component. Examples: a README file on GitHub, a wiki page, or a CMS field that takes only
an image URL.

Each image is a static file. A user cannot click it to expand a scope table. If you need that
control, use the `AiLabelBadge` component instead.

| Variant | Image | URL |
| --- | --- | --- |
| basic | ![AI](/starlight-ai-label/badges/ai-basic.svg) | `https://t128n.github.io/starlight-ai-label/badges/ai-basic.svg` |
| generated | ![AI Generated](/starlight-ai-label/badges/ai-generated.svg) | `https://t128n.github.io/starlight-ai-label/badges/ai-generated.svg` |
| modified | ![AI Modified](/starlight-ai-label/badges/ai-modified.svg) | `https://t128n.github.io/starlight-ai-label/badges/ai-modified.svg` |

Add a badge to a Markdown file with an image link:

```md
![AI Generated](https://t128n.github.io/starlight-ai-label/badges/ai-generated.svg)
```
