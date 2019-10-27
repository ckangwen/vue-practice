<template>
  <div class="el-collapse-item"
    :class="{
      'is-active': isActive,
      'is-disabled': disabled
    }"
  >
    <div>
      <div
        class="el-collapse-item__header"
        role="button"
        :id="`el-collapse-head-${id}`"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @click="handleHeaderClick"
        @keyup.space.enter.stop="handleEnterClick"
        @focus="handleFocus"
        @blur="focusing = false"
      >
      <!-- 这里的插槽是为了自定义面板而准备的 -->
        <slot name="title">{{title}}</slot>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.8414611,12 L10.1203717,8.82539569 C9.94066062,8.61573277 9.96494139,8.30008277 10.1746043,8.1203717 C10.3842672,7.94066062 10.6999172,7.96494139 10.8796283,8.17460431 L13.8796283,11.6746043 C14.0401239,11.8618492 14.0401239,12.1381508 13.8796283,12.3253957 L10.8796283,15.8253957 C10.6999172,16.0350586 10.3842672,16.0593394 10.1746043,15.8796283 C9.96494139,15.6999172 9.94066062,15.3842672 10.1203717,15.1746043 L12.8414611,12 Z"/>
        </svg>
      </div>

      <div
        class="el-collpase-item__wrap"
        :id="`el-collapse-content-${id}`"
        v-show="isActive"
      >
        <div class="el-collpase-item__content">
          <slot></slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {generateId} from './util'
import Emitter from './emitter'
export default {
  name: 'ElCollapseItem',
  mixins: [Emitter],
  props: {
    title: String,
    name: {
      type: [String, Number],
      default() {
        return this._uid
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contentWrapStyle: {
        height: 'auto',
        display: 'block'
      },
      focusing: false,
      isClick: false,
      id: generateId()
    }
  },
  inject: ['collapse'],
  computed: {
    // iview: 将状态上传至父元素，让父元素修改
    // element-ui： 获取上级元素(通过依赖注入，不一定是父级元素)的active列表，判断当前是否在其中
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) > -1
    },
  },
  methods: {
    handleFocus() {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true
        } else {
          this.isClick = false
        }
      }, 50)
    },
    handleHeaderClick() {
      if (this.disabled) return
      this.dispatch('ElCollapse', 'item-click', this)
      this.focusing = false
      this.isClick = true
    },
    handleEnterClick() {
      this.dispatch('ElCollapse', 'item-click', this)
    }
  },
}
</script>