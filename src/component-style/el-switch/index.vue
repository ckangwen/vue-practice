<template>
  <div
    class="el-switch"
    :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
    role="switch"
    @click.prevent="switchValue"
  >
    <input
      class="el-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
    >
    
    <span
      :class="['el-switch__label', 'el-switch__label--left', !checked ? 'is-active' : '']"
      v-if="inactiveText">
      <span>{{ inactiveText }}</span>
    </span>
    
    <span class="el-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
    </span>

    <span
      :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeText">
      <span>{{ activeText }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "ElSwitch",
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeText: String,
    inactiveText: String,
    activeClolr: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    id: String,
    name: {
      type: String,
      default: ""
    },
  },

  data() {
    return {
      coreWidth: this.width,
      switchDisabled: this.disabled
    }
  },

  created() {
    if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
      this.$emit('input', this.inactiveValue);
    }
  },

  mounted() {
    // 挂载之后调用
    // 将input的checked属性同this.checked绑定
    this.coreWidth = this.width || 40
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor()
    }
    this.$refs.input.checked = this.checked
  },

  computed: {
    checked() {
      return this.value === this.activeValue
    },
  },

  watch: {
    checked() {
      this.$refs.input.checked = this.checked
      if (this.activeClolr || this.inactiveColor) {
        this.setBackgroundColor()
      }
    }
  },

  methods: {
    handleChange(e) {
      const val = this.checked ? this.inactiveValue : this.activeValue
      this.$emit('input', val)
      this.$emit('change', val)
      this.$nextTick(() => {
        this.$refs.input.checked = this.checked
      })
    },
    setBackgroundColor() {
      let newColor = this.checked ? this.activeClolr : this.inactiveColor
      this.$refs.core.style.borderColor = newColor
      this.$refs.core.style.backgroundColor = newColor
    },
    switchValue() {
      !this.switchDisabled && this.handleChange()
    }
  },
}
</script>

<style lang="scss" scoped>
  $default-color: #409eff;
  $switch-button-width: 16px;
  $switch-button-top: 1px;


  .el-switch {
    display: inline-flex;
    align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;

    &.is-checked {

      .el-switch__core {
        border-color: $default-color;
        background-color: $default-color;

        &::after {
          // NOTE 
          left: 100%;
          margin-left:  -($switch-button-width +  $switch-button-top);
        }
      }
    }

    &.is-disabled {
      opacity: 0.6;

      .el-switch__core,
      .el-switch__label {
        cursor: not-allowed;
      }
    }
  }

  .el-switch__core,
  .el-switch__label {
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
  }

  .el-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }

  .el-switch__core {
    margin: 0;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: 0;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    transition: border-color .3s, background-color .3s;

    &::after {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all .3s;
      width: $switch-button-width;
      height: $switch-button-width;
      background: #fff;      
    }
  }

  .el-switch--wide .el-switch__label.el-switch__label--left span {
    left: 10px;
  }
  .el-switch--wide .el-switch__label.el-switch__label--right span {
    right: 10px;
  }
  .el-switch .label-fade-enter,
  .el-switch .label-fade-leave-active {
    opacity: 0;
  }
</style>