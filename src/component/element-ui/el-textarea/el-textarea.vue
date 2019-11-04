<template>
  <div class="el-input">
    <textarea
      class="el-textarea__inner"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="textareaStyle"
      ref="textarea"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    ></textarea>
    <span class="el-input__count" v-if="isWordLimitVisible">
      {{ textLength }}/{{ upperLimit }}
    </span>
  </div>
</template>

<script>
import merge from './merge'
import calcTextareaHeight from './calcTextareaHeight.js'
export default {
  name: 'ElTextarea',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: Boolean,
      default: false
    },
    resize: String
  },
  data() {
    return {
      focused: false,
      isComposing: false,
      textareaCalcStyle: {},
    }
  },
  computed: {
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize })
    },
    isWordLimitVisible() {
      return this.showWordLimit
        && this.$attrs.maxlength
        && !this.inputDisabled
        && !this.readonly
    },
    textLength() {
      return String(this.value).length
    },
    upperLimit() {
      return this.$attrs.maxlength
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value)
    }
  },
  methods: {
    handleInput(event) {
      if (this.isComposing) return
      if (event.target.value === this.nativeInputValue) return
      this.$emit('input', event.target.value)
      this.$nextTick(this.setNativeInputValue)
    },
    handleFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    handleCompositionStart() {
      this.isComposing = true
    },
    handleCompositionEnd() {
      if (this.isComposing) {
        this.isComposing = false
      }
    },
    resizeTextarea() {
      let { autosize } = this
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows
      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
    },
    setNativeInputValue() {
      const target = this.$refs.textarea
      if (!target) return
      if (target.value === this.nativeInputValue) return
      target.value = this.nativeInputValue
    }
  },
  watch: {
    value() {
      this.$nextTick(this.resizeTextarea)
    },
    nativeInputValue() {
      this.setNativeInputValue()
    }
  },
  mounted() {
    this.resizeTextarea()
  },
}
</script>
<style>
  @import url('./index.css');
</style>