import * as style from '../styleJson/main.json'

class Editor {
  private div: HTMLDivElement;

  constructor() {
    this.div = document.createElement('div')
    this.div.setAttribute('class', style.editor)
    this.div.setAttribute('contenteditable', 'true')

    // 换行使用p
    if (document.queryCommandSupported('defaultParagraphSeparator')) {
      document.execCommand('defaultParagraphSeparator', false, 'p')
    } else {
      this.div.addEventListener('keyup', function (event) {
        console.log(event)
        if (event.keyCode === 13) {
          const selector = document.getSelection()
          const range = selector.getRangeAt(0)
          if (range.commonAncestorContainer.nodeName === 'DIV') {
            const parent = range.commonAncestorContainer
            const children = parent.childNodes
            const p = document.createElement('p')
            p.append(...Array.from(children))
            parent.parentNode.removeChild(parent)
            range.insertNode(p)
            selector.collapseToStart()
          }
        }
      })
    }
  }

  getEditor(): HTMLDivElement {
    return this.div
  }

  // 初始时，加p标签
  init(content = '<p><br></p>') {
    if (this.div.innerHTML === '') {
      content = content.replace(/<(\/?)em>/g, '<$1i>').replace(/<(\/?)strong>/g, '<$1b>')
      this.div.innerHTML = content
    }
  }

  // 获取内容
  getContent() {
    return this.div
      .innerHTML
      .replace(/<(\/?)i>/g, '<$1em>')
      .replace(/<(\/?)b>/g, '<$1strong>')
      .replace(/<li><br><\/li>/g, '')
      .replace(/(<p><br><\/p>)*$/g, '')
  }
}

export default Editor
