const canvas = wx.createCanvas()
const ctx = canvas.getContext('2d')

export default {
  text (text) {
    ctx.fillText(
      text,
      (canvas.width - ctx.measureText(text).width) / 2,
      canvas.height / 2
    )
  }
}
