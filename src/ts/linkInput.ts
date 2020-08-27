import * as style from '../styleJson/linkINput.json'

class LinkInput {
  private div: HTMLDivElement;
  private inputWrappper1: HTMLDivElement;
  private inputWrappper2: HTMLDivElement;
  private input1: HTMLInputElement;
  private input2: HTMLInputElement;

  constructor(callBack: () => void) {
    this.div = document.createElement('div')
    this.div.setAttribute('class', style.main)
    const createInput1 = this.createInput('名称', 'name')
    this.inputWrappper1 = createInput1.inputWrapper
    this.input1 = createInput1.input
    const createInput2 = this.createInput('网址', 'web')
    this.inputWrappper2 = createInput2.inputWrapper
    this.input2 = createInput2.input

    const button1 = document.createElement('button')
    button1.innerText = '确定'
    button1.onclick = () => {
      callBack()
      this.div.remove()
    }
    const button2 = document.createElement('button')
    button2.innerText = '取消'
    button2.onclick = () => {
      this.div.remove()
    }
    const buttonWrapper = document.createElement('div')
    buttonWrapper.append(button1, button2)

    this.div.append(this.inputWrappper2, buttonWrapper)
  }

  private createInput(labelName: string, id: string): {
    inputWrapper: HTMLDivElement,
    input: HTMLInputElement
  } {
    const inputWrapper = document.createElement('div')
    inputWrapper.innerHTML = `
      <label for="${id}">
        ${labelName}
      </label>
      <input id="${id}" value="" />
    `
    const input = inputWrapper.lastElementChild as HTMLInputElement
    return {
      inputWrapper,
      input
    }
  }

  public getLinkInput() {
    return this.div
  }

  public getContent () {
    return {
      input1: this.input1.value,
      input2: this.input2.value
    }
  }
}

export default LinkInput
