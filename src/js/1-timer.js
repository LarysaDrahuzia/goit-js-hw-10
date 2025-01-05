import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDatePicker = document.querySelector('#datetime-picker');
const btnDateStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let intervalBack = null;

flatpickr(inputDatePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= this.defaultDate) {
      btnDateStart.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      btnDateStart.disabled = false;

      iziToast.success({
        title: 'Success',
        message: 'Valid date selected!',
      });
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

const addLeadingZero = value => value.toString().padStart(2, '0');

btnDateStart.addEventListener('click', () => {
  btnDateStart.disabled = true;
  inputDatePicker.disabled = true;

  intervalBack = setInterval(() => {
    const nowDate = new Date();
    const timeResult = userSelectedDate - nowDate;

    const { days, hours, minutes, seconds } = convertMs(timeResult);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    const isTimerStop = [days, hours, minutes, seconds].every(
      value => value === 0
    );

    if (isTimerStop) {
      clearInterval(intervalBack);
      inputDatePicker.disabled = false;
    }
  }, 1000);
});
