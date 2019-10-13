<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="disabled"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      size ? 'el-button--' + size : '',
      {
        'is-disabled': disabled,
        'is-circle': circle,
        'is-round': round
      }
    ]"
  >
  <span>
    <slot></slot>
  </span>
  </button>
</template>

<script>
export default {
  name: 'ElButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    nativeType: {
      type: String,
      default: 'button'
    },
    disabled: Boolean,
    round: Boolean,
    circle: Boolean
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>