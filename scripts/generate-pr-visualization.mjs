/**
 * Generates PR_BRANCH_VISUALIZATION.md and docs/pr-branch-visualization.html
 * from pull request metadata.
 *
 * Data sources (in order):
 *   1. --input <file>   a snapshot JSON (default: docs/pr-data.json)
 *   2. --fetch          GitHub REST API; reads GITHUB_TOKEN if set (never written
 *                       to any output). Rewrites the snapshot file.
 * Local git supplies merge-commit SHAs, commit counts and the remote branch
 * list (git ls-remote); each is skipped gracefully when unavailable.
 *
 * Usage:
 *   node scripts/generate-pr-visualization.mjs            # regenerate from snapshot
 *   node scripts/generate-pr-visualization.mjs --fetch    # refresh from GitHub first
 */

import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const snapshotPath = path.join(root, args.includes("--input") ? args[args.indexOf("--input") + 1] : "docs/pr-data.json");

const git = (...a) => {
  try {
    return execFileSync("git", a, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
};

async function fetchSnapshot(repo) {
  const headers = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const all = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`https://api.github.com/repos/${repo}/pulls?state=all&per_page=100&page=${page}`, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return {
    repository: repo,
    source: "GitHub REST API (GET /pulls?state=all, paginated)",
    collected_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
    pull_requests: all
      .map((x) => ({
        number: x.number, title: x.title, state: x.state, draft: x.draft, html_url: x.html_url,
        created_at: x.created_at, closed_at: x.closed_at, merged_at: x.merged_at,
        author: x.user?.login ?? null, head: x.head.ref, base: x.base.ref,
      }))
      .sort((a, b) => a.number - b.number),
  };
}

let data;
if (args.includes("--fetch")) {
  const repo = JSON.parse(await readFile(snapshotPath, "utf8")).repository;
  data = await fetchSnapshot(repo);
  await writeFile(snapshotPath, JSON.stringify(data, null, 2) + "\n");
} else {
  data = JSON.parse(await readFile(snapshotPath, "utf8"));
}

// ---- enrich -----------------------------------------------------------
const remoteHeads = (() => {
  const out = git("ls-remote", "--heads", "origin");
  return out === null ? null : new Set(out.split("\n").filter(Boolean).map((l) => l.split("\t")[1].replace("refs/heads/", "")));
})();

const prs = data.pull_requests.map((p) => {
  const status = p.merged_at ? "Merged" : p.state === "open" ? "Open" : "Closed";
  const mc = git("log", "--all", "-1", "--format=%H", `--grep=^Merge pull request #${p.number} from`);
  const commits = mc ? git("rev-list", `${mc}^1..${mc}^2`) : null;
  return { ...p, status, mergeCommit: mc || null, commitCount: commits === null ? null : commits.split("\n").filter(Boolean).length };
});

const branches = new Map();
const ensure = (name) => {
  if (!branches.has(name)) branches.set(name, { name, from: [], to: [] });
  return branches.get(name);
};
for (const p of prs) {
  ensure(p.head).from.push(p);
  ensure(p.base).to.push(p);
}
const sortedBranches = [...branches.values()].sort((a, b) => a.name.localeCompare(b.name));

// ---- helpers ----------------------------------------------------------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const mmd = (s) => s.replace(/"/g, "'").replace(/[<>]/g, " ").replace(/#/g, "&#35;");
const cell = (s) => String(s).replace(/\|/g, "\\|");
const short = (s, n = 42) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
const day = (s) => (s ? s.slice(0, 10) : "—");
const id = (prefix, s) => `${prefix}_${s.replace(/[^A-Za-z0-9]/g, "_")}`;
const counts = (list) => ({
  open: list.filter((p) => p.status === "Open").length,
  merged: list.filter((p) => p.status === "Merged").length,
  closed: list.filter((p) => p.status === "Closed").length,
});
const branchState = (name) => (remoteHeads === null ? "unknown (ls-remote unavailable)" : remoteHeads.has(name) ? "exists on origin" : "not found on origin");

const sourceNames = new Set(prs.map((p) => p.head));
const targetNames = new Set(prs.map((p) => p.base));

// ---- mermaid ----------------------------------------------------------
const lines = ["flowchart LR"];
for (const t of targetNames) lines.push(`    ${id("b", t)}[["${mmd(t)}"]]:::target`);
for (const s of [...sourceNames].sort()) {
  const mine = prs.filter((p) => p.head === s);
  lines.push(`    subgraph ${id("g", s)}["${mmd(s)} — ${mine.length} PR${mine.length > 1 ? "s" : ""}"]`);
  lines.push("        direction TB");
  lines.push(`        ${id("b", s)}(["${mmd(s)}"]):::source`);
  for (const p of mine) lines.push(`        pr${p.number}["#${p.number} ${mmd(short(p.title, 38))}"]:::${p.status.toLowerCase()}`);
  lines.push("    end");
}
for (const p of prs) {
  lines.push(`    ${id("b", p.head)} --> pr${p.number}`);
  lines.push(`    pr${p.number} --> ${id("b", p.base)}`);
}
for (const p of prs) lines.push(`    click pr${p.number} "${p.html_url}" "PR #${p.number} — ${p.status}" _blank`);
lines.push("    classDef source fill:#dbeafe,stroke:#1d4ed8,color:#1e3a8a");
lines.push("    classDef target fill:#fef3c7,stroke:#b45309,stroke-width:3px,color:#78350f");
lines.push("    classDef merged fill:#ede9fe,stroke:#6d28d9,color:#4c1d95");
lines.push("    classDef open fill:#dcfce7,stroke:#15803d,color:#14532d");
lines.push("    classDef closed fill:#fee2e2,stroke:#b91c1c,stroke-dasharray:4 3,color:#7f1d1d");
const mermaid = lines.join("\n");

// ---- markdown ---------------------------------------------------------
const total = counts(prs);
const md = [];
md.push(`# Pull Request Branch Visualization

> Generated by \`scripts/generate-pr-visualization.mjs\` from \`docs/pr-data.json\`. Do not edit by hand — regenerate instead.

## A. Overview

This document maps every pull request in **${data.repository}** to the branch it came from (source / head) and the branch it was merged or proposed into (target / base). Use it to see at a glance which branches produce PRs, where those PRs land, and what state they are in.

**${prs.length} PRs** · ${total.merged} merged · ${total.open} open · ${total.closed} closed (without merging) · **${sourceNames.size} source branches** → **${targetNames.size} target branch${targetNames.size > 1 ? "es" : ""}** (${[...targetNames].map((t) => `\`${t}\``).join(", ")}).

An interactive version (pan, zoom, hover tooltips, clickable PRs) is in [\`docs/pr-branch-visualization.html\`](docs/pr-branch-visualization.html); open it locally in a browser.

## B. Visualization

Flow direction: **source branch → PR → target branch**. Click a PR node on GitHub to open it.

\`\`\`mermaid
${mermaid}
\`\`\`

**Legend**

| Encoding | Meaning |
|---|---|
| Blue rounded node | Source (head) branch |
| Amber double-bordered node, thick outline | Target (base) branch |
| Purple rectangle | Merged PR |
| Green rectangle | Open PR (none at collection time: ${total.open}) |
| Red dashed rectangle | Closed-without-merge PR (none at collection time: ${total.closed}) |

Status is also stated in text in the inventory below, so color is never the only signal.

## C. Pull Request Inventory

| PR | Title | Source Branch | Target Branch | Status | Author | Created | Merged | PR Link |
|---|---|---|---|---|---|---|---|---|
${prs
  .slice()
  .reverse()
  .map((p) => `| #${p.number} | ${cell(p.title)} | \`${p.head}\` | \`${p.base}\` | ${p.status} | ${p.author} | ${day(p.created_at)} | ${day(p.merged_at)} | [PR #${p.number}](${p.html_url}) |`)
  .join("\n")}

### Merge commits (from local git history)

Merge commit SHAs are **not** in the API data; they were located by matching GitHub's \`Merge pull request #N from …\` commit subjects in the local clone. "Commits" counts commits reachable from the PR head but not the base side of that merge.

| PR | Merge commit | Commits in PR |
|---|---|---|
${prs
  .slice()
  .reverse()
  .map((p) => `| #${p.number} | ${p.mergeCommit ? `\`${p.mergeCommit.slice(0, 7)}\`` : "not found"} | ${p.commitCount ?? "n/a"} |`)
  .join("\n")}

## D. Branch Summary

| Branch | PRs from it | PRs into it | Open | Merged | Closed | Branch state |
|---|---|---|---|---|---|---|
${sortedBranches
  .map((b) => {
    const c = counts([...b.from, ...b.to]);
    return `| \`${b.name}\` | ${b.from.length} | ${b.to.length} | ${c.open} | ${c.merged} | ${c.closed} | ${branchState(b.name)} |`;
  })
  .join("\n")}

Related PRs per branch:

${sortedBranches
  .map((b) => {
    if (b.from.length) {
      const t = [...new Set(b.from.map((p) => p.base))].map((x) => `\`${x}\``).join(", ");
      return `- \`${b.name}\` → ${t}: ${b.from.map((p) => `[#${p.number}](${p.html_url})`).join(", ")}`;
    }
    return `- \`${b.name}\` ← receives ${b.to.length} PRs from ${[...new Set(b.to.map((p) => p.head))].map((x) => `\`${x}\``).join(", ")}`;
  })
  .join("\n")}

"Branch state" comes from \`git ls-remote --heads origin\` at generation time. A branch missing from \`origin\` would not imply its PRs were removed.

## E. Key Observations

**Facts**

${(() => {
  const obs = [];
  const multi = sortedBranches.filter((b) => b.from.length > 1).sort((a, b) => b.from.length - a.from.length);
  obs.push(`Source branches with multiple PRs: ${multi.map((b) => `\`${b.name}\` (${b.from.length})`).join(", ") || "none"}.`);
  for (const t of targetNames) obs.push(`${prs.filter((p) => p.base === t).length} of ${prs.length} PRs target \`${t}\`.`);
  obs.push(`Open PRs: ${total.open ? prs.filter((p) => p.status === "Open").map((p) => `#${p.number}`).join(", ") : "none"}. Closed-unmerged PRs: ${total.closed ? prs.filter((p) => p.status === "Closed").map((p) => `#${p.number}`).join(", ") : "none"}.`);
  const nums = prs.map((p) => p.number);
  const gaps = [];
  for (let i = 1; i <= Math.max(...nums); i++) if (!nums.includes(i)) gaps.push(`#${i}`);
  if (gaps.length) obs.push(`PR numbers absent from the API results: ${gaps.join(", ")} (GitHub shares numbering between issues and PRs, so these may be issues; not verified).`);
  const nonMain = prs.filter((p) => p.base !== "main" && p.base !== "master");
  obs.push(nonMain.length ? `PRs not targeting \`main\`: ${nonMain.map((p) => `#${p.number}→\`${p.base}\``).join(", ")}.` : "No PR targets a branch other than `main`; there is no `develop` or release branch in the PR history.");
  return obs.map((o) => `- ${o}`).join("\n");
})()}

**For human review (judgement, not verified fact)**

${(() => {
  const obs = [];
  for (const b of sortedBranches.filter((b) => b.from.length > 1)) {
    const seq = b.from.every((p, i) => i === 0 || new Date(p.created_at) >= new Date(b.from[i - 1].merged_at ?? Infinity));
    obs.push(`\`${b.name}\` was reused for ${b.from.length} PRs (${b.from.map((p) => "#" + p.number).join(", ")}); ${seq ? "each was created after the previous one merged, so they look like sequential iterations rather than overlapping work" : "some were open at the same time, so check for overlapping changes"}. Compare titles before treating any as duplicates.`);
  }
  const quick = prs.filter((p) => p.merged_at && new Date(p.merged_at) - new Date(p.created_at) < 60_000);
  if (quick.length) obs.push(`${quick.length} PRs (${quick.map((p) => "#" + p.number).join(", ")}) were merged within a minute of creation, so little time for review is visible in the PR timestamps (review activity was not collected).`);
  const generic = prs.filter((p) => /^claude\/implement todo item/i.test(p.title));
  if (generic.length) obs.push(`${generic.map((p) => "#" + p.number).join(", ")} ${generic.length > 1 ? "have" : "has"} an auto-generated, non-descriptive title.`);
  return obs.map((o) => `- ${o}`).join("\n");
})()}

## F. Data Source and Limitations

- **Retrieval method:** ${data.source}, snapshot stored in \`docs/pr-data.json\`. Merge commits, commit counts and branch existence come from the local git clone / \`git ls-remote\`.
- **Scope:** all PRs (open, closed, merged) in \`${data.repository}\`, ${prs.length} returned in one page of up to 100 — no pagination truncation. All branches that appear as a head or base of those PRs.
- **Collected:** ${data.collected_at} (UTC).
- **Fields not retrieved:** the list endpoint does not return the PR's own merge commit SHA, so those were inferred from git history by subject match (see section C). Commit counts are likewise derived locally.
- **Merged status:** inferred from \`merged_at\` being set; the list endpoint's \`merged\` boolean is not populated.
- **Not covered:** reviews, comments, labels and CI status were not collected. No credentials are stored in the snapshot or in this document.
- **Refreshing:** \`node scripts/generate-pr-visualization.mjs --fetch\` (optionally with \`GITHUB_TOKEN\` set), or without \`--fetch\` to re-render from the snapshot.
`);
await writeFile(path.join(root, "PR_BRANCH_VISUALIZATION.md"), md.join("\n"));

// ---- interactive HTML (self-contained SVG, no dependencies) -------------
const COL = { src: 20, pr: 400, tgt: 880 }, ROW = 44, W = 1120;
const srcList = [...sourceNames].sort();
const tgtList = [...targetNames].sort();
const ordered = srcList.flatMap((s) => prs.filter((p) => p.head === s));
const y = new Map(ordered.map((p, i) => [p.number, 40 + i * ROW]));
const H = 40 + ordered.length * ROW + 20;
const mid = (list, f) => list.reduce((a, p) => a + y.get(p.number), 0) / Math.max(list.length, 1);
const fill = { Merged: "#ede9fe", Open: "#dcfce7", Closed: "#fee2e2" }, stroke = { Merged: "#6d28d9", Open: "#15803d", Closed: "#b91c1c" };
const svg = [];
for (const p of ordered) {
  const sy = mid(prs.filter((q) => q.head === p.head)), ty = mid(prs.filter((q) => q.base === p.base));
  const py = y.get(p.number);
  svg.push(`<path class="e" d="M${COL.src + 320} ${sy} C ${COL.src + 330} ${sy}, ${COL.pr - 60} ${py}, ${COL.pr} ${py}" /><path class="e" d="M${COL.pr + 360} ${py} C ${COL.pr + 420} ${py}, ${COL.tgt - 60} ${ty}, ${COL.tgt} ${ty}" />`);
}
for (const s of srcList) {
  const sy = mid(prs.filter((q) => q.head === s));
  svg.push(`<g><title>Source branch ${esc(s)}\n${prs.filter((q) => q.head === s).length} PR(s)</title><rect x="${COL.src}" y="${sy - 16}" width="320" height="32" rx="16" fill="#dbeafe" stroke="#1d4ed8" /><text x="${COL.src + 160}" y="${sy + 5}" text-anchor="middle">${esc(short(s, 44))}</text></g>`);
}
for (const t of tgtList) {
  const ty = mid(prs.filter((q) => q.base === t));
  svg.push(`<g><title>Target branch ${esc(t)}\n${prs.filter((q) => q.base === t).length} PR(s) targeting it</title><rect x="${COL.tgt}" y="${ty - 18}" width="180" height="36" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="3" /><text x="${COL.tgt + 90}" y="${ty + 5}" text-anchor="middle" font-weight="600">${esc(t)}</text></g>`);
}
for (const p of ordered) {
  const py = y.get(p.number);
  const tip = `PR #${p.number} — ${p.title}\nStatus: ${p.status}\nAuthor: ${p.author}\nSource: ${p.head}\nTarget: ${p.base}\nCreated: ${day(p.created_at)}\nMerged: ${day(p.merged_at)}`;
  svg.push(`<a href="${esc(p.html_url)}" target="_blank" rel="noopener"><g class="pr"><title>${esc(tip)}</title><rect x="${COL.pr}" y="${py - 17}" width="360" height="34" rx="4" fill="${fill[p.status]}" stroke="${stroke[p.status]}" ${p.status === "Closed" ? 'stroke-dasharray="4 3"' : ""} /><text x="${COL.pr + 8}" y="${py + 5}">#${p.number} ${esc(short(p.title, 36))} · ${p.status}</text></g></a>`);
}
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>PR Branch Visualization — ${esc(data.repository)}</title>
<style>
body{margin:0;font:14px system-ui,sans-serif;color:#111827;background:#fff}
header{padding:12px 16px;border-bottom:1px solid #e5e7eb}
h1{font-size:16px;margin:0 0 6px}.lg{display:flex;flex-wrap:wrap;gap:12px;font-size:12px}
.lg span::before{content:"";display:inline-block;width:12px;height:12px;margin-right:5px;vertical-align:-2px;border:2px solid var(--c);background:var(--b)}
#v{width:100vw;height:calc(100vh - 80px);cursor:grab;touch-action:none}
text{font-size:12px;pointer-events:none}.e{fill:none;stroke:#9ca3af;stroke-width:1.2}
.pr:hover rect{stroke-width:3}a{cursor:pointer}
@media(prefers-color-scheme:dark){body{background:#0f172a;color:#e5e7eb}header{border-color:#334155}text{fill:#111827}.e{stroke:#64748b}}
</style></head><body>
<header><h1>${esc(data.repository)} — PRs by source → PR → target (${prs.length} PRs, collected ${esc(data.collected_at)})</h1>
<div class="lg"><span style="--c:#1d4ed8;--b:#dbeafe">Source branch</span><span style="--c:#b45309;--b:#fef3c7">Target branch</span><span style="--c:#6d28d9;--b:#ede9fe">Merged PR</span><span style="--c:#15803d;--b:#dcfce7">Open PR</span><span style="--c:#b91c1c;--b:#fee2e2">Closed PR</span><span style="--c:transparent;--b:transparent">Scroll to zoom · drag to pan · hover for details · click a PR to open it</span></div></header>
<svg id="v" viewBox="0 0 ${W} ${H}"><g id="s">${svg.join("\n")}</g></svg>
<script>
const v=document.getElementById("v"),s=document.getElementById("s");let k=1,x=0,y=0,d=null;
const ap=()=>s.setAttribute("transform","translate("+x+" "+y+") scale("+k+")");
v.addEventListener("wheel",e=>{e.preventDefault();const f=e.deltaY<0?1.1:1/1.1,r=v.getBoundingClientRect(),m=(e.clientX-r.left)*${W}/r.width,n=(e.clientY-r.top)*${H}/r.height;x=m-(m-x)*f;y=n-(n-y)*f;k*=f;ap()},{passive:false});
v.addEventListener("pointerdown",e=>{d={x:e.clientX,y:e.clientY,ox:x,oy:y}});
addEventListener("pointermove",e=>{if(!d)return;const r=v.getBoundingClientRect();x=d.ox+(e.clientX-d.x)*${W}/r.width;y=d.oy+(e.clientY-d.y)*${H}/r.height;ap()});
addEventListener("pointerup",()=>d=null);
</script></body></html>
`;
await writeFile(path.join(root, "docs/pr-branch-visualization.html"), html);
console.log(`Wrote PR_BRANCH_VISUALIZATION.md and docs/pr-branch-visualization.html (${prs.length} PRs, ${branches.size} branches)`);
