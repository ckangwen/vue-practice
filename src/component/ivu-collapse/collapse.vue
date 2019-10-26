<template>
  <div :class="[
        'ivu-collapse',
        {
          'ivu-collapse-simple': this.simple
        }
      ]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'IveCollpase',
  props: {
    accordion: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Array, String]
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  methods: {
    setActive() {
      const activeKey = this.getActivekey()

      this.$children.forEach((child, index) => {
        const name = child.name || index.toString()
        // * 当前子组件的name属性是否与选中目标的name值一致
        child.isActive = activeKey.indexOf(name) > -1
        child.index = index
      })
    },
    getActivekey() {
      let activeKey = this.currentValue || []
      console.log(activeKey)
      const accordion = this.accordion

      if (!Array.isArray(activeKey)) {
        activeKey = [activeKey]
      }

      if (accordion && activeKey.length > 1) {
        activeKey = [activeKey[0]]
      }

      for (let i = 0; i < activeKey.length; i++) {
        activeKey[i] = activeKey[i].toString()
      }

      return activeKey
    },
    toggle(data) {
      const name = data.name.toString()
      let newActiveKey = []

      if (this.accordion) {

      } else {
        let activeKey = this.getActivekey()
        const nameIndex = activeKey.indexOf(name)

        if (data.isActive) {
          if (nameIndex > -1) {
            activeKey.splice(nameIndex, 1)
          }
        } else {
          if (nameIndex < 0) {
            activeKey.push(name)
          }
        }
        newActiveKey = activeKey
      }
      this.currentValue = newActiveKey
      this.$emit('input', newActiveKey)
      this.$emit('on-change', newActiveKey)
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue() {
      this.setActive()
    }
  }
}
</script>

<style>
.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>svg {
  -webkit-transition: -webkit-transform .2s ease-in-out;
  transition: -webkit-transform .2s ease-in-out;
  transition: transform .2s ease-in-out;
  transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out;
  margin-right: 14px
}

.ivu-collapse {
  background-color: #f7f7f7;
  border-radius: 3px;
  border: 1px solid #dcdee2
}

.ivu-collapse-simple {
  border-left: none;
  border-right: none;
  background-color: #fff;
  border-radius: 0
}

.ivu-collapse>.ivu-collapse-item {
  border-top: 1px solid #dcdee2
}

.ivu-collapse>.ivu-collapse-item:first-child {
  border-top: 0
}

.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
  height: 38px;
  line-height: 38px;
  padding-left: 16px;
  color: #666;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid transparent;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out
}

.ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header {
  border-bottom: 1px solid #dcdee2
}

.ivu-collapse-simple>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header {
  border-bottom: 1px solid transparent
}

.ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header>svg {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg)
}

.ivu-collapse-content {
  color: #515a6e;
  padding: 0 16px;
  background-color: #fff
}

.ivu-collapse-content>.ivu-collapse-content-box {
  padding-top: 16px;
  padding-bottom: 16px
}

.ivu-collapse-simple>.ivu-collapse-item>.ivu-collapse-content>.ivu-collapse-content-box {
  padding-top: 0
}

.ivu-collapse-item:last-child>.ivu-collapse-content {
  border-radius: 0 0 3px 3px
}
</style>
