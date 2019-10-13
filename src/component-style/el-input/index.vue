<template>
  <div
    :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'el-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
  ]"
    @mouseenter="hovering=true"
    @mouseleave="hovering=false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 TODO -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>

      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="el-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 前置内容 -->

      <!-- 后置内容 -->
      <span
        class="el-input__suffix"
        v-if="getSuffixVisible()"
      >
        <span class="el-input__suffer-inner">
          <template v-if="!showClear || !showPwdVisible">
            <slot name="suffix"></slot>
            <i class="el-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>

          <!-- <i v-if="showClear"
            class="el-input__icon el-icon-circle-close el-input__clear"
            @mousedown.prevent
            @click="clear"
          ></i> -->

          <i v-if="showPwdVisible"
            class="el-input__icon el-icon-view el-input__clear"
            @click="handlePasswordVisible"
          ></i>
        </span>

      </span>

      <!-- 后置元素 -->
    </template>

  </div>
</template>

<script>
export default {
  name: "ElInput",
  data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    };
  },
  props: {
    value: [String, Number],
    size: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
        type: String,
        default: 'text'
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
        type: Boolean,
        default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    inputSize() {
      return this.size
    },
    inputDisabled() {
      return this.disabled
    },
    nativeInputValue() {
      return (this.value === null || this.value === undefined)  ? '' : String(this.value);
    },
    showClear() {
      return this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.nativeInputValue &&
        (this.focus || this.hovering)
    },
    showPwdVisible() {
      return this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        (!!this.nativeInputValue);
    },
  },

  methods: {
    getSuffixVisible() {
      return this.$slots.suffix ||
        this.showPassword ||
        this.suffixIcon
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear', '')
    },
    handleCompositionStart() {

    },
    handleCompositionUpdate() {

    },
    handleCompositionEnd() {

    },
    handleInput() {

    },
    handleChange() {

    },
    handleFocus() {

    },
    handleBlur() {

    }
  }
};
</script>
<style lang="css" scoped>
@import url('../input.css');
@import url('../icon/index.css');
</style>
