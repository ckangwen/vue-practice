# el-input



## update input

commitID: [a733f7835ee103dad58c88c3840f7aed4a6f7257](https://github.com/ElemeFE/element/commit/a733f7835ee103dad58c88c3840f7aed4a6f7257)

> update select and input

**code**

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



## fix input type

commitID: [cfed2184bc4df8868307cda0085575f05a5fd583](https://github.com/ElemeFE/element/commit/cfed2184bc4df8868307cda0085575f05a5fd583)

> fix input type

![03.png](https://i.loli.net/2019/11/02/QsPyxJ14EAIdhLp.png)

![04.png](https://i.loli.net/2019/11/02/l8gpOan9o3HkhiG.png)

![05.png](https://i.loli.net/2019/11/02/YxqVib2mCzl4t7N.png)



## add input icon click event

commitID: [4bdfcec9d74a1ed42728275b467b42ae7e9e6856](https://github.com/ElemeFE/element/commit/4bdfcec9d74a1ed42728275b467b42ae7e9e6856)

> add input icon click event

![06.png](https://i.loli.net/2019/11/02/dqbYrnzkmK65Buy.png)



## fix input native props

commitID: c14cb221cdc6ef18b6a242bea1a6b9da366de86e(https://github.com/ElemeFE/element/commit/c14cb221cdc6ef18b6a242bea1a6b9da366de86e)

> fix input native props

![07.png](https://i.loli.net/2019/11/02/AaYpvEwlS62TLUi.png)

![08.png](https://i.loli.net/2019/11/02/H9g4RqFVwBbpSUn.png)



## support Input min & max prop

commitID: [547293e366dfa4d0374af0a63ccb61335b55579c](https://github.com/ElemeFE/element/commit/547293e366dfa4d0374af0a63ccb61335b55579c)

> support Input min & max prop

![09.png](https://i.loli.net/2019/11/02/Q2rZB8lY6oFyMPi.png)



## Input: fix blur event param

commitID: [66442076689e23f7a0ee65128f110e1cb6c3813d](https://github.com/ElemeFE/element/commit/66442076689e23f7a0ee65128f110e1cb6c3813d)

> Input: fix blur event param & improve docs

![](https://i.loli.net/2019/11/01/2s5hRe8UZNQ7Epv.png)



## fix form validate bug

commitID: [d9c78244708811be53afcce2e638676719fcec7e](https://github.com/ElemeFE/element/commit/d9c78244708811be53afcce2e638676719fcec7e)

> fix form validate bug ([#1363](https://github.com/ElemeFE/element/pull/1363))

![](https://i.loli.net/2019/11/01/TOh2iUvXy9eHrAJ.png)



## normalize the componentName writing

commitID: [ba983ffb9608a687fac092b530ccb8fc91fbf0c3](https://github.com/ElemeFE/element/commit/ba983ffb9608a687fac092b530ccb8fc91fbf0c3)

> normalize the componentName writing

![10.png](https://i.loli.net/2019/11/02/wU3cMlfsoyGNiBK.png)



## fix input-group style

commitID: [db666dfb4b9eb294880914ac377852a38b8a2851](https://github.com/ElemeFE/element/commit/db666dfb4b9eb294880914ac377852a38b8a2851)

> fix input-group style

修正input group的样式，将输入框前置内容、后置内容做了单独处理

![](https://i.loli.net/2019/11/01/voitHBYFzPhGV14.png)



## Refactor/datepicker

commitID: [55dfb0c296aab84776a6533752ed92ce07d4ee61](https://github.com/ElemeFE/element/commit/55dfb0c296aab84776a6533752ed92ce07d4ee61)

> Refactor/datepicker ([#1623](https://github.com/ElemeFE/element/pull/1623))

![](https://i.loli.net/2019/11/01/RwAkv1j6Z5GnJtP.png)



## fix input value binding bug

commitID: [6e428ffcc79e26eebee2bc15a0cd2919a7449b91](https://github.com/ElemeFE/element/commit/6e428ffcc79e26eebee2bc15a0cd2919a7449b91)

> fix input value binding bug([#1998](https://github.com/ElemeFE/element/pull/1998))

**code**

```vue
// new
<input :value="value">
// old
<input :value="currentValue">
```



```js
// old
methods: {
  handleInputevent) {
    this.currentValue = event.target.value
  }
}
watch: {
  'value'(val, oldValue) {
    this.currentValue = val;
  },
  'currentValue'(val) {
    this.$emit('input', val);
    this.$emit('change', val);
    this.dispatch('ElFormItem', 'el.form.change', [val]);
  }
}

// new
methods: {
  handleInput(event) {
    this.setCurrentValue(event.target.value);
  }
  setCurrentValue(value) {
    if (value === this.currentValue) return;
    this.currentValue = value;
    this.$emit('input', value);
    this.$emit('change', value);
    this.dispatch('ElFormItem', 'el.form.change', [value]);
  }
},

watch: {
  'value'(val, oldValue) {
    this.setCurrentValue(val);
  }
}
```



## input add validateEvent prop 

commitID: [b9eed734e21e67b8dedfa79c083438977ea2c5d8](https://github.com/ElemeFE/element/commit/b9eed734e21e67b8dedfa79c083438977ea2c5d8)

> input add validateEvent prop 

![](https://i.loli.net/2019/11/01/GUreBYDZ1Qc3bSd.png)



## add input step prop

commitID: [218580067ee0cba74a62d16ffd6baeee95a35bdd](https://github.com/ElemeFE/element/commit/218580067ee0cba74a62d16ffd6baeee95a35bdd)

> add input step prop

![](https://i.loli.net/2019/11/01/h4A6UCFO1dinrzT.png)



## fix input change times

commitID: [61672ce0e21efa0fb18d669ce48d16c0269ddb75](https://github.com/ElemeFE/element/commit/61672ce0e21efa0fb18d669ce48d16c0269ddb75)

> fix input change times

![](https://i.loli.net/2019/11/01/E6fHoAiqIFKUQ2D.png)



## Input: simplify prop

commitID: [d3bf30b48c66649e659c29df80844daa7992f1d9](https://github.com/ElemeFE/element/commit/d3bf30b48c66649e659c29df80844daa7992f1d9)

>  Input: simplify prop

![](https://i.loli.net/2019/11/01/Sa8bQrAGZ2lENFR.png)



## add focus method for some form component

commitID: [0a2dd8bd53a7417bcdd849de334037836f19440f](https://github.com/ElemeFE/element/commit/0a2dd8bd53a7417bcdd849de334037836f19440f)

> add focus method for some form component

![](https://i.loli.net/2019/11/01/ugQ1aRskvyDwHnN.png)



## upgrade input

commitID: [5c17f5799533b1f938e51960cb8e47246c03bc7c](https://github.com/ElemeFE/element/commit/5c17f5799533b1f938e51960cb8e47246c03bc7c)

> upgrade input

```vue
  <div :class="[
    {
      ...
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend
    }
  ]">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- input 图标 -->
      <slot name="icon">
        <i class="el-input__icon"
          :class="[
            'el-icon-' + icon,
            onIconClick ? 'is-clickable' : ''
          ]"
          v-if="icon"
          @click="handleIconClick">
        </i>
      </slot>

			<input >

      <i class="el-input__icon el-icon-loading" v-if="validating"></i>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
```



```vue
  <div :class="[
    {
     ...
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend,
      'el-input--prefix': $slots.prefix || prefixIcon,
      'el-input--suffix': $slots.suffix || suffixIcon
    }
  ]">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- 前置内容 -->
      <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="el-input__icon"
          v-if="prefixIcon"
          :class="['el-icon-' + prefixIcon]">
        </i>
      </span>

      <input>

      <!-- 后置内容 -->
      <span class="el-input__suffix" v-if="$slots.suffix || suffixIcon">
        <slot name="suffix"></slot>
        <i class="el-input__icon"
          v-if="suffixIcon"
          :class="['el-icon-' + suffixIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
```



## support success validate status

commitID: [6e31e61516b3cc4dc97788f2fe13949cc7d0e393](https://github.com/ElemeFE/element/commit/6e31e61516b3cc4dc97788f2fe13949cc7d0e393)

> support success validate status

![](https://i.loli.net/2019/11/01/Kowsy3zf7NVxMlY.png)

![](https://i.loli.net/2019/11/01/hzeGJEgY9bU3ATD.png)



## feature inline message

commitID: [91d9ed7febf63949ab4f87963211a38873072426](https://github.com/ElemeFE/element/commit/91d9ed7febf63949ab4f87963211a38873072426)

> feature inline message

![](https://i.loli.net/2019/11/02/q8zW47od9aJrpHK.png)



## add accessibility for input

commitID: [d66473f00597b1d4dcba400480b77c5214b6328a](https://github.com/ElemeFE/element/commit/d66473f00597b1d4dcba400480b77c5214b6328a)

> add accessibility for input & rate & collapse & progress & upload

![](https://i.loli.net/2019/11/02/K8t3RZb9qVIAGQO.png)

![](https://i.loli.net/2019/11/02/C4ORMNZwQFEkWgH.png)



## Input: align input change with native

commitID: [889fae43fbd613d41630cb136d8a97d842a30423](https://github.com/ElemeFE/element/commit/889fae43fbd613d41630cb136d8a97d842a30423)

> Input: align input change with native

![](https://i.loli.net/2019/11/02/vCbEc95QoJWk6VH.png)

![](https://i.loli.net/2019/11/02/tsZfRlL4unED3j2.png)



## add upload limit & form validate return promise

commitID: [5426c957a2ca667dae066346b6906eae56cbcb5c](https://github.com/ElemeFE/element/commit/5426c957a2ca667dae066346b6906eae56cbcb5c)

> add upload limit & form validate return promise ([#7405](https://github.com/ElemeFE/element/pull/7405))

![](https://i.loli.net/2019/11/02/nhWMyLRHpodeCQ2.png)



## update dependencies

commitID: [38459ae85083f98171d344b9c89aa9900ca214c1](https://github.com/ElemeFE/element/commit/38459ae85083f98171d344b9c89aa9900ca214c1)

> update dependencies

![](https://i.loli.net/2019/11/02/yhv2FApbld5euOZ.png)



## add migration mixin for breaking changes

commitID: [b678772e949d9aa5a768a4ba867d45f4ad77af98](https://github.com/ElemeFE/element/commit/b678772e949d9aa5a768a4ba867d45f4ad77af98)

> add migration mixin for breaking changes

![](https://i.loli.net/2019/11/02/NuiQ42IOS9kZAqP.png)



## FormItem: support prop 'for'

commitID: [c3cf3f2389bab141f8da92178357492f41d17101](https://github.com/ElemeFE/element/commit/c3cf3f2389bab141f8da92178357492f41d17101)

> support prop 'for' ([#6049](https://github.com/ElemeFE/element/pull/6049))

![](https://i.loli.net/2019/11/02/lXPbZDU4h86JEio.png)



## Input: add clearable

commitID: [6e8f10a556badff739476896ddcb2785e58b6079](https://github.com/ElemeFE/element/commit/6e8f10a556badff739476896ddcb2785e58b6079)

> Input: add clearable ([#8509](https://github.com/ElemeFE/element/pull/8509))

![BDdPuJ9rOlp2Ah3.png](https://i.loli.net/2019/11/02/BZdwDzWH1iOj7o6.png)

![](https://i.loli.net/2019/11/02/cgiAfQnmN8aEZ3C.png)

![](https://i.loli.net/2019/11/02/n2ADtkPCcHQFuXf.png)

![](https://i.loli.net/2019/11/02/4AjVPMxgewHEJ91.png)

![yBlqVisU5dFLowm.png](https://i.loli.net/2019/11/02/SNjyXKGTqUu49mg.png)



## Form: add disabled

commitID: [56dc51bc854a4f58451fa5f6494711ac2004a27d](https://github.com/ElemeFE/element/commit/56dc51bc854a4f58451fa5f6494711ac2004a27d)

> Form: add disabled

![](https://i.loli.net/2019/11/02/bnFHrIoz6BmTZS5.png)

![](https://i.loli.net/2019/11/02/zq4ejD9E7b5m3Co.png)

![](https://i.loli.net/2019/11/02/MEzX3NWD18iYs6j.png)



## Input: add clear event

commitID: [e70c598d44cfe2cbd12c9508b1876758692e5166](https://github.com/ElemeFE/element/commit/e70c598d44cfe2cbd12c9508b1876758692e5166)

> Input: add clear event ([#9988](https://github.com/ElemeFE/element/pull/9988))

![](https://i.loli.net/2019/11/02/9WFuVg4GKBdHlZT.png)



## Input: add select method

commitID: [3377cd0847cb313a1bcc782a89f331c893cb4136](https://github.com/ElemeFE/element/commit/3377cd0847cb313a1bcc782a89f331c893cb4136)

> Input: add select method ([#10229](https://github.com/ElemeFE/element/pull/10229))

![](https://i.loli.net/2019/11/02/ZSNITY9pR6xDwsL.png)



## Input: disabled Input should not show clear icon

commitID: [430c149d887f18eb173f6def673442eafb78510c](https://github.com/ElemeFE/element/commit/430c149d887f18eb173f6def673442eafb78510c)

> Input: disabled Input should not show clear icon ([#10331](https://github.com/ElemeFE/element/pull/10331))

![](https://i.loli.net/2019/11/02/1EzVdAcmODegtqB.png)



## Input: add blur method

commitID: [5d6fe5eb2c624a5445c5da82841b48b055d70db0](https://github.com/ElemeFE/element/commit/5d6fe5eb2c624a5445c5da82841b48b055d70db0)

> Input: add blur method ([#10356](https://github.com/ElemeFE/element/pull/10356))



## Input: bind native attrs to input and textarea element

commitID: [af4b13d911079964091f60786a7c506636aead0c](https://github.com/ElemeFE/element/commit/af4b13d911079964091f60786a7c506636aead0c)

> Input: bind native attrs to input and textarea element ([#10382](https://github.com/ElemeFE/element/pull/10382))

![01.png](https://i.loli.net/2019/11/02/ExHm89MBJyU7Oij.png)

![02.png](https://i.loli.net/2019/11/02/IH2Bm7WJ3ltby8o.png)



## Input: add inheritAttrs

commitID: [e67d71a42d015d2846490ebc440f85f0ae383f24](https://github.com/ElemeFE/element/commit/e67d71a42d015d2846490ebc440f85f0ae383f24)

> Input: add inheritAttrs ([#10391](https://github.com/ElemeFE/element/pull/10391))

![](https://i.loli.net/2019/11/02/mXdpESTtGnPcQNh.png)



## Input: pass native types to input element

commitID: [8ce9978ee1569a9789145826c03a8eb4c5300602](https://github.com/ElemeFE/element/commit/8ce9978ee1569a9789145826c03a8eb4c5300602)

> Input: pass native types to input element

![](https://i.loli.net/2019/11/02/QjSsfrTDti7uY2K.png)



## Input: shouldn't fire input event during composition

commitID: [0b7e9dae5cbc572359fd8a8e45d799a1712fe758](https://github.com/ElemeFE/element/commit/0b7e9dae5cbc572359fd8a8e45d799a1712fe758)

> Input / Select: shouldn't fire input event during composition ([#10517](https://github.com/ElemeFE/element/pull/10517))

![](https://i.loli.net/2019/11/02/9GmtrjHTMVNRKk5.png)

![](https://i.loli.net/2019/11/02/uHDpZxqK58SLiMQ.png)



## Textarea: fix undefined in ssr when v-model not set

commitID: [a864d506aa88887505c171916bdeb5d091011bf4](https://github.com/ElemeFE/element/commit/a864d506aa88887505c171916bdeb5d091011bf4)

> Textarea: fix undefined in ssr when v-model not set ([#10630](https://github.com/ElemeFE/element/pull/10630))

![](https://i.loli.net/2019/11/02/JZIwEzKQbFpGYnN.png)



## Input: fix when value is zero

commitID: [769db145166798da7dc8b6915c979a71f3661b05](https://github.com/ElemeFE/element/commit/769db145166798da7dc8b6915c979a71f3661b05)

> Input: fix when value is zero ([#10714](https://github.com/ElemeFE/element/pull/10714))

![](https://i.loli.net/2019/11/02/PGrxeUHmqMVE3Jl.png)



## Input: fix cursor goes to the end of the text

commitID: [783cb2691fd2d8a6858546c461c088723f8050ff](https://github.com/ElemeFE/element/commit/783cb2691fd2d8a6858546c461c088723f8050ff)

> Input / Select: fix Korean IME composition bug ([#10648](https://github.com/ElemeFE/element/pull/10648))
>
> Input: fix cursor goes to the end of the text([#10611](https://github.com/ElemeFE/element/pull/10611))

![](https://i.loli.net/2019/11/02/QShRymeIV2k3WYw.png)



## Input: not show clear button when value is null

commitID: [27a8c1556e30ae38423ebc4bb100486e59b8601f](https://github.com/ElemeFE/element/commit/27a8c1556e30ae38423ebc4bb100486e59b8601f)

> Input: not show clear button when value is null ([#10912](https://github.com/ElemeFE/element/pull/10912))

![](https://i.loli.net/2019/11/02/vUdH5upk43Rz9Tt.png)



## Input: hide clear button when readonly

commitID: [d304cb27cf299c03a5e357b5065574f155a22366](https://github.com/ElemeFE/element/commit/d304cb27cf299c03a5e357b5065574f155a22366)

> Input: hide clear button when readonly ([#10998](https://github.com/ElemeFE/element/pull/10998))

![](https://i.loli.net/2019/11/02/B34Gpu5t7KcebaR.png)



## Input: fix clear icon overlapping

commitID: [3d5f9ef080a9a6d03c97da782158c049144b7ec6](https://github.com/ElemeFE/element/commit/3d5f9ef080a9a6d03c97da782158c049144b7ec6)

> Input: fix clear icon overlapping ([#11103](https://github.com/ElemeFE/element/pull/11103))

![](https://i.loli.net/2019/11/02/ZxS8QecWKnPOb7d.png)



## Input: cursor goes to the end when typing Chinese quickly

commitID: [f37e92cc8216cf5a11b1318ab18968d6f658c76e](https://github.com/ElemeFE/element/commit/f37e92cc8216cf5a11b1318ab18968d6f658c76e)

> Input: cursor goes to the end when typing Chinese quickly ([#11235](https://github.com/ElemeFE/element/pull/11235))

![](https://i.loli.net/2019/11/02/O4FVWuI9ayRmUYT.png)

![](https://i.loli.net/2019/11/02/UraYEnQeg1d9cwR.png)

![](https://i.loli.net/2019/11/02/us1hOHQNntZCSfy.png)



## Input: fix style error when suffix exists with append

commitID: [b0a80e0eba62baa6ebae047cbbfa394385534523](https://github.com/ElemeFE/element/commit/b0a80e0eba62baa6ebae047cbbfa394385534523)

> Input: fix style error when suffix exists with append ([#11951](https://github.com/ElemeFE/element/pull/11951))

![](https://i.loli.net/2019/11/02/rkJYqFoUtS1iuyn.png)

![](https://i.loli.net/2019/11/02/uInHlhojrUzivTA.png)

![](https://i.loli.net/2019/11/02/fOCYWHQopV8E26u.png)

![](https://i.loli.net/2019/11/02/I7JnQhaKg6Azsct.png)



## Input: fix wrong style of Input suffix

commitID: [1cc45b83d822f0d7d8b63513be3568770d273d3d](https://github.com/ElemeFE/element/commit/1cc45b83d822f0d7d8b63513be3568770d273d3d)

> Input: fix wrong style of Input suffix ([#12108](https://github.com/ElemeFE/element/pull/12108))

![1572686340687.png](https://i.loli.net/2019/11/02/31Pd25EfonSu6tO.png)



## Autocomplete: add clearable prop

commitID: [026558682c284f63452748805ab6b389866be3e4](https://github.com/ElemeFE/element/commit/026558682c284f63452748805ab6b389866be3e4)

> Autocomplete: add clearable prop ([#12171](https://github.com/ElemeFE/element/pull/12171))

![1572686571283.png](https://i.loli.net/2019/11/02/NynThXtcGAx3Bbm.png)



## Input: simplify el-input implementation

commitID: [e2c5573c1f0d31418d8c793e3a00027d9ae61477](https://github.com/ElemeFE/element/commit/e2c5573c1f0d31418d8c793e3a00027d9ae61477)

> Input: simplify el-input implementation ([#13471](https://github.com/ElemeFE/element/pull/13471))
>
> remove currentValue, strictly follow one-way data flow
> hack for MSIE input event when placeholder is set
> remove isKorean hack ([#11665](https://github.com/ElemeFE/element/issues/11665), [#10648](https://github.com/ElemeFE/element/issues/10648))

![](https://i.loli.net/2019/11/02/FeqVG3pLjMKnHYu.png)

![](https://i.loli.net/2019/11/02/SO7Hs95g2uelPYC.png)

![](https://i.loli.net/2019/11/02/PisTghLa2SxR3V5.png)

![](https://i.loli.net/2019/11/02/v1DnakJ6tyOHd8S.png)

![](https://i.loli.net/2019/11/02/9AqQFlCMjwv73rm.png)

![](https://i.loli.net/2019/11/02/y4xbgUoejiSnMVd.png)

![](https://i.loli.net/2019/11/02/w1DzTJIY6esiyqj.png)



## input: fix textarea ref

commitID: [c154292d1b639e93247b91b84c5ffc4ae328e588](https://github.com/ElemeFE/element/commit/c154292d1b639e93247b91b84c5ffc4ae328e588)

> input: fix textarea ref ([#13803](https://github.com/ElemeFE/element/pull/13803))

![](https://i.loli.net/2019/11/02/fVcbI8v9HQ4Ckls.png)



## Input: add show-password props

commitID: [423d97825fdf4b895709e8bba18603cdfc233a8b](https://github.com/ElemeFE/element/commit/423d97825fdf4b895709e8bba18603cdfc233a8b)

> Input: add show-password props ([#13966](https://github.com/ElemeFE/element/pull/13966))

![](https://i.loli.net/2019/11/02/fLgzEUrkT9tO2RB.png)

![](https://i.loli.net/2019/11/02/3jQMPxscwfFBC7I.png)

![](https://i.loli.net/2019/11/02/zSOJcfyAgN2VwWq.png)

![](https://i.loli.net/2019/11/02/vtnY8L6JMSTByNa.png)

![](https://i.loli.net/2019/11/02/fAmPcxqWaYvdURF.png)



## Input: update input password

commitID: [969fdd264b89469b8cf704cea0098726b49a50ba](https://github.com/ElemeFE/element/commit/969fdd264b89469b8cf704cea0098726b49a50ba)

> Input: update input password ([#14480](https://github.com/ElemeFE/element/pull/14480))

![](https://i.loli.net/2019/11/02/SKfWzeV4JXogANi.png)

![](https://i.loli.net/2019/11/02/U1ReICN6aQ4xdWf.png)



## input: fix regression

commitID: [ed13de38c7ee386e78d2af8479f042936a7e5011](https://github.com/ElemeFE/element/commit/ed13de38c7ee386e78d2af8479f042936a7e5011)

> input: fix regression ([#14572](https://github.com/ElemeFE/element/pull/14572))
>
> * input: fix regression
>
> guard against: [#14551](https://github.com/ElemeFE/element/pull/14572)
> fix: [#14501](https://github.com/ElemeFE/element/pull/14501), [#14521](https://github.com/ElemeFE/element/pull/14521), [#14564](https://github.com/ElemeFE/element/pull/14564), [#14332](https://github.com/ElemeFE/element/pull/14332)

![](https://i.loli.net/2019/11/02/OmU6zcQqNaVpBIy.png)

![](https://i.loli.net/2019/11/02/4fYxPjlOmBCQw7b.png)

![](https://i.loli.net/2019/11/02/AKG7EtRp4oOe2sT.png)

![](https://i.loli.net/2019/11/02/KQ4ABYdijExwok7.png)

![](https://i.loli.net/2019/11/02/ZfUm92PFkJYnv3t.png)

![1572691596615.png](https://i.loli.net/2019/11/02/7BeROKkA89pcbLq.png)

![1572691629724.png](https://i.loli.net/2019/11/02/IF8ep4WLhk5uAN6.png)



## Input: update DOM dependent values on type change

commitID: [d38ab315facc53a11021c1158c144b0407715745](https://github.com/ElemeFE/element/commit/d38ab315facc53a11021c1158c144b0407715745)

> Input: update DOM dependent values on type change ([#14889](https://github.com/ElemeFE/element/pull/14889))

![1572691742121.png](https://i.loli.net/2019/11/02/MVxNGoPS1Q87sdU.png)



## Input: Fix Korean composition event

cimmitID: [e9c5e469c1c9d236a6c875658cbb311f9fc2c9c9](https://github.com/ElemeFE/element/commit/e9c5e469c1c9d236a6c875658cbb311f9fc2c9c9)

> Input: Fix Korean composition event ([#15069](https://github.com/ElemeFE/element/pull/15069))

![11111.png](https://i.loli.net/2019/11/02/7lNpanKSvOkGITH.png)

![e9c5e469.png](https://i.loli.net/2019/11/02/2S6yra4OTlU9Zqc.png)



## Input: the click event of clear button is not trigger when using v-loading

commitID: [91297a9761264c44d70f6a971f0e3b1572096b14](https://github.com/ElemeFE/element/commit/91297a9761264c44d70f6a971f0e3b1572096b14)

>  Input: the click event of clear button is not trigger when using v-loading([#16576](https://github.com/ElemeFE/element/pull/16576))

![91297a97.png](https://i.loli.net/2019/11/02/ZOt2v5yeuGjfsCi.png)