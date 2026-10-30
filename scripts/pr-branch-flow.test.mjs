/**
 * Tests for scripts/pr-branch-flow.mjs.
 * Usage: node --test scripts/pr-branch-flow.test.mjs
 */

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { branchKind, normalizePr, prFromEvent, renderBody, renderEntry, writeEntry } from "./pr-branch-flow.mjs";

const script = path.join(path.dirname(fileURLToPath(import.meta.url)), "pr-branch-flow.mjs");

const repo = { full_name: "acme/site" };
const makePr = (over = {}) => ({
  number: 123,
  title: "Add New Dashboard",
  state: "open",
  draft: false,
  merged: false,
  html_url: "https://github.com/acme/site/pull/123",
  user: { login: "dev-one" },
  head: { ref: "feature/new-dashboard", repo },
  base: { ref: "develop", repo },
  created_at: "2026-10-01T10:00:00Z",
  merged_at: null,
  ...over,
});
const tmp = () => mkdtempSync(path.join(tmpdir(), "prflow-"));

test("renders the requested entry shape", () => {
  const out = renderEntry(normalizePr(makePr()));
  assert.match(out, /^<!-- pr-branch-flow:entry pr=123 /);
  assert.match(out, /#### PR #123: Add New Dashboard/);
  assert.match(out, /\| Repository \| acme\/site \|/);
  assert.match(out, /\| Author \| dev-one \|/);
  assert.match(out, /\| Status \| Open \|/);
  assert.match(out, /\| Source Branch \| `feature\/new-dashboard` \(feature\) \|/);
  assert.match(out, /\| Target Branch \| `develop` \(develop\) \|/);
  assert.match(out, /`feature\/new-dashboard` → `develop`/);
  assert.match(out, /src\(\["feature\/new-dashboard"\]\):::source --> pr\["#123 Add New Dashboard"\]:::open --> dst\[\["develop"\]\]:::target/);
});

test("status: open, draft, merged (via merged_at), closed", () => {
  assert.equal(normalizePr(makePr()).status, "Open");
  assert.match(renderBody(normalizePr(makePr({ draft: true }))), /Open \(draft\)/);
  const merged = normalizePr(makePr({ state: "closed", merged_at: "2026-10-02T00:00:00Z" }));
  assert.equal(merged.status, "Merged");
  assert.match(renderBody(merged), /\| Merged \| 2026-10-02 \|/);
  assert.equal(normalizePr(makePr({ state: "closed" })).status, "Closed");
});

test("branch kinds cover feature, bugfix, hotfix, release, develop, main", () => {
  const kinds = ["feature/a", "bugfix/b", "fix/c", "hotfix/d", "release/v1.2", "develop", "main", "claude/x"].map(branchKind);
  assert.deepEqual(kinds, ["feature", "bugfix", "bugfix", "hotfix", "release", "develop", "main", "other"]);
});

test("untrusted titles and branch names cannot break Markdown or Mermaid", () => {
  const evil = makePr({
    title: 'x | y `z` [a](http://evil) <img src=x onerror=1>\n## injected "q" ]]\nclick pr call alert()',
    head: { ref: "feature/a`b|c\"d", repo },
    html_url: 'https://github.com/acme/site/pull/123" onclick="x',
  });
  const out = renderBody(normalizePr(evil));
  assert.ok(!/(^|[^\\])</.test(out.replace(/```mermaid[\s\S]*$/, "")), "unescaped < reached the Markdown");
  assert.ok(!/^## injected/m.test(out), "newline injection produced a heading");
  assert.ok(!/^click pr call/m.test(out), "newline injection produced a mermaid directive");
  const mermaid = out.split("```mermaid\n")[1].split("```")[0];
  assert.equal(mermaid.trim().split("\n").length, 7, "mermaid gained extra lines (injection)");
  assert.ok(!mermaid.includes("`"));
  assert.match(mermaid.split("\n")[1], /^    src\(\["[^"]*"\]\):::source --> pr\["[^"]*"\]:::open --> dst\[\["[^"]*"\]\]:::target$/);
  assert.ok(!mermaid.includes("click pr"), "unsafe URL must not produce a click line");
  const row = out.split("\n").find((l) => l.startsWith("| Source Branch"));
  assert.equal(row.replace(/\\\|/g, "").split("|").length, 4, "table row kept its 2 columns");
});

test("deleted fork and fork PRs are reported, not guessed", () => {
  assert.match(renderBody(normalizePr(makePr({ head: { ref: "feature/x", repo: null } }))), /no longer available \(deleted fork\)/);
  const fork = renderBody(normalizePr(makePr({ head: { ref: "feature/x", repo: { full_name: "someone/site" } } })));
  assert.match(fork, /someone\/site \(fork\)/);
  const bare = normalizePr({ number: 5, state: "open" }, { repository: repo });
  assert.equal(bare.source, "(unknown)");
  assert.doesNotThrow(() => renderBody(bare));
});

test("invalid payloads are rejected", () => {
  assert.throws(() => normalizePr(makePr({ number: "../etc" })), /Invalid PR number/);
  assert.throws(() => prFromEvent({}), /no pull_request/);
});

test("upsert: one file per PR, no duplicates, other entries untouched, idempotent", () => {
  const dir = tmp();
  const a = writeEntry(normalizePr(makePr({ number: 1, title: "First" })), dir);
  const b = writeEntry(normalizePr(makePr({ number: 2, title: "Second" })), dir);
  assert.ok(a.changed && b.changed);
  const firstBefore = readFileSync(a.file, "utf8");

  assert.equal(writeEntry(normalizePr(makePr({ number: 2, title: "Second" })), dir).changed, false, "same data must not rewrite");
  const retarget = writeEntry(normalizePr(makePr({ number: 2, title: "Second", base: { ref: "main", repo } })), dir);
  assert.ok(retarget.changed);
  assert.match(readFileSync(b.file, "utf8"), /\| Target Branch \| `main` \(main\) \|/);
  assert.equal(readFileSync(a.file, "utf8"), firstBefore, "other PR's entry was modified");
  assert.deepEqual(readdirSync(dir).sort(), ["pr-1.md", "pr-2.md"]);
});

test("CLI: entry writes the file and reports changed via GITHUB_OUTPUT", () => {
  const dir = tmp();
  const event = path.join(dir, "event.json");
  const output = path.join(dir, "output");
  writeFileSync(event, JSON.stringify({ action: "opened", pull_request: makePr({ number: 77 }), repository: repo }));
  writeFileSync(output, "");
  const run = () => execFileSync("node", [script, "entry", "--out", path.join(dir, "out"), "--event", event], { env: { ...process.env, GITHUB_OUTPUT: output }, encoding: "utf8" });
  run();
  run();
  assert.equal(readFileSync(output, "utf8"), "changed=true\nchanged=false\n");
  assert.match(readFileSync(path.join(dir, "out", "pr-77.md"), "utf8"), /#### PR #77:/);
});

test("CLI: comment creates, updates, skips when unchanged, ignores spoofed markers, tolerates read-only tokens", async () => {
  const { createServer } = await import("node:http");
  const { execFile } = await import("node:child_process");
  const { COMMENT_MARKER } = await import("./pr-branch-flow.mjs");
  const comments = [{ id: 9, user: { login: "mallory" }, body: `${COMMENT_MARKER}\nspoofed` }];
  const calls = [];
  let readOnly = false;
  const server = createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      calls.push(`${req.method} ${req.url.split("?")[0]}`);
      const send = (code, body) => (res.writeHead(code, { "content-type": "application/json" }), res.end(JSON.stringify(body)));
      if (req.method === "GET") return send(200, comments);
      if (readOnly) return send(403, { message: "Resource not accessible by integration" });
      const { body } = JSON.parse(raw);
      if (req.method === "POST") {
        comments.push({ id: 100, user: { login: "github-actions[bot]" }, body });
        return send(201, {});
      }
      comments.find((c) => c.id === Number(req.url.split("/").pop())).body = body;
      send(200, {});
    });
  });
  await new Promise((r) => server.listen(0, r));
  const dir = tmp();
  const event = path.join(dir, "event.json");
  const run = (pr) => {
    writeFileSync(event, JSON.stringify({ pull_request: pr }));
    return new Promise((resolve, reject) =>
      execFile("node", [script, "comment", "--event", event], { env: { ...process.env, GITHUB_TOKEN: "t", GITHUB_API_URL: `http://127.0.0.1:${server.address().port}` } }, (err, out) => (err ? reject(err) : resolve(out))),
    );
  };
  try {
    assert.match(await run(makePr()), /created/);
    assert.equal(comments.length, 2);
    assert.equal(comments[0].body, `${COMMENT_MARKER}\nspoofed`, "spoofed comment was modified");
    calls.length = 0;
    assert.match(await run(makePr()), /unchanged/);
    assert.deepEqual(calls, ["GET /repos/acme/site/issues/123/comments"], "unchanged run must not write");
    assert.match(await run(makePr({ base: { ref: "main", repo } })), /updated/);
    assert.equal(comments.length, 2, "update must not add a second comment");
    assert.match(comments[1].body, /\| Target Branch \| `main`/);
    readOnly = true;
    assert.match(await run(makePr({ number: 124, head: { ref: "f", repo: { full_name: "x/y" } } })), /::warning::Could not publish/);
  } finally {
    server.close();
  }
});
