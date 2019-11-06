# ElForm



## v1.0

### 功能列表

- [x] 表单字段验证
- [ ] 移除表单项的校验结果
- [ ] 重置表单项
- [ ] 标签文本对齐方式



### Form Attributes

|name|description|
|---|---|
|model|数据表单对象|
|rules|表单验证规则|
|showMessage|是否显示错误校验信息|



### Form Methods

无



### Form Slots

| name    | description  |
| ------- | ------------ |
| default | FormItem内容 |





### Form events

|name|description|
|---|---|
|validate|任意表单项被校验之后触发|



### FormItem Attributes

|name|description|
|---|---|
|prop|表单域字段|
|label|标签文本|
|required|是否必填，如果没有设置，则会根据校验规则自动生成|
|rules|表单验证规则|
|show-message|是否显示校验错误信息|



### FormItem Slots

| name  | description            |
| ----- | ---------------------- |
| error | 表单校验信息的显示方式 |
| label | 标签文本的内容         |



## v2.0

### 功能列表

- [x] 表单字段验证
- [x] 移除表单项的校验结果
- [x] 重置表单项
- [x] 对整个表单进行校验
- [x] 对表单部分字段进行校验
- [ ] 标签文本对齐方式



### Form Methods


| name          | description                                                  |
| ------------- | ------------------------------------------------------------ |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。<br>若不传入回调函数，则会返回一个 promise |
| validateField | 对部分表单字段进行校验的方法                                 |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果   |
| clearValidate | 移除表单项的校验结果。可以传入单独的prop属性或数组           |



### FormItem Methods

| name          | description  |
| ------------- | ---------------------------------------------------- |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 |
| clearValidate | 移除该表单项的校验结果                               |



### 其他

个人感觉ElementUI中的对数据处理十分精妙，例如FormItem`validateField`方法

```js
  validateField(props, cb) {
    props = [].concat(props);
    const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1);
    if (!fields.length) {
      console.warn('[Element Warn]please pass correct props!');
      return;
    }

    fields.forEach(field => {
      field.validate('', cb);
    });
  }
```

就`concat`方法而言，因为传入的参数props可能为字符串类型，也可能为数组类型，如果不预先统一类型，则势必需要对两种情况进行处理。