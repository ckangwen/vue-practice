<template>
  <h1>{{ capitalizeFirstLetter('hello word') }}</h1>
</template>
<script>
  const mixin = {
    methods: {
      capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    created() {
      console.log(1)
    }
  }
export default {
  name: 'VDemo',
  mixins: [mixin]
}
</script>