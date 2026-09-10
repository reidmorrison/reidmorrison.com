/* Runs the calculator exactly as shipped, in a sandbox with a pinned clock.
 *
 * The script is lifted verbatim out of the built page and evaluated in a
 * node:vm context against a DOM stub that implements only what it touches:
 * two <select>s, the output element, the print letterhead spans,
 * addEventListener, and an address bar. Nothing is rewritten on the way in.
 *
 * The address bar is a working one rather than a placeholder, because the
 * selection is read out of it on load and written back on every check. It
 * parses a pushed URL and keeps the entries, so a test can arrive on a link
 * and press Back.
 *
 * The clock is pinned because every headline number on the page is a distance
 * from today. With a fixed `now`, a day counter and a Supported / Expiring /
 * Unsupported pill are exact values derived from _data/eol.yml rather than
 * something that drifts overnight.
 *
 * The drop zone brought three more things into the stub: a FileReader, a file
 * input that can be handed a file, and a fetch that answers for
 * data/advisories.json. That fetch serves the file out of the BUILT site, so
 * the suite matches against the real 1,200-advisory database and also covers
 * Jekyll publishing it. Every other URL still throws.
 *
 * setTimeout is stubbed too, and it is not an optimisation. Removing the
 * Check exposure button made the address bar follow a debounce, and real
 * timers would turn every history case into a race. The sandbox holds the one
 * pending callback and settle() fires it, so "left it alone" is a thing a
 * test states rather than waits for.
 */
import vm from "node:vm";
import fs from "node:fs";
import path from "node:path";
import { calculatorSource, build } from "./site.mjs";

const RealDate = Date;

/* The advisory database as the browser would receive it. build() returns the
   path to the built /eol/index.html, so the site root is two levels up. */
function advisoriesJson() {
  return fs.readFileSync(path.join(path.dirname(build()), "..", "data", "advisories.json"), "utf8");
}

/* Elements carrying an id are discoverable after they are written into
   innerHTML, which is how the script reaches #printbtn and #lead: both are
   markup it has just produced. */
function scanIds(html, register) {
  for (const m of html.matchAll(/\bid="([^"]+)"/g)) register(m[1]);
}

function makeDocument() {
  const registry = new Map();

  const element = (id) => {
    let html = "";
    const el = {
      id,
      value: "",
      text: "",
      textContent: "",
      options: [],
      listeners: {},
      classes: new Set(),
      get innerHTML() {
        return html;
      },
      set innerHTML(v) {
        html = String(v);
        scanIds(html, (found) => {
          if (!registry.has(found)) registry.set(found, element(found));
        });
      },
      add(option) {
        el.options.push(option);
      },
      addEventListener(type, fn) {
        (el.listeners[type] ||= []).push(fn);
      },
      querySelector() {
        return element("anonymous");
      },
      /* The window-level drag guard asks whether the event landed inside the
         drop zone. Nothing in the suite dispatches a stray drag, so this only
         has to exist and answer. */
      contains: () => false,
      classList: {
        add: (c) => el.classes.add(c),
        remove: (c) => el.classes.delete(c),
        contains: (c) => el.classes.has(c),
      },
    };
    return el;
  };

  /* The elements eol.html ships in its markup. Anything else has to have been
     rendered by the script before it can be found, which is the real
     behaviour: a typo in an id would return null here and throw, as it would
     in a browser. */
  for (const id of ["rails", "ruby", "calc", "out", "phctx", "phdate", "phurl", "summary", "drop", "lockfile", "dropstatus"]) {
    registry.set(id, element(id));
  }

  return {
    registry,
    document: {
      getElementById: (id) => registry.get(id) ?? null,
    },
  };
}

/* The address bar, and the history behind it. `pushState` and `replaceState`
   take a URL the same way the browser does; `back()` walks an entry off and
   fires popstate, which is the only way the page hears about it. */
function makeHistory(url) {
  const entries = [String(url)];
  const location = { pathname: "", search: "" };
  const apply = (next) => {
    const [pathname, search] = String(next).split("?");
    location.pathname = pathname;
    location.search = search === undefined ? "" : `?${search}`;
  };
  apply(entries[0]);

  const history = {
    get length() {
      return entries.length;
    },
    pushState(state, title, next) {
      entries.push(String(next));
      apply(next);
    },
    replaceState(state, title, next) {
      entries[entries.length - 1] = String(next);
      apply(next);
    },
  };

  return { entries, location, history, apply };
}

/* Loads the calculator with `now` fixed at the given epoch milliseconds, on
   the given URL. The default is the bare page, which is how a visitor who
   followed no link arrives. */
export function loadCalculator(now, url = "/eol/") {
  const { registry, document } = makeDocument();
  const { entries, location, history, apply } = makeHistory(url);
  const windowListeners = {};

  class PinnedDate extends RealDate {
    constructor(...args) {
      if (args.length === 0) super(now);
      else super(...args);
    }
    static now() {
      return now;
    }
  }

  /* The debounce behind the deferred history entry. Real timers would make
     every history case a race, so the sandbox holds the pending callback and
     the test fires it through settle(). Only one can be outstanding: the page
     clears the previous before setting another. */
  let pendingTimer = null;

  const sandbox = {
    document,
    Date: PinnedDate,
    setTimeout: (fn) => {
      pendingTimer = fn;
      return 1;
    },
    clearTimeout: () => {
      pendingTimer = null;
    },
    Option: class Option {
      constructor(text, value) {
        this.text = text;
        this.value = value;
      }
    },
    FormData: class FormData {},
    /* The advisory database is served; everything else still throws, which is
       what keeps the lead form out of the suite. */
    fetch: async (url) => {
      if (String(url).endsWith("/data/advisories.json")) {
        const body = advisoriesJson();
        return { ok: true, json: async () => JSON.parse(body) };
      }
      throw new Error("the tests never submit the lead form");
    },
    /* Enough of FileReader for readAsText. The real one is asynchronous, and
       so is this: a synchronous stub would hide an ordering bug in the page. */
    FileReader: class FileReader {
      readAsText(file) {
        Promise.resolve().then(() => {
          this.result = file.text;
          if (this.onload) this.onload();
        });
      }
    },
    window: {
      print: () => {},
      addEventListener: (type, fn) => ((windowListeners[type] ||= []).push(fn)),
    },
    location,
    history,
    URLSearchParams,
    console,
    Math,
    JSON,
    Object,
    Intl,
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  /* Appended, not woven in: the script body above this line is byte-identical
     to the one the browser runs. `const` at the top level of a vm script lives
     in the context's lexical scope rather than on the global object, so the
     handful of values the tests assert against have to be published. */
  const source =
    calculatorSource() +
    "\n;globalThis.__internals={RAILS,RUBY,CONTROLS,TARGET_RAILS,TARGET_RUBY,RUBY_FLOOR,cmp,ladder,statusOf,render,railsSel,rubySel," +
    "vcmp,bump,meets,affected,parseLock,series,railsFromLock,findings,applyLock,dependencyBlock};\n";

  vm.runInContext(source, sandbox, { filename: "eol.html:script" });

  const out = registry.get("out");
  const internals = sandbox.__internals;

  /* Values built inside the sandbox carry that realm's prototypes, which
     assert.deepEqual rejects against ordinary objects. Copy them across. */
  const plain = (v) => JSON.parse(JSON.stringify(v));

  return {
    ...internals,
    RAILS: plain(internals.RAILS),
    RUBY: plain(internals.RUBY),
    CONTROLS: plain(internals.CONTROLS),
    ladder: (rails, ruby) => plain(internals.ladder(rails, ruby)),
    statusOf: (eol) => plain(internals.statusOf(eol)),
    parseLock: (text) => plain(internals.parseLock(text)),
    findings: (lock, db) => plain(internals.findings(lock, db)),
    options: (select) => internals[select].options.map((o) => ({ text: o.text, value: o.value })),
    now,
    registry,
    /* What the address bar reads, and everything it has read. */
    url: () => location.pathname + location.search,
    entries,
    /* The browser Back button: one entry off, then popstate. */
    back() {
      if (entries.length < 2) return;
      entries.pop();
      apply(entries[entries.length - 1]);
      for (const fn of windowListeners.popstate ?? []) fn({});
      return out.innerHTML;
    },
    /* Changes the two dropdowns the way a visitor does, one at a time, and
       lets the pair settle. There is no Check exposure button any more: the
       finding follows the fields, and the address bar follows once the
       selection has been left alone. Pass { settle: false } to stop just
       before the history entry, which is the transient state. */
    check(rails, ruby, { settle = true } = {}) {
      const change = (sel, value) => {
        internals[sel].value = value;
        for (const fn of registry.get(sel === "railsSel" ? "rails" : "ruby").listeners.change ?? []) fn({});
      };
      if (internals.railsSel.value !== rails) change("railsSel", rails);
      if (internals.rubySel.value !== ruby) change("rubySel", ruby);
      if (settle) this.settle();
      return out.innerHTML;
    },
    selected: () => ({ rails: internals.railsSel.value, ruby: internals.rubySel.value }),
    /* Renders a combination and returns the markup the page would show. */
    render(rails, ruby) {
      internals.render(rails, ruby);
      return out.innerHTML;
    },
    /* Drops a Gemfile.lock in, as the page does once FileReader has handed it
       the text: it sets the dropdowns, renders, fetches the advisories and
       renders again. Awaiting it waits for the second render. */
    async drop(text, name = "Gemfile.lock") {
      await internals.applyLock(text, name);
      return out.innerHTML;
    },
    /* The same thing through the file input, which is the path that also runs
       FileReader and the size guard. Everything on that path settles in
       microtasks, so one turn of the event loop drains all of it. */
    async dropFile(file) {
      const input = registry.get("lockfile");
      input.files = [file];
      for (const fn of input.listeners.change ?? []) fn({});
      await new Promise((resolve) => setImmediate(resolve));
      return out.innerHTML;
    },
    /* What the panel says under the drop zone. */
    dropStatus: () => registry.get("dropstatus").innerHTML,
    /* The one-line finding inside the panel, which is also the page's only
       aria-live region. */
    summary: () => registry.get("summary").textContent,
    /* Runs the pending debounce, which is what promotes the current pair to a
       history entry. Returns whether there was one to run. */
    settle() {
      const fn = pendingTimer;
      pendingTimer = null;
      if (fn) fn();
      return Boolean(fn);
    },
    settlePending: () => pendingTimer !== null,
    /* What the page shows on first load, before anything is selected. */
    initialHtml: out.innerHTML,
    letterhead: () => ({
      context: registry.get("phctx").textContent,
      date: registry.get("phdate").textContent,
      /* The printed way back. Text and href differ: the scheme is dropped
         from what a reader sees and kept in what a PDF follows. */
      url: registry.get("phurl").textContent,
      href: registry.get("phurl").href,
    }),
  };
}

/* The findings are a flat list of <article>/<section> blocks. Splitting on the
   opening tags is enough to isolate one, and keeps the assertions readable
   without pulling in a DOM parser. */
export function blocks(html) {
  return html.split(/(?=<article |<section )/).filter((b) => /^<(article|section) /.test(b));
}

export function blockTitled(html, title) {
  return blocks(html).find((b) => b.includes(`>${title}<`) || b.includes(title));
}

export function hasBlockTitled(html, title) {
  return blocks(html).some((b) => new RegExp(`class="rec-title">${title}<`).test(b));
}

/* Text with the tags removed, for asserting on copy the page composes. */
export function text(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&rarr;/g, "->")
    .replace(/&middot;/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}
