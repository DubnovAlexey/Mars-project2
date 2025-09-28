// js/data.js
// Данные страниц: title, optional playlist (array of {src, title}).
// Если playlist для страницы не задан — используется globalPlaylist.

window.pageData = {
    "index.html": {
        title: "Home",
        playlist: [
            {src: "/music/33.mp3", title: "Mars Breeze (33)"},
            {src: "/music/11.mp3", title: "Red Plains (11)"},
            {src: "/music/777.mp3", title: "Orbit Echo (777)"},
            {src: "/music/888.mp3", title: "Dust Trail (888)"},
            {src: "/music/999.mp3", title: "Night Crater (999)"}
        ]
    },

    "myths.html": {
        title: "Myths",
        // пример собственного плейлиста для страницы "myths"
        playlist: [
            {src: "/music/33.mp3", title: "Mars Breeze (33)"},
            {src: "/music/11.mp3", title: "Red Plains (11)"},
            {src: "/music/777.mp3", title: "Orbit Echo (777)"},
            {src: "/music/888.mp3", title: "Dust Trail (888)"},
            {src: "/music/999.mp3", title: "Night Crater (999)"}
        ]
    },

    "history.html": {
        title: "History",
        playlist: [
            {src: "/music/33.mp3", title: "Mars Breeze (33)"},
            {src: "/music/11.mp3", title: "Red Plains (11)"},
            {src: "/music/777.mp3", title: "Orbit Echo (777)"},
            {src: "/music/888.mp3", title: "Dust Trail (888)"},
            {src: "/music/999.mp3", title: "Night Crater (999)"}
        ]
    },

    "photos.html": {
        title: "Photo",
        // пример: своя последовательность для photos
        playlist: [
            {src: "/music/33.mp3", title: "Mars Breeze (33)"},
            {src: "/music/11.mp3", title: "Red Plains (11)"},
            {src: "/music/777.mp3", title: "Orbit Echo (777)"},
            {src: "/music/888.mp3", title: "Dust Trail (888)"},
            {src: "/music/999.mp3", title: "Night Crater (999)"}
        ]
    },

    "about.html": {
        title: "About The Project",
        playlist: [
            {src: "/music/33.mp3", title: "Mars Breeze (33)"},
            {src: "/music/11.mp3", title: "Red Plains (11)"},
            {src: "/music/777.mp3", title: "Orbit Echo (777)"},
            {src: "/music/888.mp3", title: "Dust Trail (888)"},
            {src: "/music/999.mp3", title: "Night Crater (999)"}
        ]
    },
    // Глобальный плейлист — используемый по умолчанию
    globalPlaylist: [
        {src: "/music/33.mp3", title: "Mars Breeze (33)"},
        {src: "/music/11.mp3", title: "Red Plains (11)"},
        {src: "/music/777.mp3", title: "Orbit Echo (777)"},
        {src: "/music/888.mp3", title: "Dust Trail (888)"},
        {src: "/music/999.mp3", title: "Night Crater (999)"}
    ]
};
