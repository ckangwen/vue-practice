<template>
    <div
        :class="[
            'el-input',
            {
                'el-input--suffix': $slots.suffix || siffixIcon
            }
        ]">
        <template v-if="type !== 'textarea'">
            <input
                v-if="type !== 'textarea'"
                class="el-input__inner"
            >

            <!-- 后置内容 -->
            <span
                class="el-input__suffix"
                v-if="getSuffixVisible()"
            >
                <span class="el-input__suffix-inner">

                    <template>
                        <slot name="suffix"></slot>
                        <i
                            class="el-input__icon"
                            v-if="suffixIcon"
                            :class="suffixIcon">
                        </i>
                    </template>

                </span>
            </span>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ElInputIcon',
    // 去掉html标签上非props的属性
    inheritAttrs: false,
    data() {
        return {
            passwordVisible: false
        }
    },

    props: {
        type: {
            type: String,
            default: 'text'
        },
        suffixIcon: String,
    },

    methods: {
        /** 
         * 用于控制后置内容的显隐
         * 显示后置内容的几种情况如下
         * 1. 使用了插槽: 带 icon 的输入框以slot的方式应用
         * 2. 父组件使用了`suffix-icon`属性: 带 icon 的输入框
         * 3. 父组件使用了`show-password`属性: 可切换密码框的显示与隐藏
        */
        getSuffixVisible() {
            return this.$slots.suffix || this.suffixIcon
        }
    }
}
</script>