// js/martians.js
// Пасхалка с чёрным юмором в стиле фантастики 1950-х: марсиане под стеклянными шлемами выглядывают из углов.
// Сценарий «сначала страшно — потом смешно»:
//   1. Без музыки марсиане не взрываются: появляются один за другим, остаются по краям экрана и мешают —
//      выглядывают и прячутся. Когда их больше трёх, сайт аккуратно подсказывает включить музыку.
//   2. Музыка включилась — вся толпа танцует, а потом у марсиан по очереди лопаются головы: трескается шлем,
//      летят осколки, кровь, куски мозга, слизь и глаз. Иногда всё это шлёпается «изнутри» на стекло экрана.
//      Пока музыка играет, новые марсиане тоже появляются, танцуют и лопаются.
//   3. Развязка: тело без головы ощупывает шею, бодро машет и уползает, глаз моргает и укатывается.
//   Музыку выключили — те, кто ещё не начал взрываться, снова просто мешают.
// Только персонажи: никаких надписей и реплик. Рисунок свой (SVG ниже), звук генерирует браузер (Web Audio).
// Работает на любой странице с музыкой: ищет <audio> с атрибутом data-martian-music, #site-audio или #playlistAudio.
// Не появляется при «уменьшить анимацию» в системе, при открытом окне Bootstrap и на скрытой вкладке.

(function () {
    // BEGIN SECTION 1 — настройки и цвета
    const QUIET_DELAY = [9000, 16000];   // без музыки — новый марсианин каждые 9–16 с
    const MUSIC_DELAY = [8000, 18000];   // пока играет — новый каждые 8–18 с
    const MAX_CROWD = 6;                 // больше шести не собирается, чтобы страница оставалась читаемой
    const HINT_AFTER = 3;                // подсказка — когда марсиан больше трёх
    const DANCE = [3000, 5500];          // сколько первый танцует под музыку, прежде чем лопнуть
    const NEXT_POP = [1200, 2600];       // пауза между взрывами остальных
    const BLOOD = ["#7a0000", "#9e0b0b", "#b31212", "#c81d1d", "#5c0000"];
    const BRAIN = ["#e7a3b1", "#d98597", "#f0bac5", "#c46b80"];
    const GOO = ["#8fd14f", "#6fbf3a", "#b7e36a"];
    // Аккуратная подсказка сайта (не реплика персонажа), когда в тишине собралось больше трёх марсиан.
    // Язык берётся из <html lang> в момент показа, поэтому работает и после переключения языка.
    const HINT = {
        en: "To fight off the alien invasion, turn on the music.",
        ru: "Для борьбы с инопланетным вторжением включите музыку.",
        he: "כדי להדוף את הפלישה החייזרית, הפעילו את המוזיקה."
    };
    // END SECTION 1

    // BEGIN SECTION 2 — рисунок марсианина
    // Тело в металлическом костюме и отдельная группа головы (череп, мозг в венах, стеклянный шлем):
    // именно она раздувается и лопается. Глаза и вены — отдельные классы для анимации.
    const MARTIAN_SVG = `
<svg viewBox="0 0 100 132" aria-hidden="true">
  <defs>
    <radialGradient id="mrt-skin" cx="50%" cy="35%" r="72%">
      <stop offset="0" stop-color="#eef0d8"/><stop offset=".5" stop-color="#c3c99c"/><stop offset="1" stop-color="#5f6a3e"/>
    </radialGradient>
    <radialGradient id="mrt-brain" cx="38%" cy="28%" r="80%">
      <stop offset="0" stop-color="#fde6d6"/><stop offset=".45" stop-color="#eab1ad"/><stop offset="1" stop-color="#93445a"/>
    </radialGradient>
    <linearGradient id="mrt-suit" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a9b3c2"/><stop offset=".45" stop-color="#525d70"/><stop offset="1" stop-color="#1e242e"/>
    </linearGradient>
    <radialGradient id="mrt-eye" cx="42%" cy="38%" r="62%">
      <stop offset="0" stop-color="#fffdf0"/><stop offset=".65" stop-color="#f3e6c6"/><stop offset="1" stop-color="#c9786c"/>
    </radialGradient>
  </defs>
  <g class="martian-body">
    <path d="M45 118 L43 129 M55 118 L57 129" stroke="#7d9a4a" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M39 130 h7 M54 130 h7" stroke="#1e242e" stroke-width="3" stroke-linecap="round"/>
    <path d="M39 97 Q50 93 61 97 L59 118 Q50 121 41 118 Z" fill="url(#mrt-suit)" stroke="#12161d" stroke-width="1"/>
    <path d="M42 103 L58 103 M43 110 L57 110" stroke="#cfd8e4" stroke-width=".6" opacity=".45"/>
    <circle cx="50" cy="114" r="1.8" fill="#ff3b3b" class="martian-light"/>
    <ellipse cx="37" cy="98.5" rx="5" ry="3" fill="#8793a5" stroke="#12161d" stroke-width=".8"/>
    <ellipse cx="63" cy="98.5" rx="5" ry="3" fill="#8793a5" stroke="#12161d" stroke-width=".8"/>
    <path class="martian-arm" d="M34 99 Q24 104 20 94 L17 86 M17 86 L13 82 M17 86 L15 80 M17 86 L19 80" stroke="#86a552" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path class="martian-arm martian-arm--right" d="M66 99 Q76 104 80 94 L83 86 M83 86 L87 82 M83 86 L85 80 M83 86 L81 80" stroke="#86a552" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <g class="martian-gun">
      <path d="M81 82 L94 77 L95 81 L83 85 Z" fill="#c9ced6" stroke="#1e242e" stroke-width=".9"/>
      <circle cx="94.6" cy="79" r="2" fill="#ff3b3b"/><path d="M83 85 L82 90" stroke="#1e242e" stroke-width="2" stroke-linecap="round"/>
      <path class="martian-zap" d="M96 79 L108 73 L104 79 L118 71" stroke="#ff2d55" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
    <ellipse cx="50" cy="95.5" rx="16" ry="3.4" fill="#bcc7d6" stroke="#232a36" stroke-width="1"/>
    <g class="martian-neck-stump"><ellipse cx="50" cy="93.5" rx="5.5" ry="2.4" fill="#6b0000"/><ellipse cx="50" cy="93" rx="3" ry="1.3" fill="#e7a3b1"/></g>
    <g class="martian-head">
      <path d="M46 96 L46.5 89 L53.5 89 L54 96 Z" fill="#7d8660"/>
      <path d="M23 52 Q21 61 25 67 Q21 74 29 80 Q35 90 44 93 L56 93 Q65 90 71 80 Q79 74 75 67 Q79 61 77 52 Z" fill="url(#mrt-skin)" stroke="#3c4424" stroke-width="1.1"/>
      <path d="M25 67 Q29 71 30 78 M75 67 Q71 71 70 78" stroke="#4a5530" stroke-width="1.2" fill="none" opacity=".7"/>
      <ellipse cx="26.5" cy="60" rx="3.2" ry="5.5" fill="#3c4424" opacity=".45"/>
      <ellipse cx="73.5" cy="60" rx="3.2" ry="5.5" fill="#3c4424" opacity=".45"/>
      <path d="M27 54 Q38 50 47 56 M53 56 Q62 50 73 54" stroke="#3c4424" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M27 64 Q27 54 38 54 Q49 54 48.5 64 Q48 75 38 75 Q27 75 27 64 Z" fill="#0b0b06"/>
      <path d="M51.5 64 Q51 54 62 54 Q73 54 73 64 Q73 75 62 75 Q52 75 51.5 64 Z" fill="#0b0b06"/>
      <g class="martian-eye">
        <circle cx="38" cy="64.5" r="9.4" fill="url(#mrt-eye)"/>
        <path d="M29.5 61 L33.5 63 L32 65.5 M30 69.5 L34 67.5 M46.5 59 L42.5 62 L44 63.5 M46.8 68.5 L42.6 66.4 M38 55.6 L38.6 59" stroke="#c0151a" stroke-width=".7" fill="none"/>
        <circle cx="38.6" cy="64.6" r="2.9" fill="#b0080d"/><circle cx="38.6" cy="64.6" r="1" fill="#050505"/>
        <circle cx="36" cy="61.6" r="1.1" fill="#fff"/>
      </g>
      <g class="martian-eye martian-eye--right">
        <circle cx="62" cy="64.5" r="9.4" fill="url(#mrt-eye)"/>
        <path d="M70.5 61 L66.5 63 L68 65.5 M70 69.5 L66 67.5 M53.5 59 L57.5 62 L56 63.5 M53.2 68.5 L57.4 66.4 M62 55.6 L61.4 59" stroke="#c0151a" stroke-width=".7" fill="none"/>
        <circle cx="61.4" cy="64.6" r="2.9" fill="#b0080d"/><circle cx="61.4" cy="64.6" r="1" fill="#050505"/>
        <circle cx="59" cy="61.6" r="1.1" fill="#fff"/>
      </g>
      <path d="M50 73 Q47 74.5 47.5 78 L50 76.6 L52.5 78 Q53 74.5 50 73 Z" fill="#14140a"/>
      <path d="M31 82 Q50 76.5 69 82 Q66 91 50 92 Q34 91 31 82 Z" fill="#2a0505"/>
      <path d="M33 81.4 Q50 78.6 67 81.4" stroke="#7a1d1d" stroke-width="1.4" fill="none"/>
      <path d="M35.0 80.6 L35.0 84.6 M38.3 80.6 L38.3 84.6 M41.6 80.6 L41.6 84.6 M44.9 80.6 L44.9 84.6 M48.2 80.6 L48.2 84.6 M51.5 80.6 L51.5 84.6 M54.8 80.6 L54.8 84.6 M58.1 80.6 L58.1 84.6 M61.4 80.6 L61.4 84.6 M64.7 80.6 L64.7 84.6" stroke="#f3ead0" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M36.6 85.6 L36.6 88.8 M39.9 85.6 L39.9 88.8 M43.2 85.6 L43.2 88.8 M46.5 85.6 L46.5 88.8 M49.8 85.6 L49.8 88.8 M53.1 85.6 L53.1 88.8 M56.4 85.6 L56.4 88.8 M59.7 85.6 L59.7 88.8 M63.0 85.6 L63.0 88.8" stroke="#e4d9b8" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M31 82 Q50 77 69 82" stroke="#3c4424" stroke-width="1" fill="none"/>
      <path d="M13 44 Q9 30 15 22 Q14 12 26 9 Q32 1 42 4 Q50 0 58 4 Q68 1 74 9 Q86 12 85 22 Q91 30 87 44 Q85 54 74 57 Q62 60 50 59 Q38 60 26 57 Q15 54 13 44 Z" fill="url(#mrt-brain)" stroke="#7d2f45" stroke-width="1.2"/>
      <path d="M50 4 Q48 20 51 32 Q48 46 50 59" stroke="#7d2f45" stroke-width="1.8" fill="none"/>
      <path d="M18 24 Q23 18 27 24 Q30 30 35 24 Q38 18 44 21 M56 21 Q62 18 65 24 Q70 30 73 24 Q77 18 82 24 M15 36 Q21 30 25 37 Q29 44 35 37 Q40 30 46 36 M54 36 Q60 30 65 37 Q71 44 75 37 Q79 30 85 36 M19 48 Q25 42 30 49 Q35 55 41 49 M59 49 Q65 55 70 49 Q75 42 81 48 M28 11 Q34 15 38 10 M62 10 Q66 15 72 11 M24 30 Q28 33 31 30 M69 30 Q72 33 76 30 M36 44 Q40 47 44 44 M56 44 Q60 47 64 44 M40 15 Q44 20 46 14 M54 14 Q56 20 60 15"
            stroke="#8e3a55" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M19 23 Q23 19 26 23 M57 20 Q62 18 64 22 M16 35 Q20 31 23 35 M55 35 Q59 31 63 35 M29 10 Q33 13 36 10" stroke="#fff3ec" stroke-width=".7" fill="none" opacity=".8"/>
      <path d="M22 28 Q27 33 30 28 M70 28 Q74 34 78 28 M33 52 Q38 49 42 53 M58 53 Q62 49 67 52" stroke="#5b4fb4" stroke-width=".7" fill="none" opacity=".55"/>
      <path class="martian-veins" d="M20 30 Q26 26 28 31 Q31 36 36 30 M64 28 Q70 24 74 30 M30 46 Q36 50 40 44 M60 44 Q66 50 72 44 M46 12 Q44 22 47 27 M80 40 Q76 46 72 42"
            stroke="#d1001f" stroke-width=".9" fill="none" stroke-linecap="round"/>
      <path class="martian-helmet" d="M6 52 Q0 2 50 0 Q100 2 94 52 Q96 96 50 98 Q4 96 6 52 Z" fill="rgba(190,235,255,.09)" stroke="rgba(210,245,255,.6)" stroke-width="1.4"/>
      <path class="martian-helmet" d="M18 16 Q28 5 45 4" stroke="rgba(255,255,255,.75)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path class="martian-helmet" d="M87 60 Q85 78 74 88" stroke="rgba(255,255,255,.35)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path class="martian-crack" d="M72 10 L64 21 L69 26 L60 36 M64 21 L56 19 M69 26 L77 30" stroke="rgba(255,255,255,.9)" stroke-width=".9" fill="none"/>
    </g>
  </g>
</svg>`;

    // Откуда выглядывает: снизу, слева, справа, сверху (вниз головой)
    const SPOTS = [
        {name: "bottom", hidden: "translateY(115%)", shown: "translateY(12%)", peek: "translateY(55%)"},
        {name: "left", hidden: "rotate(90deg) translateY(115%)", shown: "rotate(90deg) translateY(22%)", peek: "rotate(90deg) translateY(60%)"},
        {name: "right", hidden: "rotate(-90deg) translateY(115%)", shown: "rotate(-90deg) translateY(22%)", peek: "rotate(-90deg) translateY(60%)"},
        {name: "top", hidden: "rotate(180deg) translateY(115%)", shown: "rotate(180deg) translateY(22%)", peek: "rotate(180deg) translateY(60%)"}
    ];
    // END SECTION 2

    // BEGIN SECTION 3 — общие помощники
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stage = null;
    let timer = null;
    const crowd = [];                     // марсиане на экране: {el, spot, state: quiet | doomed | popping}
    let queueRunning = false;

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick = (list) => list[Math.floor(Math.random() * list.length)];
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function music() {
        return document.querySelector("audio[data-martian-music]") ||
            document.getElementById("site-audio") ||
            document.getElementById("playlistAudio");
    }

    function canShow() {
        return !document.hidden && !document.body.classList.contains("modal-open");
    }

    function musicPlaying() {
        const m = music();
        return !!m && !m.paused;
    }

    function placeMartian(el, spot) {
        const w = window.innerWidth, h = window.innerHeight;
        el.style.left = el.style.right = el.style.top = el.style.bottom = "";
        if (spot.name === "bottom") {
            el.style.bottom = "0";
            el.style.left = rand(0.05, 0.8) * w + "px";
        } else if (spot.name === "top") {
            el.style.top = "0";
            el.style.left = rand(0.1, 0.8) * w + "px";
        } else {
            el.style.top = rand(0.25, 0.7) * h + "px";
            el.style[spot.name] = "-10px";
        }
        el.style.transformOrigin = spot.name === "bottom" ? "50% 100%" : "50% 50%";
    }

    let hint = null;

    function updateHint() {
        const quiet = crowd.filter(m => m.state === "quiet").length;
        const needed = !musicPlaying() && quiet > HINT_AFTER;
        if (!needed) {
            if (hint) hint.classList.remove("visible");
            return;
        }
        if (!hint) {
            hint = document.createElement("div");
            hint.className = "martian-hint";
            hint.setAttribute("role", "status");
            document.body.appendChild(hint);
        }
        const lang = (document.documentElement.lang || "en").slice(0, 2);
        hint.textContent = HINT[lang] || HINT.en;
        hint.dir = lang === "he" ? "rtl" : "ltr";
        hint.classList.add("visible");
    }

    // Место у края экрана подальше от уже сидящих марсиан
    function freeSpot(el) {
        let spot = pick(SPOTS);
        for (let attempt = 0; attempt < 10; attempt++) {
            spot = pick(SPOTS);
            placeMartian(el, spot);
            const x = parseFloat(el.style.left) || 0, y = parseFloat(el.style.top) || 0;
            const close = crowd.some(m => m.spot.name === spot.name &&
                Math.hypot((parseFloat(m.el.style.left) || 0) - x, (parseFloat(m.el.style.top) || 0) - y) < 150);
            if (!close) break;
        }
        return spot;
    }
    // END SECTION 3

    // BEGIN SECTION 4 — взрыв: осколки шлема, кровь, мозги, слизь и глаз
    // Каждый кусочек летит по дуге (вверх и вниз под «тяжестью») через Web Animations API,
    // а капли крови остаются пятнами на странице и потом тают.
    function fling(piece, x, y, spread, lift, spin, duration) {
        const angle = rand(-Math.PI, 0) + rand(-0.5, 0.5);
        const dx = Math.cos(angle) * rand(spread * 0.35, spread);
        const up = -rand(lift * 0.4, lift);
        const fall = rand(60, 220);
        piece.style.left = x + "px";
        piece.style.top = y + "px";
        stage.appendChild(piece);
        const turn = rand(-spin, spin);
        return piece.animate([
            {transform: "translate(-50%, -50%) scale(.4) rotate(0deg)", opacity: 1},
            {transform: `translate(calc(-50% + ${dx * 0.6}px), calc(-50% + ${up}px)) scale(1) rotate(${turn * 0.6}deg)`, opacity: 1, offset: 0.45},
            {transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${fall}px)) scale(1) rotate(${turn}deg)`, opacity: 1}
        ], {duration, easing: "cubic-bezier(.2,.6,.4,1)", fill: "forwards"});
    }

    function explode(x, y) {
        const pieces = [];
        const add = (className, style, spread, lift, spin, duration) => {
            const piece = document.createElement("div");
            piece.className = className;
            // setProperty понимает и обычные свойства, и CSS-переменные вроде --brain
            Object.entries(style).forEach(([name, value]) => piece.style.setProperty(name, value));
            fling(piece, x, y, spread, lift, spin, duration);
            pieces.push(piece);
            return piece;
        };
        // Вспышка и облако кровавой пыли в момент взрыва
        const burst = document.createElement("div");
        burst.className = "martian-burst";
        burst.style.left = x + "px";
        burst.style.top = y + "px";
        stage.appendChild(burst);
        pieces.push(burst);
        // Осколки шлема
        for (let i = 0; i < 9; i++) {
            const size = rand(8, 18);
            add("martian-shard", {width: size + "px", height: size * rand(1.2, 2) + "px"}, 220, 160, 720, rand(700, 1000));
        }
        // Кровь: много вытянутых капель
        for (let i = 0; i < 26; i++) {
            const size = rand(4, 13);
            add("martian-blood", {width: size + "px", height: size * rand(1, 1.8) + "px", background: pick(BLOOD)}, 260, 200, 90, rand(650, 1100));
        }
        // Куски мозга с извилинами
        for (let i = 0; i < 7; i++) {
            const size = rand(14, 28);
            add("martian-brain", {width: size + "px", height: size * rand(.7, 1) + "px", "--brain": pick(BRAIN)}, 200, 150, 260, rand(800, 1200));
        }
        // Зелёная слизь
        for (let i = 0; i < 6; i++) {
            const size = rand(7, 15);
            add("martian-goo", {width: size + "px", height: size + "px", background: pick(GOO)}, 180, 120, 60, rand(700, 1000));
        }
        // Глаз: улетает дальше всех, потом моргает и укатывается
        const eye = add("martian-eyeball", {}, 240, 190, 540, 1100);
        return {pieces, eye};
    }

    // Клякса как SVG: неровное пятно с выплесками-лучами, капли вокруг, подтёки вниз и влажный блик.
    // Форма каждый раз новая (случайные радиусы), поэтому две кляксы никогда не совпадают.
    function splatSVG(color, brainy) {
        const R = 46, points = [], count = 18;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            points.push([Math.cos(angle) * R * rand(0.72, 1.08), Math.sin(angle) * R * rand(0.72, 1.08)]);
            if (Math.random() < 0.38) { // выплеск: узкий длинный луч
                const reach = R * rand(1.35, 2.05), side = 0.05;
                points.push([Math.cos(angle + side) * R * 0.95, Math.sin(angle + side) * R * 0.95]);
                points.push([Math.cos(angle + side * 2) * reach, Math.sin(angle + side * 2) * reach]);
                points.push([Math.cos(angle + side * 3) * R * 0.95, Math.sin(angle + side * 3) * R * 0.95]);
            }
        }
        let d = "";
        for (let i = 0; i < points.length; i++) {
            const [x, y] = points[i], [nx, ny] = points[(i + 1) % points.length];
            const mx = (x + nx) / 2, my = (y + ny) / 2;
            d += i === 0 ? `M${mx.toFixed(1)} ${my.toFixed(1)}` : `Q${x.toFixed(1)} ${y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
        }
        d += `Q${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)} ${((points[0][0] + points[1][0]) / 2).toFixed(1)} ${((points[0][1] + points[1][1]) / 2).toFixed(1)}Z`;
        let drops = "";
        for (let i = 0; i < 14; i++) {
            const angle = rand(0, Math.PI * 2), dist = R * rand(1.15, 2.1);
            drops += `<circle cx="${(Math.cos(angle) * dist).toFixed(1)}" cy="${(Math.sin(angle) * dist).toFixed(1)}" r="${rand(1.2, 5).toFixed(1)}"/>`;
        }
        let drips = "";
        for (let i = 0; i < Math.round(rand(2, 4)); i++) {
            const x = rand(-R * 0.6, R * 0.6), width = rand(4, 9), length = rand(40, 130);
            drips += `<g class="martian-drip" style="--drip-time:${rand(1.8, 3.2).toFixed(2)}s;--drip-delay:${rand(0.2, 0.6).toFixed(2)}s">` +
                `<rect x="${(x - width / 2).toFixed(1)}" y="0" width="${width.toFixed(1)}" height="${length.toFixed(1)}" rx="${(width / 2).toFixed(1)}"/>` +
                `<circle cx="${x.toFixed(1)}" cy="${length.toFixed(1)}" r="${(width * 0.75).toFixed(1)}"/></g>`;
        }
        let chunks = "";
        if (brainy) {
            for (let i = 0; i < 3; i++) {
                const x = rand(-22, 22), y = rand(-22, 18), w = rand(9, 16);
                chunks += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * 0.75).toFixed(1)}" fill="${pick(BRAIN)}" stroke="#7d2f45" stroke-width="1"/>` +
                    `<path d="M${(x - w * 0.6).toFixed(1)} ${y.toFixed(1)} q${(w * 0.3).toFixed(1)} -4 ${(w * 0.6).toFixed(1)} 0 t${(w * 0.6).toFixed(1)} 0" stroke="#8e3a55" stroke-width="1.2" fill="none"/>`;
            }
        }
        return `<svg viewBox="-110 -110 220 260" aria-hidden="true"><g fill="${color}">` +
            `<g class="martian-drips">${drips}</g><path d="${d}"/>${drops}</g>` +
            `<path d="${d}" fill="none" stroke="rgba(40,0,0,.45)" stroke-width="3"/>${chunks}` +
            `<ellipse cx="-14" cy="-16" rx="12" ry="6" fill="rgba(255,255,255,.32)" transform="rotate(-30 -14 -16)"/></svg>`;
    }

    // Пятна крови (и иногда мозгов) «на стекле» экрана: шлепок изнутри и подтёки вниз
    function screenSplat() {
        const blobs = [];
        const count = Math.round(rand(3, 6));
        for (let i = 0; i < count; i++) {
            const blob = document.createElement("div");
            blob.className = "martian-glass";
            const size = rand(110, 240);
            blob.style.width = size + "px";
            blob.style.height = size * 260 / 220 + "px";
            blob.style.left = rand(0.06, 0.86) * window.innerWidth - size / 2 + "px";
            blob.style.top = rand(0.05, 0.6) * window.innerHeight - size / 2 + "px";
            blob.style.animationDelay = i * 70 + "ms";
            blob.innerHTML = splatSVG(pick(BLOOD), Math.random() < 0.3); // разметка строится в этом файле из чисел
            stage.appendChild(blob);
            blobs.push(blob);
        }
        setTimeout(() => playSplat(1, false), 60);
        return blobs;
    }
    // END SECTION 4

    // BEGIN SECTION 5 — звук: треск стекла и мокрый «шлёп»
    // Короткий шум с падающим фильтром, глухой удар и (по желанию) высокий звон осколков.
    // Громкость — от громкости музыки сайта.
    let audioCtx = null;

    function playSplat(strength, glass) {
        try {
            const m = music();
            const volume = (m ? m.volume : 0.5) * 0.75 * strength;
            if (volume <= 0) return;
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === "suspended") audioCtx.resume();
            const now = audioCtx.currentTime;
            const noiseBurst = (seconds, from, to, type, gainValue) => {
                const buffer = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * seconds), audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
                const source = audioCtx.createBufferSource();
                source.buffer = buffer;
                const filter = audioCtx.createBiquadFilter();
                filter.type = type;
                filter.frequency.setValueAtTime(from, now);
                filter.frequency.exponentialRampToValueAtTime(to, now + seconds * 0.85);
                const gain = audioCtx.createGain();
                gain.gain.setValueAtTime(gainValue, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + seconds);
                source.connect(filter).connect(gain).connect(audioCtx.destination);
                source.start(now);
            };
            noiseBurst(0.45, 2600, 140, "lowpass", volume);                 // мокрый шлепок
            if (glass) noiseBurst(0.25, 6000, 3500, "highpass", volume * 0.5); // звон осколков
            const thump = audioCtx.createOscillator();
            thump.frequency.setValueAtTime(130, now);
            thump.frequency.exponentialRampToValueAtTime(38, now + 0.22);
            const thumpGain = audioCtx.createGain();
            thumpGain.gain.setValueAtTime(volume, now);
            thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            thump.connect(thumpGain).connect(audioCtx.destination);
            thump.start(now);
            thump.stop(now + 0.27);
        } catch (e) {
            // нет Web Audio — просто без звука
        }
    }
    // END SECTION 5

    // BEGIN SECTION 6 — толпа, танец и взрывы
    // Новый марсианин выглядывает; в тишине остаётся мешать, под музыку встаёт в очередь на взрыв.
    async function spawn() {
        if (!canShow() || crowd.length >= MAX_CROWD) return;
        const el = document.createElement("div");
        el.className = "martian";
        el.innerHTML = MARTIAN_SVG; // постоянная разметка из этого файла, без данных пользователя
        const spot = freeSpot(el);
        el.style.transform = spot.hidden;
        stage.appendChild(el);
        const martian = {el, spot, state: "quiet", fidget: null};
        crowd.push(martian);
        await wait(50);
        el.style.transform = spot.shown;
        if (musicPlaying()) doom(martian);
        else quiet(martian);
    }

    // Тишина: сидит у края, оглядывается, то прячется наполовину, то снова высовывается
    function quiet(martian) {
        martian.state = "quiet";
        martian.el.classList.add("quiet");
        clearInterval(martian.fidget);
        let peeking = false;
        martian.fidget = setInterval(() => {
            if (martian.state !== "quiet") return;
            peeking = !peeking;
            martian.el.style.transform = peeking ? martian.spot.peek : martian.spot.shown;
        }, rand(3000, 7000));
        updateHint();
    }

    function doom(martian) {
        martian.state = "doomed";
        clearInterval(martian.fidget);
        martian.el.classList.remove("quiet");    // теперь он танцует — и ему конец
        martian.el.style.transform = martian.spot.shown;
        updateHint();
        runQueue();
    }

    // Ждём, но прерываемся, если музыку выключили
    async function waitOrSilence(ms) {
        const end = Date.now() + ms;
        while (Date.now() < end && musicPlaying()) await wait(200);
    }

    // Обречённые лопаются по одному: первый — после танца, следующие — с короткими паузами
    async function runQueue() {
        if (queueRunning) return;
        queueRunning = true;
        let first = true;
        while (musicPlaying()) {
            const next = crowd.find(m => m.state === "doomed");
            if (!next) break;
            await waitOrSilence(first ? rand(DANCE[0], DANCE[1]) : rand(NEXT_POP[0], NEXT_POP[1]));
            while (!canShow() && musicPlaying()) await wait(500);
            if (!musicPlaying() || next.state !== "doomed") break;
            first = false;
            await pop(next);                      // ждём только до самого взрыва, развязка идёт параллельно
        }
        queueRunning = false;
    }

    async function pop(martian) {
        martian.state = "popping";
        const el = martian.el;
        el.classList.add("frenzy");               // глаза навыкате, вены пульсируют, шлем трескается
        await wait(1100);
        el.classList.add("swelling");             // голова раздувается
        await wait(1500);
        const head = el.querySelector(".martian-head").getBoundingClientRect();
        el.classList.add("popped");               // ба-бах
        const {pieces, eye} = explode(head.left + head.width / 2, head.top + head.height * 0.45);
        playSplat(0.8, true);
        aftermath(martian, pieces, eye);
    }

    // Развязка: тело ощупывает пустую шею и бодро машет, глаз моргает и укатывается, всё тает
    async function aftermath(martian, pieces, eye) {
        const el = martian.el;
        // Примерно каждый третий раз часть брызг прилетает прямо на экран
        let glass = [];
        if (Math.random() < 0.38) {
            await wait(220);
            glass = screenSplat();
        }
        await wait(1000);
        eye.classList.add("blinking");
        el.classList.add("searching");
        await wait(1800);
        el.classList.remove("searching");
        el.classList.add("waving");
        const rolled = getComputedStyle(eye).transform;
        eye.animate([
            {transform: rolled},
            {transform: `${rolled} translateX(${rand(-260, 260)}px) rotate(${rand(-720, 720)}deg)`}
        ], {duration: 1600, easing: "ease-in", fill: "forwards"});
        await wait(900);
        el.style.transform = martian.spot.hidden; // тело уползает обратно
        pieces.forEach(piece => piece.classList.add("fading"));
        await wait(2300);
        el.remove();
        crowd.splice(crowd.indexOf(martian), 1);
        pieces.forEach(piece => piece.remove());
        glass.forEach(blob => blob.classList.add("fading"));
        await wait(1500);
        glass.forEach(blob => blob.remove());
    }

    function schedule(range) {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await spawn();
            schedule(musicPlaying() ? MUSIC_DELAY : QUIET_DELAY);
        }, rand(range[0], range[1]));
    }

    function init() {
        if (reducedMotion) return;
        const m = music();
        if (!m) return;
        stage = document.createElement("div");
        stage.className = "martian-stage";
        stage.setAttribute("aria-hidden", "true");
        document.body.appendChild(stage);
        // Музыка заиграла — вся толпа танцует и по очереди лопается
        m.addEventListener("play", () => {
            crowd.filter(martian => martian.state === "quiet").forEach(doom);
            updateHint();
            schedule(MUSIC_DELAY);
        });
        // Музыку выключили — кто ещё не начал лопаться, снова просто мешает
        m.addEventListener("pause", () => {
            crowd.filter(martian => martian.state === "doomed").forEach(quiet);
            updateHint();
            schedule(QUIET_DELAY);
        });
        schedule([4000, 8000]);
    }
    // END SECTION 6

    // для проверки из консоли: martians.show() — ещё один марсианин, martians.splat() — клякса на экране
    window.martians = {show: () => spawn(), splat: () => stage && screenSplat(), count: () => crowd.length};

    if (document.readyState === "complete") init();
    else window.addEventListener("load", init);
})();
