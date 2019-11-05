# ElForm



## v1.0

### Form Attribute

|name|description|
|---|---|
|model|数据表单对象|
|rules|表单验证规则|
|showMessage|是否显示错误校验信息|



### Form Method

无



### Form Slot

| name    | description  |
| ------- | ------------ |
| default | FormItem内容 |





### Form event

|name|description|
|---|---|
|validate|任意表单项被校验之后触发|



### FormItem Attribute

|name|description|
|---|---|
|prop|表单域字段|
|label|标签文本|
|required|是否必填，如果没有设置，则会根据校验规则自动生成|
|rules|表单验证规则|
|show-message|是否显示校验错误信息|



### FormItem Slot

| name  | description            |
| ----- | ---------------------- |
| error | 表单校验信息的显示方式 |
| label | 标签文本的内容         |



### 功能列表

- [x] 表单字段验证
- [ ] 移除表单项的校验结果
- [ ] 重置表单项
- [ ] 标签文本对齐方式
- [ ] 行内表单
- [ ] 数字类型验证



