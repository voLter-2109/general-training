"use strict";

document.addEventListener("DOMContentLoaded", () => {
  class toDoList {
    constructor(parent, nameList) {
      // переменные
      this.wrapper = document.querySelector(parent);
      this.nameList = nameList;
    }
    reduce() {
      this.addGif(this.wrapper);
      this.createBtnCreateList(this.wrapper);
      this.createList(this.wrapper, this.nameList);
      this.changeParantGrid(this.wrapper);
      this.creatDraggable();
    }
    
    addGif(parent) {
      this.parentDiv = parent;
      let divGif = document.createElement("img");
      divGif.src = "icon/book.gif";
      divGif.classList.add("divGif");
      this.parentDiv.append(divGif);
    }
    // шаблон\первичное построение списка
    createList(parent, nameList) {
      this.parantList = parent;
      this.nameList = nameList;
      let that = this;
      const task = document.createElement("section");
      task.classList.add("tasks");
      task.innerHTML = `
        <h1 class="tasks__title" contenteditable="true">${this.nameList}</h1>
          <ul class="tasks__list" contenteditable="true">
            <li class="tasks__item" > Текст_1... </li>
            <li class="tasks__item" > Текст_2... </li>
          </ul>
      `;
      this.parantList.append(task);

      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btnDelete");
      btnDelete.textContent = "-";
      task.append(btnDelete);
      btnDelete.addEventListener("click", function (event) {
        event.target.parentNode.classList.add("btnRemoveParent");
        setTimeout(() => {
          event.target.parentNode.remove();
          that.changeParantGrid(that.wrapper);
        }, 400);
      });
      
      const btnCreateLi = document.createElement("button");
      btnCreateLi.textContent = "+";
      task.append(btnCreateLi);
      btnCreateLi.addEventListener("click", (e)=> {
        let newLi = document.createElement("li");
        newLi.classList.add("tasks__item");
        newLi.textContent = "привет";
        let x = e.target.parentNode.children[1];
        x.append(newLi);
      });
    }
    // изменение кол-ва столбцов в parant и добавление position r
    changeParantGrid(parent) {
      this.parantList = parent;

      const countTask = document.querySelectorAll(".tasks").length;
      countTask >= 3
        ? (this.parantList.style.gridTemplateColumns = "repeat(3, 1fr)")
        : (this.parantList.style.gridTemplateColumns = "repeat(2, 1fr)");
    }
    // добавить связь с changeParantGrid
    createBtnCreateList(parent) {
      this.parentList = parent;
      let that = this;

      const btnCreate = document.createElement("button");
      btnCreate.classList.add("btnCreate");
      btnCreate.textContent = "+";
      this.parentList.append(btnCreate);
      btnCreate.addEventListener("click", function (e) {
        that.createList(that.wrapper, that.nameList);
        that.changeParantGrid(that.wrapper);
        that.creatDraggable();
      });
    }

    // перемещение пунктов внутри каждого листа
    creatDraggable() {
      const tasksListAll = document.querySelectorAll(`.tasks__list`);
      tasksListAll.forEach((tasksListElement) => {
        const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);

        taskElements.forEach((e) => {
          e.draggable = true;
        });

        tasksListElement.addEventListener(`dragstart`, (evt) => {
          evt.target.classList.add(`selected`);
        });

        tasksListElement.addEventListener(`dragend`, (evt) => {
          evt.target.classList.remove(`selected`);
        });

        tasksListElement.addEventListener(`dragover`, (evt) => {
          // Разрешаем сбрасывать элементы в эту область
          evt.preventDefault();

          // Находим перемещаемый элемент
          const activeElement = tasksListElement.querySelector(`.selected`);
          // Находим элемент, над которым в данный момент находится курсор
          const currentElement = evt.target;
          // Проверяем, что событие сработало:
          // 1. не на том элементе, который мы перемещаем,
          // 2. именно на элементе списка
          const isMoveable =
            activeElement !== currentElement &&
            currentElement.classList.contains(`tasks__item`);

          // Если нет, прерываем выполнение функции
          if (!isMoveable) {
            return;
          }

          // Находим элемент, перед которым будем вставлять
          const nextElement =
            currentElement === activeElement.nextElementSibling
              ? currentElement.nextElementSibling
              : currentElement;

          // Вставляем activeElement перед nextElement
          tasksListElement.insertBefore(activeElement, nextElement);
        });
        const getNextElement = (cursorPosition, currentElement) => {
          // Получаем объект с размерами и координатами
          const currentElementCoord = currentElement.getBoundingClientRect();
          // Находим вертикальную координату центра текущего элемента
          const currentElementCenter =
            currentElementCoord.y + currentElementCoord.height / 2;

          // Если курсор выше центра элемента, возвращаем текущий элемент
          // В ином случае — следующий DOM-элемент
          const nextElement =
            cursorPosition < currentElementCenter
              ? currentElement
              : currentElement.nextElementSibling;

          return nextElement;
        };

        tasksListElement.addEventListener(`dragover`, (evt) => {
          evt.preventDefault();

          const activeElement = tasksListElement.querySelector(`.selected`);
          const currentElement = evt.target;
          const isMoveable =
            activeElement !== currentElement &&
            currentElement.classList.contains(`tasks__item`);

          if (!isMoveable) {
            return;
          }

          // evt.clientY — вертикальная координата курсора в момент,
          // когда сработало событие
          const nextElement = getNextElement(evt.clientY, currentElement);

          // Проверяем, нужно ли менять элементы местами
          if (
            (nextElement &&
              activeElement === nextElement.previousElementSibling) ||
            activeElement === nextElement
          ) {
            // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
            return;
          }

          tasksListElement.insertBefore(activeElement, nextElement);
        });
      });
    }

  }

  // аргументы (блок куда поместить - parent, название списка)
  let toDoTest = new toDoList(".wrapper", "Заголовок");
  toDoTest.reduce();
});
