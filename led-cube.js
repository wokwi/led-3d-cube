/**
 * 3D LED Cube
 *
 * Copyright (c) 2020 Uri Shaked
 *
 * Released under the MIT license.
 */

const root = document.getElementById('led-cube');
const pixels = [];

const urlParams = new URL(location.href).searchParams;

function clamp(n, min, max) {
  return n < min ? min : n > max ? max : n;
}

const size = clamp(parseInt(urlParams.get('size'), 10), 0, 16) || 8;
const scale = 0.2;
let index = 0;
const center = (scale * size) / 2;
for (let z = 0; z < size; z++) {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const led = document.createElement('a-led');
      led.setAttribute('position', {
        x: x * scale - center,
        y: y * scale - center,
        z: z * scale - center,
      });
      root.appendChild(led);
      pixels[index++] = led;
    }
  }
}

parent.postMessage({ app: 'wokwi', command: 'listen', version: 1 }, 'https://wokwi.com');

window.addEventListener('message', ({ data }) => {
  if (data.neopixels) {
    const { neopixels } = data;
    for (let i = 0; i < neopixels.length; i++) {
      const value = neopixels[i];
      const b = value & 0xff;
      const r = (value >> 8) & 0xff;
      const g = (value >> 16) & 0xff;
      if (pixels[i]) {
        pixels[i].setAttribute('color', `rgb(${r}, ${g}, ${b})`);
      }
    }
  }
});
