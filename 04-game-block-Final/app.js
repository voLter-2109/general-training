"use strict";

class Game {
  // create in html:
  // <div class="container" id="board">
  // start:
  // let game = new Game("board");
  // game.reduce();

  constructor (parent) {
    this.board = document.querySelector(`#${parent}`);

    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
  }

  reduce () {
    this.createDiv();
  }

  createDiv () {
    let numberOfSquares = Math.floor((this.screenHeight * this.screenWidth) / (16 * 16));
    let that = this;

    for (let i = 0; i < numberOfSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.addEventListener("mouseleave", (e) => {
        this.setColor(e.target);
        setTimeout(that.removeColor(e.target), 300);
      });
      that.board.append(square);
    }

    that.board.addEventListener("mouseover", (e) => {
      if (e.target && e.target.classList.contains("square")) {
        that.setColor(e.target);
      }
    });
  }
  
  setColor(element) {
    const color = this.randomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }
  
  randomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  removeColor(element) {
    element.style.backgroundColor = "#1d1d1d";
    element.style.boxShadow = "0 0 2px #000";
  }

}

let game = new Game("board");
game.reduce();
