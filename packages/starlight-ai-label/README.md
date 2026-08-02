# starlight-ai-label

`starlight-ai-label` is a plugin for [Starlight](https://starlight.astro.build). It adds EU AI Act
style badges that show AI content disclosure on your docs pages. The badge variants match the
labels in the "Basissymbol / AI Generated / AI Modified" graphic from the EU Parliament.

- **Three variants**: `basic` for when AI helped but is not the main output, `generated` for
  content that AI wrote in full, and `modified` for human content that AI partly edited.
- **Per-page frontmatter**: Set `aiLabel` in the frontmatter of a page. The plugin then shows the
  badge under the title. You do not need to import anything.
- **Manual, inline use**: Import the `AiLabelBadge` component. Then place a badge next to a
  specific image or paragraph.
- **Optional note and scope**: Add a short `note` field for a one-line summary. Add an optional
  `scope` list for a detailed breakdown. The `scope` list turns the badge into a control that
  expands when a user clicks it.

## Installation

```sh
npm install starlight-ai-label
```

Add the plugin to your Starlight config in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightAiLabel from 'starlight-ai-label';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      plugins: [starlightAiLabel()],
    }),
  ],
});
```

Extend the frontmatter schema of Starlight in `src/content.config.ts`. This step lets Starlight
check the `aiLabel` field:

```ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { aiLabelSchema } from 'starlight-ai-label/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: aiLabelSchema }) }),
};
```

## Usage

### Per-page, via frontmatter

Set `aiLabel` on any page. The short form sets only the variant:

```md
---
title: My page
aiLabel: modified
---
```

You can also use the full object form to set a `note`, a custom `label`, and a `scope` list:

```md
---
title: My page
aiLabel:
  variant: modified
  note: Human-written draft, AI-edited for tone and clarity.
  scope:
    - aspect: Copy editing
      detail: Grammar and tone pass with Claude
    - aspect: Hero image
      detail: AI-upscaled from a lower-resolution source photo
---
```

If you give a `scope` list, the badge becomes a control that a user can click to expand. If you do
not give one, the badge stays a plain pill that is not interactive.

### Inline, via component import

Import `AiLabelBadge` directly in an `.mdx` page. Then place a badge next to specific content,
instead of under the page title:

```mdx
import AiLabelBadge from 'starlight-ai-label/components/AiLabelBadge.astro';

Here's an AI-upscaled image:

<AiLabelBadge variant="generated" note="Image upscaled by AI" />
```

### Props

| Prop    | Type                              | Description                                       |
| ------- | --------------------------------- | -------------------------------------------------- |
| variant | `'basic' \| 'generated' \| 'modified'` | The badge variant to show. |
| note    | `string` (optional)                | A short summary, on one line, under the pill.       |
| label   | `string` (optional)                | Overrides the default pill text.                   |
| scope   | `{ aspect: string; detail: string }[]` (optional) | A detailed breakdown. The plugin shows it as a control that a user can expand. |

### Styling

The colors of the badge use the design tokens of Starlight by default. This makes the badge match
the light and dark theme of your site, and any custom `--sl-color-*` values that you set. The
plugin also exposes its own CSS custom properties. Use these properties to change the style of the
badge without a change to the global theme of Starlight.

Set these properties on `:root` or `.sl-ai-label` in your own CSS:

| Custom property                  | Default                    | Controls                                    |
| --------------------------------- | --------------------------- | -------------------------------------------- |
| `--sl-ai-label-bg`                | `#111827`                   | Background of the pill.                             |
| `--sl-ai-label-color`             | `#fff`                      | Color of the pill text and icon.                        |
| `--sl-ai-label-border-color`      | `var(--sl-color-gray-5)`    | Border of the pill. Light mode: no border. Dark mode: a border, so the pill stays visible against a near-black page background. |
| `--sl-ai-label-radius`            | `999px`                     | Corner radius of the pill.                          |
| `--sl-ai-label-panel-bg`          | `var(--sl-color-bg-nav)`    | Background of the expandable scope panel.    |
| `--sl-ai-label-panel-border-color`| `var(--sl-color-hairline)`  | Color of the border for the panel and the table cells.           |
| `--sl-ai-label-muted-color`       | `var(--sl-color-gray-3)`    | Color of the note text and the detail column of the scope table. |

### Static badge images

The plugin also publishes plain SVG images of the three pill variants. Use an image badge in a
place that cannot show an Astro component, for example a README file on GitHub:

```md
![AI Generated](https://t128n.github.io/starlight-ai-label/badges/ai-generated.svg)
```

| Variant | URL |
| --- | --- |
| basic | `https://t128n.github.io/starlight-ai-label/badges/ai-basic.svg` |
| generated | `https://t128n.github.io/starlight-ai-label/badges/ai-generated.svg` |
| modified | `https://t128n.github.io/starlight-ai-label/badges/ai-modified.svg` |

Each image is a static file, with fixed text. A user cannot click it to expand a scope table. Use
the `AiLabelBadge` component instead when you need that control.

## License

MIT
