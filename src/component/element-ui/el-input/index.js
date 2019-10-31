import Emitter from './emitter'
export default {
  name: 'ElInput',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
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
    maxlength: Number,
    minlength: Number
  },
  data () {
    return {
      currentValue: ''
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
    handleBlur () {
      this.$emit('onblur', this.currentValue)
      this.dispatch('form-item', 'el.form.blur', [this.currentValue])
    },
    handleInput (event) {
      this.currentValue = event.target.value
    },
    inputSelected () {
      this.$refs.input.select()
    }
  },
  watch: {
    'value' (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('onchange', val)
      this.dispatch('form-item', 'el.form.change', val)
    }
  },
  created () {
    this.$on('inputSelected', this.inputSelected)
  }
}
