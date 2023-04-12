"use strickt";

const item = document.querySelector(".item"),
  placeholder = document.querySelectorAll(".placeholder");

item.addEventListener("dragstart", dragstart);
item.addEventListener("dragend", dragend);



placeholder.forEach((item) => {
  // когда елемент находится над пласхолдер
  item.addEventListener("dragover", dragover);
  // когда елемент заходит на территорию пласхолдера
  item.addEventListener("dragenter", dragenter);
  // перетащили но вышли
  item.addEventListener("dragleave", dragleave);
  // отпустили
  item.addEventListener("drop", dragdrop);
});

function dragstart(event) {
  event.target.classList.add("hold");
  setTimeout(() => {
    event.target.classList.add("hide");
  }, 0);
}

function dragend(event) {
  event.target.classList.remove("hold", "hide");
}

function dragover(event) {
  event.preventDefault();
}
function dragenter(event) {
  event.target.classList.add("hovered");
}
function dragleave(event) {
  event.target.classList.remove("hovered");
}
function dragdrop(event) {
  event.target.classList.remove("hovered");
  event.target.append(item);
}
