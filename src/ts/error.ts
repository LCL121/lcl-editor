import style from '../styleJson/error.json'

class Error {
  constructor () {
    const div = document.createElement('div')
    div.innerText = '请先聚焦编辑区域'
    div.setAttribute('class', style.main)
    document.body.append(div)
    setTimeout(() => {
      div.remove()
    }, 1000)
  }
}

export default Error
