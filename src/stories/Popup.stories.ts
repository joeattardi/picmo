import './popup.css';
import createPopup from '../popup';

const meta = {
  title: 'Popup Emoji Picker',
  render: () => {
    const button = document.createElement('button');
    button.className = 'popupTrigger';
    button.textContent = '😎';

    const popup = createPopup({
      triggerElement: button,
      position: 'bottom-start'
    });

    button.addEventListener('click', () => {
      popup.toggle();
    });
    return button;
  }
};

export default meta;

export const Default = {};
