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
              <ul class="nav justify-content-center flex-nowrap">
                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="history.html">History</a></li>
                <li class="nav-item"><a class="nav-link" href="myths.html">Myths</a></li>
                <li class="nav-item"><a class="nav-link" href="photos.html">Photo</a></li>
                <li class="nav-item"><a class="nav-link" href="about.html">About The Project</a></li>
              </ul>
            </nav>

            <p class="tagline">From early flybys to modern rovers</p>

            <div class="site-audio-controls" aria-hidden="false" style="margin-top:0.5rem; display:flex; gap:.5rem; align-items:center; justify-content:center;">
              <button id="site-audio-prev" class="btn btn-sm btn-light" type="button">⏮</button>
              <button id="site-audio-toggle" class="btn btn-sm btn-light" type="button">Play</button>
              <button id="site-audio-next" class="btn btn-sm btn-light" type="button">⏭</button>
              <span id="site-audio-title" style="min-width:160px;display:inline-block;color:#fff;text-align:center;font-size:.9rem;"></span>
              <label for="site-audio-vol" style="color:#fff;margin-left:4px;font-size:.85rem;">Vol</label>
              <input id="site-audio-vol" type="range" min="0" max="1" step="0.01" value="0.5" style="width:120px;">
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
              <ul class="nav justify-content-center flex-nowrap">
                <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#askQuestionModal">Ask questions</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#leaveCommentModal">leave your comments</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#donateModal">Donate to the Mars Expedition</a></li>
                <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#sendMaterialsModal">Send materials</a></li>
              </ul>
            </nav>
            &copy; 2025 The Newest Martian Chronicles
          </footer>

          <!-- modals (тот же HTML, что был) -->
          <div class="modal fade" id="askQuestionModal" tabindex="-1" aria-labelledby="askQuestionLabel" aria-hidden="true">
            <div class="modal-dialog"><div class="modal-content">
              <div class="modal-header"><h5 class="modal-title" id="askQuestionLabel">Ask a Question</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
              <div class="modal-body"><form><div class="mb-3"><label for="question-name" class="form-label">Your name</label><input type="text" class="form-control" id="question-name"></div><div class="mb-3"><label for="user-question" class="form-label">Your question</label><textarea class="form-control" id="user-question" rows="5"></textarea></div></form></div>
              <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Send</button></div>
            </div></div>
          </div>

          <div class="modal fade" id="leaveCommentModal" tabindex="-1" aria-labelledby="leaveCommentLabel" aria-hidden="true">
            <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="leaveCommentLabel">Leave Your Comments</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form><div class="mb-3"><label for="comment-name" class="form-label">Your name</label><input type="text" class="form-control" id="comment-name"></div><div class="mb-3"><label for="user-comment" class="form-label">Your comments</label><textarea class="form-control" id="user-comment" rows="5"></textarea></div></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Send</button></div></div></div></div>

          <div class="modal fade" id="donateModal" tabindex="-1" aria-labelledby="donateLabel" aria-hidden="true">
            <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="donateLabel">Donate to the Mars Expedition</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form><div class="mb-3"><label for="card-number" class="form-label">Card Number</label><input type="text" class="form-control" id="card-number" placeholder="0000 0000 0000 0000"></div><div class="row"><div class="col-md-6 mb-3"><label for="expiry-date" class="form-label">Expiry Date</label><input type="text" class="form-control" id="expiry-date" placeholder="MM/YY"></div><div class="col-md-6 mb-3"><label for="cvv-code" class="form-label">CVV Code</label><input type="text" class="form-control" id="cvv-code" placeholder="123"></div></div><div class="mb-3"><label for="cardholder-name" class="form-label">Cardholder Name</label><input type="text" class="form-control" id="cardholder-name"></div><div class="mb-3"><label for="donation-amount" class="form-label">Donation Amount</label><input type="number" class="form-control" id="donation-amount" placeholder="e.g., 10"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Send</button></div></div></div></div>

          <div class="modal fade" id="sendMaterialsModal" tabindex="-1" aria-labelledby="sendMaterialsLabel" aria-hidden="true">
            <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="sendMaterialsLabel">Send Materials</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form><div class="mb-3"><label for="materials-name" class="form-label">Your name</label><input type="text" class="form-control" id="materials-name"></div><div class="mb-3"><label for="materials-info" class="form-label">Materials description</label><textarea class="form-control" id="materials-info" rows="5"></textarea></div></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Send</button></div></div></div></div>

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
                matchedLabel = link.textContent.trim();
            } else {
                link.classList.remove("active");
            }
        });

        const brandEl = document.getElementById("site-brand");
        if (matchedLabel) brandEl.textContent = matchedLabel;
        else if (window.pageData && window.pageData[currentFile] && window.pageData[currentFile].title) brandEl.textContent = window.pageData[currentFile].title;
        else brandEl.textContent = "MIFI Project";

        // if data.title present -> set document.title
        if (window.pageData && window.pageData[currentFile] && window.pageData[currentFile].title) {
            document.title = window.pageData[currentFile].title;
        }

        // ---------------------- Playlist selection logic ----------------------
        // choose playlist for page: page playlist -> globalPlaylist -> fallback default
        const defaultPlaylist = [
            {src: "../music/33.mp3", title: "Mars Breeze (33)"},
            {src: "../music/11.mp3", title: "Red Plains (444)"},
            {src: "../music/777.mp3", title: "Orbit Echo (track3)"},
            {src: "../music/888.mp3", title: "Dust Trail (track4)"},
            {src: "../music/999.mp3", title: "Night Crater (track5)"}
        ]


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
        const computePlaylistId = (pl) => pl.map(p => p.src).join("|");

        const playlistId = computePlaylistId(playlist);
        // restore index if same playlist is saved
        let savedPlaylistId = null;
        let savedIndex = null;
        try {
            savedPlaylistId = localStorage.getItem("siteAudioPlaylistId");
            savedIndex = parseInt(localStorage.getItem("siteAudioIndex"), 10);
            if (isNaN(savedIndex)) savedIndex = null;
        } catch (e) {
            savedPlaylistId = null;
            savedIndex = null;
        }

        let currentIndex = 0;
        if (savedPlaylistId && savedPlaylistId === playlistId && savedIndex !== null) {
            currentIndex = savedIndex;
        } else {
            // choose start by page hash to vary starting track across pages
            currentIndex = hashToInt(currentFile) % Math.max(1, playlist.length);
        }

        // ---------------------- Audio controls wiring ----------------------
        const audioEl = document.getElementById("site-audio");
        const prevBtn = document.getElementById("site-audio-prev");
        const toggleBtn = document.getElementById("site-audio-toggle");
        const nextBtn = document.getElementById("site-audio-next");
        const volRange = document.getElementById("site-audio-vol");
        const titleEl = document.getElementById("site-audio-title");

        function saveState() {
            try {
                localStorage.setItem("siteAudioPlaylistId", playlistId);
                localStorage.setItem("siteAudioIndex", String(currentIndex));
            } catch (e) {
            }
        }

        function setTrack(index) {
            if (!playlist || playlist.length === 0) {
                audioEl.removeAttribute("src");
                titleEl.textContent = "";
                return;
            }
            currentIndex = ((index % playlist.length) + playlist.length) % playlist.length;
            const item = playlist[currentIndex];
            titleEl.textContent = item.title || item.src.split("/").pop();
            if (audioEl.src !== location.origin + "/" + item.src.replace(/^\.\//, "")) {
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
            // try to autoplay next
            audioEl.play().then(() => updateToggleText()).catch(() => updateToggleText());
        }

        function prevTrack() {
            setTrack(currentIndex - 1);
            audioEl.play().then(() => updateToggleText()).catch(() => updateToggleText());
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

        // try resume if user wanted playback
        try {
            const wasPlaying = localStorage.getItem("siteAudioPlaying") === "true";
            if (wasPlaying) {
                audioEl.play().then(updateToggleText).catch(err => {
                    // autoplay may be blocked -> user must press Play; still update UI
                    console.warn("Autoplay prevented:", err);
                    updateToggleText();
                });
            }
        } catch (e) {
        }

        // audio events
        audioEl.addEventListener("ended", nextTrack);
        audioEl.addEventListener("error", (e) => {
            console.warn("Audio error for", playlist[currentIndex], e);
            // on error — try next track
            setTimeout(nextTrack, 500);
        });

        // controls
        toggleBtn.addEventListener("click", () => {
            if (audioEl.paused) {
                audioEl.play().then(() => {
                    try {
                        localStorage.setItem("siteAudioPlaying", "true");
                    } catch (e) {
                    }
                    updateToggleText();
                }).catch(err => {
                    console.warn("Play failed:", err);
                });
            } else {
                audioEl.pause();
                try {
                    localStorage.setItem("siteAudioPlaying", "false");
                } catch (e) {
                }
                updateToggleText();
            }
        });

        nextBtn.addEventListener("click", () => {
            nextTrack();
        });
        prevBtn.addEventListener("click", () => {
            prevTrack();
        });

        volRange.addEventListener("input", () => {
            audioEl.volume = parseFloat(volRange.value);
            try {
                localStorage.setItem("siteAudioVol", volRange.value);
            } catch (e) {
            }
        });

        // ---------------------- navigation saving (when clicking menu links) ----------------------
        navLinks.forEach(a => {
            a.addEventListener("click", (ev) => {
                const href = a.getAttribute("href");
                if (!href) return;
                if (href.startsWith("http") || href.startsWith("#")) return;
                const targetFile = href.split("/").pop();
                // compute playlist id for target page and initial index (by hash)
                const targetPlaylist = (window.pageData && window.pageData[targetFile] && Array.isArray(window.pageData[targetFile].playlist))
                    ? window.pageData[targetFile].playlist.slice()
                    : (window.pageData && Array.isArray(window.pageData.globalPlaylist) ? window.pageData.globalPlaylist.slice() : defaultPlaylist.slice());

                const targetId = targetPlaylist.map(p => p.src).join("|");
                const startIndex = hashToInt(targetFile) % Math.max(1, targetPlaylist.length);

                try {
                    localStorage.setItem("siteAudioPlaylistId", targetId);
                    localStorage.setItem("siteAudioIndex", String(startIndex));
                    // if currently playing -> keep play flag; otherwise keep 'false'
                    localStorage.setItem("siteAudioPlaying", (!audioEl.paused).toString());
                } catch (e) {
                }
                // navigation proceeds normally
            });
        });

        // done
    } // end run

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
    else run();
})();

