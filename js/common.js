// js/common.js
// Подключать после js/data.js и перед bootstrap.bundle.min.js
// <script src="./js/data.js"></script>
// <script src="./js/common.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

(function () {
    // Хэш-функция для page -> стартовый индекс, чтобы страницы начинали с разных треков
    function hashToInt(s) {
        let h = 0;
        for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
        return Math.abs(h);
    }

    function run() {
        // Удаляем старые audio (кроме тех, что помечены data-keep="true")
        document.querySelectorAll("audio").forEach(a => {
            if (a.hasAttribute("data-keep")) return;
            try {
                a.pause();
            } catch (e) {
            }
            if (a.parentNode) a.remove();
        });

        // ----------------------- HEADER (вставляем если нет) -----------------------
        if (!document.getElementById("site-header-container")) {
            const headerHTML = `
        <div id="site-header-container">
          <header>
            <h1 id="site-brand" class="brand">MIFI Project</h1>

            <nav class="site-nav" aria-label="Main Navigation">
              <ul class="nav justify-content-center">
                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="history.html">History</a></li>
                <li class="nav-item"><a class="nav-link" href="myths.html">Myths</a></li>
                <li class="nav-item"><a class="nav-link" href="photos.html">Photo</a></li>
                <li class="nav-item"><a class="nav-link" href="videos.html">Videos</a></li>
                <li class="nav-item"><a class="nav-link" href="rover.html">Rover</a></li>
                <li class="nav-item"><a class="nav-link" href="about.html">About The Project</a></li>
              </ul>
            </nav>

            <p class="tagline">From early flybys to modern rovers</p>

            <div class="site-audio-controls" aria-hidden="false" style="margin-top:0.5rem; display:flex; flex-wrap:wrap; gap:.5rem; align-items:center; justify-content:center;">
              <button id="site-audio-prev" class="btn btn-sm btn-light" type="button">⏮</button>
              <button id="site-audio-toggle" class="btn btn-sm btn-light" type="button">Play</button>
              <button id="site-audio-next" class="btn btn-sm btn-light" type="button">⏭</button>
              <span id="site-audio-title" style="min-width:160px;display:inline-block;color:#fff;text-align:center;font-size:.9rem;"></span>
              <label for="site-audio-vol" style="color:#fff;margin-left:4px;font-size:.85rem;">Vol</label>
              <input id="site-audio-vol" type="range" min="0" max="1" step="0.01" value="0.5" style="width:120px; max-width:30vw;">
              <audio id="site-audio" preload="auto" crossorigin="anonymous"></audio>
            </div>
          </header>
        </div>
      `;
            document.body.insertAdjacentHTML("afterbegin", headerHTML);
        }

        // ----------------------- FOOTER + MODALS -----------------------
        if (!document.getElementById("site-footer-container")) {
            const footerHTML = `
        <div id="site-footer-container">
          <footer>
            <nav class="site-nav" aria-label="Footer Navigation">
              <ul class="nav justify-content-center">
                <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#askQuestionModal">Ask questions</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#leaveCommentModal">leave your comments</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#donateModal">Donate to the Mars Expedition</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#sendMaterialsModal">Send materials</a></li>
                <li class="nav-item"><a class="nav-link" href="https://github.com/DubnovAlexey/Mars-project2" target="_blank" rel="noopener noreferrer">Source code on GitHub</a></li>
              </ul>
            </nav>
            &copy; 2025 The Newest Martian Chronicles
          </footer>

          <!-- modals (тот же HTML, что был) -->
          <div class="modal fade" id="askQuestionModal" tabindex="-1" aria-labelledby="askQuestionLabel" aria-hidden="true">
            <div class="modal-dialog"><div class="modal-content">
              <div class="modal-header"><h5 class="modal-title" id="askQuestionLabel">Ask a Question</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
              <div class="modal-body"><form id="askQuestionForm" class="site-form" data-subject="Mars site: a question"><div class="mb-3"><label for="question-name" class="form-label">Your name</label><input type="text" class="form-control" id="question-name" name="name" required></div><div class="mb-3"><label for="question-email" class="form-label">Your email (for the answer)</label><input type="email" class="form-control" id="question-email" name="email" required></div><div class="mb-3"><label for="user-question" class="form-label">Your question</label><textarea class="form-control" id="user-question" name="question" rows="5" required></textarea></div><p class="form-status small mb-0" aria-live="polite"></p></form></div>
              <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="submit" form="askQuestionForm" class="btn btn-primary">Send</button></div>
            </div></div>
          </div>

          <div class="modal fade" id="leaveCommentModal" tabindex="-1" aria-labelledby="leaveCommentLabel" aria-hidden="true">
            <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="leaveCommentLabel">Leave Your Comments</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form id="leaveCommentForm" class="site-form" data-subject="Mars site: a comment"><div class="mb-3"><label for="comment-name" class="form-label">Your name</label><input type="text" class="form-control" id="comment-name" name="name" required></div><div class="mb-3"><label for="comment-email" class="form-label">Your email (for the answer)</label><input type="email" class="form-control" id="comment-email" name="email" required></div><div class="mb-3"><label for="user-comment" class="form-label">Your comments</label><textarea class="form-control" id="user-comment" name="comment" rows="5" required></textarea></div><div class="mb-3"><label for="comment-photo" class="form-label">Add a photo (optional)</label><input type="file" class="form-control" id="comment-photo" name="attachment" accept="image/*"><div class="form-previews"></div></div><p class="form-status small mb-0" aria-live="polite"></p></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="submit" form="leaveCommentForm" class="btn btn-primary">Send</button></div></div></div></div>

          <div class="modal fade" id="donateModal" tabindex="-1" aria-labelledby="donateLabel" aria-hidden="true">
            <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="donateLabel">Donate to the Mars Expedition</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form id="donateForm" class="site-form" data-demo="true"><p class="alert alert-warning small">Demo form for a study project: card details are checked in the browser and are <b>never sent anywhere</b>. No payment is made.</p><div class="mb-3"><label for="card-number" class="form-label">Card Number</label><input type="text" class="form-control" id="card-number" placeholder="0000 0000 0000 0000" inputmode="numeric" autocomplete="off" required></div><div class="row"><div class="col-md-6 mb-3"><label for="expiry-date" class="form-label">Expiry Date</label><input type="text" class="form-control" id="expiry-date" placeholder="MM/YY" autocomplete="off" required></div><div class="col-md-6 mb-3"><label for="cvv-code" class="form-label">CVV Code</label><input type="text" class="form-control" id="cvv-code" placeholder="123" inputmode="numeric" autocomplete="off" required></div></div><div class="mb-3"><label for="cardholder-name" class="form-label">Cardholder Name</label><input type="text" class="form-control" id="cardholder-name" autocomplete="off" required></div><div class="mb-3"><label for="donation-amount" class="form-label">Donation Amount</label><input type="number" class="form-control" id="donation-amount" placeholder="e.g., 10" min="1" required></div><p class="form-status small mb-0" aria-live="polite"></p></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="submit" form="donateForm" class="btn btn-primary">Send</button></div></div></div></div>

          <div class="modal fade" id="sendMaterialsModal" tabindex="-1" aria-labelledby="sendMaterialsLabel" aria-hidden="true">
            <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="sendMaterialsLabel">Send Materials</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form id="sendMaterialsForm" class="site-form" data-subject="Mars site: materials"><div class="mb-3"><label for="materials-name" class="form-label">Your name</label><input type="text" class="form-control" id="materials-name" name="name" required></div><div class="mb-3"><label for="materials-email" class="form-label">Your email (for the answer)</label><input type="email" class="form-control" id="materials-email" name="email" required></div><div class="mb-3"><label for="materials-info" class="form-label">Materials description</label><textarea class="form-control" id="materials-info" name="description" rows="5" required></textarea></div><div class="mb-3"><label for="materials-files" class="form-label">Files: photos, documents, video (optional, up to 5 files, 10 MB in total)</label><input type="file" class="form-control" id="materials-files" name="attachment" multiple accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip"><div class="form-previews"></div></div><p class="form-status small mb-0" aria-live="polite"></p></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="submit" form="sendMaterialsForm" class="btn btn-primary">Send</button></div></div></div></div>

        </div>
      `;
            document.body.insertAdjacentHTML("beforeend", footerHTML);
        }

        // ----------------------- active nav + brand -----------------------
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll("#site-header-container .site-nav a.nav-link");
        let matchedLabel = null;
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && href.split("/").pop() === currentFile) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
                matchedLabel = link.textContent.trim();
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });

        const brandEl = document.getElementById("site-brand");
        if (matchedLabel) brandEl.textContent = matchedLabel;
        else if (window.pageData && window.pageData[currentFile] && window.pageData[currentFile].title) brandEl.textContent = window.pageData[currentFile].title;
        else brandEl.textContent = "MIFI Project";

        // Вкладка браузера: страница и имя сайта («Home — The Newest Martian Chronicles»), чтобы сайт узнавался среди вкладок
        if (window.pageData && window.pageData[currentFile] && window.pageData[currentFile].title) {
            document.title = window.pageData[currentFile].title + " — The Newest Martian Chronicles";
        }
        // ---------------------- Playlist selection logic ----------------------
// choose playlist for page: page playlist -> globalPlaylist -> fallback default
        const defaultPlaylist = [
            {
                "src": "music/33.mp3",
                "title": "Mars Breeze (33)"
            },
            {
                "src": "music/11.mp3",
                "title": "Red Plains (11)"
            },
            {
                "src": "music/777.mp3",
                "title": "Orbit Echo (777)"
            },
            {
                "src": "music/888.mp3",
                "title": "Dust Trail (888)"
            },
            {
                "src": "music/999.mp3",
                "title": "Night Crater (999)"
            },
            {
                "src": "music/12.mp3",
                "title": "Rover Signal (12)"
            },
            {
                "src": "music/1-Мачете-Крайний-Край-MYH132.mp3",
                "title": "1-Мачете-Крайний-Край-MYH132"
            },
            {
                "src": "music/Anja Schneider - I Care For You.mp3",
                "title": "Anja Schneider - I Care For You"
            },
            {
                "src": "music/Home - Eva Poklonskaya.mp3",
                "title": "Home - Eva Poklonskaya"
            },
            {
                "src": "music/I Feel Like I m Drowning   Two Feet.mp3",
                "title": "I Feel Like I m Drowning   Two Feet"
            }
        ];


        function getPlaylistFor(file) {
            if (window.pageData && window.pageData[file] && Array.isArray(window.pageData[file].playlist)) {
                return window.pageData[file].playlist.slice();
            }
            if (window.pageData && Array.isArray(window.pageData.globalPlaylist)) {
                return window.pageData.globalPlaylist.slice();
            }
            return defaultPlaylist.slice();
        }

        const playlist = getPlaylistFor(currentFile);

        // ---------------------- Свой саундтрек у каждой страницы ----------------------
        // Страницы — как отдельные станции: у каждой своя музыка. При переходе текущий трек плавно затихает,
        // новая страница плавно включает свой трек (и коротко показывает, что играет). Каждая страница помнит,
        // где остановилась её музыка, и при возвращении продолжает с этого места. Остальные треки плейлиста
        // играют дальше по кругу — кнопками ⏮ ⏭ и после окончания трека.
        const PAGE_SOUNDTRACK = {
            "index.html": "music/33.mp3",
            "history.html": "music/11.mp3",
            "myths.html": "music/999.mp3",
            "photos.html": "music/888.mp3",
            "videos.html": "music/777.mp3",
            "rover.html": "music/12.mp3",
            "about.html": "music/Home - Eva Poklonskaya.mp3"
        };
        const PAGE_KEY = "siteAudioPage:" + currentFile;
        const FADE_OUT_MS = 320;   // уход со страницы
        const FADE_IN_MS = 1200;   // приход на страницу
        const pageTrackIndex = () => {
            const i = playlist.findIndex(p => p.src === PAGE_SOUNDTRACK[currentFile]);
            return i >= 0 ? i : hashToInt(currentFile) % Math.max(1, playlist.length);
        };
        let savedPage = null;
        try {
            savedPage = JSON.parse(localStorage.getItem(PAGE_KEY));
            // прежняя общая память «один трек на весь сайт» больше не нужна
            ["siteAudioPlaylistId", "siteAudioIndex", "siteAudioTime"].forEach(key => localStorage.removeItem(key));
        } catch (e) {
            savedPage = null;
        }
        const savedPageValid = savedPage && Number.isInteger(savedPage.index) &&
            savedPage.index >= 0 && savedPage.index < playlist.length;
        let currentIndex = savedPageValid ? savedPage.index : pageTrackIndex();
        const savedTime = savedPageValid && Number.isFinite(savedPage.time) ? Math.max(0, savedPage.time) : 0;

// ---------------------- Audio controls wiring ----------------------
        const audioEl = document.getElementById("site-audio");
        const prevBtn = document.getElementById("site-audio-prev");
        const toggleBtn = document.getElementById("site-audio-toggle");
        const nextBtn = document.getElementById("site-audio-next");
        const volRange = document.getElementById("site-audio-vol");
        const titleEl = document.getElementById("site-audio-title");
        let trackVersion = 0;
        let playbackRequested = false;
        let userAudioAction = false;
        let failedTrackCount = 0;
        let errorAdvanceTimer = null;
        let resumeAfterPageShow = false;

        // НАЧАЛО ФУНКЦИИ savePlaybackState
        function savePlaybackState() {
            saveState();
            try {
                localStorage.setItem("siteAudioPlaying", String(!audioEl.paused));
            } catch (e) {}
        }
        // КОНЕЦ ФУНКЦИИ savePlaybackState

        // НАЧАЛО ФУНКЦИИ fadeTo
        // Плавное изменение громкости; ползунок громкости прерывает его в любой момент.
        let fadeTimer = null;
        function sliderVolume() {
            const value = parseFloat(volRange.value);
            return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.5;
        }
        function fadeTo(target, ms, done) {
            clearInterval(fadeTimer);
            fadeTimer = null;
            const from = audioEl.volume;
            const start = performance.now();
            if (!(ms > 0) || from === target) { audioEl.volume = target; if (done) done(); return; }
            fadeTimer = setInterval(() => {
                const k = Math.min(1, (performance.now() - start) / ms);
                audioEl.volume = from + (target - from) * k * k * (3 - 2 * k);
                if (k >= 1) { clearInterval(fadeTimer); fadeTimer = null; if (done) done(); }
            }, 30);
        }
        // КОНЕЦ ФУНКЦИИ fadeTo

        // НАЧАЛО ФУНКЦИИ playCurrentTrack
        // fadeIn — приход на страницу: трек начинается тихо и плавно набирает громкость ползунка.
        function playCurrentTrack(fadeIn = false) {
            const version = trackVersion;
            playbackRequested = true;
            clearInterval(fadeTimer);
            fadeTimer = null;
            audioEl.volume = fadeIn ? 0 : sliderVolume();
            let attempt;
            try { attempt = audioEl.play(); }
            catch (error) { audioEl.volume = sliderVolume(); return Promise.reject(error); }
            return Promise.resolve(attempt).then(() => {
                if (version !== trackVersion) return;
                if (!playbackRequested) { audioEl.pause(); return; }
                if (fadeIn) fadeTo(sliderVolume(), FADE_IN_MS);
                savePlaybackState();
                updateToggleText();
            }, error => {
                audioEl.volume = sliderVolume();
                throw error;
            });
        }
        // КОНЕЦ ФУНКЦИИ playCurrentTrack


        function saveState() {
            try {
                const time = audioEl && Number.isFinite(audioEl.currentTime) ? audioEl.currentTime : 0;
                localStorage.setItem(PAGE_KEY, JSON.stringify({index: currentIndex, time}));
            } catch (e) {
            }
        }

        function setTrack(index) {
            trackVersion++;
            clearTimeout(errorAdvanceTimer);
            errorAdvanceTimer = null;
            if (!playlist || playlist.length === 0) {
                audioEl.removeAttribute("src");
                titleEl.textContent = "";
                return;
            }
            currentIndex = ((index % playlist.length) + playlist.length) % playlist.length;
            const item = playlist[currentIndex];
            titleEl.textContent = item.title || item.src.split("/").pop();
            if (audioEl.src !== new URL(item.src, location.href).href) {
                // set relative src (works on server). Setting attribute avoids reload if same.
                audioEl.src = item.src;
            } else {
                // same src; reload to ensure ended works
                audioEl.load();
            }
            saveState();
        }

        function nextTrack() {
            setTrack(currentIndex + 1);
            // try to autoplay next. Promise rejection is handled correctly.
            playCurrentTrack().catch(updateToggleText);
        }

        function prevTrack() {
            setTrack(currentIndex - 1);
            // try to autoplay next. Promise rejection is handled correctly.
            playCurrentTrack().catch(updateToggleText);
        }

// init volume from storage if present
        try {
            const savedVol = localStorage.getItem("siteAudioVol");
            if (savedVol !== null) {
                audioEl.volume = parseFloat(savedVol);
                volRange.value = savedVol;
            } else {
                audioEl.volume = 0.5;
                volRange.value = 0.5;
            }
        } catch (e) {
            audioEl.volume = 0.5;
            volRange.value = 0.5;
        }

// set initial track
        setTrack(currentIndex);

// update toggle text
        function updateToggleText() {
            toggleBtn.textContent = audioEl.paused ? "Play" : "Pause";
        }

        updateToggleText();

// Restore this page's position and the site-wide "music on" intent; source generation prevents an old
// metadata callback from seeking/starting a different track selected while the previous file was loading.
        try {
            const wasPlaying = localStorage.getItem("siteAudioPlaying") === "true";
            const version = trackVersion;
            const startPlayback = () => playCurrentTrack(true).then(announcePageTrack).catch(() => {
                const resume = ev => {
                    removeResume();
                    if (ev.target.closest && ev.target.closest(".site-audio-controls")) return;
                    if (!audioEl.paused || !playbackRequested) return;
                    playCurrentTrack(true).then(announcePageTrack).catch(updateToggleText);
                };
                const removeResume = () => ["pointerdown", "keydown"].forEach(type => document.removeEventListener(type, resume, true));
                ["pointerdown", "keydown"].forEach(type => document.addEventListener(type, resume, true));
                updateToggleText();
            });
            const restore = () => {
                if (version !== trackVersion) return;
                if (savedTime > 0 && savedTime < audioEl.duration) audioEl.currentTime = savedTime;
                if (wasPlaying && !userAudioAction) startPlayback();
            };
            if (savedTime > 0 && audioEl.readyState < 1) audioEl.addEventListener("loadedmetadata", restore, {once:true});
            else restore();
        } catch (e) {}

// audio events: the full list loops; failure traversal is bounded to one playlist pass.
        audioEl.addEventListener("playing", () => { failedTrackCount = 0; updateToggleText(); });
        audioEl.addEventListener("pause", updateToggleText);
        audioEl.addEventListener("ended", () => { if (playbackRequested && audioEl.ended !== false) nextTrack(); });
        audioEl.addEventListener("error", () => {
            clearTimeout(errorAdvanceTimer);
            if (!playbackRequested) return;
            const version = trackVersion;
            failedTrackCount++;
            if (failedTrackCount >= playlist.length) {
                playbackRequested = false;
                audioEl.pause();
                updateToggleText();
                return;
            }
            errorAdvanceTimer = setTimeout(() => {
                errorAdvanceTimer = null;
                if (playbackRequested && version === trackVersion) nextTrack();
            }, 500);
        });

// controls
        toggleBtn.addEventListener("click", () => {
            userAudioAction = true;
            if (audioEl.paused) {
                failedTrackCount = 0;
                playCurrentTrack().catch(err => {
                    // Эта ошибка не должна возникать, так как клик — это действие пользователя,
                    // но мы ловим ее, чтобы избежать Uncaught Promise.
                    console.warn("Play failed:", err);
                });
            } else {
                playbackRequested = false;
                clearTimeout(errorAdvanceTimer);
                errorAdvanceTimer = null;
                audioEl.pause();
                savePlaybackState();
                try {
                    localStorage.setItem("siteAudioPlaying", "false");
                } catch (e) {
                }
                updateToggleText();
            }
        });

        nextBtn.addEventListener("click", () => {
            userAudioAction = true;
            failedTrackCount = 0;
            nextTrack();
        });
        prevBtn.addEventListener("click", () => {
            userAudioAction = true;
            failedTrackCount = 0;
            prevTrack();
        });

        volRange.addEventListener("input", () => {
            clearInterval(fadeTimer);
            fadeTimer = null;
            audioEl.volume = parseFloat(volRange.value);
            try {
                localStorage.setItem("siteAudioVol", volRange.value);
            } catch (e) {
            }
        });


        // ---------------------- переход по меню: музыка этой страницы плавно затихает ----------------------
        navLinks.forEach(a => {
            a.addEventListener("click", (ev) => {
                const href = a.getAttribute("href");
                if (!href || href.startsWith("http") || href.startsWith("#")) return;
                if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
                savePlaybackState();
                if (audioEl.paused || href.split("/").pop() === currentFile) return; // тишина — обычный переход
                ev.preventDefault();
                fadeTo(0, FADE_OUT_MS, () => { window.location.href = href; });
            });
        });

        // ---------------------- подпись «что играет на этой странице» ----------------------
        // На несколько секунд под плеером: «♪ History · Red Plains». Скрыта от экранного диктора как декор —
        // само название трека всегда есть в плеере.
        let announceTimer = null;
        function announcePageTrack() {
            const item = playlist[currentIndex];
            if (!item) return;
            const controls = document.querySelector(".site-audio-controls");
            if (!controls) return;
            let toast = document.getElementById("site-audio-toast");
            if (!toast) {
                toast = document.createElement("div");
                toast.id = "site-audio-toast";
                toast.className = "site-audio-toast";
                toast.setAttribute("aria-hidden", "true");
                controls.appendChild(toast);
            }
            toast.textContent = "\u266A " + (matchedLabel || document.title) + " \u00B7 " + (item.title || "");
            toast.classList.add("visible");
            clearTimeout(announceTimer);
            announceTimer = setTimeout(() => toast.classList.remove("visible"), 4200);
        }

        // НАЧАЛО РАЗДЕЛА сохранения при навигации и BFCache
        window.addEventListener("pagehide", () => {
            resumeAfterPageShow = !audioEl.paused;
            savePlaybackState();
            trackVersion++;
            playbackRequested = false;
            clearTimeout(errorAdvanceTimer);
            errorAdvanceTimer = null;
            audioEl.pause();
        });
        window.addEventListener("pageshow", event => {
            if (!event.persisted) return;
            if (resumeAfterPageShow) playCurrentTrack(true).then(announcePageTrack).catch(updateToggleText);
            else audioEl.volume = sliderVolume();
        });
        // КОНЕЦ РАЗДЕЛА сохранения при навигации и BFCache

        // done
    } // end run

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
    else run();
})();

