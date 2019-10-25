<template>
<div>
  <!-- <ivu-input v-model="value" placeholder="Enter something..." style="width: 300px"></ivu-input> -->
  <!-- <ivu-input v-model="value"></ivu-input> -->
  <!-- <ivu-input v-model="value" placeholder="Enter something..." style="width: 200px" show-word-limit maxlength="10"></ivu-input> -->
  <!-- <ivu-input v-model="value" placeholder="Enter something..." style="width: 200px" clearable ></ivu-input> -->
  <test-input v-model="value" maxlength="10" suffix prefix></test-input>
</div>
</template>

<script>
// import IvuInput from './ivu-input'
import TestInput from './demo'
export default {
  name: 'App',
  components: {
    TestInput
  },
  data() {
    return {
      value: '',
      cdata: 10
    }
  },
}
</script>
