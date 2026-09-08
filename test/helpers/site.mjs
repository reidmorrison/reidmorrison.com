/* Builds the site with Jekyll and hands back the generated /eol/ page.
 *
 * The tests read the BUILT page, not eol.html, so they cover the Liquid layer:
 * `jsonify` of _data/eol.yml, the verified date in the sources footer, and the
 * web3forms gate. Rendering the template by hand here would test a copy of the
 * pipeline rather than the pipeline.
 *
 * The build is cached in test/.site and reused while it is newer than every
 * input, so the suite's three files do not pay for it three times. They are
 * three separate processes, so that cache is shared state and is taken under
 * a lock; see build().
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { ROOT, DATA_FILE } from "./data.mjs";

const SITE = path.join(ROOT, "test", ".site");
const PAGE = path.join(SITE, "eol", "index.html");
const LOCK = path.join(ROOT, "test", ".site.lock");

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

/* A synchronous sleep. Everything on this path is sync, because the tests read
 * the page at module scope, so the wait below cannot be a promise. */
function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/* `node --test` runs each test file in its OWN PROCESS, and after any edit to
 * an input all three find the cache stale within milliseconds of each other.
 * Unlocked, they start three concurrent `jekyll build`s into one directory,
 * and Jekyll empties its destination before it writes: one process then reads
 * a page another has just deleted, and the run fails with an error that has
 * nothing to do with the change being tested. It reproduces about one run in
 * three by touching a file under _includes/ and running the suite.
 *
 * So exactly one process builds. The others wait for it and then re-check,
 * because the build they waited on is almost always the one they needed. */
export function build() {
  for (;;) {
    if (!stale()) return PAGE;

    let fd;
    try {
      fd = fs.openSync(LOCK, "wx");
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
      waitForBuild();
      continue;
    }

    try {
      return runJekyll();
    } finally {
      fs.closeSync(fd);
      fs.rmSync(LOCK, { force: true });
    }
  }
}

/* Bounded, because a build killed with ctrl-c leaves its lock behind and the
 * next run must not hang on it forever. A minute is far longer than a build of
 * this site takes, remote theme fetch included. */
function waitForBuild(timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  while (fs.existsSync(LOCK)) {
    if (Date.now() > deadline) {
      fs.rmSync(LOCK, { force: true });
      return;
    }
    sleep(25);
  }
}

function runJekyll() {
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
