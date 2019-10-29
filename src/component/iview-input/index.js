import { oneOf, findComponentUpward, calcTextareaHeight } from './util'
import Emitter from './emitter'
import mixinForm from './mixinForm.js'
export default {
  name: 'TestInput',
  mixins: [Emitter, mixinForm],
  props: {
    name: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number]
    },
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    wrap: {
      validator (value) {
        return oneOf(value, ['soft', 'hard'])
      },
      default: 'soft'
    },
    // * 设置为true，就会自动适应高度的变化
    // * 设定为一个对象，指定最小行数与最大行数
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    number: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      showPassword: false,
      isOnComposition: false,
      textareaStyles: {}
    }
  },

  computed: {
    upperLimit () {
      return this.maxlength
    },
    currentTextLength () {
      return (this.value || '').length
    },
    currentType () {
      let type = this.type
      if (type === 'password' && this.password && this.showPassword) {
        type = 'text'
      }
      return type
    },
    showPrefix () {
      let state = false
      if (this.type !== 'textarea') {
        state = this.suffix !== '' || this.$slots.prefix !== undefined
      }
      return state
    },
    showSuffix () {
      let state = false
      if (this.type !== 'textarea') {
        state = this.suffix !== '' || this.$slots.suffix !== undefined
      }
      return state
    }
  },

  methods: {
    handleInput (e) {
      if (this.isOnComposition) return
      let value = e.target.value
      if (this.number && value !== '') {
        value = Number.isNaN(Number(value)) ? value : Number(value)
      }
      this.setCurrentValue(value)
      this.$emit('input', value)
      this.$emit('on-change', event)
    },
    handleChange (event) {
      this.$emit('on-input-change', event)
    },
    handleEnter (event) {
      this.$emit('on-enter', event)
    },
    handleKeyup (event) {
      this.$emit('on-keyup', event)
    },
    handleKeyPress (event) {
      this.$emit('on-keypress', event)
    },
    handleKeyDown (event) {
      this.$emit('on-keypress', event)
    },
    handleFocus (event) {
      this.$emit('on-focus', event)
    },
    handleBlur (event) {
      this.$emit('on-blur', event)
      if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
        this.dispatch('FormItem', 'on-form-blur', this.currentValue)
      }
    },
    handleSearch () {
      if (this.itemDisabled) {
        return false
      }
      // 恢复焦点
      this.$refs.input.focus()
      this.$emit('on-search', this.currentValue)
    },
    setCurrentValue (val) {
      if (val === this.value) return
      this.$nextTick(() => {
        this.resizeTextarea()
      })
      this.currentValue = val
      if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
        this.dispatch('FormItem', 'on-form-change', val)
      }
    },
    handleToggleShowPassword () {
      if (this.itemDisabled) {
        return false
      }
      this.$refs.input.focus()
      this.showPassword = !this.showPassword
    },
    handleClear () {
      this.setCurrentValue('')
    },
    handleComposition (e) {
      if (e.type === 'compositionstart') {
        this.isOnComposition = true
      }
      if (e.type === 'compositionend') {
        this.isOnComposition = false
        this.handleInput(e)
      }
    },
    resizeTextarea () {
      const autosize = this.autosize
      if (!autosize || this.type !== 'textarea') {
        return false
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows
      this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
    },
    focus () {
      if (this.type === 'textarea') {
        this.$refs.textarea.focus()
      } else {
        this.$refs.input.focus()
      }
    },
    blur () {
      if (this.type === 'textarea') {
        this.$refs.textarea.blur()
      } else {
        this.$refs.input.blur()
      }
    }
  },
  watch: {
    value (val) {
      this.setCurrentValue(val)
    }
  },

  mounted () {
    this.resizeTextarea()
  }
}
