// photos.js
const galleryPhotos = [
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jezero_crater_on_Mars_PIA23214.jpg",
        alt: "Dust Storm and Jezero Crater"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Curiosity_Selfie_at_Mount_Sharp_-_Crop.jpg",
        alt: "Curiosity Rover Selfie"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mars_Panorama_-_Curiosity_rover.jpg",
        alt: "Mars Landscape by Curiosity"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Perseverance_Rover_Selfie_at_Rochette.jpg",
        alt: "Perseverance Rover"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
        alt: "Mars True Color"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Phobos_colour_2008.jpg",
        alt: "Phobos moon"
    }
];

function generateGallery() {
    console.log("Функция generateGallery запущена!");
    const galleryContainer = document.querySelector('.gallery');
    console.log("Массив фото:", galleryPhotos);
    galleryContainer.innerHTML = ''; // Очищаем контейнер, чтобы избежать дублирования

    const rowOne = document.createElement('div');
    rowOne.className = 'row g-3';
    const rowTwo = document.createElement('div');
    rowTwo.className = 'row g-3 mt-2';

    for (let i = 0; i < galleryPhotos.length; i++) {
        const photo = galleryPhotos[i];
        const colDiv = document.createElement('div');
        colDiv.className = 'col-4';
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.className = 'img-fluid';

        colDiv.appendChild(img);

        if (i < 3) {
            rowOne.appendChild(colDiv);
        } else {
            rowTwo.appendChild(colDiv);
        }
    }

    galleryContainer.appendChild(rowOne);
    galleryContainer.appendChild(rowTwo);
}

document.addEventListener('DOMContentLoaded', generateGallery);