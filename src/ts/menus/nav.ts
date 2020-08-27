import * as style from '../../styleJson/main.json'

class Nav {
  private div: HTMLDivElement;

  constructor() {
    this.div = document.createElement('div')
    this.div.setAttribute('class', style.nav)
  }

  getNav():HTMLDivElement {
    return this.div
  }
}

export default Nav
