<template>
  <div class="app-container">
    <el-form ref="addForm" :model="addForm" :rules="rules2" status-icon label-width="100px" class="demo-ruleForm main">
      <el-form-item label="登录用户名" prop="age" class="ipt">
        <el-input v-model.number="addForm.username" />
      </el-form-item>
      <el-form-item label="联系人姓名" prop="age" class="ipt">
        <el-input v-model.number="addForm.contact_name" />
      </el-form-item>
      <el-form-item label="手机号码" prop="age" class="ipt">
        <el-input v-model.number="addForm.contact_telephone" />
      </el-form-item>
      <el-form-item label="公司名称" prop="age" class="ipt">
        <el-input v-model.number="addForm.company" />
      </el-form-item>
      <el-form-item label="密码" prop="pass" class="ipt">
        <el-input v-model= "addForm.password" type= "password"/>
      </el-form-item>
      <el-form-item label= "确认密码" prop= "checkPass" class="ipt">
        <el-input v-model= "addForm.checkPass" type= "password"/>
      </el-form-item>
      <el-form-item class="btn-space">
        <el-button type="primary" @click="submitForm(addForm)">提交</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addRenter } from '@/api/login'

export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addForm.checkPass !== '') {
          this.$refs.addForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      addForm: {
        username: '',
        contact_name: '',
        contact_telephone: '',
        company: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    submitForm (form) {
      const data = this.$qs.stringify(form)
      addRenter(data).then(Response => {
        console.log('成功了')
      }).catch((error) => {
        console.log(error)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center
}
.main{
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ipt{
  width: 50%;
  margin-top: 20px;
}
.btn-space{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
