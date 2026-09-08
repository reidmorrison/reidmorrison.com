/* Runs the calculator exactly as shipped, in a sandbox with a pinned clock.
 *
 * The script is lifted verbatim out of the built page and evaluated in a
 * node:vm context against a DOM stub that implements only what it touches:
 * two <select>s, the output element, the print letterhead spans, and
 * addEventListener. Nothing is rewritten on the way in.
 *
 * The clock is pinned because every headline number on the page is a distance
 * from today. With a fixed `now`, a day counter and a Supported / Expiring /
 * Unsupported pill are exact values derived from _data/eol.yml rather than
 * something that drifts overnight.
 */
import vm from "node:vm";
import { calculatorSource } from "./site.mjs";

const RealDate = Date;

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
  for (const id of ["rails", "ruby", "calc", "out", "phctx", "phdate"]) {
    registry.set(id, element(id));
  }

  return {
    registry,
    document: {
      getElementById: (id) => registry.get(id) ?? null,
    },
  };
}

/* Loads the calculator with `now` fixed at the given epoch milliseconds. */
export function loadCalculator(now) {
  const { registry, document } = makeDocument();

  class PinnedDate extends RealDate {
    constructor(...args) {
      if (args.length === 0) super(now);
      else super(...args);
    }
    static now() {
      return now;
    }
  }

  const sandbox = {
    document,
    Date: PinnedDate,
    Option: class Option {
      constructor(text, value) {
        this.text = text;
        this.value = value;
      }
    },
    FormData: class FormData {},
    fetch: () => {
      throw new Error("the tests never submit the lead form");
    },
    window: { print: () => {} },
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
    "\n;globalThis.__internals={RAILS,RUBY,CONTROLS,TARGET_RAILS,TARGET_RUBY,RUBY_FLOOR,cmp,ladder,statusOf,render,railsSel,rubySel};\n";

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
    options: (select) => internals[select].options.map((o) => ({ text: o.text, value: o.value })),
    now,
    registry,
    /* Renders a combination and returns the markup the page would show. */
    render(rails, ruby) {
      internals.render(rails, ruby);
      return out.innerHTML;
    },
    /* What the page shows on first load, before anything is selected. */
    initialHtml: out.innerHTML,
    letterhead: () => ({
      context: registry.get("phctx").textContent,
      date: registry.get("phdate").textContent,
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
