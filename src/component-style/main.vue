<template>
  <div>
    <!-- <el-switch v-model="value1" active-text="按月付费" inactive-text="按年付费"></el-switch> -->
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="black">
    </el-switch>
  </div>
</template>

<script>
import ElSwitch from "./el-switch";
export default {
  name: "app",
  components: {
    ElSwitch,
  },
  data() {
    return {
      value: true,
      value2: false
    };
  }
};
</script>