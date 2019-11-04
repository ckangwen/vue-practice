let hiddenTextarea

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]

function calculateNodeStyling (targetElement) {
  const style = window.getComputedStyle(targetElement)

  const boxSizing = style.getPropertyValue('box-sizing')
  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  )
  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  )
  const contextStyle = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';')
  return {
    contextStyle,
    paddingSize,
    borderSize,
    boxSizing
  }
}

export default function calcTextareaHeight (targetElement, minRows = null, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }
  let {
    contextStyle,
    paddingSize,
    borderSize,
    boxSizing
  } = calculateNodeStyling(targetElement)

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)
  // 把要展示的textarea中的value传给隐藏的textarea
  // 用以计算高度
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || ''

  // scrollHeight表示元素内容高度的度量包括由于溢出导致的视图中不可见的部分
  // * scrollHeight:没有滚动条的情况下，scrollHeight的值与元素视图填充所有内容所需最小值clientHeight相同
  // * 不包括margin与border，包括padding和::before与::after这类的伪元素
  let height = hiddenTextarea.scrollHeight
  const result = {}

  if (boxSizing === 'border-box') {
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize
  }

  // 将textarea的内容设置为空，以获取单行文本的高度
  // 之所以能够清空是因为已经获取到了textarea所填充的文本的高度——height
  hiddenTextarea.value = ''

  // 单行文本的高度
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize

  if (minRows !== null) {
    // 根据传入的最小行数计算出最小高度
    let minHeight = singleRowHeight * minRows
    // TODO 为什么与`height`的处理不一样
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize
    }
    height = Math.max(minHeight, height)
    result.minHeight = `${minHeight}px`
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows
    if (borderSize === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize
    }
    height = Math.max(height, maxHeight)
  }
  result.height = `${height}px`
  if (hiddenTextarea.parentNode) {
    hiddenTextarea.parentNode.removeChild(hiddenTextarea)
  }
  hiddenTextarea = null
  return result
}
