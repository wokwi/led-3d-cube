/**
 * 3D LED Cube
 *
 * Copyright (c) 2020 Uri Shaked
 *
 * Released under the MIT license.
 */

const root = document.getElementById('led-cube');
const pixels = [];

const size = 8;
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
      led.setAttribute('color', 'red');
      root.appendChild(led);
      pixels[index++] = led;
    }
  }
}

const colors = ['red', '#100000', '#400', 'green', 'blue', 'black', 'white'];
let lightIndex = 0;
let colorIndex = 0;
setInterval(() => {
  pixels[lightIndex++].setAttribute('color', colors[colorIndex]);
  if (lightIndex >= pixels.length) {
    colorIndex++;
    lightIndex = 0;
    if (colorIndex >= colors.length) {
      colorIndex = 0;
    }
  }
}, 1);
