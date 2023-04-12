let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = "900";
canvas.height = "900";
canvas.block = "block";

let cord = [];

// добавление нового свойства для блоков с цветоами, для обработчика событий
let divColor = document.querySelectorAll(".colorDiv");
divColor.forEach((item) => {
  item.myName = "blockColor";
});

//  добавление обработчика события по изменению цвета линии
function hoverDiv() {
  let arrColor = ["black", "red", "green"];
  let parent = document.querySelector(".color");
  let divColor = document.querySelectorAll(".colorDiv");

  parent.addEventListener("click", function (e) {
    if (e.target && e.target.myName === "blockColor") {
      divColor.forEach(function (etem, i) {
        etem.classList.remove("border");

        if (e.target == etem) {
          // линия
          ctx.fillStyle = arrColor[i];
          // круг
          ctx.strokeStyle = arrColor[i];
        }
      });

      e.target.classList.add("border");
    }
  });
}
hoverDiv();

// document.addEventListener("click", function (e) {
//   console.dir(e.target);
// })

class ColorPaint {
  constructor(selectorCanvas, inputSelectorWidth, myRangeText, cord) {
    this.canvas = document.querySelector(selectorCanvas);
    this.ctx = canvas.getContext("2d");
    this.isMouseDown = false;
    this.inputValueWidth = document.querySelector(inputSelectorWidth);
    this.lineWid = myRangeText.innerHTML;
    this.parentMargin = canvas.parentElement.getBoundingClientRect();
    this.myRangeText = document.querySelector(myRangeText);
    this.cords = cord;
  }

  // добавляет текущую толщину линии на стараницу в виде текста
  lineW() {
    let that = this;
    this.inputValueWidth.addEventListener("input", function () {
      that.lineWid = +that.inputValueWidth.value;
      that.myRangeText.innerHTML = that.lineWid;
    });
  }

  // mousedown и mouseup лайфхак, при добавлении которого в массив не пушатся
  // координаты без нажатия мыши
  mousedown() {
    let that = this;
    this.canvas.addEventListener("mousedown", function () {
      that.isMouseDown = true;
    });
  }

  mouseup() {
    let that = this;
    this.canvas.addEventListener("mouseup", function () {
      that.isMouseDown = false;
      that.ctx.beginPath();
      that.cords.push("mouseup");
    });
  }

  mousemove() {
    let that = this;
    this.canvas.addEventListener("mousemove", function (e) {
      that.ctx.lineWidth = that.lineWid;
      if (that.isMouseDown) {
        that.cords.push([
          e.clientX - that.parentMargin.left,
          e.clientY - that.parentMargin.top,
          // test
          that.lineWid,
          that.ctx.fillStyle,
          that.ctx.strokeStyle,
          //
        ]);
        that.ctx.lineTo(
          e.clientX - that.parentMargin.left,
          e.clientY - that.parentMargin.top
        );
        that.ctx.stroke();

        that.ctx.beginPath();
        that.ctx.arc(
          e.clientX - that.parentMargin.left,
          e.clientY - that.parentMargin.top,
          that.lineWid / 2,
          0,
          Math.PI * 2
        );
        that.ctx.fill();

        that.ctx.beginPath();
        that.ctx.moveTo(
          e.clientX - that.parentMargin.left,
          e.clientY - that.parentMargin.top
        );
        return that.cords;
      }
    });
  }

  start() {
    console.log("start");
    this.lineW();
    this.mousedown();
    this.mouseup();
    this.mousemove();
  }
}

const paint = new ColorPaint(
  "#canvas",
  ".myRange",
  ".myRangeText",
  cord
).start();



// добавление функций для взаимодействия с текущим рисунком
let func = document.querySelector(".func");
let btnSave = document.querySelector(".btnSave");
let btnPlay = document.querySelector(".btnPlay");
let btnReset = document.querySelector(".btnReset");

// сохранить
btnSave.addEventListener("click", function (e) {
  //  как найти этот файл в локальной памяти хрома?
  localStorage.setItem("cords", JSON.stringify(cord));
  btnSave.disabled = true;
  btnPlay.disabled = false;
});
// воспроизвести
btnPlay.addEventListener("click", function (e) {
  cord = JSON.parse(localStorage.getItem("cords"));
  function clear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black";
  }
  clear();
  function replay() {
    let timer = setInterval(function () {
      if (localStorage.getItem("cords") !== null) {
        clearInterval(timer);
        ctx.beginPath();
        return;
      }
     

        // как добавить повторное сохранение , пока работает только при перезагрузке стрицы
        ctx.lineWidth = 1;

        let crd = cord.shift();
        if (crd !== undefined) {
        e = {
          clientX: crd[0],
          clientY: crd[1],
          // test
          lineWid: crd[2],
          fillStyle: crd[3],
          strokeStyle: crd[4],
          //
        }; 
      } else {
        return;
      }

        ctx.lineWidth = e.lineWid;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        // test
        ctx.fillStyle = e.fillStyle;
        //
        ctx.beginPath();
        // test
        ctx.strokeStyle = e.strokeStyle;
        // 
        ctx.arc(e.clientX, e.clientY, e.lineWid / 2, 0, Math.PI * 2);
        ctx.fill();

       
        ctx.beginPath();
       
        ctx.moveTo(e.clientX, e.clientY);

    }, 30);
    let textPushText = document.querySelector(".textPushText");
    textPushText.innerHTML = "Что бы начать заного нажмите RESET";

  }

  replay();
  localStorage.clear();
  //
  btnPlay.disabled = true;
  canvas.style.pointerEvents = "none";
  btnReset.style.border = "2px solid red";
});
// пока сброс локальной памяти и воспроизведение нового рисунка работает 
// через перезагрузку страницы при нажатии на кнопку reset
// очистить
btnReset.addEventListener("click", function (e) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle = "black";
  localStorage.clear();
  location.reload();
});


