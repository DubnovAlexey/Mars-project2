// =====================================================================
// FILE: js/hover-zoom.js
// PURPOSE: a picture under the mouse grows for real — the whole picture, uncropped, about 2.5× (wide ones 3×),
//          over its neighbours and inside the screen; it grows out of its own place and shrinks back into it.
// SECTIONS: which pictures; size and place; open/close; start.
// Owner's rule (14.11.2026): pictures sit in small windows, so under the mouse they must grow seriously,
// not twitch by a few per cent. Only for a real mouse (hover + fine pointer): a finger has no hover, so on a phone
// nothing changes. The copy ignores the pointer, so a click still opens the card, the photo or the video as before.
// «Reduce motion»: the big picture appears at once, without the growing animation.
// =====================================================================
(function () {
    'use strict';

    // BEGIN SECTION 1 — which pictures
    const PICTURES = [
        '.gallery-figure img', // Photos — галерея
        '.card > img', // History — снимки и гифки в карточках
        '.mars-card img', // Myths — снимки в карточках мифов
        '.nasa-item img', // Rover и Videos — снимки марсохода и превью видео НАСА
        '.form-preview img' // формы в окнах — превью вложенной картинки
    ].join(', ');
    const TALL = 2.5; // портрет и квадрат
    const WIDE = 3; // широкая картинка (шире 4:3) растёт сильнее
    const MARGIN = 14; // отступ от края окна
    // END SECTION 1

    // BEGIN SECTION 2 — size and place
    /**
     * Where the big copy stands: k × the original width, the whole picture in its own proportions (nothing cropped),
     * shrunk to fit the window, centred on the original and pushed inside the window margins.
     * @returns {{ left: number, top: number, width: number, height: number }}
     */
    function peekBox(rect, ratio, view) {
        const k = ratio > 4 / 3 ? WIDE : TALL;
        let width = rect.width * k;
        let height = width / ratio;
        const fit = Math.min(1, (view.width - MARGIN * 2) / width, (view.height - MARGIN * 2) / height);
        width *= fit;
        height *= fit;
        const clamp = (value, size, limit) => Math.min(Math.max(value, MARGIN), limit - size - MARGIN);
        return {
            left: clamp(rect.left + rect.width / 2 - width / 2, width, view.width),
            top: clamp(rect.top + rect.height / 2 - height / 2, height, view.height),
            width,
            height
        };
    }
    // END SECTION 2

    // BEGIN SECTION 3 — open/close
    /**
     * The picture for the big copy. An attachment preview in a form lives at a blob: link that forms.js revokes as
     * soon as the preview has loaded, so a new <img> could not load it again — its copy is drawn from the shown
     * picture itself (not larger than 1600 px on the long side, a phone photo can be huge).
     */
    function copyOf(img) {
        const src = img.currentSrc || img.src;
        if (src.startsWith('blob:')) {
            const scale = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.naturalWidth * scale);
            canvas.height = Math.round(img.naturalHeight * scale);
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            return canvas;
        }
        const copy = document.createElement('img');
        copy.alt = '';
        copy.src = src;
        return copy;
    }

    function initHoverZoom() {
        const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');
        const still = window.matchMedia('(prefers-reduced-motion: reduce)');
        let current = null; // { img, peek, from }
        let timer = 0;

        function close(instant) {
            clearTimeout(timer);
            if (!current) return;
            const {peek, from} = current;
            current = null;
            if (instant || still.matches) {
                peek.remove();
                return;
            }
            peek.style.transform = from; // уходит туда же, откуда выросла
            peek.style.opacity = '0';
            peek.addEventListener('transitionend', () => peek.remove(), {once: true});
            setTimeout(() => peek.remove(), 400); // на случай, если анимация не дошла
        }

        function open(img) {
            if (current && current.img === img) return;
            close(true);
            const rect = img.getBoundingClientRect();
            if (rect.width < 24 || !img.naturalWidth) return; // снимок ещё не загрузился
            const box = peekBox(rect, img.naturalWidth / img.naturalHeight, {width: window.innerWidth, height: window.innerHeight});
            const peek = document.createElement('div');
            peek.className = 'zoom-peek';
            peek.setAttribute('aria-hidden', 'true');
            Object.assign(peek.style, {left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px`});
            peek.append(copyOf(img));
            // Растёт из своего места: старт — там, где лежит маленький снимок
            const from = `translate(${rect.left - box.left}px, ${rect.top - box.top}px) scale(${rect.width / box.width}, ${rect.height / box.height})`;
            if (!still.matches) {
                peek.style.transform = from;
                peek.style.opacity = '0.4';
            }
            document.body.append(peek);
            current = {img, peek, from};
            if (!still.matches) {
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    peek.style.transform = 'none';
                    peek.style.opacity = '1';
                }));
            }
        }

        document.addEventListener('pointerover', event => {
            if (!mouse.matches || event.pointerType !== 'mouse') return;
            const img = event.target.closest && event.target.closest(PICTURES);
            if (!img) return;
            clearTimeout(timer);
            timer = setTimeout(() => open(img), 140); // мышь просто пролетела мимо — не мигаем
        });
        document.addEventListener('pointerout', event => {
            const img = event.target.closest && event.target.closest(PICTURES);
            if (!img || img.contains(event.relatedTarget)) return;
            clearTimeout(timer);
            if (current && current.img === img) close(false);
        });
        window.addEventListener('scroll', () => close(true), {passive: true});
        window.addEventListener('resize', () => close(true));
        window.addEventListener('pagehide', () => close(true));
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') close(true);
        });
        document.addEventListener('click', () => close(true), true);
    }
    // END SECTION 3

    // BEGIN SECTION 4 — start
    // В браузере сразу включаемся; тест в Node берёт только расчёт места
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {peekBox};
    } else {
        initHoverZoom();
    }
    // END SECTION 4
})();
