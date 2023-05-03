import './popup.css';
import EmojiPicker from '../elements/EmojiPicker';
import createPopup from '../popup';

const meta = {
  title: 'Popup Emoji Picker',
  render: options => {
    const picker = new EmojiPicker();

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
