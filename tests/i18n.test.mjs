// =====================================================================
// FILE: tests/i18n.test.mjs
// PURPOSE: the site speaks five languages (EN, RU, HE, ES, FR) everywhere: interface dictionary (js/i18n.js)
// and page texts (index, history, myths, photos, videos, rover). Every key used in HTML/JS exists, placeholders
// survive translation, and French keeps a no-break space (U+00A0) before : ; ? ! and inside « ».
// Run: node --test      (from the project folder; Node 20+ finds tests/*.test.mjs itself, no dependencies)
// The site's scripts are classic browser scripts, so they are run in a small sandbox with stub window/document.
// =====================================================================
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';

const file = relative => readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8');
const LANGS = ['en', 'ru', 'he', 'es', 'fr'];

// НАЧАЛО: песочница — заглушки браузера, которых хватает, чтобы скрипты объявили свои данные
const noop = () => {};
const sandbox = {
    console, URL, URLSearchParams,
    location: {search: '', href: 'http://localhost/index.html', pathname: '/index.html'},
    localStorage: {getItem: () => null, setItem: noop, removeItem: noop},
    document: {documentElement: {}, addEventListener: noop, querySelectorAll: () => [], getElementById: () => null},
    addEventListener: noop
};
sandbox.window = sandbox;
const context = vm.createContext(sandbox);
for (const script of ['js/i18n.js', 'js/index.js', 'js/photos.js', 'js/videos.js', 'js/rover.js', 'js/history.js', 'js/myths.js']) {
    vm.runInContext(file(script), context, {filename: script});
}
const value = name => vm.runInContext(name, context);
const {UI, languages} = value('window.i18n');
// КОНЕЦ песочницы

const placeholders = text => (text.match(/\{\w+\}/g) ?? []).sort().join();
// Каждый объект с полем en — это текст с переводами {en, ru, he, es, fr}
function* localized(node, path) {
    if (Array.isArray(node)) { for (const [i, item] of node.entries()) yield* localized(item, `${path}[${i}]`); return; }
    if (!node || typeof node !== 'object') return;
    if (typeof node.en === 'string') { yield [path, node]; return; }
    for (const [key, item] of Object.entries(node)) yield* localized(item, `${path}.${key}`);
}
const pageTexts = [...localized({
    indexData: value('indexData'), galleryPhotos: value('galleryPhotos'), videoSections: value('videoSections'),
    roverCameras: value('roverCameras'), instrumentNames: value('instrumentNames'),
    historyData: value('historyData'), mythsData: value('mythsData')
}, 'page')];

test('the switch offers exactly the five languages, Hebrew right-to-left', () => {
    // Array.from: массивы из песочницы — из другого «мира» JavaScript, строгое сравнение их не принимает
    assert.deepEqual(Array.from(languages, l => l.code), LANGS);
    assert.deepEqual(Array.from(languages.filter(l => l.rtl), l => l.code), ['he']);
});

test('every interface string exists in all five languages with the same placeholders', () => {
    for (const [key, entry] of Object.entries(UI)) {
        for (const lang of LANGS) {
            assert.ok(entry[lang]?.trim(), `${key}.${lang} is missing`);
            assert.equal(placeholders(entry[lang]), placeholders(entry.en), `${key}.${lang}: placeholders differ`);
        }
    }
});

test('every page text exists in all five languages', () => {
    assert.ok(pageTexts.length > 150, `only ${pageTexts.length} page texts found`);
    for (const [path, entry] of pageTexts) {
        for (const lang of LANGS) assert.ok(entry[lang]?.trim(), `${path}.${lang} is missing`);
    }
});

test('every key used in HTML and scripts exists in the dictionary', () => {
    const used = new Set();
    for (const page of readdirSync(new URL('../', import.meta.url)).filter(name => name.endsWith('.html'))) {
        for (const [, key] of file(page).matchAll(/data-i18n(?:-html|-aria|-alt|-placeholder)?="([^"]+)"/g)) used.add(`${page}: ${key}`);
    }
    for (const script of readdirSync(new URL('../js/', import.meta.url)).filter(name => name.endsWith('.js'))) {
        for (const [, key] of file(`js/${script}`).matchAll(/\b(?:t|tr|vt|rt|i18n\.t)\(\s*["']([\w.]+)["']/g)) used.add(`${script}: ${key}`);
    }
    assert.ok(used.size > 50, `only ${used.size} keys found`);
    for (const item of used) assert.ok(UI[item.split(': ')[1]], `unknown key ${item}`);
});

test('French keeps a no-break space before : ; ? ! and inside « »', () => {
    const french = [...Object.values(UI).map(entry => entry.fr), ...pageTexts.map(([, entry]) => entry.fr)];
    for (const text of french) {
        assert.doesNotMatch(text.replace(/:\/\//g, ''), /[^ ?!][:;?!]/, `missing no-break space: ${text}`);
        assert.doesNotMatch(text, /«(?! )|(?<! )»/, `guillemets need inner no-break spaces: ${text}`);
    }
});

test('t() fills placeholders and falls back to the key for unknown strings', () => {
    const i18n = value('window.i18n');
    assert.equal(i18n.lang, 'en');
    assert.equal(i18n.t('rover.sol', {sol: 7}), 'Sol 7');
    assert.equal(i18n.t('no.such.key'), 'no.such.key');
    assert.equal(i18n.pick({en: 'Home', ru: 'Главная'}), 'Home');
});
