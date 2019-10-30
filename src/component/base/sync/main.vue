<template>
  <div>
    <h1>{{ cdata }}</h1>
    <v-counter
      :counter.sync="cdata"
      :nosync="nosync"
    ></v-counter>
    <button @click="cdata--" style="marginBottom: 100px">Minus from parent</button>
    <br>
    <v-logo :visible.sync="visible"></v-logo>
    <button @click="visible = !visible" > Toggle varible from Parent </button>
  </div>
</template>
<script>
import VCounter from './counter'
import VLogo from './VLogo'
export default {
  name: 'app',
  components: {
    VCounter,
    VLogo
  },
  data() {
    return {
      cdata: -10,
      nosync: -11,
      visible: false
    }
  },

  methods: {
    update(val) {
      this.cdata = val
    }
  },
}
</script>