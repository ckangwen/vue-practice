<template>
  <div
    class="el-rate"
    tabindex="0"
    role="rate"
  >
    <span
      class="el-rate__item"
      v-for="(item, key) in max"
      :key="key"
      :style="{ cursor: rateDisabled ? 'auto' : 'pointer'}"
      @click="onclickHandler(item)"
      @mousemove="onMousemoveHandler(item, $event)"
      @mouseleave="onMouseleaveHandler">
        <i
          class="el-rate__icon"
          :class="[
            classes[item - 1],
            {
              'hover': hoverIndex === item
            }
          ]"
          :style="getIconStyle(item)">
        </i>
    </span>
    <span
      class="el-rate__text"
      :style="{
        color: textColor
      }"
      v-if="showText || showScore">
        {{text}}
    </span>
  </div>
</template>

<script>
import { isObject, hasClass } from './util'
export default {
  name: 'ElRate',
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 0
    },
    voidColor: {
      type: String,
      default: '#C6D1DE'
    },
    activeColor: {
      type: String,
      default: '#F7BA2A'
    },
    disabledVoidColor: {
      type: String,
      default: '#EFF2F7'
    },
    disableActiveColor: {
      type: String,
      default: '#F7BA2A'
    },
    iconClasses: {
      type: [Array, Object],
      default() {
        return ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on']
      }
    },
    disabledVoidIconClass: {
      type: String,
      default: 'el-icon-star-on'
    },
    activeIconClass: {
      type: String,
      default: 'el-icon-star-on'
    },
    voidIconClass: {
      type: String,
      default: 'el-icon-star-off'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    showScore: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: '#1f2d3d'
    },
    texts: {
      type: Array,
      default() {
        return ['极差', '失望', '一般', '满意', '惊喜']
      }
    },
    scoreTemplate: {
      type: String,
      default: '{value}'
    }
  },
  data() {
    return {
      currentValue: this.value,
      pointerAtLeftHalf: true,
      hoverIndex: -1
    }
  },

  computed: {
    text() {
      let result = ''
      if (this.showScore) {
        result = this.scoreTemplate.replace(/\{\s*value\s*\}/, this.rateDisabled
          ? this.value
          : this.currentValue
        )
      } else if (this.showText) {
        result = this.texts[Math.ceil(this.currentValue) - 1]
      }
      return result
    },
    classes() {
      let result = [];
      let i = 0;
      let threshold = this.currentValue;
      if (this.allowHalf && this.currentValue !== Math.floor(this.currentValue)) {
        threshold--
      }
      for (; i < threshold; i++) {
        result.push(this.activeIconClass)
      }
      for (; i < this.max; i++) {
        result.push(this.voidIconClass);
      }
      return result;
    },

    rateDisabled() {
      return this.disabled
    }
  },

  methods: {
    // star的颜色
    getIconStyle(item) {
      const voidColor = this.rateDisabled ? this.disabledVoidColor : this.voidColor
      const activeColor = this.rateDisabled ? this.disableActiveColor : this.activeColor
      return {
        color: item <= this.currentValue ? activeColor : voidColor
      }
    },
    onMousemoveHandler(value, e) {
      if (this.rateDisabled) {
        return
      }
      if (this.allowHalf) {
        let target = e.target
        // 定位到star icon，目的是为了获取鼠标在其上的位置
        if (hasClass(target, 'el-rate__item')) {
          target = target.querySelector('.el-rate__icon')
        }
        if (hasClass(target, 'el-rate__decimal')) {
          target = target.parentNode
        }

        // offsetX: 事件对象与目标节点的内填充边在水平方向上的偏移量
        // clientWidth: 元素的内部宽度，包括padding，不包括border、margin
        this.pointerAtLeftHalf = e.offsetX * 2 <= target.clientWidth
        this.currentValue = this.pointerAtLeftHalf ? value - 0.5 : value
      } else {
        this.currentValue = value
      }
      this.hoverIndex = value
    },

    onMouseleaveHandler() {
      if (this.rateDisabled) {
        return
      }
      if (this.allowHalf) {
        this.pointerAtLeftHalf = this.value !== Math.floor(this.value)
      }
      this.currentValue = this.value
      this.hoverIndex = -1
    },

    onclickHandler(value)  {
      if (this.rateDisabled) {
        return
      }
      if (this.allowHalf && this.pointerAtLeftHalf) {
        this.$emit('input', this.currentValue)
        this.$emit('change', this.currentValue)
      } else {
        this.$emit('input', value)
        this.$emit('change', value)

      }
    }
  }
}
</script>

<style lang="css">
@import url('../icon/index.css');
.el-rate__icon,
.el-rate__item {
  position: relative;
  display: inline-block
}

.el-rate {
  height: 20px;
  line-height: 1
}

.el-rate:active,
.el-rate:focus {
  outline-width: 0
}

.el-rate__item {
  font-size: 0;
  vertical-align: middle
}

.el-rate__icon {
  font-size: 18px;
  margin-right: 6px;
  color: #C0C4CC;
  -webkit-transition: .3s;
  transition: .3s
}

.el-rate__decimal,
.el-rate__icon .path2 {
  position: absolute;
  top: 0;
  left: 0
}

.el-rate__icon.hover {
  -webkit-transform: scale(1.15);
  transform: scale(1.15)
}

.el-rate__decimal {
  display: inline-block;
  overflow: hidden
}

.el-rate__text {
  font-size: 14px;
  vertical-align: middle
}
</style>