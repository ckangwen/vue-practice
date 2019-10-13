<template>
    <div
        :class="'el-input'"
    >
        <template>
            <input
                class="el-input__inner"
                :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" 
                ref="input"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
            >
            <span
                class="el-input--suffix"
                v-if="getSuffixVisible()"
            >
                <span class="el-input__suffix-inner">
                    <template v-if=" !showPwdVisible">
                        <slot name="suffix"></slot>
                    </template>
                    <i class="el-input__icon el-icon-view el-input__clear"
                        v-if="showPwdVisible"
                        @click="handlePasswordVisible"
                    ></i>
                </span>
            </span>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ElInputPwd',
    data() {
        return {
            passwordVisible: false,
            focused: false,
        }
    },

    props: {
        value: [String, Number],
        type: {
            type: String,
            default: 'text'
        },
        showPassword: {
            type: Boolean,
            default: false,
            isComposing: false,
        }
    },

    computed: {
        nativeInputValue() {
            return (this.value === null || this.value === undefined) ? '' : String(this.value);
        },
        showPwdVisible() {
            return this.showPassword &&
                (!!this.nativeInputValue || this.focused)
        }
    },

    methods: {
        focus() {
            this.getInput().focus()
        },
        getSuffixVisible() {
            return this.$slots.suffix ||
            this.showPassword
        },
        handlePasswordVisible() {
            this.passwordVisible = !this.passwordVisible
            this.focus()
        },
        getInput() {
            return this.$refs.input
        },
        handleFocus(e) {
            this.focused = true
            this.$emit('focus', e)

        },
        handleBlur(e) {
            this.focused = false;
            this.$emit('blur', e);
        },
        setNativeInputValue() {
            const input = this.getInput();
            if (!input) return;
            if (input.value === this.nativeInputValue) return;
            input.value = this.nativeInputValue;
        },
        handleInput(e) {
            // 撰写期间不应发出输入
            // see: https://github.com/ElemeFE/element/issues/10516
            if (this.isComposing) return;

            this.$emit('input', e.target.value);

            // ensure native input value is controlled
            // see: https://github.com/ElemeFE/element/issues/12850
            this.$nextTick(this.setNativeInputValue);
        }
    },

    watch: {
        nativeInputValue() {
            this.setNativeInputValue()
        }
    },

    mounted() {
        this.setNativeInputValue()
    }
}
</script>