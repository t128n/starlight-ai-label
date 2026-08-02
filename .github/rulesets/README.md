# Repository rulesets

This folder holds [GitHub repository ruleset](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
definitions for this project, as JSON. GitHub does not read these files directly. Import each one
by hand.

| File | What it does |
| --- | --- |
| [`1-conventional-commits.json`](1-conventional-commits.json) | Requires every commit message, on every branch, to follow [Conventional Commits](https://www.conventionalcommits.org/). |
| [`2a-conventional-branch-naming.json`](2a-conventional-branch-naming.json) | Requires branch names, except `main`, `master`, and `develop`, to follow the [Conventional Branch](https://conventionalbranch.org/) format, for example `feat/badge-alignment`. |
| [`2b-branch-protection.json`](2b-branch-protection.json) | Protects `main` and `release/*` branches: no deletion, no force push, a linear history, one approving review, and the `Check & build` and `End-to-end tests` status checks from `ci.yml` must pass. |

GitHub scopes the branch condition once per ruleset, not once per rule. Because naming applies to
feature branches and protection applies to `main`, they need two separate rulesets. This is why
item 2 of the request became two files, `2a` and `2b`, instead of one.

## How to import a ruleset

1. Go to the repository on GitHub.
2. Open Settings, then Rules, then Rulesets.
3. Select "New branch ruleset", then "Import a ruleset".
4. Upload the JSON file, or paste its content.
5. Review the ruleset, then select "Create".

You can also import a ruleset with the GitHub CLI:

```sh
gh api repos/t128n/starlight-ai-label/rulesets -X POST --input .github/rulesets/1-conventional-commits.json
```

## Notes

- Each `bypass_actors` list is empty. Add your own entries here, or in the GitHub UI, if some
  people or teams need to bypass a rule.
- `2b-branch-protection.json` names two required status checks: `Check & build` and
  `End-to-end tests`. These match the job names in [`ci.yml`](../workflows/ci.yml). If you rename
  a job, update this file to match.
- Test each ruleset first, with `enforcement` set to `evaluate` instead of `active`. This mode logs
  each match in the ruleset's insights page, but it blocks nothing. Switch to `active` only after
  you check the log.

## "0 branch rules" after import

After you import `1-conventional-commits.json` or `2a-conventional-branch-naming.json`, the
rulesets list page shows "0 branch rules" next to it. This label does not mean the import failed.

GitHub's ruleset list counts only branch protection rules, such as required pull requests and
required status checks, in this number. A `commit_message_pattern` rule or a `branch_name_pattern`
rule sits in a different group, named "Restrictions" in the ruleset editor. GitHub does not add
these to the "branch rules" count, even when the rule is active.

To confirm that a rule saved correctly, check the ruleset's own "Rules" tab in the GitHub UI, or
run this command:

```sh
gh api repos/t128n/starlight-ai-label/rulesets --jq '.[] | {id, name}'
gh api repos/t128n/starlight-ai-label/rulesets/<id>
```

The second command prints the full ruleset that GitHub stored. Check its `rules` array for the
`commit_message_pattern` or `branch_name_pattern` entry.
