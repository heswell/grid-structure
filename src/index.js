import { getScrollHandler } from "./scroll-handler";

import "./styles.css";
import "./toolbar.css";

const tick = "✓";
const [button1, button2] = document.querySelectorAll("button");
const gridElement = document.querySelector(".Grid");
const viewportElement = document.querySelector(".Viewport");
const scrollableCanvasElement = document.querySelector(".scrollable.Canvas");
const [
  fixedContentElement,
  scrollableContentElement
] = document.querySelectorAll(".canvas-content");

let gridScrollingX = false;
let viewportScrolling = false;
let scrollTop = 0;

const handleButton1Click = ev => {
  if (gridScrollingX) {
    horizontalScrollModeOff();
  } else {
    horizontalScrollModeOn();
  }
  setButtonContent();
};

const handleButton2Click = ev => {
  if (viewportScrolling) {
    verticalScrollModeOff();
  } else {
    verticalScrollModeOn();
  }
};

function horizontalScrollModeOn() {
  gridElement.classList.add("scrolling-x");
  gridScrollingX = true;
  setButtonContent();
}

function horizontalScrollModeOff() {
  gridElement.classList.remove("scrolling-x");
  gridScrollingX = false;
  setButtonContent();
}

function verticalScrollModeOn() {
  viewportElement.classList.add("scrolling");
  const translate = `translate3d(0px,-${scrollTop}px, 0px)`;
  scrollableContentElement.style.transform = translate;
  viewportScrolling = true;
  setButtonContent();
}

function verticalScrollModeOff() {
  const scrollTop = viewportElement.scrollTop;
  const translateFixed = `translate3d(0px, -${scrollTop}px, 0px)`;
  fixedContentElement.style.transform = translateFixed;

  // NO translate the offset back to scrollLeft
  const translateScrolling = `translate3d(0px, -${scrollTop}px, 0px)`;

  scrollableContentElement.style.transform = translateScrolling;
  viewportElement.classList.remove("scrolling");
  viewportScrolling = false;
  setButtonContent();
}

const verticalScrollHandler = getScrollHandler(scrollEvent => {
  scrollTop = scrollableCanvasElement.scrollTop;
  if (scrollEvent === "scroll-start") {
    verticalScrollModeOn();
  } else {
    verticalScrollModeOff();
  }
});

const horizontalScrollHandler = getScrollHandler(scrollEvent => {
  if (scrollEvent === "scroll-start") {
    horizontalScrollModeOn();
  } else {
    horizontalScrollModeOff();
  }
});

button1.addEventListener("click", handleButton1Click);
button2.addEventListener("click", handleButton2Click);
viewportElement.addEventListener("scroll", verticalScrollHandler);
scrollableCanvasElement.addEventListener("scroll", horizontalScrollHandler);

function setButtonContent() {
  button1.innerHTML = `
  <span>Grid: scrolling-x</span>
  <span class="tick">${gridScrollingX ? tick : ""}</span>`;

  button2.innerHTML = `
    <span>Viewport: scrolling</span>
    <span class="tick">${viewportScrolling ? tick : ""}</span>`;
}

setButtonContent();
