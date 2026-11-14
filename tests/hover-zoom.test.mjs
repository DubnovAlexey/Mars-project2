// =====================================================================
// FILE: tests/hover-zoom.test.mjs
// PURPOSE: a picture under the mouse grows for real (owner's rule, 14.11.2026): a portrait or a square ≈ 2.5×,
// a wide picture ≈ 3×, whole (its own proportions) and inside the window. Checks the place calculation of
// js/hover-zoom.js. Run: node --test (from the project folder).
// The script is a classic browser script, so it runs in a sandbox where `module` exists: then it only hands out
// its calculation and does not wire the page.
// =====================================================================
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const sandbox = {module: {exports: {}}};
vm.runInContext(readFileSync(new URL('../js/hover-zoom.js', import.meta.url), 'utf8'), vm.createContext(sandbox), {filename: 'js/hover-zoom.js'});
const {peekBox} = sandbox.module.exports;
const view = {width: 1366, height: 900};
const close = (a, b) => Math.abs(a - b) < 1e-9;

test('портрет в середине экрана растёт в 2,5 раза и встаёт по центру своего снимка', () => {
    const rect = {left: 600, top: 300, width: 160, height: 200};
    const box = peekBox(rect, 0.8, view);
    assert.ok(close(box.width / rect.width, 2.5));
    assert.ok(close(box.width / box.height, 0.8), 'пропорции снимка сохранены — ничего не обрезано');
    assert.ok(close(box.left + box.width / 2, rect.left + rect.width / 2));
});

test('широкий снимок растёт сильнее — в 3 раза', () => {
    const box = peekBox({left: 500, top: 300, width: 200, height: 125}, 1.6, view);
    assert.ok(close(box.width, 600));
});

test('большой снимок ужимается до окна, у края — сдвигается внутрь, но всё равно заметно крупнее', () => {
    for (const rect of [{left: 20, top: 120, width: 420, height: 280}, {left: 1100, top: 700, width: 240, height: 180}]) {
        const box = peekBox(rect, rect.width / rect.height, view);
        assert.ok(box.left >= 14 && box.top >= 14, JSON.stringify(box));
        assert.ok(box.left + box.width <= view.width - 14 + 1e-9 && box.top + box.height <= view.height - 14 + 1e-9, JSON.stringify(box));
        assert.ok(box.width > rect.width * 1.3, 'увеличение заметное, а не на проценты');
    }
});

test('превью вложения 48×48 в форме вырастает до 120×120', () => {
    const box = peekBox({left: 300, top: 400, width: 48, height: 48}, 1, view);
    assert.ok(close(box.width, 120) && close(box.height, 120));
});
