import * as style from '../styleJson/main.json'

class Main {
  private div: HTMLDivElement;

  constructor() {
    this.div = document.createElement('div')
    this.div.setAttribute('class', style.main)
  }

  getMain():HTMLDivElement {
    return this.div
  }
}

export default Main
