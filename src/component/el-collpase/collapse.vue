<template>
  <div class="el-collapse">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ElCollapse',
  props: {
    accordion: Boolean,
    value: {
      type: [Array, String, Number],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeNames: [].concat(this.value)
    }
  },
  provide() {
    return {
      collapse: this
    }
  },
  watch: {
    value(val) {
      this.activeNames = [].concat(val)
    }
  },
  methods: {
    setActiveNames(activeNames) {
      // 合并或转换为数组
      activeNames = [].concat(activeNames)
      let value = this.accordion ? activeNames[0] : activeNames
      // iview: 将每一项先转换为String格式
      this.activeNames = activeNames
      // ? 为什么将value作为值传递 => value的含义？ => collapse-item的标识 => 传递唯一标识(name) => 对选中的item进行相应的逻辑处理
      this.$emit('input', value)
      this.$emit('on-change', value)
    },
    /**
     * 后代元素向该组件派发`item-click`事件，并将自身实例传递过来
     * @params{VueComponent} item
     */
    handleItemClick(item) {
      if (this.accordion) {
        // name属性是collapse-item的唯一标识符
        this.setActiveNames(
          (this.activeNames[0] || this.activeNames[0] === 0) &&
          this.activeNames[0] === item.name
          ? '' : item.name
        )
      } else {
        let activeNames = this.activeNames.slice(0)
        let index = activeNames.indexOf(item.name)

        if (index > -1) {
          // 激活的item已经存在，表示需要关闭该item
          // 等同于 activeNames = [ child.name ]
          activeNames.splice(index, 1)
        } else {
          // 新激活的item，加入列表中
          activeNames.push(item.name)
        }
        this.setActiveNames(activeNames)
      }
    }
  },
  created() {
    this.$on('item-click', this.handleItemClick)
  }
}
</script>
<style>
@import url('./collapse.css');
</style>