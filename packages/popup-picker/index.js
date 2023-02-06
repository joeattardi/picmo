import { createPopup } from './src/index';

const trigger = document.querySelector('#trigger');

const picker = createPopup({ showRecents: false }, {
  position: 'bottom-start'
});

trigger.addEventListener('click', () => {
  picker.toggle({
    triggerElement: trigger,
    referenceElement: trigger
  });
});

picker.addEventListener('emoji:select', (selection) => {
  trigger.innerHTML = selection.emoji;
  trigger.nextElementSibling.textContent = JSON.stringify(selection, null, 2);
});

document.querySelectorAll('input[type="radio"]').forEach(button => {
  button.addEventListener('click', event => {
    picker.picker.updateOptions({ theme: event.target.value });
  });
})