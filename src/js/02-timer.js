import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import  Notiflix from "notiflix";


const onInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const field = document.querySelector('.field');
const label = document.querySelector('.label');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

timer.style.display = 'flex';
timer.style.gap = '10px';
timer.style.alignItems = 'center';
timer.style.fontWeight = 'bold';
timer.style.width = '280px';
timer.style.height = '75px';
timer.style.background = 'bisque';
timer.style.textAlign = 'center';



startBtn.disabled = true;
flatpickr(onInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.dir(selectedDates[0]);

      if(selectedDates[0].getTime() < Date.now()) {
        Notiflix.Notify.warning("Please choose a date in the future");
          startBtn.disabled = true;
      } else {
        Notiflix.Notify.success('Timer is started');
        startBtn.disabled = false;
      }
    },
});


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
     const selectedDate = onInput._flatpickr.selectedDates[0].getTime();

     startBtn.disabled = true;
     const interval = setInterval(() => {
        const msRemaing = selectedDate - Date.now();

        if(msRemaing <= 0) {
            clearInterval(interval);
            startBtn.disabled = false;
            updateTimer(0);
        } else {
            updateTimer(msRemaing);
        }
     }, 1000);
}

function updateTimer(ms) {
    const {
        days: daysValue,
        hours: hoursValue,
        minutes: minutesValue,
        seconds: secondsValue,
    } = convertMs(ms);

    days.textContent = addLeadingZero(daysValue);
    hours.textContent = addLeadingZero(hoursValue);
    minutes.textContent = addLeadingZero(minutesValue);
    seconds.textContent = addLeadingZero(secondsValue);
}
