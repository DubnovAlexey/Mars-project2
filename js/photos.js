// photos.js
const galleryPhotos = [
    {
        src: "https://photojournal.jpl.nasa.gov/jpeg/PIA25068.jpg",
        alt: "Dust Storm and Jezero Crater"
    },
    {
        src: "https://photojournal.jpl.nasa.gov/jpegMod/PIA25897_modest.jpg",
        alt: "Looking at the Crater Half Full"
    },
    {
        src: "https://photojournal.jpl.nasa.gov/jpegMod/PIA25912_modest.jpg",
        alt: "Curiosity's 'Postcard' of 'Marker Band Valley'"
    },
    {
        src: "https://photojournal.jpl.nasa.gov/jpegMod/PIA26632_modest.jpg",
        alt: "Curiosity Captures Mars Landscape While Talking to an Orbiter"
    },
    {
        src: "https://photojournal.jpl.nasa.gov/jpegMod/PIA26633_modest.jpg",
        alt: "Curiosity Views a Martian Rock Shaped Like Coral"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Phobos_colour_2008.jpg",
        alt: "Phobos moon"
    }
];

function generateGallery() {
    const galleryContainer = document.querySelector('.gallery');
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