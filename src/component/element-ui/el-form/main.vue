<template>
<div>
  <el-form :model="formInline" :rules="rules" ref="ruleForm">
    <el-form-item label="审批人" prop="user">
      <el-input v-model="formInline.user" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-input v-model="formInline.region" placeholder="活动区域"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="formInline.age" placeholder="年龄"></el-input>
    </el-form-item>
    <el-form-item>
      <button type="button" @click="clear">clearValidate</button>
      <button type="button" @click="reset">resetFields</button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import ElInput from './ElInput'
import ElForm from './Form'
import ElFormItem from './FormItem'
export default {
  name: 'app',
  components: {
    ElInput,
    ElForm,
    ElFormItem
  },
  data() {
    return {
      formInline: {
        user: '1',
        region: ''
      },
      rules: {
        user: [{
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        region: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'blur'
        }],
        age: [{
          required: true,
          message: '请输入正确的年龄',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    clear() {
      this.$refs.ruleForm.clearValidate('user')
    },
    reset() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
