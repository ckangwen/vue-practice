# el-input

## step 1

commitID: [a733f7835ee103dad58c88c3840f7aed4a6f7257](https://github.com/ElemeFE/element/commit/a733f7835ee103dad58c88c3840f7aed4a6f7257)


### input Attributes

- type
- v-model
- maxlength
- minlength
- placeholder
- disabled
- size
- auto-complete
- name
- readonly
- icon
- number



### Input Sots

无



### Input Event

- blur
- focus



### code segment

```vue
// 仅给出input部分
<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    size ? 'el-input-' + size : '',
    {'is-disabled': disabled}
  ]">
    <template v-if="type !== 'textarea'">
      <i class="el-input__icon" :class="[icon ? 'el-icon-' + icon : '']" v-if="icon"></i>
      <i class="el-input__icon el-icon-loading" v-if="validating"></i>
      <input
        :type="type"
        :name="name"
        class="el-input__inner"
        :placeholder="placeholder"
        v-model="currentValue"
        :disabled="disabled"
        :readonly="readonly"
        @focus="$emit('onfocus', currentValue)"
        @blur="handleBlur"
        :number="number"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autoComplete"
        ref="input"
      >
    </template>
  </div>
</template>
```



```js
export default {
  name: 'ElInput',
  mixins: [emitter],
  methods: {
    handleBlur (event) {
      this.$emit('onblur', this.currentValue)
      this.dispatch('form-item', 'el.form.blur', [this.currentValue])
    },

    inputSelect () {
      this.$refs.input.select()
    }
  },

  data () {
    return {
      currentValue: ''
    }
  },

  created () {
    this.$on('inputSelect', this.inputSelect)
  },

  computed: {
    validating () {
      return this.$parent.validating
    }
  },

  watch: {
    'value' (val) {
      this.currentValue = val
    },

    'currentValue' (val) {
      this.$emit('input', val)
      this.$emit('onchange', val)
      this.dispatch('form-item', 'el.form.change', val)
    }
  }
}

```



### 总结

prop方面，大部分的属性与当前版本基本一致，除了`icon`和将要被废弃的`auto-complete`。此时的Element尚未提供头部、尾部图标的功能，且对于icon的样式的处理也有所不同。