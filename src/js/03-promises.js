import  Notiflix from "notiflix";

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name=delay]');
const stepInput = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');

form.addEventListener('submit', onBtn);

function onBtn(e) {
  e.preventDefault();

  let delay = Number(delayInput.value);
  let step = Number(stepInput.value);
  let amount = Number(amountInput.value);
  let position = 0;


  for(let i = 1; i <= amount; i++) {
    position = i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      
      delay += step;
  }
     form.reset();
}



function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({position, delay});

      
      } else {
        // Reject
        rej({position, delay});
      }
    }, delay);
  });
}
