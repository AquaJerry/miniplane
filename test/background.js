// (c) 2018 AquaJerry, Guangzhou University.
// Miniplane is freely distributed under the terms of ISC license.

// - wx, fake WeChat game lib
// - top, int
// - tops, an array of two tops
import './wx'
import expect from 'expect.js'
import tops from '../src/background'

// Suite
describe('Backgrounds', () => {
  // Stop scrolling at the end of this suite
  after(tops.toggleScroll)
  // Prerequisites
  // - topss, an array of tops
  before(function () {
    expect(tops).to.be.an('array')
    expect(tops).to.have.length(2)
    this.cvHeight = wx.createCanvas().height
    this.topss = []
  })
  // Watch scrolling backgrounds
  // - record them per frame (60 FPS)
  // - for nearly the duration of a spec (2s default by Mocha)
  beforeEach(function (done) {
    this.topss.splice(0, this.topss.length)
    const timeout = setInterval(() => {
      this.topss.push([...tops])
    }, 50 / 3)
    setTimeout(() => {
      clearInterval(timeout)
      done()
    }, 1900)
  })
  // Top of frist
  // - should vary in [-canvas.height, canvas.height)
  // - should increase linearly and looply in that interval
  // Backgrounds
  // - should differ a canvas.height at any time
  // - can be paused
  // - should pause as I like
  it('can scroll', function () {
    const negCvHeight = -this.cvHeight
    const [, d0, ...ds] = this.topss.map(ts => ts[0]).map((t, i, ts) =>
      i && (t0 => t - t0 + (t < t0 ? 2 * this.cvHeight : 0))(ts[i - 1]))
    this.topss.forEach(ts => {
      expect(ts[0]).to.be.within(negCvHeight, this.cvHeight)
    })
    expect(d0).to.be.ok()
    ds.forEach(d => {
      expect(d).to.be(d0)
    })
    this.topss.forEach(ts => {
      expect(Math.abs(ts[1] - ts[0])).to.be(this.cvHeight)
    })
    expect(tops.toggleScroll).to.be.a('function')
    expect(tops.toggleScroll()).not.to.be.ok()
  })
  // Backgrounds
  // - should not change while pausing
  // - should scroll again as I do
  it('can still', function () {
    const t0 = this.topss[0][0]
    this.topss.forEach(ts => {
      expect(ts[0]).to.be(t0)
    })
    expect(tops.toggleScroll()).to.be.ok()
  })
  // Top of first should increase linearly and looply in that interval
  it('can scroll again', function () {
    const [, d0, ...ds] = this.topss.map(ts => ts[0]).map((t, i, ts) =>
      i && (t0 => t - t0 + (t < t0 ? 2 * this.cvHeight : 0))(ts[i - 1]))
    expect(d0).to.be.ok()
    ds.forEach(d => {
      expect(d).to.be(d0)
    })
  })
})
