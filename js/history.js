// js/history.js
// Страница истории. Тексты — на пяти языках ({en, ru, he, es, fr}); i18n.pick() берёт выбранный (js/i18n.js).
// В таблице ячейка — строка (одинаковая во всех языках, например год) или объект с переводами.

const USSR = {en: "USSR", ru: "СССР", he: "ברית המועצות", es: "URSS", fr: "URSS"};
const USA = {en: "USA", ru: "США", he: "ארה״ב", es: "EE. UU.", fr: "États-Unis"};
const VIDEO_BADGE = {en: "Video", ru: "Видео", he: "וידאו", es: "Vídeo", fr: "Vidéo"};

// 1. Данные для страницы истории
const historyData = [
    {
        tag: "article",
        badge: USSR,
        title: {en: "Early Soviet Missions", ru: "Первые советские миссии", he: "המשימות הסובייטיות הראשונות", es: "Las primeras misiones soviéticas", fr: "Les premières missions soviétiques"},
        img: {
            src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/FP2A3620_%2823497688248%29_%28cropped%29.jpg",
            alt: {en: "Soviet Mars 3 spacecraft model", ru: "Модель советского аппарата «Марс-3»", he: "דגם של החללית הסובייטית „מארס 3”", es: "Maqueta de la sonda soviética Mars 3", fr: "Maquette de la sonde soviétique Mars 3"},
            title: {en: "Mars 3 model", ru: "Модель «Марса-3»", he: "דגם „מארס 3”", es: "Maqueta de la Mars 3", fr: "Maquette de Mars 3"},
            className: "img-right" // ИЗМЕНЕНО: теперь картинка справа
        },
        paragraphs: [
            {
                en: "The Soviet Union was the first nation to send missions to Mars. Despite many failures, it achieved several important milestones, including the first successful soft landing with the Mars 3 probe, though communication was lost almost immediately after touchdown.",
                ru: "Советский Союз первым отправил миссии к Марсу. Несмотря на множество неудач, он достиг нескольких важных рубежей, в том числе первой успешной мягкой посадки зонда «Марс-3», хотя связь с ним пропала почти сразу после касания.",
                he: "ברית המועצות הייתה המדינה הראשונה ששלחה משימות למאדים. למרות כישלונות רבים, היא השיגה כמה אבני דרך חשובות, ובהן הנחיתה הרכה המוצלחת הראשונה עם הגשושית „מארס 3”, אף שהקשר איתה אבד כמעט מיד לאחר הנחיתה.",
                es: "La Unión Soviética fue el primer país en enviar misiones a Marte. A pesar de muchos fracasos, alcanzó varios hitos importantes, entre ellos el primer aterrizaje suave con éxito, el de la sonda Mars 3, aunque la comunicación se perdió casi inmediatamente después de tocar el suelo.",
                fr: "L’Union soviétique a été la première nation à envoyer des missions vers Mars. Malgré de nombreux échecs, elle a franchi plusieurs étapes importantes, dont le premier atterrissage en douceur réussi avec la sonde Mars 3, même si la communication a été perdue presque aussitôt après le contact avec le sol."
            },
            {
                en: "Their early attempts, such as Mars 1, proved the challenges of interplanetary travel. These missions provided invaluable data on the interplanetary medium between Earth and Mars, paving the way for future exploration. The USSR's ambitious Mars program laid the groundwork for the global effort to explore the Red Planet, demonstrating persistence in the face of immense technical challenges.",
                ru: "Первые попытки, такие как «Марс-1», показали, насколько трудны межпланетные полёты. Эти миссии дали бесценные данные о межпланетной среде между Землёй и Марсом и проложили путь будущим исследованиям. Амбициозная марсианская программа СССР заложила основу мировых усилий по изучению Красной планеты и показала упорство перед лицом огромных технических трудностей.",
                he: "הניסיונות הראשונים, כמו „מארס 1”, הוכיחו כמה קשה המסע הבין־כוכבי. המשימות האלה סיפקו נתונים יקרי ערך על התווך הבין־כוכבי שבין כדור הארץ למאדים וסללו את הדרך למחקר עתידי. תוכנית המאדים השאפתנית של ברית המועצות הניחה את היסודות למאמץ העולמי לחקור את כוכב הלכת האדום והפגינה התמדה מול אתגרים טכניים עצומים.",
                es: "Sus primeros intentos, como el de la Mars 1, demostraron lo difíciles que son los viajes interplanetarios. Aquellas misiones aportaron datos valiosísimos sobre el medio interplanetario entre la Tierra y Marte y allanaron el camino a la exploración futura. El ambicioso programa marciano de la URSS sentó las bases del esfuerzo mundial por explorar el planeta rojo y demostró tenacidad ante enormes dificultades técnicas.",
                fr: "Leurs premières tentatives, comme Mars 1, ont montré à quel point les voyages interplanétaires sont difficiles. Ces missions ont fourni des données inestimables sur le milieu interplanétaire entre la Terre et Mars, ouvrant la voie aux explorations futures. L’ambitieux programme martien de l’URSS a posé les bases de l’effort mondial d’exploration de la planète rouge, en faisant preuve de persévérance face à d’immenses défis techniques."
            }
        ]
    },
    {
        tag: "article",
        badge: USA,
        title: {en: "NASA's Mariner Program", ru: "Программа NASA «Маринер»", he: "תוכנית מרינר של NASA", es: "El programa Mariner de la NASA", fr: "Le programme Mariner de la NASA"},
        img: {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mariner_4_1304_1964novembemariner4.jpg/1920px-Mariner_4_1304_1964novembemariner4.jpg",
            alt: {en: "Mariner 4 spacecraft", ru: "Аппарат «Маринер-4»", he: "החללית מרינר 4", es: "La sonda Mariner 4", fr: "La sonde Mariner 4"},
            title: {en: "Mariner 4", ru: "«Маринер-4»", he: "מרינר 4", es: "Mariner 4", fr: "Mariner 4"},
            className: "img-right"
        },
        paragraphs: [
            {
                en: "NASA’s Mariner program was the first to successfully fly past Mars and take close-up photos. The data collected by missions like Mariner 4 revolutionized our understanding of the planet, revealing a cratered, moon-like surface.",
                ru: "Программа NASA «Маринер» первой успешно пролетела мимо Марса и сделала снимки крупным планом. Данные, собранные такими миссиями, как «Маринер-4», перевернули наше представление о планете: её поверхность оказалась покрыта кратерами и похожа на лунную.",
                he: "תוכנית מרינר של NASA הייתה הראשונה שחלפה בהצלחה על פני מאדים וצילמה אותו מקרוב. הנתונים שאספו משימות כמו מרינר 4 חוללו מהפכה בהבנתנו את כוכב הלכת וחשפו פני שטח מלאי מכתשים, דמויי ירח.",
                es: "El programa Mariner de la NASA fue el primero en sobrevolar Marte con éxito y tomar fotos de cerca. Los datos recogidos por misiones como la Mariner 4 revolucionaron nuestra idea del planeta al revelar una superficie llena de cráteres, parecida a la de la Luna.",
                fr: "Le programme Mariner de la NASA a été le premier à survoler Mars avec succès et à en prendre des photos rapprochées. Les données recueillies par des missions comme Mariner 4 ont révolutionné notre compréhension de la planète, en révélant une surface criblée de cratères, semblable à celle de la Lune."
            }
        ]
    },
    {
        tag: "article",
        badge: USA,
        title: {en: "NASA's Viking Program", ru: "Программа NASA «Викинг»", he: "תוכנית ויקינג של NASA", es: "El programa Viking de la NASA", fr: "Le programme Viking de la NASA"},
        img: {
            src: "https://d2pn8kiwq2w21t.cloudfront.net/images/missionswebviking_EemH6A1.height-1024.jpg",
            alt: {en: "Viking lander model", ru: "Модель посадочного модуля «Викинг»", he: "דגם של נחתת ויקינג", es: "Maqueta del módulo de aterrizaje Viking", fr: "Maquette de l’atterrisseur Viking"},
            title: {en: "Viking 1 and Viking 2", ru: "«Викинг-1» и «Викинг-2»", he: "ויקינג 1 וויקינג 2", es: "Viking 1 y Viking 2", fr: "Viking 1 et Viking 2"},
            className: "img-right" // ИЗМЕНЕНО: теперь картинка справа
        },
        paragraphs: [
            {
                en: "The incredibly successful Viking program consisted of two orbiters and two landers, Viking 1 and Viking 2. They were the first missions to successfully land on Mars and operate for an extended period, conducting experiments to search for signs of life. The data and images they sent back were a turning point in planetary science.",
                ru: "Невероятно успешная программа «Викинг» включала два орбитальных аппарата и два посадочных модуля — «Викинг-1» и «Викинг-2». Это были первые миссии, которые успешно сели на Марс и долго работали на поверхности, проводя эксперименты по поиску признаков жизни. Присланные ими данные и снимки стали поворотным моментом в планетологии.",
                he: "תוכנית ויקינג המוצלחת להפליא כללה שני מקיפים ושתי נחתות, ויקינג 1 וויקינג 2. אלה היו המשימות הראשונות שנחתו בהצלחה על מאדים ופעלו לאורך זמן, וערכו ניסויים לחיפוש סימני חיים. הנתונים והתמונות ששלחו היו נקודת מפנה במדעי כוכבי הלכת.",
                es: "El exitosísimo programa Viking constaba de dos orbitadores y dos módulos de aterrizaje, Viking 1 y Viking 2. Fueron las primeras misiones en aterrizar con éxito en Marte y funcionar durante mucho tiempo, con experimentos para buscar señales de vida. Los datos y las imágenes que enviaron marcaron un antes y un después en la ciencia planetaria.",
                fr: "Le programme Viking, d’une réussite remarquable, comprenait deux orbiteurs et deux atterrisseurs, Viking 1 et Viking 2. Ce furent les premières missions à se poser avec succès sur Mars et à y fonctionner longtemps, en menant des expériences pour chercher des signes de vie. Les données et les images qu’elles ont transmises ont marqué un tournant dans la science planétaire."
            }
        ]
    },
    {
        tag: "article",
        badge: USA,
        title: {en: "Modern Mars Rovers", ru: "Современные марсоходы", he: "רוברי המאדים של היום", es: "Los róveres marcianos modernos", fr: "Les rovers martiens modernes"},
        gif: {
            animatedSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Perseverance-Selfie-at-Rochette-Horizontal-V2.gif",
            alt: {en: "Perseverance Rover", ru: "Марсоход Perseverance", he: "הרובר Perseverance", es: "El róver Perseverance", fr: "Le rover Perseverance"},
            className: "img-right" // ДОБАВЛЕНО: теперь GIF справа
        },
        paragraphs: [
            {
                en: "The modern era of Mars exploration began with the Sojourner rover in the 1990s. This was followed by the highly durable Spirit and Opportunity rovers, which far outlived their planned missions and found key evidence of past water on Mars.",
                ru: "Современная эпоха исследования Марса началась с марсохода Sojourner в 1990-х. За ним последовали очень выносливые Spirit и Opportunity: они проработали намного дольше запланированного и нашли ключевые доказательства того, что на Марсе когда-то была вода.",
                he: "העידן המודרני של חקר מאדים החל עם הרובר Sojourner בשנות ה־90. אחריו הגיעו הרוברים העמידים במיוחד Spirit ו־Opportunity, שפעלו הרבה מעבר למשך המשימה המתוכנן ומצאו ראיות מרכזיות לכך שבעבר היו מים על מאדים.",
                es: "La era moderna de la exploración de Marte comenzó con el róver Sojourner en los años noventa. Le siguieron los resistentes Spirit y Opportunity, que funcionaron mucho más tiempo del previsto y encontraron pruebas clave de que en Marte hubo agua.",
                fr: "L’ère moderne de l’exploration martienne a commencé avec le rover Sojourner dans les années 1990. Sont venus ensuite les très endurants Spirit et Opportunity, qui ont largement dépassé la durée prévue de leurs missions et ont trouvé des preuves clés de la présence passée d’eau sur Mars."
            },
            {
                en: "More recently, the Curiosity and Perseverance rovers have been exploring Mars's geological and atmospheric history. Curiosity, landing in 2012, is a mobile laboratory analyzing rocks and soil, while Perseverance, which landed in 2021, is collecting samples to be returned to Earth on a future mission.",
                ru: "В последние годы марсоходы Curiosity и Perseverance изучают геологическую историю Марса и историю его атмосферы. Curiosity, севший в 2012 году, — это передвижная лаборатория, которая анализирует камни и грунт, а Perseverance, приземлившийся в 2021 году, собирает образцы, которые будущая миссия доставит на Землю.",
                he: "בשנים האחרונות חוקרים הרוברים Curiosity ו־Perseverance את ההיסטוריה הגאולוגית והאטמוספרית של מאדים. Curiosity, שנחת ב־2012, הוא מעבדה ניידת שמנתחת סלעים וקרקע, ו־Perseverance, שנחת ב־2021, אוסף דגימות שמשימה עתידית תחזיר לכדור הארץ.",
                es: "Más recientemente, los róveres Curiosity y Perseverance exploran la historia geológica y atmosférica de Marte. Curiosity, que aterrizó en 2012, es un laboratorio móvil que analiza rocas y suelo, y Perseverance, que aterrizó en 2021, recoge muestras que una misión futura traerá a la Tierra.",
                fr: "Plus récemment, les rovers Curiosity et Perseverance explorent l’histoire géologique et atmosphérique de Mars. Curiosity, arrivé en 2012, est un laboratoire mobile qui analyse les roches et le sol, tandis que Perseverance, posé en 2021, collecte des échantillons qu’une future mission rapportera sur Terre."
            }
        ]
    },
    {
        tag: "article",
        title: {en: "Mars Mission Timeline", ru: "Хронология миссий к Марсу", he: "ציר הזמן של המשימות למאדים", es: "Cronología de las misiones a Marte", fr: "Chronologie des missions vers Mars"},
        paragraphs: [
            {
                en: "A timeline of key Mars exploration missions.",
                ru: "Хронология ключевых миссий по исследованию Марса.",
                he: "ציר זמן של משימות המפתח בחקר מאדים.",
                es: "Una cronología de las misiones clave de exploración de Marte.",
                fr: "Une chronologie des principales missions d’exploration de Mars."
            }
        ],
        table: {
            headers: [
                {en: "Mission", ru: "Миссия", he: "משימה", es: "Misión", fr: "Mission"},
                {en: "Year", ru: "Год", he: "שנה", es: "Año", fr: "Année"},
                {en: "Agency", ru: "Агентство", he: "סוכנות", es: "Agencia", fr: "Agence"},
                {en: "Key Achievement", ru: "Главное достижение", he: "הישג מרכזי", es: "Logro clave", fr: "Réalisation clé"}
            ],
            rows: [
                [{en: "Mars 1", ru: "«Марс-1»", he: "מארס 1", es: "Mars 1", fr: "Mars 1"}, "1962", USSR,
                    {en: "First Mars flyby attempt", ru: "Первая попытка пролёта мимо Марса", he: "ניסיון ראשון לחלוף על פני מאדים", es: "Primer intento de sobrevuelo de Marte", fr: "Première tentative de survol de Mars"}],
                [{en: "Mars 3", ru: "«Марс-3»", he: "מארס 3", es: "Mars 3", fr: "Mars 3"}, "1971", USSR,
                    {en: "First soft landing (brief)", ru: "Первая мягкая посадка (недолгая)", he: "נחיתה רכה ראשונה (קצרה)", es: "Primer aterrizaje suave (breve)", fr: "Premier atterrissage en douceur (bref)"}],
                [{en: "Mariner 4", ru: "«Маринер-4»", he: "מרינר 4", es: "Mariner 4", fr: "Mariner 4"}, "1965", "NASA",
                    {en: "First successful flyby", ru: "Первый успешный пролёт", he: "חלוף מוצלח ראשון", es: "Primer sobrevuelo con éxito", fr: "Premier survol réussi"}],
                [{en: "Viking 1", ru: "«Викинг-1»", he: "ויקינג 1", es: "Viking 1", fr: "Viking 1"}, "1976", "NASA",
                    {en: "First long-duration landing", ru: "Первая долговременная посадка", he: "נחיתה ראשונה לטווח ארוך", es: "Primer aterrizaje de larga duración", fr: "Premier atterrissage de longue durée"}],
                [{en: "Viking 2", ru: "«Викинг-2»", he: "ויקינג 2", es: "Viking 2", fr: "Viking 2"}, "1976", "NASA",
                    {en: "Second successful landing", ru: "Вторая успешная посадка", he: "נחיתה מוצלחת שנייה", es: "Segundo aterrizaje con éxito", fr: "Deuxième atterrissage réussi"}],
                [{en: "Spirit & Opportunity", ru: "Spirit и Opportunity", he: "Spirit ו־Opportunity", es: "Spirit y Opportunity", fr: "Spirit et Opportunity"}, "2004", "NASA",
                    {en: "Explored past water on Mars", ru: "Изучили следы древней воды на Марсе", he: "חקרו עדויות למים בעברו של מאדים", es: "Estudiaron el agua del pasado de Marte", fr: "Ont étudié l’eau passée de Mars"}],
                ["Curiosity", "2012", "NASA",
                    {en: "Mobile geological lab", ru: "Передвижная геологическая лаборатория", he: "מעבדה גאולוגית ניידת", es: "Laboratorio geológico móvil", fr: "Laboratoire géologique mobile"}],
                ["Perseverance", "2021", "NASA",
                    {en: "Sample return preparation", ru: "Подготовка к доставке образцов", he: "הכנה להחזרת דגימות", es: "Preparación del retorno de muestras", fr: "Préparation du retour d’échantillons"}]
            ]
        }
    },
    {
        tag: "article",
        badge: VIDEO_BADGE,
        title: {en: "Watch: The Journey to Mars", ru: "Смотрите: путь к Марсу", he: "צפו: המסע למאדים", es: "Mira: el viaje a Marte", fr: "À voir : le voyage vers Mars"},
        paragraphs: [
            {
                en: "This video from NASA provides an overview of humanity's long and challenging quest to explore Mars, from the early missions to the rovers operating today.",
                ru: "Это видео NASA рассказывает о долгом и трудном пути человечества к исследованию Марса — от первых миссий до марсоходов, которые работают сегодня.",
                he: "הסרטון הזה של NASA סוקר את המסע הארוך והמאתגר של האנושות לחקור את מאדים, מהמשימות הראשונות ועד הרוברים שפועלים היום.",
                es: "Este vídeo de la NASA repasa la larga y difícil búsqueda de la humanidad por explorar Marte, desde las primeras misiones hasta los róveres que funcionan hoy.",
                fr: "Cette vidéo de la NASA retrace la longue et difficile quête de l’humanité pour explorer Mars, des premières missions aux rovers en activité aujourd’hui."
            }
        ],
        video: {
            title: {en: "Watch: The Journey to Mars", ru: "Смотрите: путь к Марсу", he: "צפו: המסע למאדים", es: "Mira: el viaje a Marte", fr: "À voir : le voyage vers Mars"},
            src: "https://www.youtube.com/embed/f_sSzn87ljM?si=dNqf-ZqTanwfrBZv"
        }
    },
    {
        tag: "article",
        badge: VIDEO_BADGE,
        title: {en: "Mars: The Next Frontier", ru: "Марс: следующий рубеж", he: "מאדים: הגבול הבא", es: "Marte: la próxima frontera", fr: "Mars : la prochaine frontière"},
        paragraphs: [
            {
                en: "Another NASA documentary highlighting humanity's future plans for Mars exploration.",
                ru: "Ещё один документальный фильм NASA — о планах человечества на будущее исследование Марса.",
                he: "סרט תיעודי נוסף של NASA, על התוכניות העתידיות של האנושות לחקור את מאדים.",
                es: "Otro documental de la NASA sobre los planes de la humanidad para la futura exploración de Marte.",
                fr: "Un autre documentaire de la NASA consacré aux projets de l’humanité pour l’exploration future de Mars."
            }
        ],
        video: {
            title: {en: "Mars: The Next Frontier", ru: "Марс: следующий рубеж", he: "מאדים: הגבול הבא", es: "Marte: la próxima frontera", fr: "Mars : la prochaine frontière"},
            src: "https://www.youtube.com/embed/YBLdc2gXwyU?si=OqyPLXM7A2vys5Fz"
        }
    }
];

// 2. Функция для создания элементов на странице
function generateHistoryContent() {
    const mainContainer = document.querySelector('main');
    // Строка — одинаковая во всех языках (год, NASA), объект — с переводами
    const pick = value => (value && typeof value === 'object') ? (window.i18n ? window.i18n.pick(value) : value.en) : value;

    historyData.forEach(item => {
        const article = document.createElement('article');
        article.className = 'card';

        if (item.badge) {
            const badge = document.createElement('span');
            badge.className = 'badge-abs';
            badge.textContent = pick(item.badge);
            article.appendChild(badge);
        }

        const title = document.createElement('h2');
        title.textContent = pick(item.title);
        article.appendChild(title);

        if (item.img) {
            const img = document.createElement('img');
            img.src = item.img.src;
            img.alt = pick(item.img.alt);
            img.title = pick(item.img.title);
            img.className = item.img.className;
            article.appendChild(img);
        }

        if (item.gif) {
            const gif = document.createElement('img');
            gif.src = item.gif.animatedSrc;
            gif.alt = pick(item.gif.alt);
            gif.className = item.gif.className; // ИЗМЕНЕНО: теперь класс берется из данных
            article.appendChild(gif);
        }

        if (item.paragraphs) {
            item.paragraphs.forEach(paragraphText => {
                const p = document.createElement('p');
                p.textContent = pick(paragraphText);
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
                th.textContent = pick(headerText);
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            item.table.rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach((cell, index) => {
                    const td = document.createElement('td');
                    td.textContent = pick(cell);
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            // Обёртка с горизонтальной прокруткой: на телефоне широкая таблица не растягивает страницу
            const tableWrap = document.createElement('div');
            tableWrap.className = 'table-responsive';
            // Прокручиваемую область должно быть можно прокрутить и с клавиатуры: фокус Tab и имя для экранного диктора
            tableWrap.tabIndex = 0;
            tableWrap.setAttribute('role', 'region');
            tableWrap.setAttribute('aria-label', article.querySelector('h2, h3')?.textContent?.trim() || document.title);
            tableWrap.appendChild(table);
            article.appendChild(tableWrap);
        }

        if (item.video) {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'figure-wrap';

            const iframe = document.createElement('iframe');
            iframe.src = item.video.src;
            iframe.title = pick(item.video.title);
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
