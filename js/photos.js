// photos.js
const galleryPhotos = [
    {
        src: "Images/mars-2.webp",
        alt: "Dust Storm and Jezero Crater"
    },
    {
        src: "Images/mars-3.webp",
        alt: "Curiosity Rover Selfie"
    },
    {
        src: "Images/mars-4.webp",
        alt: "Mars Landscape by Curiosity"
    },
    {
        src: "Images/mars-5.webp",
        alt: "Perseverance Rover"
    },
    {
        src: "Images/mars-6.webp",
        alt: "Mars True Color"
    },
    {
        src: "Images/mars-7.jpg",
        alt: "Phobos moon"
    },
    {
        src: "Images/mars-8.jpg",
        alt: "Phobos moon"
    },
    {
        src: "Images/mars-9.webp",
        alt: "Phobos moon"
    },
    {
        src: "Images/OSIRIS_Mars_true_color.jpg",
        alt: "Phobos moon"
    },
    {
        src: "Images/istockphoto-2057625445-2048x2048.jpg",
        alt: "Phobos moon"
    },
    {
        src: "Images/istockphoto-1621445968-2048x2048.jpg",
        alt: "Phobos moon"
    },
    {
        src: "Images/1976-900x506.jpg",
        alt: "Phobos moon"
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

        colDiv.appendChild(img);
        row.appendChild(colDiv);
    }

    galleryContainer.appendChild(row);
    console.log("Галерея успешно отрисована!");
}

// 3. Заставляем код работать при загрузке страницы
document.addEventListener('DOMContentLoaded', generateGallery);