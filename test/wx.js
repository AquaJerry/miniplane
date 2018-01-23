import {createCanvas} from 'canvas'

// As big as iphone 5,6,7(s)
const canvas = createCanvas(375, 667)

// Simulate `wx`, which is defined in the production env
global.wx = {
  createCanvas () {
    return canvas
  }
}

export default {
  canvas
}
