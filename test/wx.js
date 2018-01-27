// (c) 2018 AquaJerry, Guangzhou University.
// Miniplane is freely distributed under the terms of ISC license.

import {createCanvas, Image} from 'canvas'

// As big as iphone 5,6,7(s)
const canvas = new Proxy(createCanvas(375, 667), {
  get: (target, prop, receiver) => prop === 'getContext'
    ? (...args) => new Proxy(target[prop](...args), ctxHandler)
    : target[prop]
})
const ctxHandler = {
  get: (target, prop, receiver) => prop === 'drawImage'
    ? (...args) => {
      try {
        target.drawImage(...args)
      } catch (e) {}
    } : target[prop]
}

// Simulate `requestAnimationFrame`, which is defined in the production env
global.requestAnimationFrame = cb => setTimeout(cb, 50 / 3)

// Simulate `wx`, which is defined in the production env
global.wx = {
  createCanvas: () => canvas,
  createImage: () => new Image()
}
