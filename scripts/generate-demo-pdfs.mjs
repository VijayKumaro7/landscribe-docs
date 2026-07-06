/**
 * Generates the demo deed PDF library into public/documents/.
 *
 * For every deed type × language it renders a localized HTML deed template
 * with headless Chromium (print-to-PDF), stamps a repeating "DEMO DOCUMENT"
 * watermark and per-page footer with page numbers, then post-processes the
 * PDF with pdf-lib to embed demo metadata. Finally it writes a
 * manifest.json used by the Library page for document metadata.
 *
 * Prerequisites:
 *   - Chromium available (Playwright browsers dir or system chrome).
 *   - Noto fonts for Latin/Devanagari/Kannada/Tamil/Telugu installed
 *     (see scripts/fetch-fonts.sh).
 *
 * Usage: node scripts/generate-demo-pdfs.mjs
 */

import { chromium } from "playwright-core";
import { PDFDocument } from "pdf-lib";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { LANGUAGES, LOCALES, FONTS, frame, parties, schedule } from "./content/frame.mjs";
import deedsEn from "./content/deeds-en.mjs";
import deedsHi from "./content/deeds-hi.mjs";
import deedsKn from "./content/deeds-kn.mjs";
import deedsMr from "./content/deeds-mr.mjs";
import deedsTa from "./content/deeds-ta.mjs";
import deedsTe from "./content/deeds-te.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/documents");

const deedsByLang = { en: deedsEn, hi: deedsHi, kn: deedsKn, mr: deedsMr, ta: deedsTa, te: deedsTe };

/** Fixed, deterministic demo execution date. */
const EXECUTION_DATE = new Date(Date.UTC(2026, 0, 15));

const CHROMIUM_CANDIDATES = [
  process.env.CHROMIUM_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
].filter(Boolean);

function findChromium() {
  for (const candidate of CHROMIUM_CANDIDATES) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error("Chromium executable not found. Set CHROMIUM_PATH.");
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function formatDate(lang) {
  return new Intl.DateTimeFormat(LOCALES[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(EXECUTION_DATE);
}

function partyBlock(role, person, f) {
  return `
    <div class="party">
      <p class="party-role">${escapeHtml(role)}</p>
      <p class="party-name">${escapeHtml(person.name)}</p>
      <p class="party-meta">${escapeHtml(person.parentage)} · ${escapeHtml(person.age)}</p>
      <p class="party-meta">${escapeHtml(f.addressLabel)}: ${escapeHtml(person.address)}</p>
    </div>`;
}

function buildHtml({ lang, deedId, deed, seq }) {
  const f = frame[lang];
  const p = parties[lang];
  const s = schedule[lang];
  const fonts = FONTS[lang];
  const date = formatDate(lang);
  const docNo = `LD-DEMO-2026-${String(seq).padStart(3, "0")}`;
  const stampNo = `IN-KA-DEMO-${String(seq).padStart(6, "0")}-X`;
  const singleParty = !deed.party2Role;

  const partiesHtml = singleParty
    ? partyBlock(deed.party1Role, p.party1, f)
    : `${partyBlock(deed.party1Role, p.party1, f)}
       <p class="and-label">${escapeHtml(f.andLabel)}</p>
       ${partyBlock(deed.party2Role, p.party2, f)}`;

  const clausesHtml = deed.clauses
    .map((c, i) => `<li><span class="clause-num">${i + 1}.</span><span>${escapeHtml(c)}</span></li>`)
    .join("\n");

  const scheduleRows = [
    [f.scheduleFields.surveyNo, s.surveyNo],
    [f.scheduleFields.extent, s.extent],
    [f.scheduleFields.village, s.village],
    [f.scheduleFields.taluk, s.taluk],
    [f.scheduleFields.district, s.district],
    [f.scheduleFields.state, s.state],
    [`${f.scheduleFields.boundaries} — ${f.scheduleFields.north}`, s.north],
    [`${f.scheduleFields.boundaries} — ${f.scheduleFields.south}`, s.south],
    [`${f.scheduleFields.boundaries} — ${f.scheduleFields.east}`, s.east],
    [`${f.scheduleFields.boundaries} — ${f.scheduleFields.west}`, s.west],
  ]
    .map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
    .join("\n");

  const signaturesHtml = singleParty
    ? `<div class="sig">
         <div class="sig-line"></div>
         <p class="sig-role">${escapeHtml(deed.party1Role)}</p>
         <p class="sig-name">${escapeHtml(p.party1.name)}</p>
       </div>`
    : `<div class="sig">
         <div class="sig-line"></div>
         <p class="sig-role">${escapeHtml(deed.party1Role)}</p>
         <p class="sig-name">${escapeHtml(p.party1.name)}</p>
       </div>
       <div class="sig">
         <div class="sig-line"></div>
         <p class="sig-role">${escapeHtml(deed.party2Role)}</p>
         <p class="sig-name">${escapeHtml(p.party2.name)}</p>
       </div>`;

  const witnessesHtml = [p.witness1, p.witness2]
    .map(
      (w, i) => `
      <div class="witness">
        <p class="witness-no">${escapeHtml(f.witnessLabel)} ${i + 1}</p>
        <p>${escapeHtml(f.nameLabel)}: ${escapeHtml(w.name)}</p>
        <p>${escapeHtml(f.addressLabel)}: ${escapeHtml(w.address)}</p>
        <div class="sig-line small"></div>
        <p class="sig-role">${escapeHtml(f.signatureLabel)}</p>
      </div>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<style>
  :root { --ink: #1a1a1a; --rule: #333; --soft: #666; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; }
  body {
    font-family: ${fonts.serif};
    color: var(--ink);
    font-size: 10.5pt;
    line-height: 1.62;
  }
  /* Repeats on every printed page */
  .watermark {
    position: fixed;
    top: 44%; left: 50%;
    transform: translate(-50%, -50%) rotate(-32deg);
    font-family: 'Noto Sans', sans-serif;
    font-size: 52pt;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: rgba(160, 30, 30, 0.085);
    white-space: nowrap;
    z-index: 0;
  }
  main { position: relative; z-index: 1; }
  .demo-banner {
    border: 1.5pt solid #a02020;
    color: #a02020;
    font-family: ${fonts.sans};
    font-size: 8pt;
    line-height: 1.5;
    padding: 6pt 9pt;
    margin-bottom: 14pt;
    text-align: center;
  }
  .stamp-box {
    border: 1pt solid var(--rule);
    padding: 8pt 10pt;
    font-family: ${fonts.sans};
    font-size: 8.5pt;
    color: var(--soft);
    display: flex;
    justify-content: space-between;
    gap: 12pt;
    margin-bottom: 18pt;
  }
  .stamp-box b { color: var(--ink); font-weight: 600; }
  h1 {
    text-align: center;
    font-size: 17pt;
    letter-spacing: 0.08em;
    margin-bottom: 4pt;
  }
  .title-rule {
    width: 90pt; height: 0;
    border-bottom: 2.5pt double var(--rule);
    margin: 0 auto 16pt;
  }
  .meta-row {
    display: flex;
    justify-content: space-between;
    font-family: ${fonts.sans};
    font-size: 9pt;
    color: var(--soft);
    margin-bottom: 16pt;
    gap: 10pt;
    flex-wrap: wrap;
  }
  .meta-row b { color: var(--ink); font-weight: 600; }
  .between { text-align: center; font-weight: 700; letter-spacing: 0.1em; margin: 12pt 0 8pt; font-size: 10.5pt; }
  .and-label { text-align: center; font-weight: 700; letter-spacing: 0.1em; margin: 10pt 0; }
  .party { text-align: center; margin-bottom: 4pt; }
  .party-role { font-family: ${fonts.sans}; font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: var(--soft); margin-bottom: 2pt; }
  .party-name { font-weight: 700; font-size: 11.5pt; }
  .party-meta { font-size: 9.5pt; color: #333; }
  .recital { margin: 14pt 0; text-align: justify; }
  h2 {
    font-size: 11pt;
    letter-spacing: 0.06em;
    margin: 16pt 0 8pt;
    padding-bottom: 3pt;
    border-bottom: 0.75pt solid var(--rule);
  }
  ol.clauses { list-style: none; margin: 6pt 0; }
  ol.clauses li { display: flex; gap: 8pt; margin-bottom: 7pt; text-align: justify; }
  .clause-num { font-weight: 700; min-width: 16pt; }
  table.schedule { width: 100%; border-collapse: collapse; margin: 8pt 0 4pt; font-size: 9.75pt; }
  table.schedule th, table.schedule td { border: 0.75pt solid #444; padding: 4.5pt 7pt; text-align: left; vertical-align: top; }
  table.schedule th { width: 38%; font-weight: 600; background: #f2efe9; font-family: ${fonts.sans}; font-size: 8.75pt; }
  .in-witness { margin: 14pt 0 10pt; text-align: justify; }
  .sig-grid { display: flex; justify-content: space-between; gap: 24pt; margin: 26pt 0 6pt; }
  .sig { flex: 1; text-align: center; }
  .sig-line { border-bottom: 0.9pt dotted #444; height: 30pt; margin-bottom: 4pt; }
  .sig-line.small { height: 22pt; width: 70%; }
  .sig-role { font-family: ${fonts.sans}; font-size: 8.5pt; letter-spacing: 0.1em; text-transform: uppercase; color: var(--soft); }
  .sig-name { font-weight: 600; font-size: 10pt; }
  .witness-grid { display: flex; gap: 24pt; margin-top: 10pt; }
  .witness { flex: 1; font-size: 9.5pt; }
  .witness-no { font-family: ${fonts.sans}; font-weight: 700; font-size: 9pt; margin-bottom: 2pt; }
  .witness .sig-line { margin-top: 10pt; }
  .reg-box {
    border: 1.2pt solid var(--rule);
    margin-top: 22pt;
    padding: 10pt 12pt 14pt;
    break-inside: avoid;
  }
  .reg-box h2 { border: none; margin: 0 0 8pt; font-size: 9.5pt; font-family: ${fonts.sans}; letter-spacing: 0.1em; }
  .reg-grid { display: flex; flex-wrap: wrap; gap: 8pt 20pt; font-size: 9.25pt; }
  .reg-field { min-width: 40%; flex: 1 1 40%; }
  .reg-field .dots { border-bottom: 0.8pt dotted #666; display: inline-block; min-width: 90pt; height: 9pt; }
  .reg-bottom { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 14pt; }
  .seal {
    width: 64pt; height: 64pt;
    border: 1.2pt dashed #777;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: ${fonts.sans}; font-size: 7.5pt; color: #777;
    letter-spacing: 0.15em; text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="watermark">${escapeHtml(f.demoWatermark)}</div>
  <main>
    <div class="demo-banner">${escapeHtml(f.demoNotice)}</div>

    <div class="stamp-box">
      <span>${escapeHtml(f.stampLabel)}: <b>${stampNo}</b></span>
      <span>${escapeHtml(f.stampValueLabel)}: <b>₹ 500</b></span>
    </div>

    <h1>${escapeHtml(deed.title)}</h1>
    <div class="title-rule"></div>

    <div class="meta-row">
      <span>${escapeHtml(f.docNoLabel)}: <b>${docNo}</b></span>
      <span>${escapeHtml(f.dateLabel)}: <b>${escapeHtml(date)}</b></span>
      <span>${escapeHtml(f.placeLabel)}: <b>${escapeHtml(p.place)}</b></span>
    </div>

    ${singleParty ? "" : `<p class="between">${escapeHtml(f.betweenLabel)}</p>`}
    ${partiesHtml}

    <p class="recital">${escapeHtml(deed.recital)}</p>

    <h2>${escapeHtml(f.witnessethHeading)}</h2>
    <h2 style="border:none;margin-top:4pt;font-size:10pt;">${escapeHtml(f.clausesHeading)}</h2>
    <ol class="clauses">
      ${clausesHtml}
    </ol>

    <h2>${escapeHtml(f.scheduleHeading)}</h2>
    <table class="schedule">
      ${scheduleRows}
    </table>

    <p class="in-witness">${escapeHtml(f.inWitness)}</p>

    <h2>${escapeHtml(f.signaturesHeading)}</h2>
    <div class="sig-grid">
      ${signaturesHtml}
    </div>

    <h2>${escapeHtml(f.witnessesHeading)}</h2>
    <div class="witness-grid">
      ${witnessesHtml}
    </div>

    <div class="reg-box">
      <h2>${escapeHtml(f.registrationHeading)}</h2>
      <div class="reg-grid">
        <div class="reg-field">${escapeHtml(f.regFields.office)}: <span class="dots"></span></div>
        <div class="reg-field">${escapeHtml(f.regFields.bookNo)}: <span class="dots"></span></div>
        <div class="reg-field">${escapeHtml(f.regFields.documentNo)}: <span class="dots"></span></div>
        <div class="reg-field">${escapeHtml(f.regFields.regDate)}: <span class="dots"></span></div>
      </div>
      <div class="reg-bottom">
        <div>
          <div class="sig-line small" style="width:120pt;"></div>
          <p class="sig-role">${escapeHtml(f.regFields.subRegistrar)}</p>
        </div>
        <div class="seal">${escapeHtml(f.regFields.seal)}</div>
      </div>
    </div>
  </main>
</body>
</html>`;
}

function footerTemplate(lang) {
  const f = frame[lang];
  // Chromium footer templates need inline styles; fonts fall back to system Noto.
  return `
    <div style="width:100%; font-size:7.5pt; color:#777; padding:0 14mm; display:flex; justify-content:space-between; font-family:'Noto Sans','Noto Sans Devanagari','Noto Sans Kannada','Noto Sans Tamil','Noto Sans Telugu',sans-serif;">
      <span>LandDocs · ${escapeHtml(frame[lang].demoWatermark)}</span>
      <span>${escapeHtml(f.pageLabel)} <span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const executablePath = findChromium();
  console.log(`Using Chromium: ${executablePath}`);
  const browser = await chromium.launch({
    executablePath,
    args: ["--no-sandbox", "--font-render-hinting=none"],
  });
  const page = await browser.newPage();

  const manifest = [];
  const deedIds = Object.keys(deedsEn);
  let seq = 0;

  for (const deedId of deedIds) {
    for (const lang of LANGUAGES) {
      seq += 1;
      const deed = deedsByLang[lang][deedId];
      if (!deed) throw new Error(`Missing content: ${deedId} / ${lang}`);

      const html = buildHtml({ lang, deedId, deed, seq });
      await page.setContent(html, { waitUntil: "networkidle" });

      const pdfBytes = await page.pdf({
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: "<span></span>",
        footerTemplate: footerTemplate(lang),
        margin: { top: "16mm", bottom: "18mm", left: "16mm", right: "16mm" },
      });

      // Stamp demo metadata into the PDF.
      const doc = await PDFDocument.load(pdfBytes);
      doc.setTitle(`${deed.title} — DEMO SAMPLE`);
      doc.setSubject("Demonstration document with fictional data. Not valid for registration or any legal use.");
      doc.setAuthor("LandDocs Demo Library");
      doc.setKeywords(["demo", "sample", "fictional", deedId, lang, "land registration", "LandDocs"]);
      doc.setCreator("LandDocs demo generator (scripts/generate-demo-pdfs.mjs)");
      doc.setProducer("LandDocs");
      doc.setCreationDate(EXECUTION_DATE);
      doc.setModificationDate(EXECUTION_DATE);
      const finalBytes = await doc.save();

      const id = `${deedId}-${lang}`;
      const file = path.join(OUT_DIR, `${id}.pdf`);
      await writeFile(file, finalBytes);

      manifest.push({
        id,
        type: deedId,
        language: lang,
        title: deed.title,
        file: `/documents/${id}.pdf`,
        pages: doc.getPageCount(),
        sizeKB: Math.round(finalBytes.byteLength / 1024),
        generatedAt: EXECUTION_DATE.toISOString(),
      });
      console.log(`✓ ${id}.pdf (${doc.getPageCount()} pages, ${Math.round(finalBytes.byteLength / 1024)} KB)`);
    }
  }

  await browser.close();
  await writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nGenerated ${manifest.length} PDFs + manifest.json in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
