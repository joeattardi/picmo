# `Renderer`

Abstract base class for renderers.

Controls how emoji are rendered, and also the data that is emitted when an emoji is selected.

:::note

You won't need to work with the `Renderer` class unless you are writing a custom renderer. Otherwise, you can just instantiate the [`NativeRenderer`](./native-renderer) or [`TwemojiRenderer`](../../renderer-twemoji/classes/twemoji-renderer) classes as needed.

:::

## Methods

### `renderElement`

<pre>
renderElement(content: HTMLElement): RenderTask
</pre>

Immediately renders static content in an element.

#### Arguments

- `content`: The content to render.
  - **Type**: `HTMLElement`

### `renderImage`

<pre>
renderImage(classNames = '', urlResolver: () => string): RenderTask
</pre>

Renders an image. 

#### Arguments

- `classNames`: The class names to apply to the image.
  - **Type**: `string`
- `urlResolver`: A function that should return the URL of the image. This can be the URL itself, or a `Promise` that resolves to the URL if finding the URL is an asynchronous operation.
  - **Type**: `() => string | Promise<string>`
