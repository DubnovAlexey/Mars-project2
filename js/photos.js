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