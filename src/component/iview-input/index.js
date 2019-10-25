import Emitter from './emitter'
import mixinForm from './mixinForm'
import { oneOf, findComponentUpward } from './util'
const prefixCls = 'ivu-input'
export default {
  name: 'IvuInput',
  mixins: [Emitter, mixinForm],

  props: {
    type: {
      validator (val) {
        return oneOf(val, ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel'])
      },
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    size: {
      validator (val) {
        return oneOf(val, ['small', 'large', 'default'])
      },
      default: 'default'
    },
    icon: String,
    search: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    number: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    elementId: {
      type: String
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      prefixCls: prefixCls,
      currentValue: this.value,
      showPassword: false,
      slotReady: false,
      isOnComposition: false
    }
  },

  computed: {
    currentType () {
      let type = this.type
      if (type === 'password' && this.password && this.showPassword) {
        type = 'text'
      }
      return type
    },
    inputClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: this.itemDisabled
        }
      ]
    },
    prepend () {
      let state = false
      if (this.type !== 'textarea') {
        state = this.$slots.append !== undefined
      }
      return state
    },
    wrapClasses () {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
          [`${prefixCls}-type-${this.type}`]: this.type,
          [`${prefixCls}-group`]: this.prepend || this.append || (this.search && this.enterButton),
          [`${prefixCls}-group-${this.size}`]: (this.prepend || this.append || (this.search && this.enterButton)) && !!this.size,
          [`${prefixCls}-group-with-prepend`]: this.prepend,
          [`${prefixCls}-group-with-append`]: this.append || (this.search && this.enterButton),
          [`${prefixCls}-hide-icon`]: this.append, // #554
          [`${prefixCls}-with-search`]: (this.search && this.enterButton)
        }
      ]
    },
    upperLimit () {
      return this.maxlength
    },
    textLength () {
      if (typeof this.value === 'number') {
        return String(this.value).length
      }
      return (this.value || '').length
    }
  },

  methods: {
    handleInput (event) {
      if (this.isOnComposition) return
      let value = event.target.value
      if (this.number && value !== '') {
        value = Number.isNaN(Number(value)) ? value : Number(value)
      }
      this.$emit('input', value)
      this.setCurrentValue(value)
      this.$emit('on-change', event)
    },
    handleEnter (event) {
      this.$emit('on-enter', event)
      if (this.search) this.$emit('on-search', this.currentValue)
    },
    handleKeydown (event) {
      this.$emit('on-keydown', event)
    },
    handleKeypress (event) {
      this.$emit('on-keypress', event)
    },
    handleKeyup (event) {
      this.$emit('on-keyup', event)
    },
    handleFocus (event) {
      this.$emit('on-focus', event)
    },
    handleChange (event) {
      this.$emit('on-input-change', event)
    },
    handleClear () {
      const e = { target: { value: '' } }
      this.$emit('input', '')
      this.setCurrentValue('')
      this.$emit('on-change', e)
      this.$emit('on-clear')
    },
    setCurrentValue (value) {
      if (value === this.value) return
      this.$nextTick(() => {
        this.resizeTextarea()
      })
      this.currentValue = value
      if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
        this.dispatch('FormItem', 'on-form-change', value)
      }
    },
    resizeTextarea () {
      //
    }
  },

  watch: {
    value (val) {
      this.setCurrentValue(val)
    }
  },

  mounted () {
    this.slotReady = true
    this.resizeTextarea()
  }
}
