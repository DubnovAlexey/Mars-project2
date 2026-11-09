// photos.js
// Галерея. Подпись к каждому снимку — на пяти языках ({en, ru, he, es, fr}); она же alt картинки.
const galleryPhotos = [
    {
        src: "Images/mars-2.webp",
        alt: {
            en: "A colourful layered crater wall, seen from orbit",
            ru: "Пёстрая слоистая стена кратера, вид с орбиты",
            he: "קיר מכתש צבעוני ושכבתי, במבט מהמסלול",
            es: "La pared estratificada y colorida de un cráter, vista desde la órbita",
            fr: "La paroi colorée et stratifiée d’un cratère, vue depuis l’orbite"
        }
    },
    {
        src: "Images/mars-3.webp",
        alt: {
            en: "Layered, wind-carved ground, seen from orbit",
            ru: "Слоистая поверхность, выточенная ветром, вид с орбиты",
            he: "קרקע שכבתית שעיצבה הרוח, במבט מהמסלול",
            es: "Terreno estratificado y esculpido por el viento, visto desde la órbita",
            fr: "Un sol stratifié, sculpté par le vent, vu depuis l’orbite"
        }
    },
    {
        src: "Images/mars-4.webp",
        alt: {
            en: "Sand dunes with patches of frost",
            ru: "Песчаные дюны с пятнами инея",
            he: "דיונות חול עם כתמי כפור",
            es: "Dunas de arena con manchas de escarcha",
            fr: "Des dunes de sable parsemées de givre"
        }
    },
    {
        src: "Images/mars-5.webp",
        alt: {
            en: "Steep slopes with dark and bright streaks, seen from orbit",
            ru: "Крутые склоны с тёмными и светлыми полосами, вид с орбиты",
            he: "מדרונות תלולים עם פסים כהים ובהירים, במבט מהמסלול",
            es: "Laderas empinadas con franjas oscuras y claras, vistas desde la órbita",
            fr: "Des pentes raides striées de bandes sombres et claires, vues depuis l’orbite"
        }
    },
    {
        src: "Images/mars-6.webp",
        alt: {
            en: "Dark spots on seasonal ice as it thaws in spring",
            ru: "Тёмные пятна на сезонном льду, который тает весной",
            he: "כתמים כהים על קרח עונתי כשהוא מפשיר באביב",
            es: "Manchas oscuras sobre el hielo estacional cuando se derrite en primavera",
            fr: "Des taches sombres sur la glace saisonnière qui fond au printemps"
        }
    },
    {
        src: "Images/mars-7.jpg",
        alt: {
            en: "Artist's view: ancient Mars with lakes",
            ru: "Взгляд художника: древний Марс с озёрами",
            he: "בעיני האמן: מאדים הקדום עם אגמים",
            es: "Visión artística: el Marte antiguo con lagos",
            fr: "Vue d’artiste : Mars primitive et ses lacs"
        }
    },
    {
        src: "Images/mars-8.jpg",
        alt: {
            en: "Artist's view: water on ancient Mars at sunrise",
            ru: "Взгляд художника: вода на древнем Марсе на рассвете",
            he: "בעיני האמן: מים על מאדים הקדום בזריחה",
            es: "Visión artística: agua en el Marte antiguo al amanecer",
            fr: "Vue d’artiste : de l’eau sur Mars primitive au lever du soleil"
        }
    },
    {
        src: "Images/mars-9.webp",
        alt: {
            en: "Dunes meeting layered ice deposits",
            ru: "Дюны у края слоистых ледяных отложений",
            he: "דיונות פוגשות משקעי קרח שכבתיים",
            es: "Dunas que se encuentran con depósitos de hielo estratificados",
            fr: "Des dunes au contact de dépôts de glace stratifiés"
        }
    },
    {
        src: "Images/OSIRIS_Mars_true_color.webp",
        alt: {
            en: "Mars in true colour, photographed by the OSIRIS camera of ESA's Rosetta probe",
            ru: "Марс в естественных цветах, снимок камеры OSIRIS зонда Rosetta Европейского космического агентства",
            he: "מאדים בצבעיו האמיתיים, בצילום מצלמת OSIRIS של הגשושית Rosetta של סוכנות החלל האירופית",
            es: "Marte en color real, fotografiado por la cámara OSIRIS de la sonda Rosetta de la ESA",
            fr: "Mars en couleurs réelles, photographiée par la caméra OSIRIS de la sonde Rosetta de l’ESA"
        }
    },
    {
        src: "Images/perseverance-sky-crane-landing.webp",
        alt: {
            en: "Perseverance hangs on the sky crane's cables seconds before touchdown, shot from the descent stage (NASA/JPL-Caltech)",
            ru: "Perseverance висит на тросах «небесного крана» за секунды до касания, снимок со ступени спуска (NASA/JPL-Caltech)",
            he: "Perseverance תלוי בכבלי „עגורן השמיים” שניות לפני הנגיעה בקרקע, בצילום משלב הירידה (NASA/JPL-Caltech)",
            es: "Perseverance cuelga de los cables de la grúa aérea segundos antes de tocar el suelo, fotografiado desde la etapa de descenso (NASA/JPL-Caltech)",
            fr: "Perseverance suspendu aux câbles de la grue céleste quelques secondes avant de toucher le sol, photographié depuis l’étage de descente (NASA/JPL-Caltech)"
        }
    },
    {
        src: "Images/pathfinder-sojourner-on-mars.webp",
        alt: {
            en: "Sojourner, the first Mars rover, among the rocks of Ares Vallis, seen from the Pathfinder lander in 1997 (NASA/JPL)",
            ru: "Sojourner, первый марсоход, среди камней долины Арес, снимок с посадочного модуля Pathfinder, 1997 год (NASA/JPL)",
            he: "Sojourner, הרובר הראשון במאדים, בין סלעי עמק ארס, בצילום מהנחתת Pathfinder ב־1997 (NASA/JPL)",
            es: "Sojourner, el primer róver marciano, entre las rocas de Ares Vallis, visto desde el módulo Pathfinder en 1997 (NASA/JPL)",
            fr: "Sojourner, le premier rover martien, parmi les rochers d’Ares Vallis, vu depuis l’atterrisseur Pathfinder en 1997 (NASA/JPL)"
        }
    },
    {
        src: "Images/1976-900x506.jpg",
        alt: {
            en: "Artist's view: a rocky shore on a wetter, ancient Mars",
            ru: "Взгляд художника: каменистый берег на древнем, более влажном Марсе",
            he: "בעיני האמן: חוף סלעי על מאדים קדום ולח יותר",
            es: "Visión artística: una orilla rocosa en un Marte antiguo más húmedo",
            fr: "Vue d’artiste : un rivage rocheux sur une Mars primitive plus humide"
        }
    },
    {
        src: "Images/opportunity-payson-ridge-erebus-crater.webp",
        alt: {
            en: "Payson Ridge on the rim of Erebus Crater, a panorama by NASA's Opportunity rover (NASA/JPL-Caltech/Cornell)",
            ru: "Гребень Пейсон на краю кратера Эребус, панорама марсохода NASA Opportunity (NASA/JPL-Caltech/Cornell)",
            he: "רכס פייסון בשפת מכתש ארבוס, פנורמה של הרובר Opportunity של NASA (NASA/JPL-Caltech/Cornell)",
            es: "La cresta Payson en el borde del cráter Erebus, panorámica del róver Opportunity de la NASA (NASA/JPL-Caltech/Cornell)",
            fr: "La crête Payson au bord du cratère Erebus, panorama du rover Opportunity de la NASA (NASA/JPL-Caltech/Cornell)"
        }
    },
    {
        src: "Images/AQAKdlL3vPHLWVX7KKeIoQ3VIaO6x4Qe--_y8yEJzsYyfE4YnSaOTuggo845KMGopsMZBkmBuCjEJpGq4zWlNSkPYAw.webp",
        alt: {
            en: "Illustration: a green Mars, with leafy plants growing on the red plains",
            ru: "Иллюстрация: зелёный Марс, на красных равнинах растут лиственные растения",
            he: "איור: מאדים ירוק, עם צמחים עבותים שגדלים על המישורים האדומים",
            es: "Ilustración: un Marte verde, con plantas frondosas que crecen en las llanuras rojas",
            fr: "Illustration : une Mars verte, où des plantes feuillues poussent dans les plaines rouges"
        }
    }

];


// 2. ФУНКЦИЯ ГЕНЕРАЦИИ СЕТКИ
function generateGallery() {
    console.log("Функция generateGallery успешно запущена!");
    const galleryContainer = document.querySelector('.gallery');
    const pick = window.i18n ? window.i18n.pick : value => value.en;

    if (!galleryContainer) {
        console.error("Контейнер .gallery не найден на странице!");
        return;
    }

    galleryContainer.innerHTML = ''; // Очищаем контейнер

    // Создаем ОДНУ общую строку для всей сетки
    const row = document.createElement('div');
    row.className = 'row g-3 justify-content-center'; // Ровные отступы Bootstrap; неполный последний ряд — по центру

    for (let i = 0; i < galleryPhotos.length; i++) {
        const photo = galleryPhotos[i];
        const text = pick(photo.alt);

        const colDiv = document.createElement('div');
        colDiv.className = 'col-4'; // По 3 штуки в ряд (4 из 12 колонок)

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = text;

        // w-100 растянет картинку на всю ширину, object-fit-cover красиво подрежет под один размер
        img.className = 'img-fluid w-100 object-fit-cover';
        img.style.height = '280px'; // Фиксированная высота для идеальной симметрии

        // Подпись под фото — тот же текст, что в alt, чтобы было видно, что на снимке
        const figure = document.createElement('figure');
        figure.className = 'gallery-figure';
        figure.appendChild(img);
        const caption = document.createElement('figcaption');
        caption.className = 'gallery-caption';
        caption.textContent = text;
        figure.appendChild(caption);

        colDiv.appendChild(figure);
        row.appendChild(colDiv);
    }

    galleryContainer.appendChild(row);
    console.log("Галерея успешно отрисована!");
}

// 3. Заставляем код работать при загрузке страницы
document.addEventListener('DOMContentLoaded', generateGallery);
