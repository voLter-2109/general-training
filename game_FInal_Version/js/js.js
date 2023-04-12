"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let gamePlace = document.querySelector(".gamePlace");
  let select = document.querySelector(".form-select");
  let amountBlock;
  let primer;

  // изменение кол-ва блоков в зависимости от выбора
  select.addEventListener("change", function (e) {
    amountBlock = e.target.value;
    console.log(amountBlock);
    gamePlace.innerHTML = "";
    // генерирует массив под выбранный размер

    let getArrayBlock = function (number) {
      let x = number / 2;
      let coob = [];

      for (let i = 1; i <= x; i++) {
        coob.push(i);
        coob.push(i);
      }
      let newCoob = coob.sort(() => Math.random() - 0.5);

      // создает блоки в зависимости от выбранного размера
      for (let i = 0; i < amountBlock; i++) {
        primer = document.createElement("div");
        primer.mynamber = newCoob[i];
        primer.repiat = i + 1;
        primer.textContent = newCoob[i];
        primer.myname = "block";
        primer.classList.add("primer");
        gamePlace.append(primer);
      }
    };

    // заполняет каждую ячейку числом из рандомно разбросанного массива данных и создает стили
    let y = Math.sqrt(amountBlock);
    getArrayBlock(amountBlock);
    gamePlace.style.gridTemplateColumns = `repeat(${y}, 50px)`;
    primer = document.querySelectorAll(".primer");
  });

  // делигирование событий
  let x = [];
  let y = [];

  function removeClass() {
    primer.forEach(function (item) {
      item.classList.remove("grey");
      item.style.color = "rgb(153, 143, 143)";
    });
  }

  // Проверка на совпаение нового свойства блока\ пропадает если совпало
  function click() {
    gamePlace.addEventListener("click", function (event) {
      if (event.target && event.target.myname == "block") {
        event.target.style.color = "white";
        event.target.classList.add("grey");
        x.push(event.target.mynamber);
        y.push(event.target.repiat);
        // test
        console.log("номер на иконке:" + x);
        console.log("номер по счету" + y);
      }
      if (x.length === 2) {
        if (x[0] !== x[1] || y[0] === y[1]) {
          console.log("error");
          x = [];
          y = [];
          setTimeout(removeClass, 500);
        } else {
          console.log("ok");
          primer.forEach(function (item, i) {
            if (Number(item.mynamber) === x[0]) {
              setTimeout(() => {
                item.style.pointerEvents = "none";
                item.style.opacity = 0;
              }, 300);
            }
            item.repiat = i;
          });
        }
        y = [];
        x = [];
      }
    });
  }
  click();

  let buttonClickReset = document.querySelector(".removeClick");
  buttonClickReset.addEventListener("click", function () {
    location.reload();
  });
});