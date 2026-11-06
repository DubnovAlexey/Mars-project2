// js/rover.js
// Страница Rover: свежие снимки марсохода Perseverance из открытой ленты НАСА
// (mars.nasa.gov/rss/api — без ключа). Снимки «сырые», в том виде, как пришли с Марса.

// 1. Камеры для фильтра: подпись кнопки и названия приборов в ленте НАСА
const roverCameras = [
    {label: "All cameras", instruments: []},
    {label: "Mastcam-Z", instruments: ["MCZ_LEFT", "MCZ_RIGHT"]},
    {label: "Navcam", instruments: ["NAVCAM_LEFT", "NAVCAM_RIGHT"]},
    {label: "Hazcam", instruments: ["FRONT_HAZCAM_LEFT_A", "FRONT_HAZCAM_RIGHT_A", "REAR_HAZCAM_LEFT", "REAR_HAZCAM_RIGHT"]},
    {label: "SuperCam", instruments: ["SUPERCAM_RMI"]},
    {label: "WATSON", instruments: ["SHERLOC_WATSON"]}
];

// Понятные имена приборов для подписей под снимками
const instrumentNames = {
    MCZ_LEFT: "Mastcam-Z, left", MCZ_RIGHT: "Mastcam-Z, right",
    NAVCAM_LEFT: "Navcam, left", NAVCAM_RIGHT: "Navcam, right",
    FRONT_HAZCAM_LEFT_A: "Front Hazcam, left", FRONT_HAZCAM_RIGHT_A: "Front Hazcam, right",
    REAR_HAZCAM_LEFT: "Rear Hazcam, left", REAR_HAZCAM_RIGHT: "Rear Hazcam, right",
    SUPERCAM_RMI: "SuperCam remote micro-imager", SHERLOC_WATSON: "WATSON close-up camera",
    SKYCAM: "MEDA SkyCam", CACHECAM: "CacheCam", PIXL_MCC: "PIXL micro-context camera"
};

const PHOTOS_PER_PAGE = 12;
const ROVER_CACHE_MS = 60 * 60 * 1000; // лента обновляется, кэш — на час

let currentCamera = roverCameras[0];
let currentPage = 0;
let photoModal = null;
let roverRequest = 0;

function instrumentName(id) {
    if (instrumentNames[id]) return instrumentNames[id];
    return String(id || "camera").toLowerCase().replace(/_/g, " ");
}

// 2. Одна страница ленты для выбранной камеры (только полные кадры, без служебных миниатюр)
async function loadRoverPhotos(camera, page) {
    let url = "https://mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020&feedtype=json" +
        `&num=${PHOTOS_PER_PAGE}&page=${page}&order=sol+desc&extended=sample_type::full,`;
    if (camera.instruments.length) url += "&search=" + encodeURIComponent("|" + camera.instruments.join("|"));
    // Лента НАСА бывает медленной (первый ответ — до 10 с), поэтому ждём дольше обычного
    return nasa.getJson(url, {cacheKey: "rover:" + camera.label + ":" + page, maxAgeMs: ROVER_CACHE_MS, timeoutMs: 30000});
}

// 3. Карточка снимка
function createPhotoCard(photo) {
    const col = nasa.el("div", "col-6 col-md-4 col-lg-3");
    const card = nasa.el("div", "nasa-item");

    const img = document.createElement("img");
    img.src = nasa.safeUrl(photo.image_files.medium || photo.image_files.small);
    img.alt = `Perseverance, sol ${photo.sol}: ${instrumentName(photo.camera.instrument)}`;
    img.loading = "lazy";
    card.appendChild(img);

    card.appendChild(nasa.el("h3", "", `Sol ${photo.sol}`));
    card.appendChild(nasa.el("p", "nasa-meta", instrumentName(photo.camera.instrument)));
    card.appendChild(nasa.el("p", "nasa-meta", nasa.formatDate(photo.date_taken_utc)));

    nasa.makeClickable(card, () => openPhoto(photo));
    col.appendChild(card);
    return col;
}

// 4. Окно с большим снимком
function openPhoto(photo) {
    const name = instrumentName(photo.camera.instrument);
    document.getElementById("roverPhotoTitle").textContent = `Perseverance · Sol ${photo.sol} · ${name}`;
    const img = document.getElementById("roverPhotoImg");
    img.src = nasa.safeUrl(photo.image_files.large || photo.image_files.medium);
    img.alt = `Perseverance, sol ${photo.sol}: ${name}`;
    document.getElementById("roverPhotoMeta").textContent =
        `Taken ${nasa.formatDate(photo.date_taken_utc)} (Earth date) · Image: ${photo.credit || "NASA/JPL-Caltech"}`;
    document.getElementById("roverPhotoText").textContent = photo.caption || "";
    document.getElementById("roverPhotoFull").href = nasa.safeUrl(photo.image_files.full_res || photo.image_files.large);
    photoModal.show();
}

// 5. Показ ленты: первая страница заменяет снимки, «Show more» добавляет следующие
async function showPhotos(append) {
    const request = ++roverRequest;
    const grid = document.getElementById("rover-grid");
    const status = document.getElementById("rover-status");
    const more = document.getElementById("rover-more");
    const camera = currentCamera;
    if (!append) {
        currentPage = 0;
        grid.textContent = "";
    }
    more.hidden = true;
    status.textContent = "Loading fresh photos from NASA…";

    try {
        const data = await loadRoverPhotos(camera, currentPage);
        if (request !== roverRequest || camera !== currentCamera) return; // пока грузили, выбрали другую камеру
        const photos = (Array.isArray(data.images) ? data.images : []).filter(p => p && p.camera && p.image_files && (p.image_files.medium || p.image_files.small));
        photos.forEach(p => grid.appendChild(createPhotoCard(p)));
        if (!grid.children.length) {
            status.textContent = "No photos from this camera yet.";
            return;
        }
        const latest = grid.querySelector("h3");
        status.textContent = `${camera.label}: ${Number(data.total_results || 0).toLocaleString("en-US")} photos in the NASA archive. ` +
            `Newest first — ${latest ? latest.textContent.toLowerCase() : ""}.`;
        currentPage += 1;
        more.hidden = currentPage * PHOTOS_PER_PAGE >= Number(data.total_results || 0);
    } catch (e) {
        if (request !== roverRequest || camera !== currentCamera) return;
        status.textContent = "The NASA photo feed is not answering. Please try again later.";
    }
}

// 6. Кнопки камер и запуск
function generateRoverPage() {
    const filters = document.getElementById("rover-filters");
    roverCameras.forEach((camera, i) => {
        const btn = nasa.el("button", i === 0 ? "active" : "", camera.label);
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
