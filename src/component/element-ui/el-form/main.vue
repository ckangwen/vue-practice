<template>
<div>
  <el-form :model="formInline" :rules="rules">
    <el-form-item label="审批人" prop="user">
      <el-input v-model="formInline.user" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-input v-model="formInline.region" placeholder="活动区域"></el-input>
    </el-form-item>
    <el-form-item>
      <button @submit.native="onSubmit">submit</button>
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
        user: '',
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
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
