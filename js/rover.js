// js/rover.js
// Страница Rover: свежие снимки марсохода Perseverance из открытой ленты НАСА
// (mars.nasa.gov/rss/api — без ключа). Снимки «сырые», в том виде, как пришли с Марса.

// Тексты страницы — на выбранном языке (js/i18n.js); подписи снимков от НАСА остаются английскими
const rt = (key, vars) => window.i18n ? window.i18n.t(key, vars) : key;
const rpick = value => (value && typeof value === "object") ? (window.i18n ? window.i18n.pick(value) : value.en) : value;

// 1. Камеры для фильтра: key — постоянное имя для кэша, label — подпись кнопки, instruments — приборы в ленте НАСА
const roverCameras = [
    {key: "All cameras", label: {en: "All cameras", ru: "Все камеры", he: "כל המצלמות", es: "Todas las cámaras", fr: "Toutes les caméras"}, instruments: []},
    {key: "Mastcam-Z", label: "Mastcam-Z", instruments: ["MCZ_LEFT", "MCZ_RIGHT"]},
    {key: "Navcam", label: "Navcam", instruments: ["NAVCAM_LEFT", "NAVCAM_RIGHT"]},
    {key: "Hazcam", label: "Hazcam", instruments: ["FRONT_HAZCAM_LEFT_A", "FRONT_HAZCAM_RIGHT_A", "REAR_HAZCAM_LEFT", "REAR_HAZCAM_RIGHT"]},
    {key: "SuperCam", label: "SuperCam", instruments: ["SUPERCAM_RMI"]},
    {key: "WATSON", label: "WATSON", instruments: ["SHERLOC_WATSON"]}
];

// Понятные имена приборов для подписей под снимками
const cameraLeft = {en: "left", ru: "левая", he: "שמאל", es: "izquierda", fr: "gauche"};
const cameraRight = {en: "right", ru: "правая", he: "ימין", es: "derecha", fr: "droite"};
const cameraSide = (name, which) => Object.fromEntries(Object.keys(which).map(code =>
    [code, `${typeof name === "object" ? name[code] : name}, ${which[code]}`]));
const frontHazcam = {en: "Front Hazcam", ru: "Передняя Hazcam", he: "Hazcam קדמית", es: "Hazcam delantera", fr: "Hazcam avant"};
const rearHazcam = {en: "Rear Hazcam", ru: "Задняя Hazcam", he: "Hazcam אחורית", es: "Hazcam trasera", fr: "Hazcam arrière"};
const instrumentNames = {
    MCZ_LEFT: cameraSide("Mastcam-Z", cameraLeft), MCZ_RIGHT: cameraSide("Mastcam-Z", cameraRight),
    NAVCAM_LEFT: cameraSide("Navcam", cameraLeft), NAVCAM_RIGHT: cameraSide("Navcam", cameraRight),
    FRONT_HAZCAM_LEFT_A: cameraSide(frontHazcam, cameraLeft), FRONT_HAZCAM_RIGHT_A: cameraSide(frontHazcam, cameraRight),
    REAR_HAZCAM_LEFT: cameraSide(rearHazcam, cameraLeft), REAR_HAZCAM_RIGHT: cameraSide(rearHazcam, cameraRight),
    SUPERCAM_RMI: {
        en: "SuperCam remote micro-imager", ru: "Дистанционная микрокамера SuperCam", he: "מיקרו־מצלמה מרחוק של SuperCam",
        es: "Microcámara remota de SuperCam", fr: "Micro-imageur à distance de SuperCam"
    },
    SHERLOC_WATSON: {
        en: "WATSON close-up camera", ru: "Камера крупного плана WATSON", he: "מצלמת התקריב WATSON",
        es: "Cámara de primer plano WATSON", fr: "Caméra de gros plan WATSON"
    },
    SKYCAM: "MEDA SkyCam", CACHECAM: "CacheCam",
    PIXL_MCC: {
        en: "PIXL micro-context camera", ru: "Контекстная микрокамера PIXL", he: "מצלמת ההקשר הזעירה של PIXL",
        es: "Cámara de microcontexto de PIXL", fr: "Caméra de micro-contexte PIXL"
    }
};

const PHOTOS_PER_PAGE = 12;
const ROVER_CACHE_MS = 60 * 60 * 1000; // лента обновляется, кэш — на час

let currentCamera = roverCameras[0];
let currentPage = 0;
let photoModal = null;
let roverRequest = 0;

function instrumentName(id) {
    if (instrumentNames[id]) return rpick(instrumentNames[id]);
    return String(id || "camera").toLowerCase().replace(/_/g, " ");
}

// 2. Одна страница ленты для выбранной камеры (только полные кадры, без служебных миниатюр)
async function loadRoverPhotos(camera, page) {
    let url = "https://mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020&feedtype=json" +
        `&num=${PHOTOS_PER_PAGE}&page=${page}&order=sol+desc&extended=sample_type::full,`;
    if (camera.instruments.length) url += "&search=" + encodeURIComponent("|" + camera.instruments.join("|"));
    // Лента НАСА бывает медленной (первый ответ — до 10 с), поэтому ждём дольше обычного
    return nasa.getJson(url, {cacheKey: "rover:" + camera.key + ":" + page, maxAgeMs: ROVER_CACHE_MS, timeoutMs: 30000});
}

// 3. Карточка снимка
function createPhotoCard(photo) {
    const col = nasa.el("div", "col-6 col-md-4 col-lg-3");
    const card = nasa.el("div", "nasa-item");

    const img = document.createElement("img");
    img.src = nasa.safeUrl(photo.image_files.medium || photo.image_files.small);
    img.alt = rt("rover.photoAlt", {sol: photo.sol, camera: instrumentName(photo.camera.instrument)});
    img.loading = "lazy";
    card.appendChild(img);

    card.appendChild(nasa.el("h3", "", rt("rover.sol", {sol: photo.sol})));
    card.appendChild(nasa.el("p", "nasa-meta", instrumentName(photo.camera.instrument)));
    card.appendChild(nasa.el("p", "nasa-meta", nasa.formatDate(photo.date_taken_utc)));

    nasa.makeClickable(card, () => openPhoto(photo));
    col.appendChild(card);
    return col;
}

// 4. Окно с большим снимком
function openPhoto(photo) {
    const name = instrumentName(photo.camera.instrument);
    document.getElementById("roverPhotoTitle").textContent = `Perseverance · ${rt("rover.sol", {sol: photo.sol})} · ${name}`;
    const img = document.getElementById("roverPhotoImg");
    img.src = nasa.safeUrl(photo.image_files.large || photo.image_files.medium);
    img.alt = rt("rover.photoAlt", {sol: photo.sol, camera: name});
    document.getElementById("roverPhotoMeta").textContent =
        rt("rover.taken", {date: nasa.formatDate(photo.date_taken_utc), credit: photo.credit || "NASA/JPL-Caltech"});
    document.getElementById("roverPhotoText").textContent = photo.caption || "";
    document.getElementById("roverPhotoFull").href = nasa.safeUrl(photo.image_files.full_res || photo.image_files.large);
    photoModal.show();
}

// 5. Показ ленты: первая страница заменяет снимки, «Show more» добавляет следующие.
// Лента НАСА иногда отвечает 10–20 секунд. Чтобы страница не стояла пустой, сразу показываются прошлые снимки:
// из кэша этого браузера или набор, сохранённый вместе с сайтом (js/roverSnapshot.js); если их нет — заготовки
// карточек. Свежие снимки заменяют их, как только придут.
const usablePhotos = data => (data && Array.isArray(data.images) ? data.images : [])
    .filter(p => p && p.camera && p.image_files && (p.image_files.medium || p.image_files.small));

function showPlaceholders(grid) {
    for (let i = 0; i < PHOTOS_PER_PAGE; i++) {
        const col = nasa.el("div", "col-6 col-md-4 col-lg-3");
        col.appendChild(nasa.el("div", "nasa-item nasa-skeleton"));
        col.firstChild.setAttribute("aria-hidden", "true");
        grid.appendChild(col);
    }
}

async function showPhotos(append) {
    const request = ++roverRequest;
    const grid = document.getElementById("rover-grid");
    const status = document.getElementById("rover-status");
    const more = document.getElementById("rover-more");
    const camera = currentCamera;
    let earlier = false;
    if (!append) {
        currentPage = 0;
        grid.textContent = "";
        const saved = nasa.readStale("rover:" + camera.key + ":0") || (camera === roverCameras[0] ? window.roverSnapshot : null);
        const savedPhotos = usablePhotos(saved);
        earlier = savedPhotos.length > 0;
        if (earlier) savedPhotos.forEach(p => grid.appendChild(createPhotoCard(p)));
        else showPlaceholders(grid);
    }
    more.hidden = true;
    status.textContent = earlier ? rt("rover.showingEarlier") : rt("rover.loading");

    try {
        const data = await loadRoverPhotos(camera, currentPage);
        if (request !== roverRequest || camera !== currentCamera) return; // пока грузили, выбрали другую камеру
        if (!append) grid.textContent = "";      // прошлые снимки или заготовки уступают место свежим
        const photos = usablePhotos(data);
        photos.forEach(p => grid.appendChild(createPhotoCard(p)));
        if (!grid.children.length) {
            status.textContent = rt("rover.none");
            return;
        }
        const latest = grid.querySelector("h3");
        status.textContent = rt("rover.summary", {
            camera: rpick(camera.label),
            count: Number(data.total_results || 0).toLocaleString(window.i18n ? window.i18n.locale : "en-US"),
            latest: latest ? latest.textContent.toLowerCase() : ""
        });
        currentPage += 1;
        more.hidden = currentPage * PHOTOS_PER_PAGE >= Number(data.total_results || 0);
    } catch (e) {
        if (request !== roverRequest || camera !== currentCamera) return;
        if (earlier) {
            status.textContent = rt("rover.feedDownEarlier");
            return;
        }
        grid.querySelectorAll(".nasa-skeleton").forEach(card => card.parentElement.remove());
        status.textContent = rt("rover.feedDown");
    }
}

// 6. Кнопки камер и запуск
function generateRoverPage() {
    const filters = document.getElementById("rover-filters");
    roverCameras.forEach((camera, i) => {
        const btn = nasa.el("button", i === 0 ? "active" : "", rpick(camera.label));
        btn.type = "button";
        btn.setAttribute("aria-pressed", String(i === 0));
        btn.addEventListener("click", () => {
            if (camera === currentCamera) return;
            filters.querySelectorAll("button").forEach(b => {
                b.classList.toggle("active", b === btn);
                b.setAttribute("aria-pressed", String(b === btn));
            });
            currentCamera = camera;
            showPhotos(false);
        });
        filters.appendChild(btn);
    });
    document.getElementById("rover-more").addEventListener("click", () => showPhotos(true));
    photoModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("roverPhotoModal"));
    showPhotos(false);
}

// bootstrap.bundle подключается после этого файла, поэтому ждём полной загрузки страницы
window.addEventListener("load", generateRoverPage);
