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
  const scrollTop = viewportElement.scrollTop;
  const translate = `translate3d(0px, -${scrollTop}px, 0px)`;
  fixedContentElement.style.transform = translate;
  scrollableContentElement.style.transform = translate;

  gridElement.classList.add("scrolling-x");
  gridScrollingX = true;
  setButtonContent();
}

function horizontalScrollModeOff() {
  const scrollTop = Math.min(viewportElement.scrollTop, 600);
  const translate = `translate3d(0px, -${scrollTop}px, 0px)`;
  fixedContentElement.style.transform = translate;
  scrollableContentElement.style.transform = translate;
  gridElement.classList.remove("scrolling-x");
  gridScrollingX = false;
  setButtonContent();
}

function verticalScrollModeOn() {
  viewportElement.classList.add("scrolling");
  const translate = `translate3d(0px,0px, 0px)`;
  scrollableContentElement.style.transform = translate;
  viewportScrolling = true;
  setButtonContent();
}

function verticalScrollModeOff() {
  const scrollTop = viewportElement.scrollTop;
  const translate = `translate3d(0px, -${scrollTop}px, 0px)`;
  fixedContentElement.style.transform = translate;
  scrollableContentElement.style.transform = translate;
  viewportElement.classList.remove("scrolling");
  viewportScrolling = false;
  setButtonContent();
}

const verticalScrollHandler = getScrollHandler(scrollEvent => {
  if (scrollEvent === "scroll-start") {
    verticalScrollModeOn();
  } else {
    console.log(`position at scrollEnd ${viewportElement.scrollTop}`);
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
