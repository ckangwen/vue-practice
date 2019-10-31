<template>
<div
  :class="[
  'el-input',
  size ? 'el-input-' + size : '',
  {
    'is-disabled': disabled,
    'el-input-group': $slots.prepend || $slots.append
  }
]">
  <!-- 前置元素 -->
  <div class="el-input-group__prepend" v-if="$slots.prepend">
    <slot name="prepend"></slot>
  </div>
  <input
    class="el-input__inner"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :number="number"
    :maxlength="maxlength"
    :minlength="minlength"
    :autocomplete="autoComplete"
    :value="value"
    ref="input"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  >
  <!-- input 图标 -->
  <i class="el-input__icon" :class="[icon ? 'el-icon-' + icon : '']" v-if="icon"></i>
  <i class="el-input__icon el-icon-loading" v-if="validating"></i>
  <!-- 后置元素 -->
  <div class="el-input-group__append" v-if="$slots.append">
    <slot name="append"></slot>
  </div>
  {{ currentValue }}
</div>
</template>

<script src="./index.js"></script>
<style src="./css/index.css"></style>
