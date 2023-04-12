"use strickt";

const downBtn = document.querySelector(".down-button"),
  upBtn = document.querySelector(".up-button"),
  sidebar = document.querySelector(".sidebar"),
  mainSlide = document.querySelector(".main-slide"),
  container = document.querySelector(".container");

const slideCount = mainSlide.querySelectorAll("div").length;
let activSlideIndex = 0;

sidebar.style.top = `-${(slideCount - 1) * 100}vh`;

upBtn.addEventListener("click", function() {
  changeSlide("up");
});
document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowUp") {
    changeSlide("up");
  }
});

downBtn.addEventListener("click", function () {
  changeSlide("down");
});
document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowDown") {
    changeSlide("down");
  }
});




function changeSlide(direction) {
  if (direction === "up") {
    activSlideIndex++;
    if (activSlideIndex === slideCount) {
      activSlideIndex = 0;
    }
  } else if (direction === "down") {
    activSlideIndex--;
    if (activSlideIndex < 0) {
      activSlideIndex = slideCount - 1;
    }
  }

  const height = container.clientHeight;

  mainSlide.style.transform = `translateY(-${activSlideIndex * height}px)`;
  sidebar.style.transform = `translateY(${activSlideIndex * height}px)`;
}




