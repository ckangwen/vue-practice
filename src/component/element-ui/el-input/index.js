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
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('onchange', val)
      this.dispatch('form-item', 'el.form.change', val)
    }
  },
  methods: {
    handleFocus (event) {
      this.$emit('onfocus', this.currentValue)
    },
    handleBlur (event) {
      this.$emit('onblur', this.currentValue)
      this.dispatch('form-item', 'el.form.blur', [this.currentValue])
    },
    inputSelected () {
      this.$refs.input.select()
    }
  },
  created () {
    this.$on('inputSelected', this.inputSelected)
  }
}
