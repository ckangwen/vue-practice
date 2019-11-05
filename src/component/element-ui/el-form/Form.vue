<template>
  <form class="el-form">
    <slot></slot>
  </form>
</template>
<script>
import Emitter from './emitter'
export default {
  name: 'ElForm',
  mixins: [Emitter],
  provide() {
    return {
      elForm: this
    }
  },
  props: {
    model: Object,
    rules: Object,
    showMessage: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style>
  @import url('./form.css');
</style>