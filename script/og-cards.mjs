// Builds the Open Graph link-preview cards in images/og/.
//
//   node script/og-cards.mjs        # from the repository root
//
// No dependencies. It writes one HTML file per card into a temporary directory
// and screenshots it with the Google Chrome already on the machine, which is
// what lets the cards use the site's own fonts and palette instead of an
// approximation of them.
//
// WHY THE CARDS ARE GENERATED RATHER THAN DRAWN
//
// One of them states a download total, and that total goes stale. It is summed
// here from _data/projects.yml, the same file the pages read, so refreshing the
// counts and re-running this script cannot leave the image disagreeing with the
// page it previews. Nothing in here restates a number that lives in the data.
//
// THE ART DELIBERATELY DOES NOT USE THE LOGO LOCKUP PNG. That master still
// carries a "CONSULTING" tier, which came off every surface on 2026-09-03. The
// card rebuilds the top bar's lockup instead: the shield from
// _includes/logo-mark.svg, the wordmark, the 2px rule, the mono sub-line.
//
// Re-run after editing a headline here, after refreshing _data/projects.yml, or
// after a palette change in the theme. Commit the PNGs: GitHub Pages builds the
// site, not this script.

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, renameSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = join(root, "images", "og");

// The light palette, copied from the theme's tokens.css. Link previews render
// on the platform's own chrome, not in the visitor's theme, so the card is
// always the light one; a dark card on LinkedIn's white feed reads as a banner
// ad rather than as a page.
const C = {
  ground: "#F2F4F7",
  surface: "#FFFFFF",
  ink: "#131A22",
  ink2: "#3D4854",
  ink3: "#6B7684",
  rule: "#D3DAE3",
  accent: "#1B4B7A",
  logoInk: "#0D2547",
  logoAccent: "#4F8AB8",
};

// Summed from the same file the pages read. "37.1M" and "463K" both parse.
function downloadTotalMillions() {
  const yml = readFileSync(join(root, "_data", "projects.yml"), "utf8");
  const total = [...yml.matchAll(/^\s+downloads:\s*([\d.]+)([MK])\s*$/gm)]
    .reduce((sum, [, n, unit]) => sum + Number(n) * (unit === "M" ? 1e6 : 1e3), 0);
  return Math.floor(total / 1e6);
}

const millions = downloadTotalMillions();

// One card per page that gets shared on its own. Everything else falls back to
// the default card through the `image` default in _config.yml.
//
// The headline on each card is the page's own h1 or a compression of it. A card
// that says something the page does not is a bait-and-switch the reader notices
// within one second of arriving.
const cards = [
  {
    file: "og-default.png",
    eyebrow: "PCI DSS · SOC 2 · HIPAA · ISO 27001",
    headline: "Your Rails version is an audit finding. We close it at a fixed price.",
    foot: "Remediation Assessment · $12,500 fixed · two weeks",
    url: "reidmorrison.com",
  },
  {
    file: "og-eol.png",
    eyebrow: "Free · no signup · no email address",
    headline: "How long has your Rails version been unpatched?",
    foot: "Rails and Ruby EOL exposure check",
    url: "reidmorrison.com/eol",
  },
  {
    file: "og-services.png",
    eyebrow: "How an engagement works",
    headline: "Two steps. Both at a fixed price.",
    foot: "Assessment $12,500 fixed · upgrade quoted from its findings",
    url: "reidmorrison.com/services",
  },
  {
    file: "og-security.png",
    eyebrow: "For your security and vendor risk teams",
    headline: "How we work with your code",
    foot: "Your repositories · your environments · nothing retained",
    url: "reidmorrison.com/security",
  },
  {
    file: "og-open-source.png",
    eyebrow: "The case study that needs no NDA",
    headline: `Eleven libraries, ${millions} million downloads, all auditable`,
    foot: "Semantic Logger · Symmetric Encryption · IOStreams",
    url: "reidmorrison.com/open-source",
  },
];

// The shield, with the two fills resolved: this file is screenshotted outside
// the site, so the CSS variables the include relies on do not exist here.
const shield = readFileSync(join(root, "_includes", "logo-mark.svg"), "utf8")
  .replace(/\s*class="brand-mark"/, "")
  .replaceAll("var(--logo-ink)", C.logoInk)
  .replaceAll("var(--logo-accent)", C.logoAccent);

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// 40px+ headlines only, so Spectral is loaded at 700 alone and Plex Mono at 500.
function html({ eyebrow, headline, foot, url }) {
  // Long headlines get a step down rather than a fourth line.
  const size = headline.length > 56 ? 62 : 72;
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Spectral:wght@700&display=block">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:${C.ground};color:${C.ink};
       font-family:Spectral,Georgia,serif;overflow:hidden}
  .card{width:100%;height:100%;padding:64px 72px;display:flex;flex-direction:column;
        border-top:10px solid ${C.accent}}
  .brand{display:flex;align-items:center;gap:16px}
  .brand svg{height:44px;width:auto;display:block}
  .brand-type{display:inline-block;border-bottom:2px solid ${C.ink};padding-bottom:6px}
  .brand-name{font-weight:700;font-size:27px;letter-spacing:-.015em}
  .brand-sub{font-family:"IBM Plex Mono",monospace;font-size:12px;font-weight:500;
             letter-spacing:.18em;text-transform:uppercase;color:${C.accent};margin-left:12px}
  /* The message block is centred in what the lockup and the footer leave, so a
     three word headline sits where a three line one does. Without this a short
     card carries 200px of dead space above its rule. */
  .body{flex:1;display:flex;flex-direction:column;justify-content:center}
  .eyebrow{font-family:"IBM Plex Mono",monospace;font-size:17px;font-weight:500;
           letter-spacing:.14em;text-transform:uppercase;color:${C.ink3}}
  h1{font-weight:700;font-size:${size}px;line-height:1.1;letter-spacing:-.02em;
     margin-top:20px;max-width:1000px}
  .foot{padding-top:26px;border-top:1px solid ${C.rule};
        display:flex;justify-content:space-between;align-items:baseline;
        font-family:"IBM Plex Mono",monospace;font-weight:500;font-size:19px;color:${C.ink2}}
  .foot .url{color:${C.accent}}
</style></head>
<body><div class="card">
  <div class="brand">${shield}<span class="brand-type"><span class="brand-name">Reid Morrison</span><span class="brand-sub">EOL Remediation</span></span></div>
  <div class="body">
    <p class="eyebrow">${escape(eyebrow)}</p>
    <h1>${escape(headline)}</h1>
  </div>
  <div class="foot"><span>${escape(foot)}</span><span class="url">${escape(url)}</span></div>
</div></body></html>`;
}

const work = mkdtempSync(join(tmpdir(), "og-cards-"));
mkdirSync(outDir, { recursive: true });

for (const card of cards) {
  const page = join(work, card.file.replace(/\.png$/, ".html"));
  writeFileSync(page, html(card));
  // --virtual-time-budget is what makes the web fonts land: without it Chrome
  // shoots the frame before Google Fonts answers and the card renders in
  // Georgia. font-display:block above holds the text until the face arrives.
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "--window-size=1200,630",
    "--virtual-time-budget=8000",
    `--screenshot=${join(work, card.file)}`,
    `file://${page}`,
  ], { stdio: ["ignore", "ignore", "pipe"] });
  renameSync(join(work, card.file), join(outDir, card.file));
  console.log(`images/og/${card.file}`);
}

rmSync(work, { recursive: true, force: true });
