import './wx'
import view from '../src/view'

describe('view', () => {
  it('.text(string) should work without errors', () => {
    view.text('Hello eggjs!')
  })
})
