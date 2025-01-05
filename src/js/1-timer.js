import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateTime = document.querySelector('#datetime-picker');
const btnDateTime = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;

flatpickr(inputDateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > this.defaultDate) {
      userSelectedDate = selectedDates[0];
      btnDateTime.disabled = false;
      iziToast.success({
        title: 'Success',
        message: 'Valid date selected',
      });
    } else {
      btnDateTime.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
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

btnDateTime.addEventListener('click', () => {
  if (!userSelectedDate) return;

  clearInterval(timerBack);

  const timerBack = setInterval(() => {
    const nowDate = new Date();
    const timeResult = userSelectedDate - nowDate;

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (timeResult <= 0) {
      clearInterval(timerBack);
      daysEl.textContent =
        hoursEl.textContent =
        minutesEl.textContent =
        secondsEl.textContent =
          '00';
      return;
    }
  }, 1000);
});
