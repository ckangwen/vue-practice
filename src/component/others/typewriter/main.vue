<template>
  <div>
    <type-writer
      :words='["Awesome!","Amazing!"]'>
      Vue Typewriter is
    </type-writer>
  </div>
</template>

<script>
import TypeWriter from './typewriter'
export default {
  name: 'App',
  components: {
    TypeWriter
  }
}
</script>