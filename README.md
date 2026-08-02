# starlight-ai-label

<details>
<summary><a href="https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence"><img src="https://t128n.github.io/starlight-ai-label/badges/ai-generated.svg" alt="AI Generated" /></a></summary>

Claude Sonnet 5 (reasoning effort: high) generated this package. Read about the
[EU AI Act](https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence)
to learn more.

</details>

This repository is a pnpm workspace with two packages:

- [`packages/starlight-ai-label`](packages/starlight-ai-label) — the Starlight plugin. See the
  [README file](packages/starlight-ai-label/README.md) in that folder for installation and usage
  steps.
- [`packages/demo`](packages/demo) — a small Starlight site that shows every feature of the
  plugin:
  - the basic, generated, and modified badge variants
  - the short note field
  - the expandable scope table
  - manual, inline badge use

## Development

```sh
pnpm install
pnpm dev      # runs the demo site with the plugin linked via the workspace
pnpm build    # builds the demo site
pnpm check    # type-checks the demo site (and transitively the plugin)
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full list of checks, the test suite, and the
release process.
