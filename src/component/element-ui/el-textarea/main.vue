<template>
  <div>
    <el-textarea :rows="5" autosize v-model="value"></el-textarea>
  </div>
</template>
<script>
import ElTextarea from './el-textarea'
export default {
  name: 'app',
  components: {
    ElTextarea
  },
  data() {
    return {
      value: '234'
    }
  }
}
</script>