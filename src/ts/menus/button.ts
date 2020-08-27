import * as style from '../../styleJson/main.json'

interface InputButton {
  iconName: string;
  touch?: boolean;
  callBack?: () => void;
}

class Button {
  private template: string;
  private button: HTMLButtonElement;

  constructor(props: InputButton) {
    this.template = `
        <svg class="${style.icon}" aria-hidden="true">
          <use xlink:href="#icon-${props.iconName}"></use>
        </svg>`
    this.button = document.createElement('button')
    this.button.setAttribute('aria-disabled', 'false')
    this.button.setAttribute('aria-pressed', 'false')
    this.button.setAttribute('tabindex', '-1')
    this.button.innerHTML = this.template
    this.button.onclick = function () {
      props.callBack && props.callBack()
    }
    if (props.touch) {
      this.button.ontouchstart = function () {
        props.callBack && props.callBack()
      }
    }
  }

  getButton() {
    return this.button
  }
}

export default Button
