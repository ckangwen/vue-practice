# .sync修饰符

vue的数据流为父向子传递prop，子向父传递event，**子组件内部不能直接修改从父级传递过来的数据**

```vue
// 父组件
<father :status='statusValue'>

//子组件
...
<div>{{status}}</div>
...
props:['status']
```



```vue
//子组件
<div @click='$emit('status-change',true)'>{{status}}</div>
...
props: {
  status: {
    type: Boolean,
    default: false
  }
},
data(){
    return {
        someValue: true
    }
}

//父组件
<father :status='statusValue' @statusChange='changeHandler'>
  methods: {
    changeHandler(val){
      console.log(val)  // true
    }
  }
```



而`sync`修饰符的作用就是当子组件改变了一个prop值时，不仅在自组件内部发生了变化，这个变化也会同步到父组件中该prop的所绑定的变量

在不使用`sync`修饰符的情况下修改父组件中传入的值的方法就是通过事件传递，与其不同的是，该方法是不是同步操作的，子组件修改父组件的值需要一个传递的过程，而`sync`操作符是同步操作的



.sync修饰符很方便，但也会导致问题，因为破坏了单向数据流。由于子组件改变 prop 的代码和普通的状态改动代码毫无区别，当光看子组件的代码时，你完全不知道它何时悄悄地改变了父组件的状态。这在 debug 复杂结构的应用时会带来很高的维护成本。
