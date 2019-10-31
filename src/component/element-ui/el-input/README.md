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



### Input Slots

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



## step 3

### commitID: 4bdfcec9d74a1ed42728275b467b42ae7e9e6856

添加input icon的点击事件



### commitID: c14cb221cdc6ef18b6a242bea1a6b9da366de86e

添加input的原生属性: form和autofocus



### commitID: 547293e366dfa4d0374af0a63ccb61335b55579c

支持min与max属性



### commitID: 66442076689e23f7a0ee65128f110e1cb6c3813d

修改触发blur事件时传入的参数:

`this.$emit('blur', this.currentValue);` -> `this.$emit('blur', event);`



### commitID: d9c78244708811be53afcce2e638676719fcec7e

修改form validate的bug(#1363)

[support deep object validate in form #1363](<https://github.com/ElemeFE/element/pull/1363>)

- [ ] 阅读form-item的源代码，了解bug的起因

```js
// old
computed: {
  validating() {
    return this.$parent.validating;
  }
}

// new
computed: {
  validating() {
    return this.$parent.validateState === 'validating';
  }
}
```



### commitID: ba983ffb9608a687fac092b530ccb8fc91fbf0c3

normalize the componentName writing。为表单组件添加了`componentName`该属性

并修改了向祖先组件传播事件时指定的组件名(因为dispatch方法中是根据组件的`componentName`属性向上查找的)

```js
// old
handleBlur(event) {
  this.dispatch('form-item', 'el.form.blur', [this.currentValue]);
},
'currentValue'（val）{
  this.dispatch（'form-item'，'el.form.change'，[val]）;
}

// new
handleBlur（event）{
  this.dispatch（'ElFormItem'，'el.form.blur'，[this.currentValue]）;
}，
'currentValue'（val）{
  this.dispatch（'ElFormItem'，'el.form.change'，[val]）;
}
```



### commitID: db666dfb4b9eb294880914ac377852a38b8a2851

修正input group的样式，将输入框前置内容、后置内容做了单独处理

```js
// old
{
	'is-disabled'：disabled，
	'el-input-group'：$ slots.prepend ||$ slots.append
}

// new
{
  'is-disabled': disabled,
  'el-input-group': $slots.prepend || $slots.append,
  'el-input-group--append': $slots.append,
  'el-input-group--prepend': $slots.prepend
}
```

对原先icon的class三元表达式的冗余写法进行修改

```vue
// old
<i class="el-input__icon" :class="[icon ? 'el-icon-' + icon : '']" v-if="icon" @click="handleIconClick"></i>
// new
<i class="el-input__icon" :class="'el-icon-' + icon" v-if="icon" @click="handleIconClick"></i>
```



### commitID: 55dfb0c296aab84776a6533752ed92ce07d4ee61

将input图标转变为插槽的形式，并设置后备内容

#### Input Slots

- prepend
- append
- icon

```vue
<slot name="icon">
  <i class="el-input__icon" :class="'el-icon-' + icon" v-if="icon" @click="handleIconClick"></i>
</slot>
```

