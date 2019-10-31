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



### code

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





## step 2

commitID: [cfed2184bc4df8868307cda0085575f05a5fd583](https://github.com/ElemeFE/element/commit/cfed2184bc4df8868307cda0085575f05a5fd583)

### Input Slots

- prepend
- append



### code

**html**

```vue
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
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    :minlength="minlength"
    :number="number"
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
</div>
</template>
```

#### change

1. 添加输入框前置内容与后置内容两个具名插槽
2. 由`v-model="currentValue"`这样的双向数据绑定变化为`:value="value"` + `@input="currentValue = $event.target.value"`单向数据绑定
3. 将focus事件的逻辑处理放置于一个函数中



**javascript**

```js
  handleInput (event) {
    this.currentValue = event.target.value
  },
  handleFocus () {
    this.$emit('onfocus', this.currentValue)
  }
```

当用户触发input事件时，将会导致currentValue的变化，这时会触发currentValue侦听器的回调函数，执行`this.$emit('input', val)`，触发当前组件实例上的input事件，附加参数都会传给监听器回调

此时在组件`el-input`上监听input事件便能够获取到currentValue的值

```vue
<el-input v-model="value" icon="eleme" @input="inputHandler"></el-input>
```

```js
methods: {
  inputHandler(val) {
    console.log(val)
  }
}
```



### 总结

在组件结构上有所改变，在输入控件的前后新增了前置内容与后置内容

将input的双向数据绑定变化为单向数据绑定，父组件向下传递prop，子组件向上传递event。这样的单向数据流使得数据得以被追踪，源头容易追溯。