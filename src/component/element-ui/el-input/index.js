import Emitter from './emitter'
export default {
  name: 'ElInput',
  mixins: [Emitter],
  props: {
    value: [String, Number],
    disabled: Boolean,
    readonly: Boolean,
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    number: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    autoComplete: {
      type: String,
      default: ''
    },
    step: Number,
    maxlength: Number,
    minlength: Number,
    max: Number,
    min: Number,
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    validating () {
      return this.$parent.validating
    }
  },
  methods: {
    handleFocus () {
      this.$emit('onfocus', this.currentValue)
    },
    handleBlur (event) {
      this.$emit('onblur', event)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue])
      }
    },
    // handleInput (event) {
    //   const value = event.target.value
    //   this.$emit('input', value)
    //   this.setCurrentValue(event.target.value)
    //   this.$emit('change', value)
    // },
    handleInput (event) {
      this.setCurrentValue(event.target.value)
    },
    inputSelected () {
      this.$refs.input.select()
    },
    handleIconClick (event) {
      if (this.onIconClick) {
        this.onIconClick(event)
      }
      this.$emit('click', event)
    },
    // setCurrentValue (value) {
    //   if (value === this.currentValue) return
    //   this.currentValue = value
    //   if (this.validateEvent) {
    //     this.dispatch('ElFormItem', 'el.form.change', [value])
    //   }
    // }
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
      this.$emit('input', value)
      this.$emit('change', value)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [value])
      }
    }
  },
  watch: {
    'value' (val) {
      this.setCurrentValue(val)
    },
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('onchange', val)
      this.dispatch('ElFormItem', 'el.form.change', val)
    }
  },
  created () {
    this.$on('inputSelected', this.inputSelected)
  }
}
