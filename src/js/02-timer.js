import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      elements.startButton.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      elements.startButton.disabled = false;
    }
  },
};

const input = flatpickr('#datetime-picker', options);
elements.startButton.disabled = true;

elements.startButton.addEventListener('click', onButtonClick);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onButtonClick() {
  elements.startButton.disabled = true;
  const selectedTime = input.selectedDates[0];
  UpdatesLeftTime(selectedTime);

  const intervalId = setInterval(() => {
    UpdatesLeftTime(selectedTime);
    if (Date.now() + 1000 > selectedTime) {
      clearInterval(intervalId);
      Notify.success('Your time is counted');
    }
  }, 1000);
}

function updateOutputs({ days, hours, minutes, seconds }) {
  elements.days.textContent = addLeadingZero(days);
  elements.hours.textContent = addLeadingZero(hours);
  elements.minutes.textContent = addLeadingZero(minutes);
  elements.seconds.textContent = addLeadingZero(seconds);
}

function UpdatesLeftTime(futureTime) {
  const delta = futureTime - Date.now();
  const deltaObject = convertMs(delta);
  updateOutputs(deltaObject);
}
