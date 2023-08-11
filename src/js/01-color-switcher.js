
// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону <body> на випадкове 
// значення, використовуючи інлайн стиль. Натисканням 
// на кнопку «Stop» зміна кольору фону повинна зупинятися.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function stateBtn(a, b) {
    startBtn.disabled = a;
    stopBtn.disabled = b;
}

function onStart() {
      timerId = setInterval(() => {
      let colors = getRandomHexColor();
      document.body.style.backgroundColor = colors;
      stateBtn(true, false);
}, 1000)
}

function onStop() {
    clearInterval(timerId);
    stateBtn(false, true);
}




