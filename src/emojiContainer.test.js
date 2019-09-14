const Emitter = require("tiny-emitter");

const { EmojiContainer } = require("./emojiContainer");

describe("EmojiContainer", () => {
  test("should render all the given emojis", () => {
    const emojis = [{ e: "⚡️" }, { e: "👍" }];

    const events = new Emitter();

    const container = new EmojiContainer(emojis, false, events).render();
    expect(container.querySelectorAll(".emoji-picker__emoji").length).toBe(2);
  });
});
