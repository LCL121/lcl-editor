import LinkInput from '../ts/linkInput'
import MyError from '../ts/error'

// 删除多余的p标签
function adjustList() {
  const lists = document.querySelectorAll('ol, ul')
  for (let i = 0; i < lists.length; i++) {
    const ele = lists[i]
    const parentElement = ele.parentElement
    if (parentElement.tagName === 'P' && parentElement.lastChild === parentElement.firstChild) {
      parentElement.insertAdjacentElement('beforebegin', ele)
      parentElement.remove()
    }
  }
}

export const undoCallBack = function () {
  document.execCommand('undo', false, null)
}

export const redoCallBack = function () {
  document.execCommand('redo', false, null)
}

export const outdentCallBack = function () {
  if (document.getSelection().type === 'None') {
    new MyError()
    return
  }
  document.execCommand('outdent', false, null)
}

export const boldCallBack = function () {
  if (document.getSelection().type === 'None') {
    new MyError()
    return
  }
  document.execCommand('bold', false, null)
}

export const italicCallBack = function () {
  if (document.getSelection().type === 'None') {
    new MyError()
    return
  }
  document.execCommand('italic', false, null)
}

export const indentCallBack = function () {
  if (document.getSelection().type === 'None') {
    new MyError()
    return
  }
  document.execCommand('indent', false, null)
}

export const insertOrderedListCallBack = function () {
  if (document.getSelection().type === 'None') {
    new MyError()
    return
  }
  document.execCommand('insertOrderedList', false, null)
  adjustList()
}

export const insertUnorderedListCallBack = function () {
  if (document.getSelection().type === 'None') {
    new MyError()
    return
  }
  document.execCommand('insertUnorderedList', false, null)
  adjustList()
}

export const linkCallBack = function () {
  if (document.getSelection().type === 'None') {
    new MyError()
    return
  }
  const range = document.getSelection().getRangeAt(0)
  const a = { a: null }
  const changeA = () => {
    a.a = linkInput.getContent()
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(range)
    document.execCommand('createLink', false, a.a.input2)
  }
  const linkInput = new LinkInput(changeA)
  document.body.appendChild(linkInput.getLinkInput())
}

export const formatCallBack = function () {
  if (document.getSelection().type === 'None') {
    new MyError()
    return
  }
  const selector = document.getSelection()
  if (!selector.isCollapsed) {
    document.execCommand('removeFormat', false, null)
  } else {
    let current = selector.anchorNode
    while (
      current.nodeName !== 'LI' &&
      current.nodeName !== 'OL' &&
      current.nodeName !== 'UL' &&
      current.nodeName !== 'P'
    ) {
      current = current.parentNode
    }
    const range = document.createRange()
    range.setStart(current.firstChild, 0)
    let currentLastNode = current.lastChild
    while (currentLastNode.lastChild !== null && currentLastNode.nodeName !== '#text') {
      currentLastNode = currentLastNode.lastChild
    }
    currentLastNode.nodeValue && range.setEnd(currentLastNode, currentLastNode.nodeValue.length)
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(range)
    document.execCommand('removeFormat', false, null)
  }
}
