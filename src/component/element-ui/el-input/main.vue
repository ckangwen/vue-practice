<template>
  <div style="width: 250px;margin: 0 auto;">
    <el-input v-model="value">
      <template slot="prepend">Http://</template>
    </el-input>
    <el-input v-model="value2" icon="eleme" @input="inputHandler"></el-input>
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
      value: '',
      value2: ''
    }
  },
  methods: {
    inputHandler(val) {
      console.log(val)
    }
  }
}
</script>