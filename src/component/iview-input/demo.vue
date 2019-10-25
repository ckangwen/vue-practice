<template>
  <div class="ivu-input-wrapper">
    <template v-if="type !== 'textarea'">
      <span v-if="suffix" class="suffix">
        <slot name="suffix"></slot>
      </span>
      <span v-if="prefix" class="prefix">
        <slot name="prefix"></slot>
      </span>
      <input
        class="ivu-input"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :value="currentValue"
        :type="currentType"
        ref="input"
        @input="handleInput"
        @change="handleChange"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeyPress"
        @keydown="handleKeyDown"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span v-if="showWordLimit">{{currentTextLength}} / {{upperLimit}}</span>
      <button v-else-if="password" @click="handleToggleShowPassword">toggle password</button>
      <button v-else-if="clearable" @click="handleClear">clear text</button>

    </template>
  </div>
</template>

<script>
export default {
  name: 'TestInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number]
    },
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value,
      showPassword: false
    }
  },

  computed: {
    upperLimit() {
      return this.maxlength
    },
    currentTextLength() {
      return (this.value || '').length
    },
    currentType() {
      let type = this.type
      if (type ==='password' && this.password && this.showPassword) {
        type = 'text'
      }
      return type
    }
  },

  methods: {
    handleInput(e) {
      let value = e.target.value
      this.setCurrentValue(value)
      this.$emit('input', value)
    },
    handleChange() {

    },
    handleEnter() {

    },
    handleKeyup() {

    },
    handleKeyPress() {

    },
    handleKeyDown() {

    },
    handleFocus() {

    },
    handleBlur() {

    },
    setCurrentValue(val) {
      if (val === this.value) return
      this.currentValue = val
    },
    handleToggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    handleClear() {
      this.setCurrentValue('')
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val)
    }
  }
}
</script>
<style>
  .ivu-input-wrapper {
    position: relative;
    display: inline-block;
    width: auto;
    vertical-align: middle;
    line-height: normal;
  }
  .prefix,
  .suffix {
    display: block;
    position: absolute;
    width: 10px;
    height: 22px;
    background: black;
    left: 0;
    top:0;
    z-index:1
  }
  .suffix {
    left: auto;
    right:0;
    top:0;
  }
  .prefix {
    left: 0;
  }
</style>