
<template>
  <div class="ivu-collapse-wrapper">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'IvuCollapse',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    accordion: Boolean
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  methods: {
    getActiveKey() {
      let activeKey = this.currentValue || []
      if (!Array.isArray(activeKey)) {
        activeKey = [activeKey]
      }
      if (this.accordion && activeKey.length > 1) {
        activeKey = [activeKey[0]]
      }
      for (let i = 0; i < activeKey.length; i++ ) {
        activeKey[i] = activeKey[i].toString()
      }
      return activeKey
    },
    setActiveKey() {
      let activeKey = this.getActiveKey()

      this.$children.forEach((child, index) => {
        const name = child.name
        child.isActive = activeKey.indexOf(name) > -1
      })
    },
    toggle(data) {
      const name = data.name.toString()
      let newActiveKey = []

      if (this.accordion) {
        if (!data.isActive) {
          newActiveKey.push(name)
        }
      } else {
        let activeKey = this.getActiveKey()
        const nameIndex = activeKey.indexOf(name)

        if (data.isActive) {
          if (nameIndex < -1) {
            activeKey.splice(nameIndex, 1)
          }
        }
      }

    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue() {
      this.setActiveKey()
    }
  }
}
</script>