import { Emoji } from "./emoji";
import { createElement } from "./util";

import { HIDE_VARIANT_POPUP } from "./events";

import { times } from "./icons";

const CLASS_OVERLAY = "emoji-picker__variant-overlay";
const CLASS_POPUP = "emoji-picker__variant-popup";
const CLASS_CLOSE_BUTTON = "emoji-picker__variant-popup-close-button";

export class VariantPopup {
  constructor(events, emoji) {
    this.events = events;
    this.emoji = emoji;
  }

  render() {
    const popup = createElement("div", CLASS_POPUP);

    const overlay = createElement("div", CLASS_OVERLAY);
    overlay.addEventListener("click", event => {
      event.stopPropagation();

      if (!popup.contains(event.target)) {
        this.events.emit(HIDE_VARIANT_POPUP);
      }
    });

    popup.appendChild(
      new Emoji(this.emoji, false, false, this.events).render()
    );
    Object.keys(this.emoji.v).forEach(variant => {
      popup.appendChild(
        new Emoji(this.emoji.v[variant], false, false, this.events).render()
      );
    });

    const closeButton = createElement("button", CLASS_CLOSE_BUTTON);
    closeButton.innerHTML = times;
    closeButton.addEventListener("click", event => {
      event.stopPropagation();
      this.events.emit(HIDE_VARIANT_POPUP);
    });
    popup.appendChild(closeButton);

    overlay.appendChild(popup);

    return overlay;
  }
}
