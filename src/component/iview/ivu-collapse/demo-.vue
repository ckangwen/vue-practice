<template>
  <div :class="[
      'ivu-collapse-item',
      {
        'ivu-collapse-item-active': this.isActive
      }
    ]">
    <div class="collapse-header" @click="toggle">
      <slot></slot>
    </div>
    <div class="ivu-collapse-content" v-show="isActive">
      <div class="ivu-collapse-box">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nane: 'IvuPanel',
  props: {
    title: String
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle() {
      this.$parent.toggle({
        name: this.name,
        isActive: this.isActive
      })
    },
  }
}
</script>