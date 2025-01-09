import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formMakePromise = document.querySelector('.form');

formMakePromise.addEventListener('submit', event => {
  event.preventDefault();

  const delay = formMakePromise.delay.value;
  const state = formMakePromise.state.value;

  makePromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  formMakePromise.reset();
});

function makePromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
