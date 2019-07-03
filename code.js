const form = document.querySelector("#app-form");
const textArea = document.querySelector("#textArea");
const inputSearch = document.querySelector("#appSearch");

document.addEventListener('DOMContentLoaded', function () {
    form.addEventListener('submit', addNewNote);
    inputSearch.addEventListener('input', search);
})

// search //
const search = (e) => {
    e.preventDefault();
    const val = e.target.value.toLowerCase();
    const appElements = appList.querySelectorAll('.app-element');

    [].forEach.call(appElements, function (el) {
        const text = el.querySelector('.app-element-text').textContent.toLowerCase();

        if (text.indexOf(val) !== -1) {
            el.style.setProperty('display', '');
        } else {
            el.style.setProperty('display', 'none');
        }
    });
}

// dodawanie notatki  do listy //
const addNewNote = (e) => {
    e.preventDefault();

    // jeśli pusty string zakończ działanie
    if (textArea.value === "") {
        alert("Alert! Notatka nie może być pusta!");
        return;
    };
    // stworzenie struktury HTML notatki
    const NoteDiv = document.createElement("div");
    NoteDiv.classList.add("app-element");

    // dodanie jako dziecko div#appList
    const appListDiv = document.querySelector("#appList");
    appListDiv.appendChild(NoteDiv);

    // górny bar
    const NoteDivBar = document.createElement("div");
    NoteDivBar.classList.add("app-element-bar");
    NoteDiv.appendChild(NoteDivBar);

    // data
    const NoteDivDate = document.createElement("h3");
    NoteDivDate.classList.add('app-element-date');
    const date = new Date();

    const leadingZero = (e) => {
        return (e < 10) ? ("0" + e) : e;
    }
    const dateText = leadingZero(date.getDate()) + '-' + leadingZero(date.getMonth() + 1) + '-' + date.getFullYear() + 'r. , godz.: ' + leadingZero(date.getHours()) + ':' + leadingZero(date.getMinutes());

    NoteDivDate.innerText = dateText;
    NoteDivBar.appendChild(NoteDivDate);

    // przycisk usuwania
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("app-element-delete");
    NoteDivBar.appendChild(deleteButton);

    // ikona usuwania i podpięcie nasłuchiwania na przycisk
    deleteButton.innerHTML = `<i class="fas fa-window-close"></i>`;
    deleteButton.addEventListener('click', removeNote);


    // tekst notatki = textArea.value jako innerHTML
    const NoteText = document.createElement("div");
    NoteText.classList.add("app-element-text");
    NoteText.innerHTML = textArea.value;
    NoteDiv.appendChild(NoteText);
    textArea.value = "";

    // licznik dodanych aktywnych notatek
    const NoteDivCounter = document.querySelectorAll(".app-element");
    const counter = document.querySelector(".app-list-counter span");
    counter.textContent = NoteDivCounter.length;
}

// usuwanie notatki //
const removeNote = (e) => {
    e.preventDefault();
    if (e.target.closest(".app-element-delete") !== null) {
        e.target.closest(".app-element").remove();
    }
    // update licznika //
    const NoteDivCounter = document.querySelectorAll("div.app-element");
    const counter = document.querySelector(".app-list-counter span");
    counter.textContent = NoteDivCounter.length;
};