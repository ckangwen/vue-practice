# mixins

> - 类型：`Array<Object>`
>
> - 详细
>
>   `mixinx`选项接受一个混入对象的数组。这些混入实例对象可以像正常的实例对象一样包含选项，他们将在`Vue.extend()`里最终选择使用相同的选项合并逻辑合并
>
>   如果你的混入包含一个钩子，而创建组件本身也有一个，两个函数将被调用
>
>   Mixins钩子按照传入顺序依次调用，并在调用组建自身的钩子之前被调用
>
> - 示例
>
>   ```js
>   var mixin = {
>     created() {
>       function() {
>         console.log(1)
>       }
>     }
>   }
>   var vm = new Vue({
>     created: function () { console.log(2) },
>     mixin: [mixin]
>   })
>   // => 1
>   // => 2
>   ```
>
>   



Mixin提供了一种非常灵活的方式来分发Vue组件中可复用的功能。一个混入对象可以包含任意**组件选项**，当组件使用混入对象时，所有混入对象的选项将被混入进入该组件本身的选项

```js
var myMixin = {
  create: function() {
    this.hello()
  }.
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```





## 选项合并

当组件和混入对象具有同名选项是，这些选项将会以恰当的方式进行合并

比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先

```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

**同名钩子函数将合并为一个数组**，因此都将被调用。另外，**混入对象的钩子将在组件自身钩子之前**调用

```js
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

```js
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```



## 全局混入

混入也可以使用全局混入，它将影响每一个之后创建的Vue实例

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```



## 自定义选项合并策略

自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向`Vue.config.optionMergeStrategies `添加一个函数

```js
Vue.config.optionMergeStrategies.myOptions = function (toVal, fromVal) {
  // 返回合并后的值
}
```

对于多数值为对象的选项，可以使用与 `methods` 相同的合并策略：

```
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```

