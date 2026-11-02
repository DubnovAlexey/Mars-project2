// js/martians.js
// Пасхалка с чёрным юмором в духе «Марс атакует!»: мультяшные марсиане выглядывают из разных углов.
// Без музыки они осторожно высовываются и прячутся. Стоит включить музыку — пританцовывают, и у них
// лопается голова: розовые брызги мозга и зелёная слизь шлёпаются на страницу и тают.
// Свой рисунок (SVG ниже). Не появляются при «уменьшить анимацию» в системе, при открытом окне и на скрытой вкладке.

(function () {
    const QUIET_DELAY = [12000, 25000];  // без музыки — тихо выглядывают каждые 12–25 с
    const MUSIC_FIRST = [2000, 5000];    // музыка включилась — первый «взрыв» через 2–5 с
    const MUSIC_DELAY = [8000, 18000];   // пока играет — каждые 8–18 с
    // Брызги: розовые кусочки мозга, зелёная марсианская слизь и немного неона
    const COLORS = ["#f4a3b8", "#e8829c", "#d65c7f", "#f4a3b8", "#9fd36b", "#7ed957", "#3bff9c", "#ffd23f", "#b23bff"];
    const LINES = [
        "Too… much… groove!",
        "This beat is out of this world!",
        "Turn it down, Earthling!",
        "My brain can't take the bass!",
        "One more track and I…",
        "Is this Earth music?!",
        "Not the yodelling, please!",
        "Who put on Slim Whitman?!"
    ];
    const QUIET_LINES = [
        "Psst… the Earthlings are quiet.",
        "No music? Good. Very good.",
        "We come in peace. Mostly.",
        "Just looking…",
        "Nobody press Play, OK?"
    ];

    // Марсианин: тело с ножками и голова (отдельная группа — она раздувается и лопается)
    const MARTIAN_SVG = `
<svg viewBox="0 0 90 110" aria-hidden="true">
  <g class="martian-body">
    <path d="M30 108 L34 88 M60 108 L56 88" stroke="#3f8f2a" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="45" cy="80" rx="20" ry="16" fill="#5fbf3a"/>
    <path d="M26 76 Q14 70 12 60 M64 76 Q76 70 78 60" stroke="#5fbf3a" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g class="martian-head">
      <path d="M24 44 Q20 62 34 66 L56 66 Q70 62 66 44 Z" fill="#9fd36b" stroke="#4f7d2c" stroke-width="2"/>
      <path d="M12 34 Q8 8 30 6 Q38 -2 48 4 Q60 -2 68 8 Q84 12 78 34 Q74 46 45 46 Q16 46 12 34 Z" fill="#f4a3b8" stroke="#b5536f" stroke-width="2"/>
      <path d="M22 16 Q28 10 32 18 Q36 26 42 18 M48 10 Q54 20 60 12 Q66 8 70 18 M18 30 Q26 24 30 32 Q36 38 44 30 Q50 24 56 32 Q62 38 72 28 M45 6 L45 44"
            stroke="#b5536f" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="35" cy="50" r="8" fill="#fff" stroke="#c0392b" stroke-width="1.5"/>
      <circle cx="55" cy="50" r="8" fill="#fff" stroke="#c0392b" stroke-width="1.5"/>
      <path d="M28 47 L32 49 M62 47 L58 49 M30 55 L33 53 M60 55 L57 53" stroke="#e74c3c" stroke-width="1"/>
      <circle cx="36" cy="50" r="3.5" fill="#c0392b"/><circle cx="54" cy="50" r="3.5" fill="#c0392b"/>
      <circle cx="36" cy="50" r="1.5" fill="#1b1b1b"/><circle cx="54" cy="50" r="1.5" fill="#1b1b1b"/>
      <path d="M31 60 Q45 68 59 60 L57 64 Q45 70 33 64 Z" fill="#3a1010"/>
      <path d="M33 61 L35 65 M37 62 L38.5 66.5 M41 63 L42 67.5 M45 63.5 L45 68 M49 63 L48 67.5 M53 62 L51.5 66.5 M57 61 L55 65"
            stroke="#fff8e0" stroke-width="2" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;

    // Откуда выглядывает: снизу, слева, справа, сверху (вниз головой)
    const SPOTS = [
        {name: "bottom", hidden: "translateY(115%)", shown: "translateY(18%)"},
        {name: "left", hidden: "rotate(90deg) translateY(115%)", shown: "rotate(90deg) translateY(25%)"},
        {name: "right", hidden: "rotate(-90deg) translateY(115%)", shown: "rotate(-90deg) translateY(25%)"},
        {name: "top", hidden: "rotate(180deg) translateY(115%)", shown: "rotate(180deg) translateY(25%)"}
    ];

    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stage = null;
    let timer = null;
    let busy = false;

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick = (list) => list[Math.floor(Math.random() * list.length)];
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function music() {
        return document.getElementById("site-audio");
    }

    function canShow() {
        return !document.hidden && !document.body.classList.contains("modal-open");
    }

    function musicPlaying() {
        const m = music();
        return !!m && !m.paused;
    }

    // Ждём, но если за это время включили музыку — сразу сообщаем об этом
    async function waitOrMusic(ms) {
        const end = Date.now() + ms;
        while (Date.now() < end) {
            if (musicPlaying()) return true;
            await wait(250);
        }
        return musicPlaying();
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

    function splash(x, y) {
        const drops = [];
        const count = Math.round(rand(12, 18));
        for (let i = 0; i < count; i++) {
            const drop = document.createElement("div");
            drop.className = "martian-drop";
            const size = rand(8, 22);
            drop.style.width = drop.style.height = size + "px";
            drop.style.left = x - size / 2 + "px";
            drop.style.top = y - size / 2 + "px";
            drop.style.background = pick(COLORS);
            stage.appendChild(drop);
            drops.push(drop);
            const angle = rand(0, Math.PI * 2);
            const dist = rand(50, 190);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                drop.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(${rand(1, 1.8)})`;
                drop.classList.add("landed");
            }));
        }
        return drops;
    }

    // Звук «шлёп»: короткий шум с падающим фильтром и глухой удар. Генерируется браузером (Web Audio),
    // своего файла нет — значит, нет и вопросов с лицензией. Громкость — от ползунка Vol плеера.
    let audioCtx = null;

    function playSplat(strength) {
        try {
            const m = music();
            const volume = (m ? m.volume : 0.5) * 0.7 * strength;
            if (volume <= 0) return;
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === "suspended") audioCtx.resume();
            const now = audioCtx.currentTime;

            const noise = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * 0.35), audioCtx.sampleRate);
            const data = noise.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
            const src = audioCtx.createBufferSource();
            src.buffer = noise;
            const filter = audioCtx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(2400, now);
            filter.frequency.exponentialRampToValueAtTime(180, now + 0.3);
            const noiseGain = audioCtx.createGain();
            noiseGain.gain.setValueAtTime(volume, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            src.connect(filter).connect(noiseGain).connect(audioCtx.destination);

            const thump = audioCtx.createOscillator();
            thump.frequency.setValueAtTime(140, now);
            thump.frequency.exponentialRampToValueAtTime(45, now + 0.18);
            const thumpGain = audioCtx.createGain();
            thumpGain.gain.setValueAtTime(volume * 0.9, now);
            thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            thump.connect(thumpGain).connect(audioCtx.destination);

            src.start(now);
            thump.start(now);
            thump.stop(now + 0.22);
        } catch (e) {
            // нет Web Audio — просто без звука
        }
    }

    // Иногда брызги летят прямо в экран: крупные кляксы шлёпаются «изнутри» на стекло и стекают
    function screenSplat() {
        const blobs = [];
        const count = Math.round(rand(3, 6));
        for (let i = 0; i < count; i++) {
            const blob = document.createElement("div");
            blob.className = "martian-glass";
            const size = rand(70, 170);
            blob.style.width = blob.style.height = size + "px";
            blob.style.left = rand(0.08, 0.85) * window.innerWidth - size / 2 + "px";
            blob.style.top = rand(0.1, 0.7) * window.innerHeight - size / 2 + "px";
            blob.style.setProperty("--splat-color", pick(COLORS));
            blob.style.setProperty("--drip", rand(40, 140) + "px");
            blob.style.animationDelay = i * 70 + "ms";
            stage.appendChild(blob);
            blobs.push(blob);
        }
        setTimeout(() => playSplat(1), 60);
        return blobs;
    }

    async function performMartian() {
        if (busy || !canShow()) return;
        busy = true;
        const spot = pick(SPOTS);
        const el = document.createElement("div");
        el.className = "martian";
        el.innerHTML = MARTIAN_SVG; // постоянная разметка из этого файла, без данных пользователя
        placeMartian(el, spot);
        el.style.transform = spot.hidden;
        stage.appendChild(el);

        await wait(50);
        el.style.transform = spot.shown;          // выглядывает

        if (!musicPlaying()) {
            // Тишина: марсианин осторожно осматривается и прячется — если только музыку не включат прямо сейчас
            el.classList.add("quiet");
            const quietBubble = document.createElement("div");
            quietBubble.className = "martian-bubble";
            quietBubble.textContent = pick(QUIET_LINES);
            if (spot.name === "top") quietBubble.style.transform = "translateX(-50%) rotate(180deg)";
            let startedMusic = await waitOrMusic(1500);
            if (!startedMusic) {
                el.appendChild(quietBubble);
                startedMusic = await waitOrMusic(rand(2000, 3500));
            }
            quietBubble.remove();
            if (!startedMusic) {
                el.style.transform = spot.hidden;
                await wait(700);
                el.remove();
                busy = false;
                return;
            }
            el.classList.remove("quiet");         // музыка! теперь ему конец
        }
        await wait(rand(2000, 3500));             // пританцовывает

        const bubble = document.createElement("div");
        bubble.className = "martian-bubble";
        bubble.textContent = pick(LINES);
        if (spot.name === "top") bubble.style.transform = "translateX(-50%) rotate(180deg)";
        el.appendChild(bubble);
        await wait(1200);

        el.classList.add("swelling");             // голова раздувается
        await wait(1600);

        const head = el.querySelector(".martian-head").getBoundingClientRect();
        bubble.remove();
        el.classList.add("popped");               // ба-бах
        const drops = splash(head.left + head.width / 2, head.top + head.height / 2);
        playSplat(0.6);
        // Примерно каждый третий раз часть брызг прилетает прямо на экран
        const glass = Math.random() < 0.35 ? (await wait(250), screenSplat()) : [];

        await wait(1200);
        el.style.transform = spot.hidden;         // тело уползает обратно
        drops.forEach(d => d.classList.add("fading"));
        await wait(2300);
        el.remove();
        drops.forEach(d => d.remove());
        glass.forEach(b => b.classList.add("fading"));
        await wait(1500);
        glass.forEach(b => b.remove());
        busy = false;
    }

    function schedule(range) {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            if (canShow()) await performMartian();
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
        // Музыка заиграла — марсиане скоро начнут лопаться; на паузе — снова только выглядывают
        m.addEventListener("play", () => {
            if (!busy) schedule(MUSIC_FIRST);
        });
        m.addEventListener("pause", () => {
            if (!busy) schedule(QUIET_DELAY);
        });
        schedule(m.paused ? [4000, 8000] : MUSIC_FIRST);
    }

    // для проверки из консоли: martians.show()
    window.martians = {show: () => performMartian(), splat: () => screenSplat()};

    window.addEventListener("load", init);
})();
