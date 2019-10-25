<template>
  <div :class="wrapClasses">
    <template v-if="type !== 'textarea'">
      <div
        :class="[prefixCls + '-group-prepend']"
        v-if="prepend"
        v-show="slotReady"
      >
        <slot name="prepend"></slot>
      </div>
      <i class="ivu-icon"
        :class="[
          'ivu-icon-ios-close-circle',
          prefixCls + '-icon',
          prefixCls + '-icon-clear',
          prefixCls + '-icon-normal'
        ]"
        v-if="clearable && currentValue && !itemDisabled"
        @click="handleClear"
      >
      </i>
      <i
        class="ivu-icon"
        :class="[
          'ivu-icon-' + icon,
          prefixCls + '-icon',
          prefixCls + '-icon-normal'
        ]"
        v-else-if="icon"
        @click="handleIconClick"
      ></i>
      <i
        class="ivu-icon ivu-icon-ios-search"
        :class="[
          prefixCls + '-icon',
          prefixCls + '-icon-normal',
          prefixCls + '-search-icon'
        ]"
        v-else-if="search && enterButton === false"
        @click="handleSearch"
      ></i>
      <span class="ivu-input-word-count" v-else-if="showWordLimit">{{textLength}}/{{upperLimit}}</span>
      <input
        ref="input"
        :id="elementId"
        :autocomplete="autocomplete"
        :type="currentType"
        :class="inputClasses"
        :placeholder="placeholder"
        :disabled="itemDisabled"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        :value="value"
        :number="number"
        :autofocus="autofocus"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
      >
    </template>
  </div>
</template>
<script>
  import IVuInput from './index.js'
  export default IVuInput
</script>
<style>
  @import url('./iview.css');
</style>