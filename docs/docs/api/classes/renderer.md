# `Renderer`

Abstract class. Controls how emoji are rendered, and also the data that is emitted when an emoji is selected.

:::note

You won't need to work with the `Renderer` class unless you are writing a custom renderer. Otherwise, you can just instantiate the [`NativeRenderer`](./native-renderer) or [`TwemojiRenderer`](./twemoji-renderer) classes as needed.

:::

## Methods

### `renderElement`

```javascript
renderElement(content: HTMLElement): RenderTask
```

Immediately renders static content in an element.

#### Arguments

##### `content`: `HTMLElement`

The content to render.

### `renderImage`

```javascript
renderImage(classNames = '', urlResolver: () => string): RenderTask
```

Renders an image. 

#### Arguments

##### `classNames`: `string`

The class names to apply to the image.

#### `urlResolver`: `() => string | Promise<string>`

A function that should return the URL of the image. This can be the URL itself, or a `Promise` that resolves to the URL if finding the URL is an asynchronous operation.
