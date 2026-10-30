# PR branch flow

Every pull request gets an automatically generated **source → target** branch visualization. Nothing here is edited by hand.

## What is generated

| Where | What | When |
|---|---|---|
| `docs/pr-flow/pr-<number>.md` | Attribute table, `source` → `target` line and a Mermaid diagram | Committed to the PR branch when the PR is opened, reopened, edited (e.g. retargeted) or pushed to |
| Sticky PR comment | The same content, always showing the PR's current status | On every PR event, including merge and close |

One file per PR means entries never overwrite each other, an update rewrites only that PR's file (no duplicates), and two PRs never conflict on a shared index.

Entry format:

```
#### PR #123: Add New Dashboard

| Attribute | Details |
|---|---|
| Repository | owner/repo |
| Author | developer |
| Status | Open |
| Source Branch | `feature/new-dashboard` (feature) |
| Target Branch | `develop` (develop) |

**PR Branch Flow:**

`feature/new-dashboard` → `develop`
```

Branch types recognised: feature, bugfix, hotfix, release, develop, main (anything else is `other`).

## How it works

`.github/workflows/pr-branch-flow.yml` runs `scripts/pr-branch-flow.mjs` on `pull_request` events. All data comes from the event payload, so it always matches GitHub's own PR metadata. PR titles and branch names are treated as untrusted and sanitised before reaching Markdown or Mermaid.

## Limitations

- **Status in a committed entry is a snapshot.** After a merge the file in the repo still shows the status from its last update; the PR (and its comment) is authoritative. Closed and merged PRs only update the comment.
- **Fork PRs** get the comment only: GitHub gives fork workflows a read-only token, so the entry cannot be committed to the fork's branch. If the comment cannot be posted either, the job logs a warning and still passes.
- **Protected PR branches** that reject the bot's push log a warning instead of failing the PR; the comment is still updated.
- Pushes made with the workflow's token do not trigger other workflows, so any CI added later will not re-run on the bot's docs commit.
- A deleted fork is reported as "no longer available"; branch existence is not checked.
- PRs that have a merge conflict with their base do not trigger `pull_request` workflows until the conflict is resolved.

## Development

```
node --test scripts/pr-branch-flow.test.mjs
```

For a one-off report of all existing PRs, see `PR_BRANCH_VISUALIZATION.md`.
