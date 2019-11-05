<template>
<div class="el-form-item" style="width: 250px">
  <div class="el-form-item__label-wrap">
    <label class="el-form-item__label" :for="labelFor" :style="labelStyle" v-if="label || $slots.label">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
  </div>

  <div class="el-form-item__content" :style="contentStyle">
    <slot></slot>
    <transition>
    <slot
      v-if="validateState === 'error' && showMessage && form.showMessage"
      name="error"
      :error="validateMessage">
      <div class="el-form-item__error">{{ validateMessage }}</div>
    </slot>
    </transition>
  </div>
</div>
</template>

<script>
import AsyncValidator from 'async-validator'
import { noop, getPropByPath } from './util'
import objectAssign from './merge'
import Emitter from './emitter'
export default {
  name: 'ElFormItem',
  mixins: [Emitter],
  props: {
    prop: String,
    label: String,
    rules: [Object, Array],
    required: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    for: String,
    labelWidth: Number
  },
  provide() {
    return {
      elFormItem: this
    }
  },
  inject: ['elForm'],
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false,
      computedLabelWidth: ''
    }
  },
  computed: {
    labelFor() {
      return this.for || this.prop
    },
    labelStyle() {
      const result = {}
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        result.width = labelWidth
      }
      return result
    },
    contentStyle() {
      const result = {}
      const label = this.label
      if (!label && !this.labelWidth && this.isNested) return result
      const labelWidth = this.labelWidth || this.form.labelWidth
      result.marginLeft = labelWidth
      return result
    },
    form() {
      let parent = this.$parent
      let parentName = parent.$options.name
      while (parentName !== 'ElForm') {
        if (parentName !== 'ElFormItem') {
          this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.name
      }
      return parent
    },
    fieldValue() {
      const model = this.form.model
      console.log('model', model)
      if (!model || !this.prop) return
      let path = this.prop
      return getPropByPath(model, path, true).v
    },
  },
  methods: {
    addValidateEvents() {
      const rules = this.getRules()
      if (rules.length !== 0 || this.required) {
        this.$on('el.form.blur', this.onFieldBlur)
        this.$on('el.form.change', this.onFieldChange)
      }
    },
    validate(trigger, callback = noop) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
      // 没有需要校验的规则，或者此字段不需要校验
      if ((!rules || rules.length === 0) && !this.required) {
        callback()
        return true
      }

      // 状态修改
      this.validateState = 'validating'

      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {}

      model[this.prop] = this.fieldValue

      // * firstField: 当指定字段的第一个验证规则生成错误时调用回调，同时不再对同一字段的验证规则进行处理
      // * `true`表示应用于所有字段
      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        // this.validateState = !!errors ? 'error' : 'success'
        this.validateMessage = errors ? errors[0].message : ''

        // 状态修改完毕，执行回调
        callback(this.validateMessage, invalidFields)
        // 发布validate事件
        this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null)
      })
      console.log(this.fieldValue)
    },
    getRules() {
      let formRules = this.form.rules
      let selfRules = this.rules
      const requiredRule = this.required !== undefined ? {
        required: !!this.required
      } : []

      const prop = getPropByPath(formRules, prop || '')
      // TODO
      formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : []
      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },
    getFilteredRule(trigger) {
      const rules = this.getRules()

      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      })
      .map(rule => objectAssign({}, rule))
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }

      this.validate('change')
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch('ElForm', 'el.form.addField', [this])

      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })

      this.addValidateEvents()
    }
  },
  beforeDestroy() {
    this.dispatch('ElForm', 'el.form.removeField', [this])
  }
}
</script>
