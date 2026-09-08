/* Builds the site with Jekyll and hands back the generated /eol/ page.
 *
 * The tests read the BUILT page, not eol.html, so they cover the Liquid layer:
 * `jsonify` of _data/eol.yml, the verified date in the sources footer, and the
 * web3forms gate. Rendering the template by hand here would test a copy of the
 * pipeline rather than the pipeline.
 *
 * The build is cached in test/.site and reused while it is newer than every
 * input, so the suite's two files do not pay for it twice.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { ROOT, DATA_FILE } from "./data.mjs";

const SITE = path.join(ROOT, "test", ".site");
const PAGE = path.join(SITE, "eol", "index.html");

const INPUTS = [
  DATA_FILE,
  path.join(ROOT, "eol.html"),
  path.join(ROOT, "_config.yml"),
  path.join(ROOT, "_includes"),
  path.join(ROOT, "_layouts"),
];

function newestInput() {
  const stamp = (p) => {
    const s = fs.statSync(p);
    if (!s.isDirectory()) return s.mtimeMs;
    return fs.readdirSync(p).reduce((m, f) => Math.max(m, stamp(path.join(p, f))), s.mtimeMs);
  };
  return INPUTS.reduce((m, p) => Math.max(m, stamp(p)), 0);
}

function stale() {
  if (!fs.existsSync(PAGE)) return true;
  return fs.statSync(PAGE).mtimeMs < newestInput();
}

export function build() {
  if (!stale()) return PAGE;
  try {
    execFileSync("bundle", ["exec", "jekyll", "build", "--destination", SITE, "--quiet"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (err) {
    throw new Error(
      "jekyll build failed, so there is no page to test. Run `bundle install` first; " +
        "the build also fetches remote_theme, so it needs network access.\n\n" +
        (err.stderr || err.stdout || err.message)
    );
  }
  if (!fs.existsSync(PAGE)) throw new Error(`jekyll built the site but produced no ${PAGE}`);
  return PAGE;
}

let cached;

export function eolPage() {
  if (cached === undefined) cached = fs.readFileSync(build(), "utf8");
  return cached;
}

/* The page carries exactly one inline script, and it is the calculator. */
export function calculatorSource() {
  const blocks = [...eolPage().matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
  if (blocks.length !== 1) {
    throw new Error(`expected one inline script on /eol/, found ${blocks.length}`);
  }
  return blocks[0][1];
}
