// (c) 2018 AquaJerry, Guangzhou University.
// Miniplane is freely distributed under the terms of ISC license.

import canvas from './canvas'

// WeChat does NOT support `import {plugins} from 'path'`
const {drawImage, height, width} = canvas

// - tops, where backgrounds start
// - goAhead, let bgs scroll
// - raf, a delegate to loop or not to loop
const img = Object.assign(wx.createImage(), {src: 'bg.jpg'})
const tops = [0, height]
const height2x = 2 * height
const goAhead = top => {
  drawImage(img, 0, top, width, height)
  return (1 + top + height) % height2x - height
}
const noop = () => {}
let raf = requestAnimationFrame

const loop = () => {
  tops.splice(0, 2, ...tops.map(goAhead))
  raf(loop)
}

// Boot
loop()

export default Object.assign(tops, {
  // Scroll or not to scroll, return if it is scrolling
  toggleScroll () {
    const pause = noop === raf
    if (pause) {
      raf = requestAnimationFrame
      loop()
    } else {
      raf = noop
    }
    return pause
  }
})
