<template>
<div :class="['el-input', size ? 'el-input-' + size : '', { 'is-disabled': disabled }]">
  <i class="el-input__icon" :class="[icon ? 'el-icon-' + icon : '']" v-if="icon"></i>
  <i class="el-input__icon el-icon-loading" v-if="validating"></i>
  <input
    class="el-input__inner"
    :type="type"
    :name="name"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    :minlength="minlength"
    :number="number"
    :autocomplete="autoComplete"
    v-model="currentValue"
    ref="input"
    @focus="handleFocus"
    @blur="handleBlur"
  >
  {{ currentValue }}
</div>
</template>

<script src="./index.js"></script>
<style src="./css/index.css"></style>
