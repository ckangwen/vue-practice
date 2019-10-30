const VueTest = {
  name: 'VueTest',
  props: {},
  data () {
    return {
      text: 'jsx'
    }
  },
  methods: {
    log () {
      console.log(this.text)
    }
  },
  render () {
    return (
      <div>
        <h1 onClick={this.log}>Hello Vue</h1>
      </div>
    )
  }
}
VueTest.install = function (Vue) {
  Vue.component(VueTest.name, VueTest)
}

export default VueTest
