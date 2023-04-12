// https://doka.guide/js/intersection-observer/
// https://habr.com/ru/post/494670/
// https://misha.agency/javascript/intersection-observer-api.html#target

// функция создания элемента списка
// контейнер за которым следить
let rootBlock = document.querySelector("#root");

function createLi() {
  let div = document.createElement("div");
  div.classList.add("block");
  div.classList.add("red");
  rootBlock.append(div);
}

// entries — список объектов с информацией о пересечении. Для каждого наблюдаемого элемента создаётся один объект IntersectionObserverEntry.

// Объект содержит несколько свойств, самые полезные это:

// isIntersecting — булево значение. true если есть пересечение элемента и наблюдаемой области.
// intersectionRatio — доля пересечения от 0 до 1. Если элемент полностью в наблюдаемой области, то значение будет 1, а если наполовину, то — 0.5.
// target — сам наблюдаемый элемент для дальнейших манипуляций. Например, для добавления классов.
// Есть и другие свойства, которые позволяют узнать время и координаты пересечения, а также размеры и положение наблюдаемых элементов.

// observer — ссылка на экземпляр наблюдателя для вызова методов прослушивания:

// observe(элемент) — запускает наблюдение за переданным элементом;
// unobserve(элемент) — убирает элемент из списка наблюдаемых;
// disconnect() — останавливает наблюдения за всеми элементами.

let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("red");
        createLi();
      }
      observer.unobserve(entry.target);
      observer.observe(document.querySelector(".block:last-child"));
    });
  },
  { threshold: 0.1 }
);

const arr = document.querySelectorAll(".block");
arr.forEach((i) => {
  observer.observe(i);
});

// ___________________________________________________________________________________________________________
const parentBlock = document.querySelector("#test");
const parentUl = document.querySelector("ul");
let num = 2;
let heightSkrollBlock = parentBlock.querySelector(".heightBlock");
let height = window
  .getComputedStyle(heightSkrollBlock, null)
  .getPropertyValue("height")
  .replace(/\D/g, "");

// 1 подписка
const options = {
  root: parentBlock,
  rootMargin: "0px 0px 300px 0px",
  threshold: buildThresholdList(),
};
function buildThresholdList() {
  let thresholds = [];
  let steps = 30;

  for (let i = 1.0; i <= steps; i++) {
    let ratio = i / steps;
    thresholds.push(ratio);
  }

  return thresholds;
}

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    let curRatio = entry.intersectionRatio;

    entry.target.style.background = `rgba(40,40,190,${curRatio})`;
  });
  
}, options);

// 2 подписка
const observer3 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        createBlock(num);
        num++;
        observer.unobserve(entry.target);
      }
      observer2.observe(document.querySelector(".heightBlock:last-child"));
      observer3.observe(document.querySelector(".heightBlock:last-child"));
    });
    return num;
  },
  { root: parentBlock, threshold: 0.7 }
);

const block = document.querySelectorAll(".heightBlock");
block.forEach((i) => {
  observer3.observe(i);
  observer2.observe(i);
});

const createBlock = (num) => {

  let div = document.createElement("div");
  div.classList.add("heightBlock");
  div.setAttribute("data-id", num);
  div.innerText = num;
  parentBlock.append(div);

  let li = document.createElement("li");
  li.innerHTML = `<a href="#" data-id=${num}>${num}</a>`;
  parentUl.append(li);
  
  li.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;
    parentBlock.scroll({
      top: (Number(id) - 1) * 410,
      behavior: "smooth",
    });
  });
  
};
