import test from "node:test";
import assert from "node:assert/strict";
import { buildFilename, buildPath, sanitizeSubfolder, DEFAULTS } from "../extension/naming.js";

const date = new Date(2026, 0, 5, 7, 8, 9);

test("default template", () => {
  assert.equal(buildFilename(DEFAULTS.template, { host: "a.com", date }), "screenshot - a.com - 2026-01-05 07_08_09.png");
});

test("title placeholder and illegal characters removed", () => {
  assert.equal(buildFilename("%title", { title: 'a/b:c*d?"e<f>g|h\\i', date }), "abcdefghi.png");
});

test("empty result falls back", () => {
  assert.equal(buildFilename("???", { date }), "screenshot.png");
});

test("subfolder cannot escape Downloads", () => {
  assert.equal(sanitizeSubfolder("../../etc/Shots"), "etc/Shots");
  assert.equal(sanitizeSubfolder("C:\\x"), "C/x");
});

test("path", () => {
  assert.equal(buildPath({ subfolder: "Screenshots", template: "%Y" }, { date }), "Screenshots/2026.png");
  assert.equal(buildPath({ subfolder: "", template: "%Y" }, { date }), "2026.png");
});
