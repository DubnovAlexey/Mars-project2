// js/i18n.js
// Пять языков сайта: английский (исходный язык интерфейса), русский, иврит (справа налево), испанский, французский.
// Подключается в <head> каждой страницы ПЕРВЫМ скриптом: сразу ставит <html lang> и dir, чтобы страница
// не мигала английским и не перестраивалась слева направо. Остальным скриптам даёт:
//   i18n.t("ключ", {имя: значение}) — строка интерфейса из словаря UI ниже, с подстановкой {имя};
//   i18n.pick({en, ru, he, es, fr}) — свой текст страницы на выбранном языке (если нет — английский);
//   i18n.locale — локаль для дат и чисел; i18n.switchHTML() — переключатель для шапки (его вставляет common.js).
// Статичный текст в HTML помечается атрибутами data-i18n (текст), data-i18n-html (текст с <b>),
// data-i18n-aria, data-i18n-alt — они переводятся, когда страница загрузилась.
// Выбор языка: ?lang=xx в адресе → сохранённый в localStorage («mars:lang») → английский.
// Смена языка перезагружает страницу: музыка, как и при обычном переходе, продолжается с того же места.
// Французский: перед « : ; ? ! » и внутри кавычек « » — неразрывный пробел (U+00A0); это проверяет tests/i18n.test.mjs.

(function () {
    const LANGUAGES = [
        {code: "en", name: "English", locale: "en-US"},
        {code: "ru", name: "Русский", locale: "ru-RU"},
        {code: "he", name: "עברית", locale: "he-IL", rtl: true},
        {code: "es", name: "Español", locale: "es-ES"},
        {code: "fr", name: "Français", locale: "fr-FR"}
    ];
    const STORAGE_KEY = "mars:lang";
    const CODES = LANGUAGES.map(l => l.code);

    // НАЧАЛО РАЗДЕЛА 1 — какой язык показывать
    function detectLanguage() {
        let fromUrl = null;
        try { fromUrl = new URLSearchParams(location.search).get("lang"); } catch (e) {}
        if (CODES.includes(fromUrl)) {
            try { localStorage.setItem(STORAGE_KEY, fromUrl); } catch (e) {}
            return fromUrl;
        }
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (CODES.includes(saved)) return saved;
        } catch (e) {
            // хранилище запрещено — остаётся язык по умолчанию
        }
        return "en";
    }

    const lang = detectLanguage();
    const current = LANGUAGES.find(l => l.code === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = current.rtl ? "rtl" : "ltr";
    // КОНЕЦ РАЗДЕЛА 1

    // НАЧАЛО РАЗДЕЛА 2 — строки интерфейса (шапка, подвал, окна, статусы); тексты страниц лежат в их скриптах
    const UI = {
        "site.name": {
            en: "The Newest Martian Chronicles", ru: "Новейшие марсианские хроники", he: "כרוניקות המאדים החדשות",
            es: "Las novísimas crónicas marcianas", fr: "Les toutes nouvelles chroniques martiennes"
        },
        "nav.home": {en: "Home", ru: "Главная", he: "דף הבית", es: "Inicio", fr: "Accueil"},
        "nav.history": {en: "History", ru: "История", he: "היסטוריה", es: "Historia", fr: "Histoire"},
        "nav.myths": {en: "Myths", ru: "Мифы", he: "מיתוסים", es: "Mitos", fr: "Mythes"},
        "nav.photos": {en: "Photo", ru: "Фото", he: "תמונות", es: "Fotos", fr: "Photos"},
        "nav.videos": {en: "Videos", ru: "Видео", he: "סרטונים", es: "Vídeos", fr: "Vidéos"},
        "nav.rover": {en: "Rover", ru: "Марсоход", he: "רובר", es: "Róver", fr: "Rover"},
        "nav.about": {en: "About The Project", ru: "О проекте", he: "על הפרויקט", es: "Sobre el proyecto", fr: "À propos du projet"},
        "nav.mainAria": {en: "Main Navigation", ru: "Основная навигация", he: "ניווט ראשי", es: "Navegación principal", fr: "Navigation principale"},
        "nav.footerAria": {en: "Footer Navigation", ru: "Навигация в подвале", he: "ניווט בתחתית הדף", es: "Navegación del pie de página", fr: "Navigation du pied de page"},
        "tagline": {
            en: "From early flybys to modern rovers", ru: "От первых пролётов до современных марсоходов",
            he: "מהטיסות הראשונות ועד הרוברים של היום", es: "De los primeros sobrevuelos a los róveres actuales",
            fr: "Des premiers survols aux rovers d’aujourd’hui"
        },
        "lang.label": {en: "Language", ru: "Язык", he: "שפה", es: "Idioma", fr: "Langue"},
        "backToTop": {en: "⬆ Back to Top", ru: "⬆ Наверх", he: "⬆ לראש הדף", es: "⬆ Volver arriba", fr: "⬆ Haut de page"},

        "player.play": {en: "Play", ru: "Играть", he: "הפעלה", es: "Reproducir", fr: "Lecture"},
        "player.pause": {en: "Pause", ru: "Пауза", he: "השהיה", es: "Pausa", fr: "Pause"},
        "player.prev": {en: "Previous track", ru: "Предыдущий трек", he: "הרצועה הקודמת", es: "Pista anterior", fr: "Piste précédente"},
        "player.next": {en: "Next track", ru: "Следующий трек", he: "הרצועה הבאה", es: "Pista siguiente", fr: "Piste suivante"},
        "player.volume": {en: "Vol", ru: "Звук", he: "עוצמה", es: "Vol.", fr: "Vol."},
        "player.volumeAria": {en: "Music volume", ru: "Громкость музыки", he: "עוצמת המוזיקה", es: "Volumen de la música", fr: "Volume de la musique"},

        "footer.ask": {en: "Ask questions", ru: "Задать вопрос", he: "שאלו שאלה", es: "Hacer una pregunta", fr: "Poser une question"},
        "footer.comment": {en: "Leave your comments", ru: "Оставить отзыв", he: "השאירו תגובה", es: "Dejar un comentario", fr: "Laisser un commentaire"},
        "footer.donate": {
            en: "Donate to the Mars Expedition", ru: "Пожертвовать на марсианскую экспедицию", he: "תרומה למשלחת למאדים",
            es: "Donar a la expedición a Marte", fr: "Faire un don à l’expédition martienne"
        },
        "footer.materials": {en: "Send materials", ru: "Прислать материалы", he: "שליחת חומרים", es: "Enviar materiales", fr: "Envoyer des documents"},
        "footer.source": {en: "Source code on GitHub", ru: "Исходный код на GitHub", he: "קוד המקור ב־GitHub", es: "Código fuente en GitHub", fr: "Code source sur GitHub"},

        "modal.close": {en: "Close", ru: "Закрыть", he: "סגירה", es: "Cerrar", fr: "Fermer"},
        "modal.send": {en: "Send", ru: "Отправить", he: "שליחה", es: "Enviar", fr: "Envoyer"},
        "form.name": {en: "Your name", ru: "Ваше имя", he: "השם שלכם", es: "Tu nombre", fr: "Votre nom"},
        "form.email": {
            en: "Your email (for the answer)", ru: "Ваш email (для ответа)", he: "הדוא״ל שלכם (לתשובה)",
            es: "Tu correo electrónico (para la respuesta)", fr: "Votre e-mail (pour la réponse)"
        },
        "ask.title": {en: "Ask a Question", ru: "Задать вопрос", he: "שאלו שאלה", es: "Haz una pregunta", fr: "Poser une question"},
        "ask.question": {en: "Your question", ru: "Ваш вопрос", he: "השאלה שלכם", es: "Tu pregunta", fr: "Votre question"},
        "comment.title": {en: "Leave Your Comments", ru: "Оставить отзыв", he: "השאירו תגובה", es: "Deja tu comentario", fr: "Laissez un commentaire"},
        "comment.text": {en: "Your comments", ru: "Ваш отзыв", he: "התגובה שלכם", es: "Tu comentario", fr: "Votre commentaire"},
        "comment.photo": {
            en: "Add a photo (optional)", ru: "Добавить фото (необязательно)", he: "הוספת תמונה (לא חובה)",
            es: "Añadir una foto (opcional)", fr: "Ajouter une photo (facultatif)"
        },
        "donate.note": {
            en: "Demo form for a study project: card details are checked in the browser and are <b>never sent anywhere</b>. No payment is made.",
            ru: "Демонстрационная форма учебного проекта: данные карты проверяются в браузере и <b>никуда не отправляются</b>. Оплата не производится.",
            he: "טופס הדגמה של פרויקט לימודי: פרטי הכרטיס נבדקים בדפדפן <b>ולא נשלחים לשום מקום</b>. לא מתבצע תשלום.",
            es: "Formulario de demostración de un proyecto de estudio: los datos de la tarjeta se comprueban en el navegador y <b>nunca se envían a ninguna parte</b>. No se realiza ningún pago.",
            fr: "Formulaire de démonstration d’un projet d’étude : les données de la carte sont vérifiées dans le navigateur et ne sont <b>jamais envoyées nulle part</b>. Aucun paiement n’est effectué."
        },
        "donate.card": {en: "Card Number", ru: "Номер карты", he: "מספר הכרטיס", es: "Número de tarjeta", fr: "Numéro de carte"},
        "donate.expiry": {en: "Expiry Date", ru: "Срок действия", he: "תוקף", es: "Fecha de caducidad", fr: "Date d’expiration"},
        "donate.expiryPlaceholder": {en: "MM/YY", ru: "ММ/ГГ", he: "MM/YY", es: "MM/AA", fr: "MM/AA"},
        "donate.cvv": {en: "CVV Code", ru: "Код CVV", he: "קוד CVV", es: "Código CVV", fr: "Code CVV"},
        "donate.holder": {en: "Cardholder Name", ru: "Имя владельца карты", he: "שם בעל הכרטיס", es: "Nombre del titular", fr: "Nom du titulaire"},
        "donate.amount": {en: "Donation Amount", ru: "Сумма пожертвования", he: "סכום התרומה", es: "Importe de la donación", fr: "Montant du don"},
        "donate.amountPlaceholder": {en: "e.g., 10", ru: "например, 10", he: "למשל 10", es: "p. ej., 10", fr: "p. ex. 10"},
        "materials.title": {en: "Send Materials", ru: "Прислать материалы", he: "שליחת חומרים", es: "Enviar materiales", fr: "Envoyer des documents"},
        "materials.description": {
            en: "Materials description", ru: "Описание материалов", he: "תיאור החומרים",
            es: "Descripción de los materiales", fr: "Description des documents"
        },
        "materials.files": {
            en: "Files: photos, documents, video (optional, up to 5 files, 10 MB in total)",
            ru: "Файлы: фото, документы, видео (необязательно, до 5 файлов, всего до 10 МБ)",
            he: "קבצים: תמונות, מסמכים, וידאו (לא חובה, עד 5 קבצים, עד 10 MB בסך הכול)",
            es: "Archivos: fotos, documentos, vídeo (opcional, hasta 5 archivos, 10 MB en total)",
            fr: "Fichiers : photos, documents, vidéo (facultatif, jusqu’à 5 fichiers, 10 Mo au total)"
        },

        "form.tooMany": {
            en: "Please choose up to {max} files.", ru: "Выберите не больше {max} файлов.", he: "אפשר לבחור עד {max} קבצים.",
            es: "Elige como máximo {max} archivos.", fr: "Choisissez {max} fichiers au maximum."
        },
        "form.tooBig": {
            en: "The files are larger than 10 MB in total.", ru: "Файлы вместе занимают больше 10 МБ.", he: "הקבצים יחד גדולים מ־10 MB.",
            es: "Los archivos superan los 10 MB en total.", fr: "Les fichiers dépassent 10 Mo au total."
        },
        "unit.mb": {en: "MB", ru: "МБ", he: "MB", es: "MB", fr: "Mo"},
        "form.badCard": {
            en: "Please check the card number.", ru: "Проверьте номер карты.", he: "בדקו את מספר הכרטיס.",
            es: "Revisa el número de la tarjeta.", fr: "Vérifiez le numéro de carte."
        },
        "form.badExpiry": {
            en: "Use the MM/YY format and a date in the future.", ru: "Используйте формат ММ/ГГ и дату в будущем.",
            he: "השתמשו בתבנית MM/YY ובתאריך עתידי.", es: "Usa el formato MM/AA y una fecha futura.",
            fr: "Utilisez le format MM/AA et une date à venir."
        },
        "form.badCvv": {
            en: "CVV is 3 or 4 digits.", ru: "CVV — это 3 или 4 цифры.", he: "CVV הוא 3 או 4 ספרות.",
            es: "El CVV tiene 3 o 4 dígitos.", fr: "Le CVV comporte 3 ou 4 chiffres."
        },
        "form.busy": {
            en: "Another message is still being submitted. Please wait.", ru: "Предыдущее сообщение ещё отправляется. Подождите, пожалуйста.",
            he: "הודעה קודמת עדיין נשלחת. אנא המתינו.", es: "Todavía se está enviando otro mensaje. Espera, por favor.",
            fr: "Un autre message est encore en cours d’envoi. Veuillez patienter."
        },
        "form.submitted": {
            en: "Your browser submitted the form. Delivery has not been confirmed; keep a copy of your message.",
            ru: "Браузер отправил форму. Доставка не подтверждена — сохраните копию сообщения.",
            he: "הדפדפן שלח את הטופס. המסירה לא אושרה; שמרו עותק של ההודעה.",
            es: "Tu navegador ha enviado el formulario. La entrega no está confirmada; guarda una copia de tu mensaje.",
            fr: "Votre navigateur a envoyé le formulaire. La livraison n’est pas confirmée ; gardez une copie de votre message."
        },
        "form.unconfirmed": {
            en: "Delivery could not be confirmed. Your fields are preserved; please try again later.",
            ru: "Не удалось подтвердить доставку. Заполненные поля сохранены — попробуйте позже.",
            he: "לא ניתן היה לאשר את המסירה. השדות נשמרו; נסו שוב מאוחר יותר.",
            es: "No se pudo confirmar la entrega. Tus datos se conservan; inténtalo de nuevo más tarde.",
            fr: "La livraison n’a pas pu être confirmée. Vos champs sont conservés ; réessayez plus tard."
        },
        "form.demoThanks": {
            en: "Thank you! This is a demo: nothing was charged and no card data left your browser.",
            ru: "Спасибо! Это демо: ничего не списано, и данные карты не покидали браузер.",
            he: "תודה! זו הדגמה: שום סכום לא חויב ופרטי הכרטיס לא יצאו מהדפדפן.",
            es: "¡Gracias! Es una demo: no se ha cobrado nada y los datos de la tarjeta no han salido de tu navegador.",
            fr: "Merci ! C’est une démo : rien n’a été débité et aucune donnée de carte n’a quitté votre navigateur."
        },
        "form.notConnected": {
            en: "Sending is not connected yet. Please try again later.", ru: "Отправка пока не подключена. Попробуйте позже.",
            he: "השליחה עדיין לא מחוברת. נסו שוב מאוחר יותר.", es: "El envío todavía no está conectado. Inténtalo más tarde.",
            fr: "L’envoi n’est pas encore branché. Réessayez plus tard."
        },
        "form.sending": {en: "Sending…", ru: "Отправляем…", he: "שולחים…", es: "Enviando…", fr: "Envoi en cours…"},

        "myths.title": {
            en: "10 myths about Mars that many people believe — and they shouldn’t",
            ru: "10 мифов о Марсе, в которые многие верят. А зря",
            he: "10 מיתוסים על מאדים שרבים מאמינים בהם. וחבל",
            es: "10 mitos sobre Marte en los que mucha gente cree. Y no debería",
            fr: "10 mythes sur Mars auxquels beaucoup croient. À tort"
        },
        "myths.more": {en: "...Learn More", ru: "…Подробнее", he: "…לפרטים נוספים", es: "…Saber más", fr: "…En savoir plus"},
        "youtube.title": {
            en: "YouTube video player", ru: "Видеоплеер YouTube", he: "נגן וידאו של YouTube",
            es: "Reproductor de vídeo de YouTube", fr: "Lecteur vidéo YouTube"
        },
        "photos.title": {en: "Photo Gallery", ru: "Фотогалерея", he: "גלריית תמונות", es: "Galería de fotos", fr: "Galerie de photos"},
        "about.text": {
            en: "Information about the project", ru: "Информация о проекте", he: "מידע על הפרויקט",
            es: "Información sobre el proyecto", fr: "Informations sur le projet"
        },
        "about.bgAlt": {en: "Mars background", ru: "Марсианский фон", he: "רקע של מאדים", es: "Fondo de Marte", fr: "Fond martien"},

        "videos.title": {
            en: "NASA Videos about Mars", ru: "Видео NASA о Марсе", he: "סרטוני NASA על מאדים",
            es: "Vídeos de la NASA sobre Marte", fr: "Vidéos de la NASA sur Mars"
        },
        "videos.intro": {
            en: "Landings, drives, flights and plans for the future — straight from the open NASA Image and Video Library. Every video opens here, on this page, and the background music pauses while you watch.",
            ru: "Посадки, поездки, полёты и планы на будущее — прямо из открытой библиотеки NASA Image and Video Library. Каждое видео открывается здесь, на этой странице, а фоновая музыка на время просмотра встаёт на паузу.",
            he: "נחיתות, נסיעות, טיסות ותוכניות לעתיד — ישירות מהספרייה הפתוחה NASA Image and Video Library. כל סרטון נפתח כאן, בדף הזה, ומוזיקת הרקע נעצרת בזמן הצפייה.",
            es: "Aterrizajes, recorridos, vuelos y planes de futuro, directamente de la biblioteca abierta NASA Image and Video Library. Cada vídeo se abre aquí, en esta página, y la música de fondo se pausa mientras lo ves.",
            fr: "Atterrissages, trajets, vols et projets d’avenir — directement depuis la bibliothèque ouverte NASA Image and Video Library. Chaque vidéo s’ouvre ici, sur cette page, et la musique de fond se met en pause pendant que vous regardez."
        },
        "videos.watch": {en: "▶ Watch", ru: "▶ Смотреть", he: "▶ צפייה", es: "▶ Ver", fr: "▶ Regarder"},
        // Под описанием видео: перевод сделал переводчик браузера — или его нет, и текст остался английским
        "videos.machine": {
            en: "Machine translation by the browser.", ru: "Перевод машинный — переводчиком браузера.", he: "תרגום מכונה — של הדפדפן.",
            es: "Traducción automática del navegador.", fr: "Traduction automatique du navigateur."
        },
        "videos.translating": {
            en: "Translating the description with the browser…", ru: "Перевожу описание переводчиком браузера…", he: "מתרגם את התיאור בעזרת הדפדפן…",
            es: "Traduciendo la descripción con el navegador…", fr: "Traduction de la description par le navigateur…"
        },
        "videos.englishOnly": {
            en: "The NASA description is in English: this browser cannot translate by itself.", ru: "Описание от NASA — на английском: этот браузер не умеет переводить сам.",
            he: "התיאור של NASA באנגלית — הדפדפן הזה לא יודע לתרגם בעצמו.",
            es: "La descripción de la NASA está en inglés: este navegador no traduce por sí solo.",
            fr: "La description de la NASA est en anglais, ce navigateur ne sait pas traduire seul."
        },
        "videos.credit": {en: "Video: NASA", ru: "Видео: NASA", he: "וידאו: NASA", es: "Vídeo: NASA", fr: "Vidéo : NASA"},
        "videos.loadError": {
            en: "This video cannot be loaded right now. Try again later or open it in the NASA library: https://images.nasa.gov",
            ru: "Сейчас это видео не загружается. Попробуйте позже или откройте его в библиотеке NASA: https://images.nasa.gov",
            he: "לא ניתן לטעון את הסרטון כרגע. נסו שוב מאוחר יותר או פתחו אותו בספריית NASA: https://images.nasa.gov",
            es: "Ahora mismo no se puede cargar este vídeo. Inténtalo más tarde o ábrelo en la biblioteca de la NASA: https://images.nasa.gov",
            fr: "Impossible de charger cette vidéo pour le moment. Réessayez plus tard ou ouvrez-la dans la bibliothèque de la NASA : https://images.nasa.gov"
        },
        "videos.loading": {
            en: "Loading videos from NASA…", ru: "Загружаем видео NASA…", he: "טוענים סרטונים מ־NASA…",
            es: "Cargando vídeos de la NASA…", fr: "Chargement des vidéos de la NASA…"
        },
        "videos.empty": {
            en: "No videos found in this section yet.", ru: "В этом разделе пока нет видео.", he: "עדיין לא נמצאו סרטונים בפרק הזה.",
            es: "Todavía no hay vídeos en esta sección.", fr: "Aucune vidéo trouvée dans cette rubrique pour l’instant."
        },
        "videos.error": {
            en: "The NASA video library is not answering. Please try again later.", ru: "Видеотека NASA не отвечает. Попробуйте позже.",
            he: "ספריית הווידאו של NASA לא עונה. נסו שוב מאוחר יותר.", es: "La videoteca de la NASA no responde. Inténtalo más tarde.",
            fr: "La vidéothèque de la NASA ne répond pas. Réessayez plus tard."
        },

        "rover.title": {
            en: "Perseverance: Fresh Photos from Mars", ru: "Perseverance: свежие снимки с Марса", he: "Perseverance: תמונות טריות ממאדים",
            es: "Perseverance: fotos recientes de Marte", fr: "Perseverance : photos fraîches de Mars"
        },
        "rover.intro": {
            en: "NASA's Perseverance rover sends new pictures every Martian day (a <b>sol</b>). These are raw frames, the way they arrive from Jezero Crater: some are black-and-white, some are small test shots. Choose a camera and click a photo to see it large.",
            ru: "Марсоход NASA Perseverance присылает новые снимки каждый марсианский день (<b>сол</b>). Это «сырые» кадры — такие, какими они приходят из кратера Езеро: одни чёрно-белые, другие — маленькие пробные снимки. Выберите камеру и нажмите на снимок, чтобы увидеть его крупно.",
            he: "הרובר Perseverance של NASA שולח תמונות חדשות בכל יום מאדים (<b>סול</b>). אלה פריימים גולמיים, כפי שהם מגיעים ממכתש ג׳זרו: חלקם בשחור־לבן, חלקם צילומי ניסיון קטנים. בחרו מצלמה ולחצו על תמונה כדי לראות אותה בגדול.",
            es: "El róver Perseverance de la NASA envía fotos nuevas cada día marciano (un <b>sol</b>). Son fotogramas sin procesar, tal como llegan del cráter Jezero: algunos en blanco y negro, otros pequeñas tomas de prueba. Elige una cámara y haz clic en una foto para verla en grande.",
            fr: "Le rover Perseverance de la NASA envoie de nouvelles images chaque jour martien (un <b>sol</b>). Ce sont des images brutes, telles qu’elles arrivent du cratère Jezero : certaines en noir et blanc, d’autres de petits clichés d’essai. Choisissez une caméra et cliquez sur une photo pour l’agrandir."
        },
        "rover.camerasAria": {en: "Rover cameras", ru: "Камеры марсохода", he: "מצלמות הרובר", es: "Cámaras del róver", fr: "Caméras du rover"},
        "rover.more": {en: "Show more photos", ru: "Показать ещё снимки", he: "עוד תמונות", es: "Mostrar más fotos", fr: "Afficher plus de photos"},
        "rover.full": {
            en: "Open the full-resolution image", ru: "Открыть снимок в полном разрешении", he: "פתיחת התמונה ברזולוציה מלאה",
            es: "Abrir la imagen a resolución completa", fr: "Ouvrir l’image en pleine résolution"
        },
        "rover.allCameras": {en: "All cameras", ru: "Все камеры", he: "כל המצלמות", es: "Todas las cámaras", fr: "Toutes les caméras"},
        "rover.sol": {en: "Sol {sol}", ru: "Сол {sol}", he: "סול {sol}", es: "Sol {sol}", fr: "Sol {sol}"},
        "rover.photoAlt": {
            en: "Perseverance, sol {sol}: {camera}", ru: "Perseverance, сол {sol}: {camera}", he: "Perseverance, סול {sol}: {camera}",
            es: "Perseverance, sol {sol}: {camera}", fr: "Perseverance, sol {sol} : {camera}"
        },
        "rover.taken": {
            en: "Taken {date} (Earth date) · Image: {credit}", ru: "Снято {date} (земная дата) · Снимок: {credit}",
            he: "צולם ב־{date} (תאריך ארצי) · תמונה: {credit}", es: "Tomada el {date} (fecha terrestre) · Imagen: {credit}",
            fr: "Prise le {date} (date terrestre) · Image : {credit}"
        },
        "rover.showingEarlier": {
            en: "Showing earlier photos while fresh ones arrive from NASA…",
            ru: "Пока свежие снимки идут от NASA, показываем прежние…",
            he: "מציגים תמונות קודמות בזמן שהחדשות מגיעות מ־NASA…",
            es: "Mostramos fotos anteriores mientras llegan las nuevas de la NASA…",
            fr: "Affichage de photos précédentes en attendant les nouvelles de la NASA…"
        },
        "rover.loading": {
            en: "Loading fresh photos from NASA — the feed is slow, it can take up to 20 seconds…",
            ru: "Загружаем свежие снимки NASA — лента медленная, это может занять до 20 секунд…",
            he: "טוענים תמונות טריות מ־NASA — הפיד איטי, זה עשוי לקחת עד 20 שניות…",
            es: "Cargando fotos recientes de la NASA: el servicio es lento y puede tardar hasta 20 segundos…",
            fr: "Chargement des photos fraîches de la NASA — le flux est lent, cela peut prendre jusqu’à 20 secondes…"
        },
        "rover.none": {
            en: "No photos from this camera yet.", ru: "С этой камеры пока нет снимков.", he: "עדיין אין תמונות מהמצלמה הזו.",
            es: "Todavía no hay fotos de esta cámara.", fr: "Pas encore de photos de cette caméra."
        },
        "rover.summary": {
            en: "{camera}: {count} photos in the NASA archive. Newest first — {latest}.",
            ru: "{camera}: снимков в архиве NASA — {count}. Сначала новые — {latest}.",
            he: "{camera}: {count} תמונות בארכיון של NASA. החדשות קודם — {latest}.",
            es: "{camera}: {count} fotos en el archivo de la NASA. Primero las más recientes: {latest}.",
            fr: "{camera} : {count} photos dans les archives de la NASA. Les plus récentes d’abord — {latest}."
        },
        "rover.feedDownEarlier": {
            en: "The NASA photo feed is not answering right now — these are earlier photos.",
            ru: "Лента снимков NASA сейчас не отвечает — это прежние снимки.",
            he: "פיד התמונות של NASA לא עונה כרגע — אלה תמונות קודמות.",
            es: "El servicio de fotos de la NASA no responde ahora mismo: estas son fotos anteriores.",
            fr: "Le flux de photos de la NASA ne répond pas pour le moment — voici des photos précédentes."
        },
        "rover.feedDown": {
            en: "The NASA photo feed is not answering. Please try again later.", ru: "Лента снимков NASA не отвечает. Попробуйте позже.",
            he: "פיד התמונות של NASA לא עונה. נסו שוב מאוחר יותר.", es: "El servicio de fotos de la NASA no responde. Inténtalo más tarde.",
            fr: "Le flux de photos de la NASA ne répond pas. Réessayez plus tard."
        }
    };
    // КОНЕЦ РАЗДЕЛА 2

    // НАЧАЛО РАЗДЕЛА 3 — функции для остальных скриптов
    function pick(value) {
        if (value && typeof value === "object") return value[lang] ?? value.en ?? "";
        return value ?? "";
    }

    function t(key, vars) {
        let text = UI[key] ? pick(UI[key]) : key;
        if (vars) text = text.replace(/\{(\w+)\}/g, (token, name) => Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : token);
        return text;
    }

    // Статичный текст из HTML: переводим по атрибутам (data-i18n-html — только наши строки со <b>, не данные извне)
    function apply(root) {
        root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
        root.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
        root.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
        root.querySelectorAll("[data-i18n-alt]").forEach(el => el.setAttribute("alt", t(el.dataset.i18nAlt)));
        root.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder)));
    }

    // Новый язык запоминается, а страница перезагружается без ?lang= в адресе
    function setLanguage(code) {
        if (!CODES.includes(code) || code === lang) return;
        let saved = true;
        try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { saved = false; }
        const url = new URL(location.href);
        if (saved) url.searchParams.delete("lang");
        else url.searchParams.set("lang", code); // без хранилища язык живёт в адресе
        url.hash = "";
        if (url.href === location.href.split("#")[0]) location.reload();
        else location.replace(url.href);
    }

    // Переключатель для шапки: значок-глобус и список из пяти языков, каждый подписан на своём языке
    function switchHTML() {
        const options = LANGUAGES.map(l =>
            `<option value="${l.code}" lang="${l.code}"${l.rtl ? ' dir="rtl"' : ""}${l.code === lang ? " selected" : ""}>${l.name}</option>`).join("");
        return `<label class="lang-switch"><svg class="lang-switch__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z"/></svg><select id="site-lang" aria-label="${t("lang.label")}">${options}</select></label>`;
    }

    window.i18n = {lang, locale: current.locale, languages: LANGUAGES, rtl: !!current.rtl, UI, t, pick, apply, setLanguage, switchHTML};
    document.addEventListener("DOMContentLoaded", () => apply(document));
    // КОНЕЦ РАЗДЕЛА 3
})();
