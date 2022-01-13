export default function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');

    img.addEventListener('load', () => {
      resolve(img);
    });

    img.addEventListener('error', event => {
      reject(event);
    });

    img.src = url;
  });
}
