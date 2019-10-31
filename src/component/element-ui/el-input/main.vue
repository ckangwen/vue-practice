<template>
  <div style="width: 250px;margin: 0 auto;">
    <el-input v-model="value" icon="eleme"></el-input>
  </div>
</template>

<script>
import ElInput from './el-input'
export default {
  name: 'app',
  components: {
    ElInput
  },
  data() {
    return {
      value: ''
    }
  },
}
</script>