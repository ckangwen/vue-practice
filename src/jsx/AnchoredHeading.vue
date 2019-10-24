<template>
  <h1>
    <slot></slot>
  </h1>
</template>
<script>
export default {
  name: 'AnchoredHeading',
  props: {
    level: {
      type: Number,
      required: true
    }
  },

  render(h) {
    return h(
      'h' + this.level,
      this.$slots.default
    )
  },
}
</script>