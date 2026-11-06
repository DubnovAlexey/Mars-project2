// js/forms.js
// Окна-формы из подвала (вопрос, комментарий, материалы, пожертвование).
// Сообщения с вложениями отправляются на почту через сервис FormSubmit (formsubmit.co) — без своего сервера.
// Форма пожертвования — демонстрационная: данные карты проверяются в браузере и никуда не отправляются.

// Адрес приёма писем. Пустая строка — отправка ещё не подключена.
// Подключение: "https://formsubmit.co/ВАШ_EMAIL"; после первого письма FormSubmit пришлёт на эту почту
// письмо с кнопкой подтверждения и случайный адрес-псевдоним — его лучше вписать сюда вместо почты.
const FORM_ENDPOINT = "https://formsubmit.co/dubnovalexey@gmail.com";

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;

function setFormStatus(form, text, kind) {
    const status = form.querySelector(".form-status");
    if (!status) return;
    status.textContent = text;
    status.className = "form-status small mb-0 " + (kind === "ok" ? "text-success" : kind === "error" ? "text-danger" : "text-muted");
}

// Превью выбранных файлов: картинки — миниатюрами, остальное — именем и размером
const previewUrls = new WeakMap();
function showFilePreviews(input) {
    const box = input.parentElement.querySelector(".form-previews");
    if (!box) return true;
    for (const url of previewUrls.get(input) || []) URL.revokeObjectURL(url);
    const urls = new Set();
    previewUrls.set(input, urls);
    box.textContent = "";
    const files = [...input.files];
    const total = files.reduce((sum, f) => sum + f.size, 0);
    const tooMany = files.length > MAX_FILES;
    const tooBig = total > MAX_TOTAL_BYTES;
    input.setCustomValidity(tooMany ? `Please choose up to ${MAX_FILES} files.` : tooBig ? "The files are larger than 10 MB in total." : "");
    if (tooMany || tooBig) { box.textContent = input.validationMessage; return false; }
    files.forEach(file => {
        const item = document.createElement("div");
        item.className = "form-preview";
        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            const url = URL.createObjectURL(file);
            urls.add(url);
            img.src = url;
            img.alt = file.name;
            img.onload = img.onerror = () => { URL.revokeObjectURL(url); urls.delete(url); };
            item.appendChild(img);
        }
        const name = document.createElement("span");
        name.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`;
        item.appendChild(name);
        box.appendChild(item);
    });
    return true;
}

// Проверки демо-формы карты: алгоритм Луна, срок MM/YY не в прошлом, CVV из 3–4 цифр
function luhnValid(number) {
    const digits = number.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) return false;
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let d = +digits[digits.length - 1 - i];
        if (i % 2 === 1) {
            d *= 2;
            if (d > 9) d -= 9;
        }
        sum += d;
    }
    return sum % 10 === 0;
}

function checkDemoCard(form) {
    const card = form.querySelector("#card-number");
    const expiry = form.querySelector("#expiry-date");
    const cvv = form.querySelector("#cvv-code");
    card.setCustomValidity(luhnValid(card.value) ? "" : "Please check the card number.");
    const m = expiry.value.trim().match(/^(\d{2})\s*\/\s*(\d{2})$/);
    const now = new Date();
    const expiryOk = m && +m[1] >= 1 && +m[1] <= 12 &&
        new Date(2000 + +m[2], +m[1], 1) > new Date(now.getFullYear(), now.getMonth(), 1);
    expiry.setCustomValidity(expiryOk ? "" : "Use the MM/YY format and a date in the future.");
    cvv.setCustomValidity(/^\d{3,4}$/.test(cvv.value.trim()) ? "" : "CVV is 3 or 4 digits.");
}

function closeModalSoon(form) {
    const modalEl = form.closest(".modal");
    setTimeout(() => {
        if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).hide();
        setFormStatus(form, "");
    }, 2500);
}

// Отправка обычной формой в скрытый iframe: так уходят и файлы, а страница не перезагружается
function sendForm(form) {
    let frame = document.getElementById("form-send-frame");
    if (!frame) {
        frame = document.createElement("iframe");
        frame.id = "form-send-frame";
        frame.name = "form-send-frame";
        frame.hidden = true;
        document.body.appendChild(frame);
    }
    if (frame.dataset.pending === 'true') {
        setFormStatus(form, 'Another message is still being submitted. Please wait.', 'error');
        return;
    }
    frame.dataset.pending = 'true';
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    let timeout = null;
    const finish = text => {
        clearTimeout(timeout);
        frame.onload = null;
        frame.dataset.pending = 'false';
        if (submitButton) submitButton.disabled = false;
        setFormStatus(form, text);
    };
    const extras = {
        _subject: form.dataset.subject || "Mars site",
        _template: "table",
        _captcha: "false",
        page: location.href
    };
    const added = Object.entries(extras).map(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
        return input;
    });
    form.action = FORM_ENDPOINT;
    form.method = "POST";
    form.enctype = "multipart/form-data";
    form.target = frame.name;
    frame.onload = () => {
        // Первичная загрузка пустого iframe ещё не является ответом сервиса.
        try { if (frame.contentWindow.location.href === 'about:blank') return; } catch (_) { /* Внешний ответ недоступен по same-origin policy. */ }
        // load не доказывает доставку письма: сохраняем заполненные поля и вложения.
        finish('Your browser submitted the form. Delivery has not been confirmed; keep a copy of your message.');
    };
    timeout = setTimeout(() => finish('Delivery could not be confirmed. Your fields are preserved; please try again later.'), 30000);
    form.submit(); // submit() не вызывает обработчик submit — повторной отправки не будет
    added.forEach(input => input.remove());
}

function initSiteForms() {
    document.querySelectorAll("form.site-form").forEach(form => {
        // Проверяем сами в обработчике submit: иначе после одной ошибки браузер больше не пускает
        // к обработчику и не даёт снять свою пометку «неверно» с поля
        form.noValidate = true;
        form.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener("change", () => showFilePreviews(input));
        });

        form.addEventListener("submit", (ev) => {
            ev.preventDefault();
            if (form.dataset.demo) checkDemoCard(form);
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            if (form.dataset.demo) {
                setFormStatus(form, "Thank you! This is a demo: nothing was charged and no card data left your browser.", "ok");
                form.reset();
                closeModalSoon(form);
                return;
            }
            if (!FORM_ENDPOINT) {
                setFormStatus(form, "Sending is not connected yet. Please try again later.", "error");
                return;
            }
            setFormStatus(form, "Sending…");
            sendForm(form);
        });
    });
}

// Окна вставляет common.js при загрузке, поэтому ждём полной загрузки страницы
window.addEventListener("load", initSiteForms);
