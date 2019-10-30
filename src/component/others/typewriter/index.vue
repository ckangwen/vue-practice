<template>
  <span class="typewriter">
    <slot></slot>
    <span class="typewriter-message"
      :class="{
        'typewriter-selected': isFullErasing
      }">
      {{ text }}
    </span>
    <span class="typewriter-cursor" >{{ cursorSymbol }}</span>
  </span>
</template>

<script>
  /**
   * 该组件的行为可以分成几个状态
   * start -> typing -> end -> erase -> waiting -> typing ...
   */
export default {
  name: "TypeWriter",

  props: {
    words: {
      type: Array,
      default() {
        return []
      }
    },
    speed: {
      type: Number,
      default: 300
    },
    interval: {
      type: Number,
      default:300
    },
    fullErase: {
      type: Boolean,
      default: false
    },
    cursorSymbol: {
      type: String,
      default: '|'
    },
  },

  data() {
    return {
      typing: false,
      waiting: false,
      text: null,
      charIndex: 0,
      wordIndex: null,
      word: null,
      isFullErasing:false
    }
  },

  computed: {
    start() {
      // 只有在初始状态时，text才等于null
      return this.word !== null
    },
    erasing() {
      return !this.typing
    },
    // 表示单词打字结束，开始erase
    typed() {
      // 全部擦除之后，text设置为null
      if (this.text === null || this.word === null) {
        return false
      }
      if (!this.start) {
        return false
      }
      return this.typing && this.text.length >= this.word.length
    },
    erased() {
      if (!this.start) {
        return false
      }
      if (this.erasing && this.text === null) {
        return true
      }
      return this.erasing && this.text.length <= 0
    },
    isLastWord() {
      return this.start && this.wordIndex >= this.words.length - 1
    }
  },

  methods: {
    init() {
      this.clearTypeInterval()
      this.typeInterval = setInterval(() => {
        this.next()
        this.type()
      }, this.speed)
      // speed是打印两个字符的时间间隔
    },
    next() {
      if (!this.toContinue()) {
        return
      }
      if (!this.start) {
        this.wordIndex = 0
      } else {
        if (this.isLastWord) {
          this.wordIndex = 0
        } else {
          this.wordIndex ++
        }
      }
      this.waiting = true
      this.charTimeout = setTimeout(() => {
        this.clearCharTimeout()
        this.waiting = false
        this.word = this.words[this.wordIndex]

        this.charIndex = this.typing ? this.word.length : 0
        this.typing = !this.typing
      }, this.interval)
    },
    type() {
      // console.log(this.start ,this.waiting)
      // typing || erasing
        if (this.start && !this.waiting) {
          if (this.typing) {
            this.charIndex ++
            } else {
              this.charIndex --
          }

          this.text = this.word.substr(0, this.charIndex)
        }
    },
    toContinue() {
      if (this.waiting) {
        return false
      }
      if (this.typing && !this.typed && this.start) {
        return false
      }
      if (this.erasing && !this.erased && this.start) {
        return false
      }

      if (this.typed) {
        this.typing = !this.typing
        this.doFullErase()
        return false
      }
      return true
    },
    doFullErase() {
      if (this.fullErase && !this.isFullErasing) {
        this.isFullErasing = true
        this.waiting = true
        this.fullEraseTimeout = setTimeout(() => {
          this.clearFullEraseTimeout()
          this.reset()
        }, this.speed)
      }
    },
    reset() {
      this.waiting = false
      this.text = null
      this.charIndex = 0
      this.isFullErasing = false
    },
    clearAll() {
      this.clearTypeInterval()
      this.clearCharTimeout()
      this.clearFullEraseTimeout()
    },
    clearTypeInterval() {
      this.typeInterval && clearInterval(this.typeInterval)
    },
    clearCharTimeout() {
      this.charTimeout && clearTimeout(this.charTimeout)
    },
    clearFullEraseTimeout() {
      this.fullEraseTimeout && clearTimeout(this.fullEraseTimeout)
    }
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.clearAll()
  }

}
</script>

<style>
.typewriter-selected{
  background-color: rgba(0,0,0,.1);
}
.typewriter-cursor{
    opacity: 1;
    animation: blink 0.7s infinite;
    position: relative;
    top:0px;
    left:-10px;
}
@keyframes blink{
    0% { opacity:1; }
    50% { opacity:0; }
    100% { opacity:1; }
}
</style>