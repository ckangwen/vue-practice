export const oneOf = (value, validList) => {
  for (let i = 0, len = validList.length; i < len; i++) {
    if (value === validList[i]) {
      return true
    }
  }
}

export const findComponentUpward = (context, componentName, componentNames) => {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }
  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

// 将textarea隐藏的样式
const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`

const SIZING_STYLE = [
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

let computedStyleCache = {}
let hiddenTextarea

function calculateNodeStyling (node, useCache = false) {
  const nodeRef = (
    node.getAttribute('id') ||
    node.getAttribute('name')
  )

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef]
  }

  const style = window.getComputedStyle(node)
  const boxsizing = style.getPropertyValue('box-sizing')
  const paddingSize = parseFloat(style.getPropertyValue('padding-top')) +
    parseFloat(style.getPropertyValue('padding-top'))
  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  )

  const sizingStyle = SIZING_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';')

  const nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxsizing
  }

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo
  }

  return nodeInfo
}
// 设置一个隐藏的textarea，将uiTextNode输入的值同步到hiddenTextarea
// 通过获取hiddenTextarea的scrollHeight，来调整uiTextNode的height
export function calcTextareaHeight (uiTextNode, minRows = null, maxRows = null, useCache = false) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }

  // uiTextNode的一些样式
  let {
    paddingSize, borderSize,
    boxSizing, sizingStyle
  } = calculateNodeStyling(uiTextNode, useCache)

  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`)
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || ''

  let minHeight = Number.MIN_SAFE_INTEGER
  let maxHeight = Number.MAX_SAFE_INTEGER
  let height = hiddenTextarea.scrollHeight
  let overflowY

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height = height - paddingSize
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = ' '
    // 单行文本的值
    let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize
      }
      height = Math.max(minHeight, height)
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize
      }
      overflowY = height > maxHeight ? '' : 'hidden'
      height = Math.min(maxHeight, height)
    }
  }
  // Remove scroll bar flash when autosize without maxRows
  if (!maxRows) {
    overflowY = 'hidden'
  }
  return {
    height: `${height}px`,
    minHeight: `${minHeight}px`,
    maxHeight: `${maxHeight}px`,
    overflowY
  }
}
