// js/index.js
// Главная страница. Тексты — на пяти языках ({en, ru, he, es, fr}); i18n.pick() берёт выбранный (js/i18n.js).

// 1. Данные для главной страницы
const indexData = {
    figure: {
        imgSrc: "./Images/mars-krater-zvezdy.webp",
        imgAlt: {en: "Mars with stars", ru: "Марс на фоне звёзд", he: "מאדים על רקע הכוכבים", es: "Marte entre las estrellas", fr: "Mars parmi les étoiles"},
        figcaption: {en: "Welcome to Mars", ru: "Добро пожаловать на Марс", he: "ברוכים הבאים למאדים", es: "Bienvenido a Marte", fr: "Bienvenue sur Mars"}
    },
    title: {en: "Welcome", ru: "Добро пожаловать", he: "ברוכים הבאים", es: "Bienvenidos", fr: "Bienvenue"},
    paragraphs: [
        {
            en: "Have you ever wondered what it would be like to stand on the surface of Mars and look up at a pale blue dot in the sky — our own Earth, hanging there like a faraway lantern? Mars is a planet of extremes and paradoxes. It's a world where the highest mountains in the solar system, like Olympus Mons, tower over vast plains, and ancient riverbeds suggest a watery past. It's a land of global dust storms that can obscure the entire planet for months and seasons that swing from warm, sunlit days to nights so cold that carbon dioxide freezes out of the atmosphere.",
            ru: "Вы когда-нибудь задумывались, каково это — стоять на поверхности Марса и смотреть вверх, на бледно-голубую точку в небе, нашу Землю, что висит там, словно далёкий фонарь? Марс — планета крайностей и парадоксов. Это мир, где самые высокие горы Солнечной системы, такие как гора Олимп, возвышаются над огромными равнинами, а древние русла рек намекают на водное прошлое. Это край глобальных пыльных бурь, способных на месяцы скрыть всю планету, и времён года, когда тёплые солнечные дни сменяются ночами настолько холодными, что углекислый газ вымерзает из атмосферы.",
            he: "תהיתם פעם איך זה לעמוד על פני מאדים ולהביט למעלה אל נקודה כחולה חיוורת בשמיים — כדור הארץ שלנו, תלוי שם כמו פנס רחוק? מאדים הוא כוכב לכת של קצוות ופרדוקסים. זהו עולם שבו ההרים הגבוהים ביותר במערכת השמש, כמו אולימפוס מונס, מתנשאים מעל מישורים עצומים, ואפיקי נהרות קדומים מרמזים על עבר מימי. זוהי ארץ של סופות אבק עולמיות שיכולות להסתיר את כל כוכב הלכת במשך חודשים, ושל עונות שנעות בין ימים חמים ושטופי שמש ללילות קרים כל כך, שפחמן דו־חמצני קופא ויורד מהאטמוספרה.",
            es: "¿Alguna vez te has preguntado cómo sería estar de pie sobre la superficie de Marte y mirar hacia arriba, a un pálido punto azul en el cielo: nuestra propia Tierra, colgada allí como un farol lejano? Marte es un planeta de extremos y paradojas. Es un mundo donde las montañas más altas del sistema solar, como el monte Olimpo, se alzan sobre vastas llanuras, y antiguos cauces de ríos sugieren un pasado con agua. Es una tierra de tormentas de polvo globales que pueden ocultar el planeta entero durante meses, y de estaciones que oscilan entre días cálidos y soleados y noches tan frías que el dióxido de carbono se congela y cae de la atmósfera.",
            fr: "Vous êtes-vous déjà demandé ce que l’on ressentirait, debout à la surface de Mars, en levant les yeux vers un pâle point bleu dans le ciel — notre propre Terre, suspendue là comme une lanterne lointaine ? Mars est une planète d’extrêmes et de paradoxes. C’est un monde où les plus hautes montagnes du Système solaire, comme Olympus Mons, dominent de vastes plaines, et où d’anciens lits de rivières évoquent un passé humide. C’est une terre de tempêtes de poussière planétaires capables de voiler la planète entière pendant des mois, et de saisons qui passent de journées chaudes et ensoleillées à des nuits si froides que le dioxyde de carbone gèle et tombe de l’atmosphère."
        },
        {
            en: "Mars has been a canvas for human imagination for centuries, from ancient myths and fiery omens in the night sky to science fiction epics of the 20th century. Once, we dreamed of canals built by alien civilizations; now we send high-tech rovers, landers, and orbiters to uncover the planet’s true story. It’s a world of frozen volcanoes taller than Mount Everest and of canyons so vast they would stretch across continents on Earth.",
            ru: "Веками Марс был холстом для человеческого воображения — от древних мифов и огненных знамений в ночном небе до научно-фантастических эпопей XX века. Когда-то мы мечтали о каналах, построенных инопланетными цивилизациями; теперь отправляем высокотехнологичные марсоходы, посадочные модули и орбитальные аппараты, чтобы узнать настоящую историю планеты. Это мир застывших вулканов выше Эвереста и каньонов настолько огромных, что на Земле они протянулись бы через целые континенты.",
            he: "במשך מאות שנים היה מאדים קנבס לדמיון האנושי — ממיתוסים עתיקים ואותות אש בשמי הלילה ועד אפוסים של מדע בדיוני במאה ה־20. פעם חלמנו על תעלות שבנו ציוויליזציות חייזריות; היום אנחנו שולחים רוברים, נחתות ומקיפים מתקדמים כדי לגלות את סיפורו האמיתי של כוכב הלכת. זהו עולם של הרי געש קפואים גבוהים מהאוורסט ושל קניונים עצומים כל כך, שעל פני כדור הארץ היו נמתחים לרוחב יבשות שלמות.",
            es: "Durante siglos, Marte ha sido un lienzo para la imaginación humana, desde los mitos antiguos y los presagios de fuego en el cielo nocturno hasta las epopeyas de ciencia ficción del siglo XX. Antes soñábamos con canales construidos por civilizaciones alienígenas; ahora enviamos róveres, módulos de aterrizaje y orbitadores de alta tecnología para descubrir la verdadera historia del planeta. Es un mundo de volcanes helados más altos que el Everest y de cañones tan enormes que en la Tierra cruzarían continentes enteros.",
            fr: "Depuis des siècles, Mars est une toile pour l’imagination humaine, des mythes antiques et des présages de feu dans le ciel nocturne jusqu’aux épopées de science-fiction du XXe siècle. Autrefois, nous rêvions de canaux bâtis par des civilisations extraterrestres ; aujourd’hui, nous envoyons des rovers, des atterrisseurs et des orbiteurs de pointe pour découvrir la véritable histoire de la planète. C’est un monde de volcans figés plus hauts que l’Everest et de canyons si vastes qu’ils traverseraient des continents entiers sur Terre."
        },
        {
            en: "Its thin atmosphere and bitter cold would make survival a challenge, yet it offers enough tantalizing hints of water — past and present — to keep scientists asking: could life have ever existed here?",
            ru: "Разреженная атмосфера и жестокий холод сделали бы выживание здесь настоящим испытанием, но планета даёт достаточно манящих намёков на воду — в прошлом и в настоящем, — чтобы учёные продолжали спрашивать: могла ли здесь когда-нибудь существовать жизнь?",
            he: "האטמוספרה הדלילה והקור העז היו הופכים את ההישרדות לאתגר, ובכל זאת הוא מציע די רמזים מגרים למים — בעבר ובהווה — כדי שמדענים ימשיכו לשאול: האם אי פעם התקיימו כאן חיים?",
            es: "Su atmósfera tenue y su frío extremo harían de la supervivencia un desafío, pero ofrece suficientes indicios tentadores de agua —pasada y presente— como para que los científicos sigan preguntándose: ¿pudo existir vida aquí alguna vez?",
            fr: "Son atmosphère ténue et son froid mordant feraient de la survie un défi, et pourtant elle offre assez d’indices alléchants d’eau — passée et présente — pour que les scientifiques continuent de se demander : la vie a-t-elle jamais existé ici ?"
        },
        {
            en: "Every mission to Mars is a gamble with physics, engineering, and human patience. The Red Planet has a habit of swallowing spacecraft — earning the nickname “the spacecraft graveyard” in the early years of exploration. Yet, with each failure came new lessons, and with each success came breathtaking views and groundbreaking data. The Soviet Mars 3, NASA’s Viking landers, the tireless Spirit and Opportunity rovers, and the high-tech Perseverance — they are all part of a long, unfolding story.",
            ru: "Каждая миссия на Марс — это пари с физикой, инженерией и человеческим терпением. Красная планета имеет привычку проглатывать космические аппараты: в первые годы исследований она даже получила прозвище «кладбище космических аппаратов». И всё же каждая неудача приносила новые уроки, а каждый успех — захватывающие виды и прорывные данные. Советский «Марс-3», посадочные модули Viking от NASA, неутомимые марсоходы Spirit и Opportunity и высокотехнологичный Perseverance — все они часть долгой истории, которая продолжается.",
            he: "כל משימה למאדים היא הימור עם הפיזיקה, ההנדסה והסבלנות האנושית. לכוכב הלכת האדום יש הרגל לבלוע חלליות — בשנות המחקר הראשונות הוא אף זכה לכינוי „בית הקברות של החלליות”. ובכל זאת, כל כישלון הביא לקחים חדשים, וכל הצלחה הביאה נופים עוצרי נשימה ונתונים פורצי דרך. „מארס 3” הסובייטית, נחתות ה־Viking של NASA, הרוברים הבלתי נלאים Spirit ו־Opportunity ו־Perseverance המתקדם — כולם חלק מסיפור ארוך שעדיין נכתב.",
            es: "Cada misión a Marte es una apuesta con la física, la ingeniería y la paciencia humana. El planeta rojo tiene la costumbre de tragarse naves espaciales, y en los primeros años de exploración se ganó el apodo de «cementerio de naves». Aun así, cada fracaso trajo nuevas lecciones y cada éxito, vistas impresionantes y datos revolucionarios. La soviética Mars 3, los módulos Viking de la NASA, los incansables róveres Spirit y Opportunity y el avanzado Perseverance forman parte de una larga historia que sigue escribiéndose.",
            fr: "Chaque mission vers Mars est un pari avec la physique, l’ingénierie et la patience humaine. La planète rouge a l’habitude d’avaler les engins spatiaux, au point d’avoir été surnommée « le cimetière des sondes » aux débuts de l’exploration. Pourtant, chaque échec a apporté de nouvelles leçons, et chaque succès des vues à couper le souffle et des données révolutionnaires. La sonde soviétique Mars 3, les atterrisseurs Viking de la NASA, les infatigables rovers Spirit et Opportunity et le très perfectionné Perseverance font tous partie d’une longue histoire qui continue de s’écrire."
        },
        {
            en: "In this project, we’ll journey through that story together. We’ll explore the missions, the myths, the photographs, and the human drive that pushes us toward this small, cold neighbor. Whether you’re here to learn about ancient Martian legends, to see real images from the planet’s surface, or to understand the science behind the exploration, you’ve landed in the right place. Welcome to the Newest Martian Chronicles — your gateway to the Red Planet.",
            ru: "В этом проекте мы вместе пройдём по этой истории. Мы рассмотрим миссии, мифы, фотографии и то человеческое стремление, что тянет нас к этому маленькому холодному соседу. Хотите ли вы узнать о древних марсианских легендах, увидеть настоящие снимки с поверхности планеты или понять науку, стоящую за её исследованием, — вы приземлились в правильном месте. Добро пожаловать в «Новейшие марсианские хроники» — ваши ворота на Красную планету.",
            he: "בפרויקט הזה נעבור יחד על הסיפור הזה. נכיר את המשימות, את המיתוסים, את התמונות ואת הדחף האנושי שמושך אותנו אל השכן הקטן והקר הזה. בין אם באתם ללמוד על אגדות מאדים עתיקות, לראות תמונות אמיתיות מפני כוכב הלכת או להבין את המדע שמאחורי החקירה — נחתתם במקום הנכון. ברוכים הבאים ל„כרוניקות המאדים החדשות” — השער שלכם לכוכב הלכת האדום.",
            es: "En este proyecto recorreremos juntos esa historia. Exploraremos las misiones, los mitos, las fotografías y el impulso humano que nos lleva hacia este vecino pequeño y frío. Tanto si has venido a conocer antiguas leyendas marcianas como a ver imágenes reales de la superficie del planeta o a entender la ciencia que hay detrás de su exploración, has aterrizado en el lugar adecuado. Bienvenido a Las novísimas crónicas marcianas, tu puerta de entrada al planeta rojo.",
            fr: "Dans ce projet, nous parcourrons ensemble cette histoire. Nous explorerons les missions, les mythes, les photographies et l’élan humain qui nous pousse vers ce petit voisin glacé. Que vous soyez venu découvrir d’anciennes légendes martiennes, voir de vraies images de la surface de la planète ou comprendre la science qui se cache derrière son exploration, vous avez atterri au bon endroit. Bienvenue dans Les toutes nouvelles chroniques martiennes — votre porte d’entrée vers la planète rouge."
        }
    ],
    // Курсивом — подсказка к пасхалке: марсиане на сайте не выносят нашу музыку
    note: {
        en: "P.S. Martians have been spotted at the edges of this site. The only weapon known to work against them is Earth music — so the player above is not just for atmosphere.",
        ru: "P.S. По краям этого сайта замечены марсиане. Единственное известное оружие против них — земная музыка, так что плеер наверху здесь не только для атмосферы.",
        he: "נ״ב: בקצוות האתר הזה נצפו חייזרים. הנשק היחיד שידוע שפועל נגדם הוא מוזיקה ארצית — כך שהנגן למעלה לא נמצא כאן רק בשביל האווירה.",
        es: "P. D.: Se han avistado marcianos en los bordes de este sitio. La única arma que se sabe que funciona contra ellos es la música terrestre, así que el reproductor de arriba no está solo para crear ambiente.",
        fr: "P.-S. Des martiens ont été repérés sur les bords de ce site. La seule arme connue contre eux est la musique terrestre — le lecteur ci-dessus n’est donc pas là que pour l’ambiance."
    }
};

// 2. Функция для динамической генерации контента
function generateIndexContent() {
    const mainContainer = document.querySelector('.home-intro');
    if (!mainContainer) return;
    const pick = window.i18n ? window.i18n.pick : value => value.en;

    // Очищаем контейнер, если в нем что-то есть
    mainContainer.innerHTML = '';

    // Создаем и добавляем элемент <figure> с изображением и подписью
    const figure = document.createElement('figure');
    figure.className = 'figure-planet';

    const img = document.createElement('img');
    img.className = 'planet-float';
    img.src = indexData.figure.imgSrc;
    img.alt = pick(indexData.figure.imgAlt);
    figure.appendChild(img);

    const figcaption = document.createElement('figcaption');
    figcaption.className = 'badge';
    figcaption.textContent = pick(indexData.figure.figcaption);
    figure.appendChild(figcaption);

    const orbitSpan = document.createElement('span');
    orbitSpan.className = 'orbit';
    orbitSpan.setAttribute('aria-hidden', 'true');
    figure.appendChild(orbitSpan);

    mainContainer.appendChild(figure);

    // Создаем и добавляем заголовок <h2>
    const h2 = document.createElement('h2');
    h2.textContent = pick(indexData.title);
    mainContainer.appendChild(h2);

    // Создаем и добавляем абзацы
    indexData.paragraphs.forEach(paragraphText => {
        const p = document.createElement('p');
        p.textContent = pick(paragraphText);
        mainContainer.appendChild(p);
    });

    // Курсивом — подсказка к пасхалке: марсиане на сайте не выносят нашу музыку
    const note = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = pick(indexData.note);
    note.appendChild(em);
    mainContainer.appendChild(note);
}

// 3. Запускаем функцию, когда страница полностью загружена
document.addEventListener('DOMContentLoaded', generateIndexContent);
