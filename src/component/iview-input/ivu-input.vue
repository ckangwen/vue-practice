<template>
  <div class="ivu-input-wrapper">
    <template v-if="type !== 'textarea'">
      <button v-if="clearable && currentValue && !itemDisabled" @click="handleClear">clear text</button>
      <div class="suffix search-icon" v-else-if="search" @click="handleSearch">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M16.9994165,16.2923098 L20.8535534,20.1464466 C21.0488155,20.3417088 21.0488155,20.6582912 20.8535534,20.8535534 C20.6582912,21.0488155 20.3417088,21.0488155 20.1464466,20.8535534 L16.2923098,16.9994165 C14.8819612,18.2444908 13.0292099,19 11,19 C6.581722,19 3,15.418278 3,11 C3,6.581722 6.581722,3 11,3 C15.418278,3 19,6.581722 19,11 C19,13.0292099 18.2444908,14.8819612 16.9994165,16.2923098 Z M11,18 C14.8659932,18 18,14.8659932 18,11 C18,7.13400675 14.8659932,4 11,4 C7.13400675,4 4,7.13400675 4,11 C4,14.8659932 7.13400675,18 11,18 Z"/>
        </svg>
      </div>
      <span v-else-if="showWordLimit" class="suffix wordlimit">{{currentTextLength}} / {{upperLimit}}</span>
      <button v-else-if="password" @click="handleToggleShowPassword">toggle password</button>

      <input
        class="ivu-input"
        :class="{
          'ivu-input-disabled': itemDisabled
        }"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :value="currentValue"
        :type="currentType"
        :disabled="itemDisabled"
        ref="input"
        @input="handleInput"
        @change="handleChange"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeyPress"
        @keydown="handleKeyDown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
      >
      <span v-if="suffix" class="suffix">
        <slot name="suffix"></slot>
      </span>
      <span v-else-if="prefix" class="prefix">
        <slot name="prefix"></slot>
      </span>

    </template>
    <template v-else>
      <textarea
        ref="textarea"
        :name="name"
        :style="textareaStyles"
        :rows="rows"
        :maxlength="maxlength"
        :wrap="wrap"
        :disabled="itemDisabled"
        @input="handleInput"
        @change="handleChange"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeyPress"
        @keydown="handleKeyDown"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      </textarea>
     <span v-if="showWordLimit">{{currentTextLength}} / {{upperLimit}}</span>
    </template>
  </div>
</template>

<script src="./index.js"></script>
<style src="./index.css"></style>