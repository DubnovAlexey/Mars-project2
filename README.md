# The Newest Martian Chronicles

[English](#english) · [Русский](#russian) · [עברית](#hebrew)

<a name="english"></a>

## English

A seven-page site about Mars: its history of exploration from early flybys to modern rovers, myths about the red planet, a photo gallery, NASA videos, fresh photos from the Perseverance rover and a page about the project. Built with HTML, CSS, Bootstrap and plain JavaScript.

**Live demo:** https://dubnovalexey.github.io/Mars-project2/

### Quick tour

Browse History/Myths, open a NASA video, then try the Rover camera filter and enlarged image. Close the video to check that playback stops; keep optional background audio under your control.

Start with `js/data.js` and `js/common.js`, then `js/nasa.js`, `js/rover.js` and `js/forms.js`. NASA responses and media depend on the network. FormSubmit delivery is not verified by the browser; the donation form is a local validation demonstration.

The language links above switch the documentation; they do not translate the existing demo interface.

### Features

- Seven pages: Home, History, Myths, Photo, Videos, Rover and About The Project.
- **Videos:** Mars videos from the open NASA Image and Video Library (no API key), grouped by mission; a video plays in a window on the page, and the background music pauses meanwhile.
- **Rover:** the newest raw photos from NASA's Perseverance rover with the sol, the camera and NASA's own caption; a camera filter, "show more" and a large view. Answers are cached for an hour, and a slow or silent NASA server gets a clear message.
- One shared script builds the header, navigation, footer and Bootstrap modals for every page, so the layout is written once.
- Page content (texts, tables, embedded videos, playlists) comes from a data file and is rendered with DOM methods.
- A background music player with a playlist, next / previous and volume. While music plays, moving to another page continues the same track from the same second; if the browser blocks sound on the new page, it starts on the first click or key press.
- Modal forms: ask a question, leave a comment with a photo, send materials with files (up to 5 files, 10 MB), with previews and checks. Messages go by email through FormSubmit, without a server of my own. The "donate to the Mars expedition" form is a demo: the card number is checked in the browser (Luhn algorithm) and is never sent anywhere.
- Every photo in the gallery has its own caption; the myths show the image credits.
- **Martians, a black-humour easter egg** in the spirit of Tim Burton's *Mars Attacks!* (my own SVG drawing, not taken from the film): with the music off they peek out of the screen edges and hide; once the music plays they dance, and their heads pop into pink brain splashes and green goo that melt away. They never block clicks and stay away for visitors who prefer reduced motion. Myth 10 tells the story of the film.
- Responsive: on a phone the menu and the player wrap to new lines, videos and tables fit the screen.

Form submissions use FormSubmit. A browser frame loading does not prove that an email was delivered, so submitted fields remain available while delivery is unconfirmed.

### Music

In the player the tracks have Martian names. The real tracks are:

- Mars Breeze — Kawtar Sadik, Rabab Najid, Jarl Flamar and others, "DABA (Jarl Flamar Remix)"
- Red Plains — Ugress, "The Ghost You Choose to Be"
- Orbit Echo — Melokind, "Down On Me"
- Dust Trail — Amanati & Roniit, "Slow"
- Night Crater — HÆLOS, "Pray"

The music belongs to its authors and is used only in this non-commercial study project. If you hold the rights to a track and want it removed, please open an issue and I will remove it.

### Tech stack

HTML5 · CSS3 · Bootstrap 5 · JavaScript (DOM, data-driven rendering) · GitHub Pages

### What I practised

- Separating data from markup: one renderer, many pages.
- Reusable layout parts injected by JavaScript.
- Responsive layout fixes: wrapping flex rows, fluid iframes with `aspect-ratio`, scrollable tables.

### Run locally

Serve the folder (for example `npx serve .`) and open the address it prints.

### Planned improvements

These are proposals, not currently implemented features.

- Visual: add consistent loading/empty states and locally sized images with credits; use a local Mars favicon.
- Engineering: validate external response schemas and test retry, cancellation and media cleanup across pages.
- Functionality: add a searchable mission timeline and saved Rover filters before considering an optional 3D globe.

---

<a name="russian"></a>

## Русский

**Новейшие марсианские хроники**

Сайт о Марсе из семи страниц: история исследования от первых пролётов до современных марсоходов, мифы о красной планете, фотогалерея и страница о проекте. Сделан на HTML, CSS, Bootstrap и чистом JavaScript.

**Демо:** https://dubnovalexey.github.io/Mars-project2/

### Быстрый просмотр

Посмотрите History/Myths, откройте видео NASA, затем попробуйте фильтр камер Rover и увеличение снимка. Закройте видео и проверьте остановку воспроизведения; фоновый звук включайте по желанию.

Начните с `js/data.js` и `js/common.js`, затем изучите `js/nasa.js`, `js/rover.js`, `js/forms.js`. Ответы NASA и медиа зависят от сети. Браузер не подтверждает доставку FormSubmit; форма пожертвования демонстрирует только локальную валидацию.

Языковые ссылки выше переключают документацию, а не переводят существующий интерфейс демо.

### Возможности

- Семь страниц: Home, History, Myths, Photo, Videos, Rover и About The Project.
- **Videos:** видео о Марсе из открытой библиотеки NASA Image and Video Library (без ключа API), по миссиям; видео играет в окне на странице, фоновая музыка на это время встаёт на паузу.
- **Rover:** самые свежие «сырые» снимки марсохода Perseverance с номером сола, камерой и подписью НАСА; фильтр по камерам, «показать ещё» и большой просмотр. Ответы кешируются на час; если сервер НАСА медлит или молчит, страница пишет об этом.
- Один общий скрипт строит шапку, меню, подвал и модальные окна Bootstrap для всех страниц: разметка написана один раз.
- Содержимое страниц (тексты, таблицы, встроенные видео, плейлисты) берётся из файла данных и выводится методами DOM.
- Фоновый музыкальный плеер с плейлистом, переключением и громкостью. Если музыка играет, при переходе на другую страницу продолжается тот же трек с той же секунды; если браузер не разрешает звук на новой странице, он включается при первом щелчке или нажатии клавиши.
- Модальные формы: задать вопрос, оставить отзыв с фото, прислать материалы с файлами (до 5 файлов, 10 МБ), с превью и проверкой полей. Сообщения уходят на почту через FormSubmit, без своего сервера. Форма «пожертвовать на марсианскую экспедицию» — демонстрационная: номер карты проверяется в браузере (алгоритм Луна) и никуда не отправляется.
- У каждого фото в галерее своя подпись; в мифах указаны авторы снимков.
- **Марсиане — пасхалка с чёрным юмором** в духе «Марс атакует!» Тима Бёртона (свой SVG-рисунок, не кадры фильма): без музыки выглядывают из краёв экрана и прячутся; когда играет музыка — пританцовывают, и у них лопается голова розовыми брызгами мозга и зелёной слизью, которые тают. Кликам не мешают, при «уменьшить анимацию» не появляются. Об этом фильме — миф 10.
- Адаптивность: на телефоне меню и плеер переносятся на новые строки, видео и таблицы помещаются в экран.

Формы отправляются через FormSubmit. Загрузка ответа во фрейме не подтверждает доставку письма, поэтому заполненные поля сохраняются, пока доставка не подтверждена.

### Музыка

В плеере у треков «марсианские» названия. На самом деле это:

- Mars Breeze — Kawtar Sadik, Rabab Najid, Jarl Flamar и другие, «DABA (Jarl Flamar Remix)»
- Red Plains — Ugress, «The Ghost You Choose to Be»
- Orbit Echo — Melokind, «Down On Me»
- Dust Trail — Amanati & Roniit, «Slow»
- Night Crater — HÆLOS, «Pray»

Музыка принадлежит авторам и используется только в этом некоммерческом учебном проекте. Если вы правообладатель и хотите, чтобы трек убрали, откройте issue — уберу.

### Стек

HTML5 · CSS3 · Bootstrap 5 · JavaScript (DOM, вывод из данных) · GitHub Pages

### Чему научился

- Отделять данные от разметки: один «отрисовщик» на много страниц.
- Общие части страницы, которые вставляет JavaScript.
- Адаптивная вёрстка: перенос flex-строк, «резиновые» iframe с `aspect-ratio`, прокручиваемые таблицы.

### Как запустить

Запустите локальный сервер в папке (например, `npx serve .`) и откройте адрес, который он покажет.

### План развития

Это предложения, а не уже реализованные возможности.

- Визуал: единые состояния загрузки/пустого результата, изображения по размеру с подписями и локальный favicon Марса.
- Инженерия: проверять схемы внешних ответов, повтор запроса, отмену и освобождение медиа при переходах.
- Функции: поиск по хронологии миссий и сохранённые фильтры Rover; необязательный 3D-глобус рассматривать после этого.

---

<a name="hebrew"></a>

<div dir="rtl">

## עברית

**כרוניקות המאדים החדשות**

אתר על מאדים בשבעה דפים: ההיסטוריה של חקר הכוכב מהטיסות הראשונות ועד רכבי השטח של היום, מיתוסים על הכוכב האדום, גלריית תמונות ודף על הפרויקט. נבנה ב-HTML, ב-CSS, ב-Bootstrap וב-JavaScript.

**הדגמה:** https://dubnovalexey.github.io/Mars-project2/

### סיור קצר

עברו ב־History/Myths, פתחו סרטון NASA ונסו מסנן מצלמות ב־Rover ותמונה מוגדלת. סגרו את הסרטון ובדקו שהוא נעצר; מוזיקת הרקע נשארת לבחירתכם.

התחילו ב־`js/data.js` וב־`js/common.js`, ואז בדקו `js/nasa.js`, `js/rover.js`, `js/forms.js`. שירותי NASA והמדיה תלויים ברשת. הדפדפן אינו מאשר מסירת FormSubmit; טופס התרומה מדגים אימות מקומי בלבד.

קישורי השפה למעלה מחליפים את התיעוד, ולא מתרגמים את ממשק ההדגמה הקיים.

### יכולות

- שבעה דפים: Home, History, Myths, Photo, Videos, Rover ו-About The Project.
- **Videos:** סרטונים על מאדים מספריית התמונות והסרטונים הפתוחה של נאס"א, לפי משימות; הסרטון מתנגן בחלון בדף, ומוזיקת הרקע נעצרת בינתיים.
- **Rover:** התמונות הגולמיות החדשות ביותר מרכב השטח Perseverance, עם מספר הסול, המצלמה והכיתוב של נאס"א; סינון לפי מצלמה ותצוגה מוגדלת.
- טפסים בחלונות: שאלה, תגובה עם תמונה, שליחת חומרים עם קבצים — נשלחים בדוא"ל דרך FormSubmit. טופס התרומה הוא הדגמה: פרטי הכרטיס לא נשלחים לשום מקום.
- **חייזרים מאדימאים — הפתעה עם הומור שחור** ברוח "מאדים תוקף!" של טים ברטון (ציור SVG מקורי): בלי מוזיקה הם מציצים מקצות המסך ומתחבאים; כשהמוזיקה מתנגנת הם רוקדים — והראש שלהם מתפוצץ בכתמים צבעוניים שנעלמים.
- סקריפט משותף אחד בונה את הכותרת, התפריט, הכותרת התחתונה וחלונות Bootstrap לכל הדפים.
- תוכן הדפים מגיע מקובץ נתונים ומוצג בעזרת DOM.
- נגן מוזיקת רקע עם רשימת השמעה ועוצמת קול; במעבר בין דפים אותו שיר ממשיך מאותה שנייה.
- מותאם לטלפון: התפריט והנגן עוברים לשורה חדשה, סרטונים וטבלאות נכנסים למסך.

הטפסים נשלחים באמצעות FormSubmit. טעינת תשובה במסגרת אינה מאשרת שהדוא״ל נמסר, ולכן השדות המלאים נשמרים כל עוד המסירה לא אושרה.

### מוזיקה

בנגן לרצועות יש שמות "מאדימיים". אלה הרצועות האמיתיות:

- Mars Breeze — Kawtar Sadik, Rabab Najid, Jarl Flamar ואחרים, "DABA (Jarl Flamar Remix)"
- Red Plains — Ugress, "The Ghost You Choose to Be"
- Orbit Echo — Melokind, "Down On Me"
- Dust Trail — Amanati & Roniit, "Slow"
- Night Crater — HÆLOS, "Pray"

המוזיקה שייכת ליוצריה ומשמשת רק בפרויקט לימודי לא מסחרי זה. בעלי זכויות שרוצים שרצועה תוסר מוזמנים לפתוח issue ואסיר אותה.

### טכנולוגיות

HTML5 · CSS3 · Bootstrap 5 · JavaScript · GitHub Pages

### הרצה מקומית

הריצו שרת מקומי בתיקייה (למשל `npx serve .`) ופתחו את הכתובת שהוא מציג.

### שיפורים מתוכננים

אלה הצעות, לא יכולות שכבר מומשו.

- חזות: מצבי טעינה ורשימה ריקה עקביים, תמונות בגודל מתאים עם קרדיטים וסמל מאדים מקומי.
- הנדסה: אימות מבנה תשובות חיצוניות ובדיקות ניסיון חוזר, ביטול ושחרור מדיה במעברים.
- יכולות: חיפוש בציר הזמן של המשימות ושמירת מסנני Rover, לפני גלובוס תלת־ממדי אופציונלי.

</div>
