import Main from './ts/main'
import Nav from './ts/menus/nav'
import Button from './ts/menus/button'
import Editor from './ts/editor'

import './assets/iconfont.js'

import './style/main.css'
import './style/linkINput.css'
import './style/error.css'

import * as callBack from './utils/callBacks'

const main = new Main().getMain()
const nav = new Nav().getNav()
const editor = new Editor()
const editorDom = editor.getEditor()

const boldButtonDom = new Button({ iconName: 'bold', callBack: callBack.boldCallBack, touch: true }).getButton()
const italicButtonDom = new Button({ iconName: 'italic', callBack: callBack.italicCallBack, touch: true }).getButton()
const linkButtonDom = new Button({ iconName: 'link', callBack: callBack.linkCallBack }).getButton()

// 自动焦距
editorDom.onclick = function (e) {
  const target = e.target as HTMLTextAreaElement
  if (target.tagName === 'B') {
    boldButtonDom.focus()
  } else if ((target.tagName === 'I')) {
    italicButtonDom.focus()
  } else if ((target.tagName === 'A')) {
    linkButtonDom.focus()
  }
}

nav.append(
  new Button({ iconName: 'undo', callBack: callBack.undoCallBack }).getButton(),
  new Button({ iconName: 'redo', callBack: callBack.redoCallBack }).getButton(),
  boldButtonDom,
  italicButtonDom,
  new Button({ iconName: 'indent-decrease', callBack: callBack.outdentCallBack }).getButton(),
  new Button({ iconName: 'indent-increase', callBack: callBack.indentCallBack }).getButton(),
  new Button({ iconName: 'number-list', callBack: callBack.insertOrderedListCallBack }).getButton(),
  new Button({ iconName: 'bullet-list', callBack: callBack.insertUnorderedListCallBack }).getButton(),
  linkButtonDom,
  new Button({ iconName: 'clear-format', callBack: callBack.formatCallBack }).getButton()
)

main.append(nav, editorDom)
document.body.append(main)

export default {
  init: (value) => {
    editor.init(value)
  },
  getContent: () => {
    return editor.getContent()
  },
  onGetContent: () => {
    editor.onGetContent()
  },
  editor: editor.div
}
