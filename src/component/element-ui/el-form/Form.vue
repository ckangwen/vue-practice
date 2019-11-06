<template>
  <form class="el-form">
    <slot></slot>
  </form>
</template>
<script>
import Emitter from './emitter'
import objectAssign from './merge'
export default {
  name: 'ElForm',
  mixins: [Emitter],
  provide() {
    return {
      elForm: this
    }
  },
  props: {
    model: Object,
    rules: Object,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fields: []
    }
  },
  methods: {
    // 清除校验信息，支持传入待移除的表单项的 prop 属性或者 prop 组成的数组
    clearValidate(props = []) {
      const clearFields = props.length
        ? (typeof props === 'string'
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        ) : this.fields
      // let clearFields
      // if (props.length) {
      //   if (typeof props === 'string') {
      //     clearFields = this.fields.filter(field => props === field.prop)
      //   } else {
      //     clearFields = this.fields.filter(field => props.indexOf(field) > -1)
      //   }
      // } else {
      //   clearFields = this.fields
      // }
      clearFields.forEach(field => {
        field.clearValidate()
      })
    },
    resetFields() {
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    validate(callback) {
      if (this.fields.length === 0 && callback) {
        callback(true)
      }

      let valid = true
      let invalidFields = {}
      let count = 0
      this.fields.forEach(field => {
        // * 回调函数的两个参数
        // * message:校验结果信息，如果验证出错则返回出错信息，正确则返回空
        // * field: 不合法的表单字段(prop)
        field.validate('', (message, field) => {
          if (message) {
            valid = false
          }
          invalidFields = objectAssign({}, invalidFields, field)
          // 如果表单数据对象已经全部校验完毕，则调用回调
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid, invalidFields)
          }
        })
      })

      // 如果没有传入回调函数，则返回一个Promise
      if (typeof callback !== 'function' && window.Promise) {
        return new Promise((resolve, reject) => {
          callback = function(valid) {
            valid ? resolve(valid) : reject(valid)
          }
        })
      }
    },
    validateField(props, callback) {
      props = [].concat(props)
      const fields = this.fields.filter(field => props.indexOf(field.prop) > -1)
      if (!fields.length) return
      fields.forEach(field => {
        field.validate('', callback)
      })
    }
  },
  created() {
    // FormItem触发事件，并将自身实例的数组作为参数传递
    this.$on('el.form.addField', (field) => {
      this.fields.push(field)
    })
    this.$on('el.form.removeField', (field) => {
      this.fields.splice(this.fields.indexOf(field), 1)
    })
  }
}
</script>
<style>
  @import url('./form.css');
</style>