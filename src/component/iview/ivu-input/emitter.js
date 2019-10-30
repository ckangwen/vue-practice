/**
 ** 寻找组件实例的方式是遍历组件的name， 每个组件的name是唯一的
 * @param {String} componentName 组件的name，用于找到组件实例
 * @param {String} eventName 自定义事件名
 * @param {*} params 传递的数据
 */
function broadcast (componentName, eventName, params) {
  // * 向下遍历寻找子元素
  this.$children.forEach(child => {
    // * $options:用于当前Vue实例的初始化选项
    const name = child.$options.name
    if (name === componentName) {
      // * 触发当前实例上的事件，附加参数会传给监听器回调
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params))
    }
  })
}
/**
 ** 在自组件调用dispatch方法，向上级指定的组件实例上触发自定义事件，并传递数据
 ** 且该上级组件已预先通过`$on`监听了这个事件
 ** 父组件调用broadcast方法，向下级指定的组件实例上触发自定义事件，并传递数据
 ** 且该下级组件以通过`$on`监听了这个事件
 ** 以下方法作为mixins导入
 */
export default {
  methods: {
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = this.$options.name

      // * 向上遍历更新当前组件(上下文为调用该方法的组件)的父组件实例，
      // * 直到匹配到定义的 `componentName` 与某个上级组件的 `name` 选项一致时，结束循环
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }

      // * 在找到的组件实例上，调用`$emit`方法来触发自定义事件`eventName`
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  },
  broadcast (componentName, eventName, params) {
    broadcast.call(this, componentName, eventName, params)
  }
}
