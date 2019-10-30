<template>
  <div>
    <anchored-heading :level="1">
      welcome
    </anchored-heading>
    <vue-test></vue-test>
  </div>
</template>

<script>
import AnchoredHeading from './AnchoredHeading'
import VueTest from './AnchoredHeading2.jsx'
export default {
  components: {
    AnchoredHeading,
    VueTest
  }
}
</script>