<template>
  <div v-show="visible" style="displat: block">
    <div>
      <img src="https://vuejs.org/images/logo.png" width="200">
      <br>
      <button @click="toggleVisibility">Toggle logo fron child</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VLogo',
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleVisibility() {
      this.$emit('update:visible', !this.visible)
    }
  }
}
</script>