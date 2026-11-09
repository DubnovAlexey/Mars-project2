// js/myths.js

// 1. Массив данных для всех мифов, извлеченных из myths.html
// Каждый объект содержит массив контента, который может состоять из текста, изображений и видео.
// Тексты — на пяти языках ({ru, en, he, es, fr}; русский — исходный), i18n.pick() берёт выбранный (js/i18n.js).
// В иврите отрицательные температуры обёрнуты в ⁦…⁩, чтобы минус не уезжал на другую сторону числа.
const mythsData = [
    {
        title: {ru: "Миф 1. Марс ярко‑красный", en: "Myth 1. Mars is bright red", he: "מיתוס 1. מאדים אדום בוהק", es: "Mito 1. Marte es de un rojo intenso", fr: "Mythe 1. Mars est rouge vif"},
        content: [
            {
                type: "text",
                value: {
                    ru: "Марс традиционно называют Красной планетой, и в фильмах его пейзажи чаще всего показывают через фильтр именно этого цвета. Однако на самом деле он совсем не такой. Если вы посмотрите на фотографии марсоходов Curiosity и Sojourner, то увидите, что пустыня там окрашена в жёлто‑серые оттенки.",
                    en: "Mars is traditionally called the Red Planet, and films usually show its landscapes through a filter of exactly that colour. In reality, though, it looks nothing like that. If you look at photos from the Curiosity and Sojourner rovers, you will see that the desert there is painted in yellowish-grey shades.",
                    he: "מאדים מכונה באופן מסורתי „כוכב הלכת האדום”, ובסרטים מציגים את נופיו בדרך כלל דרך פילטר בצבע הזה בדיוק. אבל במציאות הוא בכלל לא כזה. אם תסתכלו על התמונות של הרוברים Curiosity ו־Sojourner, תראו שהמדבר שם צבוע בגוונים של צהוב־אפור.",
                    es: "A Marte se le llama tradicionalmente el planeta rojo, y en las películas sus paisajes suelen mostrarse con un filtro precisamente de ese color. Pero en realidad no es así en absoluto. Si miras las fotos de los róveres Curiosity y Sojourner, verás que el desierto allí tiene tonos amarillo grisáceo.",
                    fr: "On appelle traditionnellement Mars la planète rouge, et au cinéma ses paysages sont le plus souvent montrés à travers un filtre de cette couleur. En réalité, pourtant, elle ne ressemble pas du tout à cela. Si vous regardez les photos des rovers Curiosity et Sojourner, vous verrez que le désert y prend des teintes jaune-gris."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Марс действительно выглядит красным с орбиты из‑за богатой окисленным железом пыли — в его атмосфере буквально летает ржавчина.",
                    en: "Mars really does look red from orbit because of dust rich in iron oxide — rust is literally flying around in its atmosphere.",
                    he: "מאדים אכן נראה אדום מהמסלול בגלל אבק עשיר בתחמוצת ברזל — באטמוספרה שלו ממש מתעופפת חלודה.",
                    es: "Marte sí parece rojo desde la órbita por el polvo rico en óxido de hierro: en su atmósfera vuela, literalmente, herrumbre.",
                    fr: "Mars paraît bien rouge depuis l’orbite, à cause d’une poussière riche en oxyde de fer — de la rouille vole littéralement dans son atmosphère."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Но если рассматривать планету с поверхности, а не из космоса, она будет желтоватой.",
                    en: "But if you look at the planet from its surface rather than from space, it is yellowish.",
                    he: "אבל אם מתבוננים בכוכב הלכת מפני השטח ולא מהחלל, הוא נראה צהבהב.",
                    es: "Pero si se observa el planeta desde la superficie y no desde el espacio, resulta amarillento.",
                    fr: "Mais vue depuis la surface plutôt que depuis l’espace, la planète paraît jaunâtre."
                }
            },
            {
                type: "image",
                src: "./Images/Поверхность%20Марса%20со%20следами%20Curiosity.jpg",
                alt: {
                    ru: "Поверхность Марса со следами Curiosity. Изображение: NASA / JPL‑Caltech / MSSS",
                    en: "The surface of Mars with Curiosity’s tracks. Image: NASA / JPL-Caltech / MSSS",
                    he: "פני מאדים עם עקבות של Curiosity. תמונה: NASA / JPL-Caltech / MSSS",
                    es: "La superficie de Marte con las huellas de Curiosity. Imagen: NASA / JPL-Caltech / MSSS",
                    fr: "La surface de Mars avec les traces de Curiosity. Image : NASA / JPL-Caltech / MSSS"
                },
                caption: {
                    ru: "Поверхность Марса со следами Curiosity. Изображение: NASA / JPL‑Caltech / MSSS",
                    en: "The surface of Mars with Curiosity’s tracks. Image: NASA / JPL-Caltech / MSSS",
                    he: "פני מאדים עם עקבות של Curiosity. תמונה: NASA / JPL-Caltech / MSSS",
                    es: "La superficie de Marte con las huellas de Curiosity. Imagen: NASA / JPL-Caltech / MSSS",
                    fr: "La surface de Mars avec les traces de Curiosity. Image : NASA / JPL-Caltech / MSSS"
                }
            },
            {
                type: "text",
                value: {
                    ru: "Кроме того, на Марсе есть места коричневого, зеленоватого, золотистого или даже почти чёрного цвета — всё зависит от того, какие минералы там преобладают. Небо на этой планете тоже не красное, а серое, желтоватое или голубое в разное время суток.",
                    en: "Besides, Mars has brown, greenish, golden and even almost black areas — it all depends on which minerals prevail there. The sky on this planet isn’t red either: it is grey, yellowish or blue at different times of day.",
                    he: "חוץ מזה, יש על מאדים אזורים בצבע חום, ירקרק, זהוב ואפילו כמעט שחור — הכול תלוי במינרלים השולטים שם. גם השמיים בכוכב הלכת הזה אינם אדומים, אלא אפורים, צהבהבים או כחולים בשעות שונות של היום.",
                    es: "Además, en Marte hay zonas de color marrón, verdoso, dorado e incluso casi negro: todo depende de los minerales que predominen. El cielo de este planeta tampoco es rojo, sino gris, amarillento o azul según la hora del día.",
                    fr: "De plus, Mars compte des zones brunes, verdâtres, dorées, voire presque noires — tout dépend des minéraux qui y dominent. Le ciel de cette planète n’est pas rouge non plus : il est gris, jaunâtre ou bleu selon l’heure de la journée."
                }
            }
        ],
        linkHref: "https://ui.adsabs.harvard.edu/abs/2002JGRE..107.5127R/abstract"
    },
    {
        title: {ru: "Миф 2. Марс горячий", en: "Myth 2. Mars is hot", he: "מיתוס 2. מאדים חם", es: "Mito 2. Marte es caluroso", fr: "Mythe 2. Mars est chaude"},
        content: [
            {
                type: "text",
                value: {
                    ru: "Это заблуждение связано с предыдущим. Обычно у людей красный цвет ассоциируется с высокой температурой, поэтому многие искренне полагают, что на Марсе очень жарко и из‑за этого он побагровел.",
                    en: "This misconception is linked to the previous one. People usually associate red with heat, so many sincerely believe that Mars is very hot and that this is why it turned crimson.",
                    he: "התפיסה השגויה הזו קשורה לקודמת. אנשים נוטים לקשר צבע אדום לחום, ולכן רבים מאמינים בכנות שעל מאדים חם מאוד ושבגלל זה הוא האדים.",
                    es: "Este error está relacionado con el anterior. Solemos asociar el rojo con el calor, así que mucha gente cree sinceramente que en Marte hace muchísimo calor y que por eso se puso colorado.",
                    fr: "Cette idée fausse est liée à la précédente. On associe d’habitude le rouge à la chaleur, si bien que beaucoup croient sincèrement qu’il fait très chaud sur Mars et que c’est pour cela qu’elle a viré au pourpre."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Тот же Фрэнк Герберт, например, явно ориентировался на Марс, описывая свою Дюну: пустынная оранжевая планета с белыми полярными шапками, жители которой страдают от жары. Но реальный Марс совершенно не похож на Арракис.",
                    en: "Frank Herbert, for example, clearly had Mars in mind when he described his Dune: a desert orange planet with white polar caps whose inhabitants suffer from the heat. But the real Mars is nothing like Arrakis.",
                    he: "פרנק הרברט, למשל, חשב בבירור על מאדים כשתיאר את „חולית” שלו: כוכב לכת מדברי כתום עם כיפות קוטב לבנות, שתושביו סובלים מחום. אבל מאדים האמיתי לא דומה כלל לאראקיס.",
                    es: "Frank Herbert, por ejemplo, se inspiró claramente en Marte al describir su Dune: un planeta desértico y anaranjado con casquetes polares blancos, cuyos habitantes sufren por el calor. Pero el Marte real no se parece en nada a Arrakis.",
                    fr: "Frank Herbert, par exemple, pensait manifestement à Mars en décrivant sa Dune : une planète désertique orange aux calottes polaires blanches, dont les habitants souffrent de la chaleur. Mais la vraie Mars ne ressemble en rien à Arrakis."
                }
            },
            {
                type: "text",
                value: {
                    ru: "В действительности средняя температура здесь равняется −63 °С — довольно прохладно, мягко говоря.",
                    en: "In fact, the average temperature here is −63 °C — rather chilly, to put it mildly.",
                    he: "למעשה, הטמפרטורה הממוצעת כאן היא ⁦−63 °C⁩ — די קריר, בלשון המעטה.",
                    es: "En realidad, la temperatura media aquí es de −63 °C: bastante fresco, por decirlo suavemente.",
                    fr: "En réalité, la température moyenne y est de −63 °C — plutôt frais, pour le moins."
                }
            },
            {
                type: "image",
                src: "./Images/Заполненный%20льдом%2082‑километровый%20кратер%20Королёва%20на%20Марсе.jpg",
                alt: {
                    ru: "Заполненный льдом 82‑километровый кратер Королёва на Марсе",
                    en: "The ice-filled, 82-kilometre-wide Korolev crater on Mars",
                    he: "מכתש קורוליוב שקוטרו 82 קילומטרים, מלא קרח, על מאדים",
                    es: "El cráter Koroliov, de 82 kilómetros y lleno de hielo, en Marte",
                    fr: "Le cratère Korolev, large de 82 kilomètres et rempli de glace, sur Mars"
                }
            },
            {
                type: "text",
                value: {
                    ru: "Жарче всего на Марсе летом на экваторе — температура может достигать аж 27 °C, а однажды были зафиксированы рекордные 35 °C. Зимой же может ударить мороз: от −80 до −125 °С. А на полюсе все −153 °C.",
                    en: "The hottest place on Mars is the equator in summer — the temperature can reach as much as 27 °C, and a record 35 °C was once recorded. In winter, though, the frost can bite: from −80 to −125 °C. And at the pole it is a full −153 °C.",
                    he: "המקום החם ביותר על מאדים הוא קו המשווה בקיץ — הטמפרטורה יכולה להגיע עד 27 °C, ופעם אף נמדד שיא של 35 °C. בחורף, לעומת זאת, הכפור יכול להכות: בין ⁦−80⁩ ל־⁦−125 °C⁩. ובקוטב יש לא פחות מ־⁦−153 °C⁩.",
                    es: "Donde más calor hace en Marte es en el ecuador en verano: la temperatura puede llegar a 27 °C, y una vez se registró un récord de 35 °C. En invierno, en cambio, la helada puede apretar: de −80 a −125 °C. Y en el polo, nada menos que −153 °C.",
                    fr: "C’est à l’équateur, en été, qu’il fait le plus chaud sur Mars — la température peut atteindre 27 °C, et un record de 35 °C a même été relevé une fois. En hiver, en revanche, le gel peut frapper : de −80 à −125 °C. Et au pôle, il fait carrément −153 °C."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Так что считать Марс жаркой пустыней, красным подобием Сахары, совершенно неверно.",
                    en: "So thinking of Mars as a hot desert, a red version of the Sahara, is completely wrong.",
                    he: "כך שלחשוב על מאדים כעל מדבר לוהט, גרסה אדומה של הסהרה, זו טעות מוחלטת.",
                    es: "Así que considerar Marte un desierto caluroso, una especie de Sáhara rojo, es un error total.",
                    fr: "Voir Mars comme un désert brûlant, une sorte de Sahara rouge, est donc totalement faux."
                }
            }
        ],
        linkHref: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"
    },
    {
        title: {
            ru: "Миф 3. На Марсе бывают мощные ураганы и пыльные бури",
            en: "Myth 3. Mars has powerful hurricanes and dust storms",
            he: "מיתוס 3. על מאדים משתוללים הוריקנים וסופות אבק אדירים",
            es: "Mito 3. En Marte hay huracanes y tormentas de polvo devastadores",
            fr: "Mythe 3. Sur Mars, il y a de puissants ouragans et des tempêtes de poussière"
        },
        content: [
            {
                type: "text",
                value: {
                    ru: "Ещё одна особенность, которой наделяют Красную планету фантасты и которой она в действительности не обладает, — мощные ветра. В том же «Марсианине» пыльная буря оказалась настолько сильной, что перевернула многотонный взлётно‑посадочный модуль космического корабля.",
                    en: "Another feature that science fiction writers give the Red Planet, and that it doesn’t actually have, is powerful winds. In The Martian, for instance, a dust storm was so strong that it toppled a spacecraft’s multi-ton ascent vehicle.",
                    he: "עוד תכונה שסופרי מדע בדיוני מעניקים לכוכב הלכת האדום, ושאין לו במציאות, היא רוחות עזות. ב„להציל את מארק וואטני”, למשל, סופת אבק הייתה חזקה כל כך שהפכה את רכב השיגור של החללית, ששוקל טונות.",
                    es: "Otra característica que los autores de ciencia ficción atribuyen al planeta rojo, y que en realidad no tiene, son los vientos huracanados. En «Marte (The Martian)», por ejemplo, una tormenta de polvo era tan fuerte que volcó el módulo de ascenso de varias toneladas de la nave.",
                    fr: "Autre trait que les auteurs de science-fiction prêtent à la planète rouge et qu’elle n’a pas en réalité : des vents violents. Dans « Seul sur Mars », par exemple, une tempête de poussière était si forte qu’elle a renversé le véhicule d’ascension de plusieurs tonnes d’un vaisseau spatial."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Однако на самом деле атмосфера здесь слишком разрежена, чтобы в ней могли случаться такие бури. И самый страшный ураган человек будет ощущать как лёгкий ветерок, способный разве что волосы взъерошить.",
                    en: "In reality, however, the atmosphere here is too thin for such storms to happen. A person would feel even the fiercest hurricane as a light breeze, able at most to ruffle their hair.",
                    he: "אבל במציאות האטמוספרה כאן דלילה מדי כדי שיתחוללו בה סופות כאלה. אדם ירגיש את ההוריקן האיום ביותר כמשב רוח קל, שלכל היותר יפרוע לו את השיער.",
                    es: "En realidad, sin embargo, la atmósfera aquí es demasiado tenue para que se produzcan tormentas así. Una persona sentiría el peor de los huracanes como una brisa ligera, capaz como mucho de despeinarla.",
                    fr: "En réalité, l’atmosphère y est bien trop ténue pour que de telles tempêtes s’y produisent. Une personne ressentirait le pire des ouragans comme une légère brise, tout juste capable de lui ébouriffer les cheveux."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Пожалуйста, если вы читаете это, стоя на Марсе, не снимайте шлем скафандра ради проверки! Это небезопасно.",
                    en: "Please, if you are reading this while standing on Mars, don’t take off your spacesuit helmet to check! It isn’t safe.",
                    he: "בבקשה, אם אתם קוראים את זה בעמידה על מאדים, אל תסירו את קסדת החליפה כדי לבדוק! זה לא בטוח.",
                    es: "Por favor, si estás leyendo esto de pie en Marte, ¡no te quites el casco del traje espacial para comprobarlo! No es seguro.",
                    fr: "Si vous lisez ceci debout sur Mars, ne retirez surtout pas le casque de votre scaphandre pour vérifier ! Ce n’est pas sans danger."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Пыльные бури на Красной планете действительно случаются, и они приносят исследователям NASA немало неприятностей. Но не потому, что переворачивают марсоходы и уносят их, а потому, что засыпают песком солнечные панели, и это может привести к обесточиванию аппарата.",
                    en: "Dust storms do happen on the Red Planet, and they cause NASA researchers a lot of trouble. Not because they overturn rovers and carry them away, but because they cover solar panels with sand, which can leave a vehicle without power.",
                    he: "סופות אבק אכן מתרחשות על כוכב הלכת האדום, והן גורמות לחוקרי NASA לא מעט צרות. לא משום שהן הופכות רוברים וסוחפות אותם, אלא משום שהן מכסות את לוחות השמש בחול, ובגלל זה הרכב עלול להישאר בלי חשמל.",
                    es: "En el planeta rojo sí hay tormentas de polvo, y dan muchos quebraderos de cabeza a los investigadores de la NASA. No porque vuelquen los róveres y se los lleven, sino porque cubren de arena los paneles solares, lo que puede dejar el vehículo sin energía.",
                    fr: "Les tempêtes de poussière existent bel et bien sur la planète rouge, et elles causent bien des soucis aux chercheurs de la NASA. Non pas parce qu’elles renversent les rovers et les emportent, mais parce qu’elles recouvrent de sable les panneaux solaires, ce qui peut priver l’engin d’énergie."
                }
            }
        ],
        linkHref: "https://www.nasa.gov/feature/goddard/the-fact-and-fiction-of-martian-dust-storms"
    },
    {
        title: {
            ru: "Миф 4. На поверхности Марса есть каналы", en: "Myth 4. There are canals on the surface of Mars", he: "מיתוס 4. על פני מאדים יש תעלות",
            es: "Mito 4. En la superficie de Marte hay canales", fr: "Mythe 4. Il y a des canaux à la surface de Mars"
        },
        content: [
            {
                type: "image",
                src: "Images/Карта%20Марса%20по%20Фламмариону%20и%20Антониади,%20на%20которой%20изображены%20марсианские%20каналы.jpg",
                alt: {
                    ru: "Карта Марса по Фламмариону и Антониади, на которой изображены марсианские каналы",
                    en: "A map of Mars after Flammarion and Antoniadi, showing the Martian canals",
                    he: "מפת מאדים לפי פלמריון ואנטוניאדי, ועליה תעלות המאדים",
                    es: "Mapa de Marte según Flammarion y Antoniadi, con los canales marcianos",
                    fr: "Carte de Mars d’après Flammarion et Antoniadi, où figurent les canaux martiens"
                }
            },
            {
                type: "text",
                value: {
                    ru: "В конце XIX — начале XX века учёные считали, что по поверхности Марса разбросаны некие каналы, возможно, использовавшиеся для орошения. Одни считали, что это доказывает существование на Марсе развитой цивилизации, способной создавать продвинутые гидротехнические сооружения. Другие объясняли появление «каналов» естественными причинами — рельеф, мол, такой.",
                    en: "In the late 19th and early 20th centuries, scientists believed that the surface of Mars was crossed by canals, perhaps used for irrigation. Some thought this proved the existence of an advanced civilization on Mars capable of building sophisticated waterworks. Others explained the “canals” by natural causes — that’s just how the terrain is, they said.",
                    he: "בסוף המאה ה־19 ובתחילת המאה ה־20 האמינו מדענים שעל פני מאדים פזורות תעלות, אולי לצורכי השקיה. היו שחשבו שזו הוכחה לקיומה של ציוויליזציה מפותחת על מאדים, המסוגלת לבנות מתקני מים מתוחכמים. אחרים הסבירו את ה„תעלות” בגורמים טבעיים — זה פשוט התבליט, כך אמרו.",
                    es: "A finales del siglo XIX y principios del XX, los científicos creían que la superficie de Marte estaba surcada por canales, quizá usados para el riego. Unos pensaban que eso demostraba la existencia en Marte de una civilización avanzada, capaz de construir obras hidráulicas complejas. Otros atribuían los «canales» a causas naturales: el relieve es así, decían.",
                    fr: "À la fin du XIXe et au début du XXe siècle, les scientifiques pensaient que la surface de Mars était parcourue de canaux, peut-être destinés à l’irrigation. Certains y voyaient la preuve qu’une civilisation avancée, capable de bâtir des ouvrages hydrauliques sophistiqués, vivait sur Mars. D’autres expliquaient ces « canaux » par des causes naturelles — c’est le relief, voilà tout."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Однако позднее, в 1907 году, учёные отказались от идеи, что на Марсе эти гидротехнические сооружения есть, объяснив их существование оптической иллюзией.",
                    en: "Later, however, in 1907, scientists abandoned the idea that these waterworks existed on Mars, explaining them as an optical illusion.",
                    he: "אבל מאוחר יותר, ב־1907, נטשו המדענים את הרעיון שמתקני המים האלה קיימים על מאדים, והסבירו אותם כאשליה אופטית.",
                    es: "Más tarde, sin embargo, en 1907, los científicos abandonaron la idea de que esas obras hidráulicas existieran en Marte y las explicaron como una ilusión óptica.",
                    fr: "Plus tard, cependant, en 1907, les scientifiques ont renoncé à l’idée que ces ouvrages hydrauliques existaient sur Mars et les ont expliqués comme une illusion d’optique."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Полученные через пару лет первые фотографии подтвердили эту версию. А прилетевший в 1965 году зонд Mariner 4, передавший близкие снимки поверхности планеты, окончательно похоронил теорию «марсианских каналов».",
                    en: "The first photographs, taken a couple of years later, confirmed this explanation. And the Mariner 4 probe, which arrived in 1965 and sent back close-up images of the planet’s surface, finally buried the theory of “Martian canals”.",
                    he: "התצלומים הראשונים, שהתקבלו כעבור שנתיים בערך, אישרו את ההסבר הזה. והגשושית מרינר 4, שהגיעה ב־1965 ושלחה תמונות מקרוב של פני כוכב הלכת, קברה סופית את תיאוריית „תעלות המאדים”.",
                    es: "Las primeras fotografías, obtenidas un par de años después, confirmaron esa explicación. Y la sonda Mariner 4, que llegó en 1965 y envió imágenes cercanas de la superficie del planeta, enterró definitivamente la teoría de los «canales marcianos».",
                    fr: "Les premières photographies, obtenues deux ans plus tard, ont confirmé cette explication. Et la sonde Mariner 4, arrivée en 1965 et qui a transmis des images rapprochées de la surface de la planète, a définitivement enterré la théorie des « canaux martiens »."
                }
            }
        ],
        linkHref: "https://adsabs.harvard.edu//full/2010JBAA..120..240D/0000241.000.html"
    },
    {
        title: {
            ru: "Миф 5. Иногда Марс на небе становится больше, чем полная Луна",
            en: "Myth 5. Sometimes Mars looks bigger in the sky than the full Moon",
            he: "מיתוס 5. לפעמים מאדים נראה בשמיים גדול יותר מהירח המלא",
            es: "Mito 5. A veces Marte se ve en el cielo más grande que la luna llena",
            fr: "Mythe 5. Parfois, Mars paraît plus grande dans le ciel que la pleine Lune"
        },
        content: [
            {
                type: "text",
                value: {
                    ru: "Периодически — в основном в августе — в интернете можно увидеть картинку, на которой Марс запечатлён рядом с Луной, и они выглядят практически идентичными по размеру. Это объясняется тем, что Красная планета время от времени встаёт в противостояние с Землёй, приближаясь к ней на минимальное расстояние.",
                    en: "Every now and then — mostly in August — a picture goes around the internet showing Mars next to the Moon, the two looking almost identical in size. The explanation offered is that the Red Planet periodically comes into opposition with Earth, approaching it at its minimum distance.",
                    he: "מדי פעם — בעיקר באוגוסט — מסתובבת ברשת תמונה שבה מאדים מצולם לצד הירח, ושניהם נראים כמעט באותו גודל. ההסבר שניתן הוא שכוכב הלכת האדום נכנס מעת לעת לניגוד עם כדור הארץ ומתקרב אליו למרחק הקצר ביותר.",
                    es: "De vez en cuando —sobre todo en agosto— circula por internet una imagen en la que Marte aparece junto a la Luna y ambos parecen casi del mismo tamaño. La explicación que se da es que el planeta rojo entra de vez en cuando en oposición con la Tierra y se acerca a ella a la distancia mínima.",
                    fr: "De temps en temps — surtout en août — circule sur Internet une image où Mars apparaît à côté de la Lune, les deux semblant presque de la même taille. L’explication avancée : la planète rouge entre périodiquement en opposition avec la Terre et s’en approche au plus près."
                }
            },
            {
                type: "image",
                src: "./Images/Картинка,%20обычно%20сопровождающая%20рассказы%20о%20«Марсе%20размером%20с%20Луну.jpg",
                alt: {
                    ru: "Картинка, обычно сопровождающая рассказы о «Марсе размером с Луну»",
                    en: "The picture that usually accompanies stories about “Mars as big as the Moon”",
                    he: "התמונה שמלווה בדרך כלל סיפורים על „מאדים בגודל הירח”",
                    es: "La imagen que suele acompañar a las historias sobre «Marte del tamaño de la Luna»",
                    fr: "L’image qui accompagne d’ordinaire les histoires de « Mars aussi grosse que la Lune »"
                }
            },
            {
                type: "text",
                value: {
                    ru: "Но несмотря на то, что Марс на самом деле вдвое больше Луны, с Земли он выглядит в 500 раз меньше нашего естественного спутника.",
                    en: "But even though Mars is actually twice the size of the Moon, from Earth it looks 500 times smaller than our natural satellite.",
                    he: "אבל למרות שמאדים בפועל גדול פי שניים מהירח, מכדור הארץ הוא נראה קטן פי 500 מהלוויין הטבעי שלנו.",
                    es: "Pero aunque Marte es en realidad el doble de grande que la Luna, desde la Tierra se ve 500 veces más pequeño que nuestro satélite natural.",
                    fr: "Mais bien que Mars soit en réalité deux fois plus grande que la Lune, vue de la Terre, elle paraît 500 fois plus petite que notre satellite naturel."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Даже при рекордном сближении Земли и Красной планеты последняя смотрится просто как яркая точка, которую уж никак нельзя спутать с Луной.",
                    en: "Even at a record close approach of Earth and the Red Planet, the latter looks like nothing more than a bright dot that could never be mistaken for the Moon.",
                    he: "גם בהתקרבות שיא בין כדור הארץ לכוכב הלכת האדום, האחרון נראה רק כנקודה בהירה שאי אפשר בשום אופן לבלבל עם הירח.",
                    es: "Incluso en un acercamiento récord entre la Tierra y el planeta rojo, este no pasa de ser un punto brillante que no hay manera de confundir con la Luna.",
                    fr: "Même lors d’un rapprochement record entre la Terre et la planète rouge, celle-ci n’est qu’un point brillant qu’il est impossible de confondre avec la Lune."
                }
            },
            {
                type: "image",
                src: "./Images/Марс%20и%20Луна,%20снимок%202005%20года..jpg",
                alt: {
                    ru: "Марс и Луна, снимок 2005 года",
                    en: "Mars and the Moon, a 2005 photograph",
                    he: "מאדים והירח, צילום משנת 2005",
                    es: "Marte y la Luna, foto de 2005",
                    fr: "Mars et la Lune, photo de 2005"
                },
                caption: {
                    ru: "Марс и Луна, снимок 2005 года. Изображение: Amirber / Wikimedia Commons",
                    en: "Mars and the Moon, a 2005 photograph. Image: Amirber / Wikimedia Commons",
                    he: "מאדים והירח, צילום משנת 2005. תמונה: Amirber / Wikimedia Commons",
                    es: "Marte y la Luna, foto de 2005. Imagen: Amirber / Wikimedia Commons",
                    fr: "Mars et la Lune, photo de 2005. Image : Amirber / Wikimedia Commons"
                }
            },
            {
                type: "text",
                value: {
                    ru: "И да, упоминаемая в этой байке информация о том, что Красная планета и Земля сближаются только раз в 60 000 лет, тоже неправда. В реальности противостояние планет случается каждые два года.",
                    en: "And yes, the claim in this tale that the Red Planet and Earth come this close only once every 60,000 years isn’t true either. In reality, the planets come into opposition every two years.",
                    he: "וכן, גם הטענה בסיפור הזה שכוכב הלכת האדום וכדור הארץ מתקרבים רק פעם ב־60,000 שנה אינה נכונה. במציאות, הניגוד בין כוכבי הלכת מתרחש כל שנתיים.",
                    es: "Y sí, el dato de esta historia según el cual el planeta rojo y la Tierra solo se acercan una vez cada 60 000 años tampoco es cierto. En realidad, la oposición entre ambos planetas se produce cada dos años.",
                    fr: "Et oui, l’affirmation de cette rumeur selon laquelle la planète rouge et la Terre ne se rapprochent qu’une fois tous les 60 000 ans est fausse elle aussi. En réalité, l’opposition des deux planètes a lieu tous les deux ans."
                }
            }
        ],
        linkHref: "http://spider.seds.org/spider/Mars/Add/whenwasmarsclose.pdf"
    },
    {
        title: {ru: "Миф 6. На Марсе есть лицо", en: "Myth 6. There is a face on Mars", he: "מיתוס 6. על מאדים יש פנים", es: "Mito 6. En Marte hay una cara", fr: "Mythe 6. Il y a un visage sur Mars"},
        content: [
            {
                type: "text",
                value: {
                    ru: "В 1976 году космические аппараты Viking 1 и Viking 2 сделали серию снимков марсианского региона, которому дали название Кидония. На одном из них обнаружилось нечто, напоминающее огромное человеческое лицо.",
                    en: "In 1976 the Viking 1 and Viking 2 spacecraft took a series of images of a Martian region named Cydonia. One of them showed something resembling a huge human face.",
                    he: "ב־1976 צילמו החלליות ויקינג 1 וויקינג 2 סדרת תמונות של אזור במאדים שנקרא קידוניה. באחת מהן התגלה משהו שדומה לפנים אנושיות ענקיות.",
                    es: "En 1976, las naves Viking 1 y Viking 2 tomaron una serie de imágenes de una región marciana llamada Cydonia. En una de ellas apareció algo que recordaba a un enorme rostro humano.",
                    fr: "En 1976, les sondes Viking 1 et Viking 2 ont pris une série d’images d’une région martienne baptisée Cydonia. Sur l’une d’elles est apparu quelque chose qui rappelait un immense visage humain."
                }
            },
            {
                type: "image", src: "./Images/Лицо%20на%20Марсе.jpg",
                alt: {ru: "Лицо на Марсе", en: "The Face on Mars", he: "הפנים על מאדים", es: "La cara de Marte", fr: "Le visage de Mars"}
            },
            {
                type: "text",
                value: {
                    ru: "Множество паранаучных изданий сразу заявили, что это творение потерянной высокоразвитой цивилизации, и окрестили выпуклость «марсианским сфинксом».",
                    en: "Plenty of pseudoscientific publications immediately declared it the work of a lost advanced civilization and dubbed the mound “the Martian Sphinx”.",
                    he: "פרסומים פסבדו־מדעיים רבים מיהרו להכריז שזו יצירה של ציוויליזציה מפותחת שאבדה, וכינו את הגבעה „הספינקס של מאדים”.",
                    es: "Muchas publicaciones pseudocientíficas proclamaron de inmediato que era obra de una civilización avanzada desaparecida y bautizaron el promontorio como «la esfinge marciana».",
                    fr: "De nombreuses publications pseudo-scientifiques ont aussitôt déclaré qu’il s’agissait de l’œuvre d’une civilisation avancée disparue et ont baptisé ce relief « le Sphinx martien »."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Правда, когда космические корабли Mars Global Surveyor, Mars Reconnaissance Orbiter и Mars Express сделали новые снимки Кидонии, стало совершенно очевидно, что никакого лица там нет.",
                    en: "However, when the Mars Global Surveyor, Mars Reconnaissance Orbiter and Mars Express spacecraft took new images of Cydonia, it became perfectly clear that there is no face there.",
                    he: "אלא שכשהחלליות Mars Global Surveyor, Mars Reconnaissance Orbiter ו־Mars Express צילמו תמונות חדשות של קידוניה, התברר לגמרי שאין שם שום פנים.",
                    es: "Sin embargo, cuando las naves Mars Global Surveyor, Mars Reconnaissance Orbiter y Mars Express tomaron nuevas imágenes de Cydonia, quedó clarísimo que allí no hay ninguna cara.",
                    fr: "Toutefois, quand les sondes Mars Global Surveyor, Mars Reconnaissance Orbiter et Mars Express ont pris de nouvelles images de Cydonia, il est devenu parfaitement évident qu’il n’y a là aucun visage."
                }
            },
            {
                type: "image",
                src: "./Images/Лицо%20на%20Марсе%20в%20лучшем%20качестве.jpg",
                alt: {
                    ru: "Лицо на Марсе в лучшем качестве",
                    en: "The Face on Mars in better quality",
                    he: "הפנים על מאדים באיכות טובה יותר",
                    es: "La cara de Marte con mejor calidad",
                    fr: "Le visage de Mars en meilleure qualité"
                },
                caption: {
                    ru: "Лицо на Марсе в лучшем качестве. Изображение: NASA / JPL / University of Arizona",
                    en: "The Face on Mars in better quality. Image: NASA / JPL / University of Arizona",
                    he: "הפנים על מאדים באיכות טובה יותר. תמונה: NASA / JPL / University of Arizona",
                    es: "La cara de Marte con mejor calidad. Imagen: NASA / JPL / University of Arizona",
                    fr: "Le visage de Mars en meilleure qualité. Image : NASA / JPL / University of Arizona"
                }
            },
            {
                type: "text",
                value: {
                    ru: "Но это не мешает фанатам уфологии периодически вспоминать о существовании на Марсе «сфинкса».",
                    en: "But that doesn’t stop UFO enthusiasts from bringing up the Martian “sphinx” every now and then.",
                    he: "אבל זה לא מונע מחובבי עב״מים להיזכר מדי פעם ב„ספינקס” של מאדים.",
                    es: "Pero eso no impide que los aficionados a la ufología saquen a relucir de vez en cuando la «esfinge» de Marte.",
                    fr: "Mais cela n’empêche pas les passionnés d’ufologie de ressortir de temps en temps le « sphinx » de Mars."
                }
            }
        ],
        linkHref: "https://lifehacker.ru/parejdoliya/"
    },
    {
        title: {
            ru: "Миф 7. На Марсе была ядерная война", en: "Myth 7. There was a nuclear war on Mars", he: "מיתוס 7. על מאדים הייתה מלחמה גרעינית",
            es: "Mito 7. En Marte hubo una guerra nuclear", fr: "Mythe 7. Il y a eu une guerre nucléaire sur Mars"
        },
        content: [
            {
                type: "text",
                value: {
                    ru: "Как несложно заметить, условия на Марсе в настоящий момент так себе: радиация и тоненькая бескислородная атмосфера над холодной пустыней. По всей видимости, раньше здесь было поприятнее — вроде как даже имелись океаны и реки. Но потом что‑то случилось, и Красная планета стала такой, как сегодня.",
                    en: "As you can easily see, conditions on Mars right now are so-so: radiation and a wispy, oxygen-free atmosphere over a cold desert. Apparently, it used to be nicer here — there may even have been oceans and rivers. But then something happened, and the Red Planet became what it is today.",
                    he: "כפי שקל לראות, התנאים על מאדים כרגע לא משהו: קרינה ואטמוספרה דקיקה ונטולת חמצן מעל מדבר קר. ככל הנראה, פעם היה כאן נעים יותר — אולי אפילו היו אוקיינוסים ונהרות. אבל אז משהו קרה, וכוכב הלכת האדום הפך למה שהוא היום.",
                    es: "Como es fácil ver, las condiciones en Marte ahora mismo dejan mucho que desear: radiación y una atmósfera finísima y sin oxígeno sobre un desierto helado. Al parecer, antes se estaba mejor: puede que incluso hubiera océanos y ríos. Pero luego algo pasó, y el planeta rojo se volvió como es hoy.",
                    fr: "Comme on le voit sans peine, les conditions actuelles sur Mars sont médiocres : des radiations et une atmosphère ténue, sans oxygène, au-dessus d’un désert glacé. Apparemment, c’était plus agréable autrefois — il y avait peut-être même des océans et des rivières. Puis quelque chose s’est produit, et la planète rouge est devenue ce qu’elle est aujourd’hui."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Почему это произошло? Ну, большинство учёных полагают, что в так называемый гесперийский период (3,5–2,5 миллиарда лет назад) Марс обладал океанами и плотной атмосферой. Но позже — 700 миллионов лет назад — её сдуло солнечным ветром.",
                    en: "Why did this happen? Well, most scientists believe that during the so-called Hesperian period (3.5–2.5 billion years ago) Mars had oceans and a dense atmosphere. But later — 700 million years ago — the solar wind blew it away.",
                    he: "למה זה קרה? ובכן, רוב המדענים סבורים שבתקופה המכונה ההספרית (לפני 3.5–2.5 מיליארד שנה) היו למאדים אוקיינוסים ואטמוספרה סמיכה. אבל מאוחר יותר — לפני 700 מיליון שנה — רוח השמש העיפה אותה.",
                    es: "¿Por qué ocurrió? Bueno, la mayoría de los científicos cree que en el llamado periodo hespérico (hace entre 3500 y 2500 millones de años) Marte tenía océanos y una atmósfera densa. Pero más tarde —hace 700 millones de años— el viento solar se la llevó.",
                    fr: "Pourquoi cela s’est-il produit ? Eh bien, la plupart des scientifiques pensent qu’au cours de la période dite hespérienne (il y a 3,5 à 2,5 milliards d’années) Mars possédait des océans et une atmosphère dense. Mais plus tard — il y a 700 millions d’années — le vent solaire l’a balayée."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Вот что бывает, когда забываешь отрастить мощное магнитное поле, как у Земли.",
                    en: "That’s what happens when you forget to grow a strong magnetic field like Earth’s.",
                    he: "זה מה שקורה כששוכחים לגדל שדה מגנטי חזק כמו של כדור הארץ.",
                    es: "Eso es lo que pasa cuando te olvidas de desarrollar un campo magnético potente como el de la Tierra.",
                    fr: "Voilà ce qui arrive quand on oublie de se doter d’un champ magnétique puissant comme celui de la Terre."
                }
            },
            {
                type: "image",
                src: "./Images/Атмосфера%20Марса,%20снимок%20зонда%20Viking,%201976%20год.jpg",
                alt: {
                    ru: "Атмосфера Марса, снимок зонда Viking, 1976 год",
                    en: "The atmosphere of Mars, photographed by a Viking probe, 1976",
                    he: "האטמוספרה של מאדים, בצילום של גשושית ויקינג, 1976",
                    es: "La atmósfera de Marte, fotografiada por una sonda Viking en 1976",
                    fr: "L’atmosphère de Mars, photographiée par une sonde Viking en 1976"
                }
            },
            {
                type: "text",
                value: {
                    ru: "Но существует и другая версия, которой придерживаются фанаты альтернативной науки. Якобы давным‑давно на Марсе жили две высокоразвитые цивилизации, Кидония и Утопия. Что‑то они между собой не поделили, и как давай друг в друга пулять ядерными ракетами, пока не превратили планету в безжизненную пустыню.",
                    en: "But there is another version, favoured by fans of alternative science. Supposedly, long ago two advanced civilizations lived on Mars, Cydonia and Utopia. They fell out over something and started firing nuclear missiles at each other until they had turned the planet into a lifeless desert.",
                    he: "אבל יש גם גרסה אחרת, שבה מחזיקים חובבי „המדע האלטרנטיבי”. לפיה, לפני זמן רב חיו על מאדים שתי ציוויליזציות מפותחות, קידוניה ואוטופיה. הן לא הסתדרו ביניהן על משהו והתחילו להמטיר זו על זו טילים גרעיניים, עד שהפכו את כוכב הלכת למדבר שומם.",
                    es: "Pero hay otra versión, defendida por los aficionados a la ciencia alternativa. Supuestamente, hace mucho tiempo vivían en Marte dos civilizaciones avanzadas, Cydonia y Utopía. Algo no les cuadró entre ellas y empezaron a lanzarse misiles nucleares hasta convertir el planeta en un desierto sin vida.",
                    fr: "Mais il existe une autre version, chère aux adeptes de la science alternative. Il y a très longtemps, deux civilisations avancées, Cydonia et Utopia, auraient vécu sur Mars. Elles se seraient brouillées pour une raison quelconque et se seraient bombardées de missiles nucléaires jusqu’à transformer la planète en désert sans vie."
                }
            },
            {
                type: "text",
                value: {
                    ru: "А потом все благополучно умерли. Поэтому‑де на Марсе высокий уровень радиации и повсюду кратеры — воронки от атомных взрывов.",
                    en: "And then everyone duly died. That, they say, is why Mars has high radiation levels and craters everywhere — holes left by atomic blasts.",
                    he: "ואז כולם מתו בשלום. ולכן, כביכול, יש על מאדים רמת קרינה גבוהה ומכתשים בכל מקום — בורות שהשאירו פיצוצים אטומיים.",
                    es: "Y luego todos murieron sin más. Por eso, dicen, en Marte hay tanta radiación y cráteres por todas partes: los agujeros de las explosiones atómicas.",
                    fr: "Et puis tout le monde est mort, tout simplement. Voilà pourquoi, paraît-il, Mars présente un fort taux de radiation et des cratères partout — les trous laissés par les explosions atomiques."
                }
            },
            {
                type: "image",
                src: "./Images/Изображение%20системы%20каньонов%20долины%20Маринер%20на%20Марсе.jpg",
                alt: {
                    ru: "Система каньонов долины Маринер на Марсе",
                    en: "The Valles Marineris canyon system on Mars",
                    he: "מערכת הקניונים ואליס מרינריס על מאדים",
                    es: "El sistema de cañones Valles Marineris en Marte",
                    fr: "Le système de canyons de Valles Marineris sur Mars"
                },
                caption: {
                    ru: "Изображение системы каньонов долины Маринер на Марсе. Изображение: NASA / JPL‑Caltech",
                    en: "An image of the Valles Marineris canyon system on Mars. Image: NASA / JPL-Caltech",
                    he: "תמונה של מערכת הקניונים ואליס מרינריס על מאדים. תמונה: NASA / JPL-Caltech",
                    es: "Imagen del sistema de cañones Valles Marineris en Marte. Imagen: NASA / JPL-Caltech",
                    fr: "Image du système de canyons de Valles Marineris sur Mars. Image : NASA / JPL-Caltech"
                }
            },
            {
                type: "text",
                value: {
                    ru: "Правда, сторонники этой теории не могут объяснить, почему никаких следов таинственные Кидония и Утопия после себя не оставили. На Земле археологи памятники всяких Древних Египтов невооружённым взглядом находят, а тут целые цивилизации с атомным оружием ни одного захудалого домишки после себя не оставили.",
                    en: "Supporters of this theory, though, can’t explain why the mysterious Cydonia and Utopia left no traces behind. On Earth, archaeologists find the monuments of ancient Egypt and the like with the naked eye, yet here entire civilizations with atomic weapons didn’t leave behind a single shabby hut.",
                    he: "אלא שתומכי התיאוריה הזו לא מצליחים להסביר מדוע קידוניה ואוטופיה המסתוריות לא השאירו אחריהן שום עקבות. על כדור הארץ ארכאולוגים מוצאים בעין בלתי מזוינת אתרים של מצרים העתיקה ודומותיה, ואילו כאן ציוויליזציות שלמות עם נשק אטומי לא השאירו אחריהן אפילו בקתה עלובה אחת.",
                    es: "Eso sí, los defensores de esta teoría no saben explicar por qué las misteriosas Cydonia y Utopía no dejaron ningún rastro. En la Tierra, los arqueólogos encuentran a simple vista monumentos del antiguo Egipto y compañía, pero aquí civilizaciones enteras con armas atómicas no dejaron ni una triste choza.",
                    fr: "Les partisans de cette théorie ne savent toutefois pas expliquer pourquoi les mystérieuses Cydonia et Utopia n’ont laissé aucune trace. Sur Terre, les archéologues trouvent à l’œil nu les monuments de l’Égypte ancienne et consorts, alors qu’ici des civilisations entières dotées de l’arme atomique n’ont pas laissé derrière elles la moindre cabane."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Да и кратеры на Марсе имеют куда более очевидное объяснение: атмосфера тонкая, астероиды затормозить не может, вот они и бахают со всей силы. А радиация на Красной планете — результат воздействия на неё космических лучей высоких энергий, а не каких‑то там бомб.",
                    en: "And the craters on Mars have a far more obvious explanation: the atmosphere is thin and can’t slow asteroids down, so they slam in at full force. As for the radiation on the Red Planet, it comes from high-energy cosmic rays, not from some bombs.",
                    he: "וגם למכתשים על מאדים יש הסבר הרבה יותר ברור: האטמוספרה דקה ואינה יכולה להאט אסטרואידים, אז הם נוחתים בכל העוצמה. והקרינה על כוכב הלכת האדום היא תוצאה של קרניים קוסמיות עתירות אנרגיה, לא של פצצות כלשהן.",
                    es: "Además, los cráteres de Marte tienen una explicación mucho más obvia: la atmósfera es fina y no puede frenar a los asteroides, así que estos se estrellan con toda su fuerza. Y la radiación del planeta rojo se debe a los rayos cósmicos de alta energía, no a unas bombas cualesquiera.",
                    fr: "D’ailleurs, les cratères de Mars ont une explication bien plus évidente : l’atmosphère est mince et ne peut pas freiner les astéroïdes, alors ils s’écrasent de toutes leurs forces. Quant aux radiations sur la planète rouge, elles proviennent des rayons cosmiques de haute énergie, et non de quelconques bombes."
                }
            },
            {
                type: "text",
                value: {
                    ru: "В общем, совершенно понятно, что никакой ядерной войны и высокоразвитой цивилизации на Марсе не было — тут бы бактерии хоть какие найти, а о высокоорганизованной жизни и речи не идёт.",
                    en: "All in all, it is perfectly clear that there was no nuclear war and no advanced civilization on Mars — finding any bacteria at all would be an achievement here, let alone highly organized life.",
                    he: "בקיצור, ברור לגמרי שלא הייתה על מאדים שום מלחמה גרעינית ושום ציוויליזציה מפותחת — כאן היה הישג למצוא ולו חיידק כלשהו, שלא לדבר על חיים מפותחים.",
                    es: "En resumen, está clarísimo que en Marte no hubo ninguna guerra nuclear ni ninguna civilización avanzada: aquí ya sería un logro encontrar alguna bacteria, como para hablar de vida altamente organizada.",
                    fr: "Bref, il est parfaitement clair qu’il n’y a eu sur Mars ni guerre nucléaire ni civilisation avancée — trouver la moindre bactérie y serait déjà un exploit, alors une vie hautement organisée, n’en parlons pas."
                }
            }
        ],
        linkHref: "https://medium.com/the-weird-closet/nuclear-alien-space-wars-a-martian-theory-490a642664f3"
    },
    {
        title: {
            ru: "Миф 8. И если её повторить, Марс снова станет пригодным для жизни",
            en: "Myth 8. And if you repeat it, Mars will become habitable again",
            he: "מיתוס 8. ואם נחזור עליה, מאדים יהיה שוב ראוי למגורים",
            es: "Mito 8. Y si se repite, Marte volverá a ser habitable",
            fr: "Mythe 8. Et si on la recommence, Mars redeviendra habitable"
        },
        content: [
            {
                type: "image",
                src: "Images/AQAKR0gMyOnn886mJXgvjl-T2OIOjW84ZIeZaTB8ZvyWdT_yDWGa_H9Cb6KcwRH1ETYdIJhmTQbNUctUxJI6jeI19a4.webp",
                alt: {
                    ru: "Илон Маск предлагает взорвать Марс ядерными бомбами",
                    en: "Elon Musk proposes nuking Mars",
                    he: "אילון מאסק מציע להפציץ את מאדים בפצצות גרעיניות",
                    es: "Elon Musk propone bombardear Marte con bombas nucleares",
                    fr: "Elon Musk propose de bombarder Mars à l’arme nucléaire"
                }
            },
            {
                type: "text",
                value: {
                    ru: "В 2018 году в интервью американскому комику Стиву Кольберу Илон Маск предложил бахнуть по полярным шапкам Марса ядерными бомбами. Это якобы должно было согреть его, растопить льды, устроить парниковый эффект и создать на поверхности Красной планеты новый океан. А там можно и колонизацию начинать.",
                    en: "In 2018, in an interview with the American comedian Stephen Colbert, Elon Musk suggested dropping nuclear bombs on the polar caps of Mars. Supposedly this would warm the planet, melt the ice, trigger a greenhouse effect and create a new ocean on the surface of the Red Planet. And then colonization could begin.",
                    he: "ב־2018, בראיון לקומיקאי האמריקאי סטיבן קולבר, הציע אילון מאסק להטיל פצצות גרעיניות על כיפות הקוטב של מאדים. זה אמור היה לחמם אותו, להמיס את הקרח, ליצור אפקט חממה ולהקים על פני כוכב הלכת האדום אוקיינוס חדש. ומשם אפשר כבר להתחיל בהתיישבות.",
                    es: "En 2018, en una entrevista con el humorista estadounidense Stephen Colbert, Elon Musk propuso lanzar bombas nucleares sobre los casquetes polares de Marte. Supuestamente, eso lo calentaría, derretiría el hielo, provocaría un efecto invernadero y crearía un nuevo océano en la superficie del planeta rojo. Y a partir de ahí, podría empezar la colonización.",
                    fr: "En 2018, dans une interview avec l’humoriste américain Stephen Colbert, Elon Musk a proposé de larguer des bombes nucléaires sur les calottes polaires de Mars. Cela devait soi-disant la réchauffer, faire fondre les glaces, déclencher un effet de serre et créer un nouvel océan à la surface de la planète rouge. Et ensuite, on pourrait commencer la colonisation."
                }
            },
            {type: "image", src: "Images/original.jpg", alt: "original"},
            {
                type: "text",
                value: {
                    ru: "Вообще, если посмотреть интервью, а не читать его пересказы, можно заметить, что Маск пошутил.",
                    en: "Actually, if you watch the interview instead of reading retellings of it, you can see that Musk was joking.",
                    he: "בעצם, אם צופים בראיון במקום לקרוא סיכומים שלו, אפשר לשים לב שמאסק התבדח.",
                    es: "En realidad, si ves la entrevista en lugar de leer resúmenes, notarás que Musk estaba bromeando.",
                    fr: "En fait, si l’on regarde l’interview au lieu de lire ce qu’on en raconte, on remarque que Musk plaisantait."
                }
            },
            {
                type: "text",
                value: {
                    ru: "Но многие приняли его план за чистую монету и начали спорить, возможно ли сделать планету пригодной для жизни. Учёные из Стэнфорда шутки ради подсчитали, сколько энергии понадобится для превращения марсианских полярных шапок в жидкий океан.",
                    en: "But many took his plan at face value and started arguing about whether the planet could be made habitable. Scientists at Stanford, just for fun, calculated how much energy it would take to turn the Martian polar caps into a liquid ocean.",
                    he: "אבל רבים לקחו את התוכנית שלו ברצינות והתחילו להתווכח אם אפשר להפוך את כוכב הלכת לראוי למגורים. מדענים מסטנפורד חישבו, בשביל הצחוק, כמה אנרגיה תידרש כדי להפוך את כיפות הקוטב של מאדים לאוקיינוס נוזלי.",
                    es: "Pero muchos se tomaron su plan al pie de la letra y empezaron a discutir si se podría hacer habitable el planeta. Unos científicos de Stanford calcularon, por diversión, cuánta energía haría falta para convertir los casquetes polares marcianos en un océano líquido.",
                    fr: "Mais beaucoup ont pris son plan au pied de la lettre et ont commencé à débattre de la possibilité de rendre la planète habitable. Des scientifiques de Stanford ont calculé, pour s’amuser, combien d’énergie il faudrait pour transformer les calottes polaires martiennes en océan liquide."
                }
            },
            {type: "image", src: "Images/0_8c76c_57874c9_orig.jpg", alt: "0_8c76c_57874c9_orig"},
            {
                type: "text",
                value: {
                    ru: "И результаты неутешительны: даже если одномоментно взорвать весь мировой запас ядерного оружия на Марсе, этого не хватит, чтобы испарить твёрдый углекислый газ на полюсах и создать парниковый эффект в тонкой атмосфере планеты.",
                    en: "And the results are discouraging: even if the world’s entire stockpile of nuclear weapons were detonated on Mars at once, it would not be enough to vaporize the frozen carbon dioxide at the poles and create a greenhouse effect in the planet’s thin atmosphere.",
                    he: "והתוצאות מאכזבות: גם אם יפוצץ על מאדים בבת אחת כל מאגר הנשק הגרעיני של העולם, זה לא יספיק כדי לאדות את הפחמן הדו־חמצני הקפוא בקטבים וליצור אפקט חממה באטמוספרה הדקה של כוכב הלכת.",
                    es: "Y los resultados son desalentadores: aunque se detonara de golpe en Marte todo el arsenal nuclear del mundo, no bastaría para evaporar el dióxido de carbono sólido de los polos ni para crear un efecto invernadero en la tenue atmósfera del planeta.",
                    fr: "Et les résultats sont décevants : même si l’on faisait exploser d’un coup sur Mars tout l’arsenal nucléaire mondial, cela ne suffirait pas à vaporiser le dioxyde de carbone gelé des pôles ni à créer un effet de serre dans la mince atmosphère de la planète."
                }
            },
            {type: "video", src: "https://www.youtube.com/embed/gV6hP9wpMW8?si=THRQw_X4JvG3kJv"}
        ],
        linkHref: "https://trends.rbc.ru/trends/futurology/602fa0e09a7947edc0bba1c9"
    },
    {
        title: {
            ru: "Миф 9. Кадры с Марса снимают на острове Девон",
            en: "Myth 9. The footage from Mars is shot on Devon Island",
            he: "מיתוס 9. את הצילומים ממאדים מצלמים באי דבון",
            es: "Mito 9. Las imágenes de Marte se graban en la isla de Devon",
            fr: "Mythe 9. Les images de Mars sont tournées sur l’île Devon"
        },
        content: [
            {
                type: "text",
                value: {
                    ru: "Довольно популярная теория заговора, которая гласит, что NASA не запускала Curiosity, Opportunity и другие роверы на Марс, а вместо этого катает свои аппараты по острову Девон в Канаде, рядом с Гренландией. Это пустынная и холодная земля, покрытая песком и льдом, и она довольно похожа на Красную планету.",
                    en: "A fairly popular conspiracy theory claims that NASA never sent Curiosity, Opportunity and the other rovers to Mars and instead drives its vehicles around Devon Island in Canada, near Greenland. It is a barren, cold land covered with sand and ice, and it does look rather like the Red Planet.",
                    he: "תיאוריית קונספירציה פופולרית למדי טוענת ש־NASA מעולם לא שיגרה את Curiosity, את Opportunity ואת שאר הרוברים למאדים, ובמקום זאת מסיעה את כלי הרכב שלה באי דבון שבקנדה, ליד גרינלנד. זו ארץ שוממה וקרה, מכוסה חול וקרח, והיא באמת די דומה לכוכב הלכת האדום.",
                    es: "Una teoría de la conspiración bastante popular sostiene que la NASA nunca envió a Marte a Curiosity, Opportunity y los demás róveres, sino que pasea sus vehículos por la isla de Devon, en Canadá, cerca de Groenlandia. Es una tierra yerma y fría, cubierta de arena y hielo, y se parece bastante al planeta rojo.",
                    fr: "Une théorie du complot assez répandue affirme que la NASA n’a jamais envoyé Curiosity, Opportunity et les autres rovers sur Mars, et qu’elle promène plutôt ses engins sur l’île Devon, au Canada, près du Groenland. C’est une terre désolée et froide, couverte de sable et de glace, qui ressemble assez à la planète rouge."
                }
            },
            {
                type: "image",
                src: "./Images/Трулавская%20низменность,%20остров%20Девон,%20Нунавут,%20Канада.jpg",
                alt: {
                    ru: "Трулавская низменность, остров Девон, Нунавут, Канада",
                    en: "Truelove Lowland, Devon Island, Nunavut, Canada",
                    he: "שפלת טרולאב, האי דבון, נונאווט, קנדה",
                    es: "Tierras bajas de Truelove, isla de Devon, Nunavut, Canadá",
                    fr: "Les basses terres de Truelove, île Devon, Nunavut, Canada"
                }
            },
            {
                type: "text",
                value: {
                    ru: "Доказательством скептики считают разнообразные подозрительные объекты, которые то и дело попадают в объективы NASA: выброшенные на берег рыбы, пробегающие игуаны, крысы, паукообразные обезьяны и человеческие тени. Последние, видимо, принадлежат членам съёмочной команды.",
                    en: "As proof, sceptics point to various suspicious objects that keep turning up in NASA’s lenses: fish washed ashore, iguanas running past, rats, spider monkeys and human shadows. The latter apparently belong to members of the film crew.",
                    he: "כהוכחה מצביעים הספקנים על עצמים חשודים שונים שנקלעים שוב ושוב לעדשות של NASA: דגים שנפלטו לחוף, איגואנות חולפות, חולדות, קופי עכביש וצללים של בני אדם. האחרונים שייכים, כנראה, לאנשי צוות הצילום.",
                    es: "Como prueba, los escépticos señalan diversos objetos sospechosos que no paran de aparecer ante los objetivos de la NASA: peces varados en la orilla, iguanas que pasan corriendo, ratas, monos araña y sombras humanas. Estas últimas, al parecer, son de los miembros del equipo de rodaje.",
                    fr: "Pour preuve, les sceptiques citent divers objets suspects qui apparaissent sans cesse dans les objectifs de la NASA : des poissons échoués, des iguanes qui passent en courant, des rats, des singes-araignées et des ombres humaines. Ces dernières appartiendraient, semble-t-il, aux membres de l’équipe de tournage."
                }
            },
            {
                type: "image", src: "Images/breccia_hills_devon_island-1440x1080.webp",
                alt: {
                    ru: "Брекчиевые холмы, остров Девон", en: "Breccia Hills, Devon Island", he: "גבעות הברקציה, האי דבון",
                    es: "Colinas de Breccia, isla de Devon", fr: "Les collines de Breccia, île Devon"
                }
            },
            {
                type: "text",
                value: {
                    ru: "Правда, на острове Девон не водятся игуаны и паукообразные обезьяны — климат не тот. Да и простых грызунов там найти довольно затруднительно.",
                    en: "The thing is, there are no iguanas or spider monkeys on Devon Island — the climate is wrong. Even ordinary rodents are hard to find there.",
                    he: "רק שבאי דבון אין איגואנות וקופי עכביש — האקלים לא מתאים. ואפילו מכרסמים רגילים די קשה למצוא שם.",
                    es: "Lo que pasa es que en la isla de Devon no hay iguanas ni monos araña: el clima no es el adecuado. Y hasta encontrar roedores corrientes allí es bastante complicado.",
                    fr: "Sauf qu’il n’y a ni iguanes ni singes-araignées sur l’île Devon — le climat ne s’y prête pas. Même de simples rongeurs y sont difficiles à trouver."
                }
            },
            {
                type: "image",
                src: "Images/haughton_mars_project_devon_island-1440x1080.webp",
                alt: {
                    ru: "Проект Haughton Mars, остров Девон", en: "Haughton Mars Project, Devon Island", he: "פרויקט Haughton Mars, האי דבון",
                    es: "Proyecto Haughton Mars, isla de Devon", fr: "Projet Haughton Mars, île Devon"
                }
            },
            {
                type: "text",
                value: {
                    ru: "В принципе, вы можете посетить это место с помощью Google Earth и посмотреть, правда ли тамошние пейзажи похожи на снимки с Curiosity (вообще разница довольно заметная). Марсоходов там не найти, зато можно нарваться на случайно заплывшего на остров белого медведя.",
                    en: "In fact, you can visit the place with Google Earth and see whether its landscapes really look like Curiosity’s pictures (the difference is actually quite noticeable). You won’t find any rovers there, but you might run into a polar bear that happened to swim over to the island.",
                    he: "למעשה, אפשר לבקר במקום בעזרת Google Earth ולבדוק אם הנופים שם באמת דומים לתמונות של Curiosity (ההבדל, אגב, די בולט). רוברים לא תמצאו שם, אבל אולי תיתקלו בדוב קוטב שבמקרה שחה עד האי.",
                    es: "De hecho, puedes visitar el lugar con Google Earth y comprobar si sus paisajes se parecen de verdad a las fotos de Curiosity (la diferencia, por cierto, es bastante notable). Allí no encontrarás róveres, pero quizá te topes con un oso polar que haya llegado nadando a la isla por casualidad.",
                    fr: "En principe, vous pouvez visiter l’endroit avec Google Earth et voir si ses paysages ressemblent vraiment aux photos de Curiosity (la différence est d’ailleurs assez nette). Vous n’y trouverez pas de rovers, mais vous pourriez tomber sur un ours polaire venu par hasard à la nage jusqu’à l’île."
                }
            },
            {type: "video", src: "https://www.youtube.com/embed/xzyOdH6OlV0?si=4I3OyibYJD50hDEs"}
        ],
        linkHref: "https://canadiangeographic.ca/articles/now-you-can-virtually-explore-mars-on-earth-in-google-street-view/"
    },
    {
        title: {
            ru: "Миф 10. Марсиане вот-вот нападут на Землю",
            en: "Myth 10. Martians are about to attack Earth",
            he: "מיתוס 10. החייזרים מהמאדים עומדים לתקוף את כדור הארץ",
            es: "Mito 10. Los marcianos están a punto de atacar la Tierra",
            fr: "Mythe 10. Les martiens vont bientôt attaquer la Terre"
        },
        content: [
            {
                type: "text",
                value: {
                    ru: "Со времён романа Герберта Уэллса «Война миров» (1898) марсиане в книгах только и делают, что летят нас завоёвывать: на треножниках, с тепловыми лучами и полным презрением к земной армии. Победили их тогда не пушки, а самые обычные земные бактерии.",
                    en: "Ever since H. G. Wells’s novel The War of the Worlds (1898), Martians in books have done nothing but fly over to conquer us: on tripods, with heat rays and utter contempt for Earth’s armies. Back then they were defeated not by guns but by the most ordinary Earth bacteria.",
                    he: "מאז הרומן של ה״ג ולס „מלחמת העולמות” (1898), החייזרים מהמאדים בספרים לא עושים דבר מלבד לטוס לכבוש אותנו: על חצובות, עם קרני חום ובבוז מוחלט לצבאות כדור הארץ. ואז הביסו אותם לא תותחים, אלא החיידקים הארציים הרגילים ביותר.",
                    es: "Desde la novela de H. G. Wells «La guerra de los mundos» (1898), los marcianos de los libros no hacen otra cosa que venir a conquistarnos: en trípodes, con rayos de calor y un desprecio absoluto por los ejércitos terrestres. Entonces no los vencieron los cañones, sino las bacterias terrestres más corrientes.",
                    fr: "Depuis le roman de H. G. Wells « La Guerre des mondes » (1898), les martiens des livres ne font que venir nous conquérir : sur des tripodes, avec des rayons ardents et un mépris total pour les armées terrestres. À l’époque, ce ne sont pas les canons qui les ont vaincus, mais les bactéries terrestres les plus ordinaires."
                }
            },
            {
                type: "text",
                value: {
                    ru: "В 1938 году радиопостановка этого романа прозвучала так правдоподобно, что часть слушателей приняла её за срочный выпуск новостей. Газеты потом долго писали о «панике», хотя историки считают, что её масштаб сильно преувеличили.",
                    en: "In 1938 a radio adaptation of the novel sounded so convincing that some listeners took it for a breaking news bulletin. Newspapers wrote about the “panic” for a long time afterwards, although historians believe its scale was greatly exaggerated.",
                    he: "ב־1938 נשמע תסכית הרדיו לפי הרומן משכנע כל כך, שחלק מהמאזינים חשבו שזו מהדורת חדשות דחופה. העיתונים כתבו אחר כך זמן רב על „הבהלה”, אף שהיסטוריונים סבורים שהיקפה הוגזם מאוד.",
                    es: "En 1938, una adaptación radiofónica de la novela sonó tan verosímil que parte de los oyentes la tomó por un boletín informativo urgente. Los periódicos hablaron durante mucho tiempo del «pánico», aunque los historiadores creen que su alcance se exageró mucho.",
                    fr: "En 1938, une adaptation radiophonique du roman a paru si vraisemblable qu’une partie des auditeurs l’a prise pour un flash d’information urgent. Les journaux ont longtemps parlé de « panique », même si les historiens estiment que son ampleur a été très exagérée."
                }
            },
            {
                type: "text",
                value: {
                    ru: "А в реальности марсиан пока не нашёл ни один марсоход: Curiosity и Perseverance ищут следы микробов, живших миллиарды лет назад. Так что громкость можно не убавлять — нашествие откладывается. Хотя наши собственные марсиане, кажется, земную музыку не переносят…",
                    en: "In reality, no rover has found any Martians yet: Curiosity and Perseverance are looking for traces of microbes that lived billions of years ago. So there’s no need to turn the volume down — the invasion is postponed. Although our own martians, it seems, can’t stand Earth music…",
                    he: "ובמציאות, אף רובר עוד לא מצא חייזרים: Curiosity ו־Perseverance מחפשים עקבות של חיידקים שחיו לפני מיליארדי שנים. אז אין צורך להנמיך את העוצמה — הפלישה נדחית. אם כי החייזרים שלנו, כך נראה, לא סובלים מוזיקה ארצית…",
                    es: "En la realidad, ningún róver ha encontrado marcianos todavía: Curiosity y Perseverance buscan rastros de microbios que vivieron hace miles de millones de años. Así que no hace falta bajar el volumen: la invasión se aplaza. Aunque nuestros propios marcianos, al parecer, no soportan la música terrestre…",
                    fr: "En réalité, aucun rover n’a encore trouvé de martiens : Curiosity et Perseverance cherchent des traces de microbes qui vivaient il y a des milliards d’années. Inutile donc de baisser le volume — l’invasion est reportée. Même si nos propres martiens, semble-t-il, ne supportent pas la musique terrestre…"
                }
            }
        ],
        linkHref: "https://en.wikipedia.org/wiki/The_War_of_the_Worlds"
    }
];

// 2. Функция для динамической генерации карточек мифов
function generateMyths() {
    const container = document.getElementById('myths-container');
    if (!container) return;
    container.innerHTML = '';
    // Объект с переводами — выбранный язык; строка (например, имя файла в alt) — как есть
    const pick = value => (value && typeof value === 'object') ? (window.i18n ? window.i18n.pick(value) : value.en) : value;
    const t = key => window.i18n ? window.i18n.t(key) : key;

    mythsData.forEach((myth, index) => {
        const colDiv = document.createElement('div');

        // Логика для колонок: если количество карточек нечетное и это последняя, делаем её на всю ширину на средних экранах
        if (mythsData.length % 2 !== 0 && index === mythsData.length - 1) {
            colDiv.className = 'col-12 col-sm-12 col-lg-4';
        } else {
            colDiv.className = 'col-12 col-sm-6 col-lg-4';
        }

        const marsCardDiv = document.createElement('div');
        marsCardDiv.className = 'mars-card d-flex flex-column h-100';

        const h3 = document.createElement('h3');
        h3.textContent = pick(myth.title);
        marsCardDiv.appendChild(h3);

        const p = document.createElement('p');

        // Генерируем контент на основе типа
        myth.content.forEach(contentItem => {
            if (contentItem.type === 'text') {
                const textNode = document.createTextNode(pick(contentItem.value));
                p.appendChild(textNode);
            } else if (contentItem.type === 'image') {
                const img = document.createElement('img');
                img.src = contentItem.src;
                img.alt = pick(contentItem.alt);
                img.className = 'img-fluid my-2';
                p.appendChild(img);
                // Подпись с автором снимка (перенесена из первой версии проекта)
                if (contentItem.caption) {
                    const caption = document.createElement('span');
                    caption.className = 'myth-caption';
                    caption.textContent = pick(contentItem.caption);
                    p.appendChild(caption);
                }
            } else if (contentItem.type === 'video') {
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container video-expand';
                const iframe = document.createElement('iframe');
                iframe.src = contentItem.src;
                iframe.title = t('youtube.title');
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                videoContainer.appendChild(iframe);
                p.appendChild(videoContainer);
            }
        });

        marsCardDiv.appendChild(p);

        if (myth.linkHref) {
            const link = document.createElement('a');
            link.href = myth.linkHref;
            link.target = '_blank';
            link.className = 'mt-auto';
            link.textContent = t('myths.more');
            marsCardDiv.appendChild(link);
        }

        colDiv.appendChild(marsCardDiv);
        container.appendChild(colDiv);
    });
}

// 3. Запускаем функцию, когда страница полностью загружена
document.addEventListener('DOMContentLoaded', generateMyths);
