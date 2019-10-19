<template>
<div>
  <!-- <el-switch v-model="value1" active-text="按月付费" inactive-text="按年付费"></el-switch> -->
  <el-switch v-model="value" active-color="#13ce66" inactive-color="black">
  </el-switch>
  <br>

  <el-rate v-model="value1"></el-rate>
</div>
</template>

<script>
import ElSwitch from "./el-switch";
import ElRate from './el-rate'
export default {
  name: "app",
  components: {
    ElSwitch,
    ElRate
  },
  data() {
    return {
      value: true,
      value1: null,
      value2: false
    };
  }
};
</script>
