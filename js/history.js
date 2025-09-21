// js/history.js

// 1. Данные для страницы истории
const historyData = [
    {
        tag: "article",
        badge: "USSR",
        title: "Early Soviet Missions",
        img: {
            src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/FP2A3620_%2823497688248%29_%28cropped%29.jpg",
            alt: "Soviet Mars 3 spacecraft model",
            title: "Mars 3 model",
            className: "img-right" // ИЗМЕНЕНО: теперь картинка справа
        },
        paragraphs: [
            "The Soviet Union was the first nation to send missions to Mars. Despite many failures, it achieved several important milestones, including the first successful soft landing with the Mars 3 probe, though communication was lost almost immediately after touchdown.",
            "Their early attempts, such as Mars 1, proved the challenges of interplanetary travel. These missions provided invaluable data on the interplanetary medium between Earth and Mars, paving the way for future exploration. The USSR's ambitious Mars program laid the groundwork for the global effort to explore the Red Planet, demonstrating persistence in the face of immense technical challenges."
        ]
    },
    {
        tag: "article",
        badge: "USA",
        title: "NASA's Mariner Program",
        img: {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mariner_4_1304_1964novembemariner4.jpg/1920px-Mariner_4_1304_1964novembemariner4.jpg",
            alt: "Mariner 4 spacecraft",
            title: "Mariner 4",
            className: "img-right"
        },
        paragraphs: [
            "NASA’s Mariner program was the first to successfully fly past Mars and take close-up photos. The data collected by missions like Mariner 4 revolutionized our understanding of the planet, revealing a cratered, moon-like surface."
        ]
    },
    {
        tag: "article",
        badge: "USA",
        title: "NASA's Viking Program",
        img: {
            src: "https://d2pn8kiwq2w21t.cloudfront.net/images/missionswebviking_EemH6A1.height-1024.jpg",
            alt: "Viking lander model",
            title: "Viking 1 and Viking 2",
            className: "img-right" // ИЗМЕНЕНО: теперь картинка справа
        },
        paragraphs: [
            "The incredibly successful Viking program consisted of two orbiters and two landers, Viking 1 and Viking 2. They were the first missions to successfully land on Mars and operate for an extended period, conducting experiments to search for signs of life. The data and images they sent back were a turning point in planetary science."
        ]
    },
    {
        tag: "article",
        badge: "USA",
        title: "Modern Mars Rovers",
        gif: {
            animatedSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Perseverance-Selfie-at-Rochette-Horizontal-V2.gif",
            alt: "Perseverance Rover",
            className: "img-right" // ДОБАВЛЕНО: теперь GIF справа
        },
        paragraphs: [
            "The modern era of Mars exploration began with the Sojourner rover in the 1990s. This was followed by the highly durable Spirit and Opportunity rovers, which far outlived their planned missions and found key evidence of past water on Mars.",
            "More recently, the Curiosity and Perseverance rovers have been exploring Mars's geological and atmospheric history. Curiosity, landing in 2012, is a mobile laboratory analyzing rocks and soil, while Perseverance, which landed in 2021, is collecting samples to be returned to Earth on a future mission."
        ]
    },
    {
        tag: "article",
        title: "Mars Mission Timeline",
        paragraphs: [
            "A timeline of key Mars exploration missions."
        ],
        table: {
            headers: ["Mission", "Year", "Agency", "Key Achievement"],
            rows: [
                ["Mars 1", "1962", "USSR", "First Mars flyby attempt"],
                ["Mars 3", "1971", "USSR", "First soft landing (brief)"],
                ["Mariner 4", "1965", "NASA", "First successful flyby"],
                ["Viking 1", "1976", "NASA", "First long-duration landing"],
                ["Viking 2", "1976", "NASA", "Second successful landing"],
                ["Spirit & Opportunity", "2004", "NASA", "Explored past water on Mars"],
                ["Curiosity", "2012", "NASA", "Mobile geological lab"],
                ["Perseverance", "2021", "NASA", "Sample return preparation"]
            ]
        }
    },
    {
        tag: "article",
        badge: "Video",
        title: "Watch: The Journey to Mars",
        paragraphs: [
            "This video from NASA provides an overview of humanity's long and challenging quest to explore Mars, from the early missions to the rovers operating today."
        ],
        video: {
            title: "Watch: The Journey to Mars",
            src: "https://www.youtube.com/embed/f_sSzn87ljM?si=dNqf-ZqTanwfrBZv"
        }
    },
    {
        tag: "article",
        badge: "Video",
        title: "Mars: The Next Frontier",
        paragraphs: [
            "Another NASA documentary highlighting humanity's future plans for Mars exploration."
        ],
        video: {
            title: "Mars: The Next Frontier",
            src: "https://www.youtube.com/embed/YBLdc2gXwyU?si=OqyPLXM7A2vys5Fz"
        }
    }
];

// 2. Функция для создания элементов на странице
function generateHistoryContent() {
    const mainContainer = document.querySelector('main');

    historyData.forEach(item => {
        const article = document.createElement('article');
        article.className = 'card';

        if (item.badge) {
            const badge = document.createElement('span');
            badge.className = 'badge-abs';
            badge.textContent = item.badge;
            article.appendChild(badge);
        }

        const title = document.createElement('h2');
        title.textContent = item.title;
        article.appendChild(title);

        if (item.img) {
            const img = document.createElement('img');
            img.src = item.img.src;
            img.alt = item.img.alt;
            img.title = item.img.title;
            img.className = item.img.className;
            article.appendChild(img);
        }

        if (item.gif) {
            const gif = document.createElement('img');
            gif.src = item.gif.animatedSrc;
            gif.alt = item.gif.alt;
            gif.className = item.gif.className; // ИЗМЕНЕНО: теперь класс берется из данных
            article.appendChild(gif);
        }

        if (item.paragraphs) {
            item.paragraphs.forEach(paragraphText => {
                const p = document.createElement('p');
                p.textContent = paragraphText;
                article.appendChild(p);
            });
        }


        if (item.table) {
            const table = document.createElement('table');
            table.className = 'table table-hover';
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            item.table.headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            item.table.rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach((cell, index) => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            article.appendChild(table);
        }

        if (item.video) {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'figure-wrap';

            const iframe = document.createElement('iframe');
            iframe.src = item.video.src;
            iframe.title = item.video.title;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            videoContainer.appendChild(iframe);
            article.appendChild(videoContainer);
        }

        mainContainer.appendChild(article);
    });
}

// 3. Запускаем функцию, когда страница полностью загружена
document.addEventListener('DOMContentLoaded', generateHistoryContent);

