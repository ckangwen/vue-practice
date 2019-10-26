<template>
<div>
  <!-- <ivu-input v-model="value" placeholder="Enter something..." style="width: 300px"></ivu-input> -->
  <!-- <ivu-input v-model="value"></ivu-input> -->
  <!-- <ivu-input v-model="value" placeholder="Enter something..." style="width: 200px" show-word-limit maxlength="10"></ivu-input> -->
  <!-- <ivu-input v-model="value" placeholder="Enter something..." style="width: 200px" clearable ></ivu-input> -->
  <ivu-input search name="aaa" v-model="value"></ivu-input>
</div>
</template>

<script>
import IvuInput from './ivu-input'
export default {
  name: 'App',
  components: {
    IvuInput
  },
  data() {
    return {
      value: '',
      cdata: 10
    }
  },
}
</script>
