'use strict';

let notification = document.querySelector('[data-qa="notification"]');

if (!notification) {
  notification = document.createElement('div');
  notification.setAttribute('data-qa', 'notification');
  document.body.appendChild(notification);
}

document.addEventListener('contextmenu', (e) => e.preventDefault());

window.firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const clickHandler = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', clickHandler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

window.firstPromise
  .then((message) => showNotification('success', message))
  .catch((error) => showNotification('error', error.message));

window.secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

window.secondPromise
  .then((message) => showNotification('success', message))
  .catch(() => showNotification('error', 'Second promise error'));

window.thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  const clickHandler = (e) => {
    if (e.button === 0) left = true;
    if (e.button === 2) right = true;

    if (left && right) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

window.thirdPromise
  .then((message) => showNotification('success', message))
  .catch(() => showNotification('error', 'Third promise error'));

function showNotification(type, message) {
  const div = document.querySelector('[data-qa="notification"]');

  div.className = '';
  div.classList.add(type);
  div.textContent = message;
}
