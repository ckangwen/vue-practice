<template>
  <div class="Modal_Overlay" v-show="show" @click.self="close">
    <div class="Modal_Card">
      <div class="close" @click="close"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>