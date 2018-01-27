// (c) 2018 AquaJerry, Guangzhou University.
// Miniplane is freely distributed under the terms of ISC license.

const canvas = wx.createCanvas()
const ctx = canvas.getContext('2d')

export default {
  drawImage: ctx.drawImage.bind(ctx),
  height: canvas.height,
  width: canvas.width
}
