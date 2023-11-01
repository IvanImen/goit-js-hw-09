const el = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  background: document.querySelector('body'),
};

let timerId;

el.buttonStop.disabled = true;

el.buttonStart.addEventListener('click', startChangeColor.bind(el));
el.buttonStop.addEventListener('click', stopChangeColor.bind(el));

function startChangeColor(event) {
  event.currentTarget.disabled = true;
  this.buttonStop.disabled = false;

  timerId = setInterval(changeColor, 1000);
}

function stopChangeColor(event) {
  event.currentTarget.disabled = true;
  this.buttonStart.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  const color = getRandomHexColor();
  el.background.style.backgroundColor = color;
}
