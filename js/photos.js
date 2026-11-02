// photos.js
const galleryPhotos = [
    {
        src: "Images/mars-2.webp",
        alt: "A colourful layered crater wall, seen from orbit"
    },
    {
        src: "Images/mars-3.webp",
        alt: "Layered, wind-carved ground, seen from orbit"
    },
    {
        src: "Images/mars-4.webp",
        alt: "Sand dunes with patches of frost"
    },
    {
        src: "Images/mars-5.webp",
        alt: "Steep slopes with dark and bright streaks, seen from orbit"
    },
    {
        src: "Images/mars-6.webp",
        alt: "Dark spots on seasonal ice as it thaws in spring"
    },
    {
        src: "Images/mars-7.jpg",
        alt: "Artist's view: ancient Mars with lakes"
    },
    {
        src: "Images/mars-8.jpg",
        alt: "Artist's view: water on ancient Mars at sunrise"
    },
    {
        src: "Images/mars-9.webp",
        alt: "Dunes meeting layered ice deposits"
    },
    {
        src: "Images/OSIRIS_Mars_true_color.webp",
        alt: "Mars in true colour, photographed by the OSIRIS camera of ESA's Rosetta probe"
    },
    {
        src: "Images/istockphoto-2057625445-2048x2048.jpg",
        alt: "Illustration: Mars rising above Earth (stock image)"
    },
    {
        src: "Images/istockphoto-1621445968-2048x2048.jpg",
        alt: "Illustration: an astronaut walking on Mars (stock image)"
    },
    {
        src: "Images/1976-900x506.jpg",
        alt: "Artist's view: a rocky shore on a wetter, ancient Mars"
    }

];


// 2. ФУНКЦИЯ ГЕНЕРАЦИИ СЕТКИ
function generateGallery() {
    console.log("Функция generateGallery успешно запущена!");
    const galleryContainer = document.querySelector('.gallery');

    if (!galleryContainer) {
        console.error("Контейнер .gallery не найден на странице!");
        return;
    }

    galleryContainer.innerHTML = ''; // Очищаем контейнер

    // Создаем ОДНУ общую строку для всей сетки
    const row = document.createElement('div');
    row.className = 'row g-3'; // Ровные отступы Bootstrap

    for (let i = 0; i < galleryPhotos.length; i++) {
        const photo = galleryPhotos[i];

        const colDiv = document.createElement('div');
        colDiv.className = 'col-4'; // По 3 штуки в ряд (4 из 12 колонок)

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;

        // w-100 растянет картинку на всю ширину, object-fit-cover красиво подрежет под один размер
        img.className = 'img-fluid w-100 object-fit-cover';
        img.style.height = '280px'; // Фиксированная высота для идеальной симметрии

        // Подпись под фото — тот же текст, что в alt, чтобы было видно, что на снимке
        const figure = document.createElement('figure');
        figure.className = 'gallery-figure';
        figure.appendChild(img);
        const caption = document.createElement('figcaption');
        caption.className = 'gallery-caption';
        caption.textContent = photo.alt;
        figure.appendChild(caption);

        colDiv.appendChild(figure);
        row.appendChild(colDiv);
    }

    galleryContainer.appendChild(row);
    console.log("Галерея успешно отрисована!");
}

// 3. Заставляем код работать при загрузке страницы
document.addEventListener('DOMContentLoaded', generateGallery);