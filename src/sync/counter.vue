<template>
  <div class="counter-wrapper">
    <span class="counter__operation" @click="minus"> - </span>
    <span class="counter__content"> {{ counter }},  {{ nosync }} </span>
    <span class="counter__operation" @click="plus"> + </span>
  </div>
</template>
<script>
export default {
  name: 'Counter',

  props: {
    counter: {
      type: Number,
      default: 9
    },
    nosync: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      count: 1,
      nsync: -1
    }
  },

  methods: {
    minus() {
      this.count --
      this.nsync --
      this.$emit('update:counter', this.count)
    },
    plus() {
      this.count ++
      this.nsync ++
      this.$emit('update:counter', this.count)
    }
  },

  mounted() {
    this.count = this.counter
    this.nsync = this.nosync
  },
}
</script>
<style>
  .counter-wrapper {
    display: block;
  }
  .counter__operation,
  .counter__content {
    display: inline-block;
  }

  .counter__content {
    padding: 15px;
  }

  .counter__operation {
    background: black;
    color: white;
    padding: 10px;
    cursor: pointer;
    user-select: none;
  }
</style>
