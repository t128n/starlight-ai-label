# Contributing

## Setup

```sh
pnpm install
pnpm dev      # runs the demo site with the plugin linked via the workspace
```

## Checks

```sh
pnpm check      # type-checks the demo site (and transitively the plugin)
pnpm build      # builds the demo site
pnpm check:pkg  # verifies the plugin package is publish-ready (publint)
pnpm test       # runs the unit test suite for the plugin
pnpm test:e2e   # runs the end-to-end test suite against the demo site
```

Before you run `pnpm test:e2e` for the first time, install its browser:

```sh
pnpm exec playwright install --with-deps chromium
```

All the checks above, and both test suites, run in CI on every pull request.

## Demo site

`packages/demo` is a small Starlight site that shows every feature of the plugin. A GitHub Action
deploys it to GitHub Pages on every push to `main`.

For this to work, set the Pages source once, in the repository settings. Open Settings. Then open
Pages. Set Source to "GitHub Actions".

## Releasing

This repository uses [Changesets](https://github.com/changesets/changesets) to version and
publish `starlight-ai-label` to npm.

### Add a changeset

If your change affects the published package (anything under `packages/starlight-ai-label`), add
a changeset before you open your pull request:

```sh
pnpm changeset
```

This command asks which kind of version bump the change needs, patch, minor, or major. It also
asks for a short description. It then writes a markdown file under `.changeset/`. Commit this file
with your change. Docs-only or internal (`packages/demo`) changes do not need a changeset.

Install the [Changeset bot](https://github.com/apps/changeset-bot) GitHub App on this repository.
After a pull request opens, the bot posts a comment. The comment states whether the pull request
has a changeset. It also names the package that the change updates.

### Automatic releases

After a change merges to `main`, a GitHub Action opens or updates a "Version Packages" pull
request. This pull request collects all pending changesets. When you merge that pull request, the
same workflow publishes the new version to npm.

### One-time setup: the first publish and trusted publishing

The release workflow publishes with the trusted publishing feature of npm (OIDC), not a
long-lived token. This feature needs a package that already exists on npm, so the first version
cannot go out through CI. Do these steps once, by hand.

1. Log in to npm: `npm whoami`. If this command fails, run `npm login` first.
2. Publish the first version from your machine:
   ```sh
   cd packages/starlight-ai-label
   npm publish --access public
   ```
3. On [npmjs.com](https://www.npmjs.com), open the `starlight-ai-label` package. Open its
   Settings tab. Then find the "Trusted Publisher" section.
4. Add a GitHub Actions trusted publisher with these values:
   - Organization or user: `t128n`
   - Repository: `starlight-ai-label`
   - Workflow filename: `release.yml`
   - Environment name: leave this empty
5. Optional, for extra security: in the "Publishing access" settings of the package, turn on
   "Require two-factor authentication and disallow tokens". Trusted publishing still works after
   this change, because it does not use a token.

Once you finish these steps, do not add an `NPM_TOKEN` secret to the repository. The release
workflow sends an empty value for it on purpose, so that npm uses OIDC instead of a token.
