// js/nasa.js
// Общие помощники страниц Videos и Rover: запросы к открытым API НАСА с кэшем,
// создание элементов и пауза фоновой музыки, пока открыто окно с видео.
// Все тексты от НАСА выводятся через textContent — HTML из ответа не исполняется.

window.nasa = (function () {
    // Ключи localStorage с префиксом проекта: на dubnovalexey.github.io у всех проектов общее хранилище
    const CACHE_PREFIX = "mars:nasa:";

    function readCache(key, maxAgeMs) {
        try {
            const saved = JSON.parse(localStorage.getItem(CACHE_PREFIX + key));
            if (saved && Date.now() - saved.time < maxAgeMs) return saved.data;
        } catch (e) {
            // испорченный кэш — загрузим заново
        }
        return null;
    }

    // Прошлый ответ любой давности — показать, пока свежий ещё в пути
    function readStale(key) {
        try {
            const saved = JSON.parse(localStorage.getItem(CACHE_PREFIX + key));
            return saved ? saved.data : null;
        } catch (e) {
            return null;
        }
    }

    function writeCache(key, data) {
        try {
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({time: Date.now(), data}));
        } catch (e) {
            // хранилище переполнено или запрещено — просто работаем без кэша
        }
    }

    // fetch с ограничением времени: если сервер НАСА молчит, страница не ждёт вечно
    async function getJson(url, {cacheKey, maxAgeMs = 0, timeoutMs = 15000} = {}) {
        if (cacheKey && maxAgeMs) {
            const cached = readCache(cacheKey, maxAgeMs);
            if (cached) return cached;
        }
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const res = await fetch(url, {signal: controller.signal});
            if (!res.ok) throw new Error("NASA answered " + res.status);
            const data = await res.json();
            if (cacheKey && maxAgeMs) writeCache(cacheKey, data);
            return data;
        } finally {
            clearTimeout(timer);
        }
    }

    // НАСА отдаёт ссылки вида http://… с пробелами; сайт на https, поэтому меняем протокол и кодируем пробелы
    function safeUrl(url) {
        if (!url) return "";
        try {
            const parsed = new URL(String(url), location.href);
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
            parsed.protocol = "https:";
            return parsed.href;
        } catch (e) {
            return "";
        }
    }

    function formatDate(value) {
        const d = new Date(value);
        if (isNaN(d)) return "";
        return d.toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"});
    }

    function shorten(text, max) {
        const clean = String(text || "").replace(/\s+/g, " ").trim();
        return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
    }

    // el("p", "class", "текст") — элемент с классом и текстом
    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    // Карточка открывается и мышью, и с клавиатуры (Enter / пробел)
    function makeClickable(node, onOpen) {
        node.tabIndex = 0;
        node.setAttribute("role", "button");
        node.addEventListener("click", onOpen);
        node.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                onOpen();
            }
        });
    }

    // Пока окно открыто, фоновая музыка сайта на паузе; после закрытия снова играет, если играла
    function pauseMusicWhileOpen(modalEl) {
        let wasPlaying = false;
        modalEl.addEventListener("show.bs.modal", () => {
            const music = document.getElementById("site-audio");
            wasPlaying = !!music && !music.paused;
            if (wasPlaying) music.pause();
            const toggle = document.getElementById("site-audio-toggle");
            if (toggle && wasPlaying) toggle.textContent = "Play";
        });
        modalEl.addEventListener("hidden.bs.modal", () => {
            const music = document.getElementById("site-audio");
            if (wasPlaying && music) {
                music.play().then(() => {
                    const toggle = document.getElementById("site-audio-toggle");
                    if (toggle) toggle.textContent = "Pause";
                }).catch(() => {
                });
            }
            wasPlaying = false;
        });
    }

    return {getJson, readStale, safeUrl, formatDate, shorten, el, makeClickable, pauseMusicWhileOpen};
})();
