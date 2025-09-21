// js/index.js

// 1. Данные для главной страницы
const indexData = {
    figure: {
        imgSrc: "./Images/mars-krater-zvezdy.webp",
        imgAlt: "Mars with stars",
        figcaption: "Welcome to Mars"
    },
    title: "Welcome",
    paragraphs: [
        "Have you ever wondered what it would be like to stand on the surface of Mars and look up at a pale blue dot in the sky — our own Earth, hanging there like a faraway lantern? Mars is a planet of extremes and paradoxes. It's a world where the highest mountains in the solar system, like Olympus Mons, tower over vast plains, and ancient riverbeds suggest a watery past. It's a land of global dust storms that can obscure the entire planet for months and seasons that swing from warm, sunlit days to nights so cold that carbon dioxide freezes out of the atmosphere.",
        "Its thin atmosphere and bitter cold would make survival a challenge, yet it offers enough tantalizing hints of water — past and present — to keep scientists asking: could life have ever existed here?",
        "Every mission to Mars is a gamble with physics, engineering, and human patience. The Red Planet has a habit of swallowing spacecraft — earning the nickname “the spacecraft graveyard” in the early years of exploration. Yet, with each failure came new lessons, and with each success came breathtaking views and groundbreaking data. The Soviet Mars 3, NASA’s Viking landers, the tireless Spirit and Opportunity rovers, and the high-tech Perseverance — they are all part of a long, unfolding story.",
        "In this project, we’ll journey through that story together. We’ll explore the missions, the myths, the photographs, and the human drive that pushes us toward this small, cold neighbor. Whether you’re here to learn about ancient Martian legends, to see real images from the planet’s surface, or to understand the science behind the exploration, you’ve landed in the right place. Welcome to — your gateway to the Red Planet. — your gateway to the Red Planet."
    ]
};

// 2. Функция для динамической генерации контента
function generateIndexContent() {
    const mainContainer = document.querySelector('.home-intro');
    if (!mainContainer) return;

    // Очищаем контейнер, если в нем что-то есть
    mainContainer.innerHTML = '';

    // Создаем и добавляем элемент <figure> с изображением и подписью
    const figure = document.createElement('figure');
    figure.className = 'figure-planet';

    const img = document.createElement('img');
    img.className = 'planet-float';
    img.src = indexData.figure.imgSrc;
    img.alt = indexData.figure.imgAlt;
    figure.appendChild(img);

    const figcaption = document.createElement('figcaption');
    figcaption.className = 'badge';
    figcaption.textContent = indexData.figure.figcaption;
    figure.appendChild(figcaption);

    const orbitSpan = document.createElement('span');
    orbitSpan.className = 'orbit';
    orbitSpan.setAttribute('aria-hidden', 'true');
    figure.appendChild(orbitSpan);

    mainContainer.appendChild(figure);

    // Создаем и добавляем заголовок <h2>
    const h2 = document.createElement('h2');
    h2.textContent = indexData.title;
    mainContainer.appendChild(h2);

    // Создаем и добавляем абзацы
    indexData.paragraphs.forEach(paragraphText => {
        const p = document.createElement('p');
        p.textContent = paragraphText;
        mainContainer.appendChild(p);
    });
}

// 3. Запускаем функцию, когда страница полностью загружена
document.addEventListener('DOMContentLoaded', generateIndexContent);