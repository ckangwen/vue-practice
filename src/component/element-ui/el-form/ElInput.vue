<template>
<div
  :class="[
  'el-input',
]">
  <input
    class="el-input__inner"
    :type="type"
    :placeholder="placeholder"
    ref="input"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  >
</div>
</template>

<script>
import Emitter from './emitter'
export default {
  name: 'ElInput',
  mixins: [Emitter],
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    placeholder: [Number, String]
  },
  data() {
    return {
    }
  },
  computed: {
    nativeInputValue() {
      return (this.value === null || this.value === undefined) ? '' : String(this.value)
    },

  },
  watch: {
    value(val) {
      if (this.validateEvent) {
        this.dispatch('ElForm', 'el.form.change', [val])
      }
    },
    nativeInputValue() {
      this.setNativeInputValue()
    }
  },
  methods: {
    setNativeInputValue() {
      const input = this.$refs.input
      if (input.value === this.nativeInputValue) return
      input.value = this.nativeInputValue
    },
    handleInput(event) {
      const value = event.target.value
      if (value === this.nativeInputValue) return
      this.$emit('input', value)
      this.$nextTick(this.setNativeInputValue)
    },
    handleFocus(event) {
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
      }
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style>
  @import url('./input.css');
</style>
