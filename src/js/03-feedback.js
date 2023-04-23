const form = document.querySelector('.feedback-form');
const emailField = form.querySelector('input[name="email"]');
const messageField = form.querySelector('textarea[name="message"]');

form.addEventListener('input', () => {
  const formData = {
    email: emailField.value,
    message: messageField.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

window.addEventListener('load', () => {
  const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formData) {
    emailField.value = formData.email;
    messageField.value = formData.message;
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = {
    email: emailField.value,
    message: messageField.value,
  };
  console.log('Form submitted with data:', formData);
  localStorage.removeItem('feedback-form-state');
  emailField.value = '';
  messageField.value = '';
});

import throttle from 'lodash.throttle';

form.addEventListener(
  'input',
  throttle(() => {
    const formData = {
      email: emailField.value,
      message: messageField.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500)
);
