const { createPopup } = window.picmoPopup;

document.addEventListener('DOMContentLoaded', () => {
  const selectionContainer = document.querySelector('#selection-outer');
  const emoji = document.querySelector('#selection-emoji');
  const name = document.querySelector('#selection-name');
  const trigger = document.querySelector('#trigger');

  const picker = createPopup({}, {
    referenceElement: trigger,
    triggerElement: trigger,
    position: 'right-end'
  });

  trigger.addEventListener('click', () => {
    picker.toggle();
  });

  picker.addEventListener('emoji:select', (selection) => {
    emoji.innerHTML = selection.emoji;
    name.textContent = selection.label;

    selectionContainer.classList.remove('empty');
  });
});
