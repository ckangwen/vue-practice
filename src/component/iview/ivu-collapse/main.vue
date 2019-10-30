<template>
  <div>
    <ivu-collpase v-model="value">
      <ivu-panel name="1">
        史蒂夫·乔布斯
        <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
      </ivu-panel>
      <ivu-panel name="2">
        史蒂夫·乔布斯
        <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
      </ivu-panel>
      <ivu-panel name="3">
        史蒂夫·乔布斯
        <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
      </ivu-panel>
    </ivu-collpase>
  </div>
</template>
<script>
import IvuCollpase from './collapse'
import IvuPanel from './panel'
export default {
  name: 'app',
  components: {
    IvuCollpase,
    IvuPanel
  },
  data() {
    return {
      value: '1'
    }
  }
}
</script>