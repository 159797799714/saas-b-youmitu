<template>
  <div class="login-container">
    <img src="@/assets/login/bg.png" class="bg-img">
    <div class="logo">
      <img v-if="iconUrl" :src="iconUrl">
      <div class="title">{{ platform_name }}</div>
    </div>
    <div class="login-content">
      <img src="@/assets/login/forget.png" class="forget-img">
      <div class="form">
        <div class="headBar">
          <div class="tag">找回密码</div>
        </div>
        <el-form ref="resetForm" :model="resetForm" :rules="rules" status-icon class="demo-ruleForm">
          <el-form-item prop="mobile" class="ipt" size="small">
            <el-input v-model.number="resetForm.mobile" placeholder="手机号码" prefix-icon="iconfont icon-wode" size="small" @keyup.enter.native="submitAction('resetForm')" maxlength="11" auto-complete="off"/>
          </el-form-item>
          <el-form-item prop="sms_code"  class="code ipt">
            <el-input v-model="resetForm.sms_code" placeholder="4位验证码" prefix-icon="iconfont icon-yanzhengma" size="small" @keyup.enter.native="submitAction('resetForm')" maxlength="4"/>
            <el-button v-if="!codeActived" type="primary" size="small" class="code-btn" @click="sendCode(resetForm.mobile)">获取验证码</el-button>
            <el-button v-if="codeActived" type="primary" size="small" class="code-btn" plain>{{ num }} s</el-button>
          </el-form-item>
          <el-form-item prop="password" class="ipt" size="small">
            <el-input v-model="resetForm.password" type="password" placeholder="6-16位密码，区分大小写" prefix-icon="iconfont icon-suo" size="small" @keyup.enter.native="submitAction('resetForm')" minlength="6" maxlength="16" auto-complete="off"/>
          </el-form-item>
          <el-form-item prop="password_confirm" class="ipt" size="small">
            <el-input v-model="resetForm.password_confirm" type="password" placeholder="确认密码" prefix-icon="iconfont icon-suo" size="small" @keyup.enter.native="submitAction('resetForm')" minlength="6" maxlength="16" auto-complete="off"/>
          </el-form-item>
        </el-form>
        <div class="submit-btn ipt">
          <el-button type="primary" class="login-btn" @click="submitAction('resetForm')">确定</el-button>
        </div>
        <div class="notHave">
          又想起来了？<el-button type="text" @click="goLogin">马上登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, resetPass } from '@/api/login'
import { getWebSiteIcon } from '@/api/setting'
export default {
  name: 'Login',
  data () {
    var checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('手机号码格式错误'))
        } else {
          callback()
        }
      }, 500)
    }
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      }
      setTimeout(() => {
        if (value.length < 6) {
          callback(new Error('密码长度须为6-16位'))
        } else {
          callback()
        }
      }, 500)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (value !== this.resetForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else if (value.length !== 4) {
        callback(new Error('验证码必须为4位数'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        mobile: '',
        password: '',
        password_confirm: '',
        sms_code: ''
      },
      tabList: ['账号密码登录', '验证码登录'],
      checked: false,
      codeActived: false,
      num: 60,
      move: 0,
      rules: {
        mobile: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ],
        password_confirm: [
          { validator: validatePass, trigger: 'blur' }
        ],
        sms_code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      },
      iconUrl: '',
      platform_name: ''
    }
  },
  created () {
    if (this.$route.query.iconUrl) {
      this.iconUrl = this.$route.query.iconUrl
      this.platform_name = this.$route.query.platform_name
    } else {
      // 获取用户logo
      this.getUserLogo()
    }
  },
  methods: {
    // 获取客户后台logo
    getUserLogo () {
      getWebSiteIcon().then(res => {
        if (res.data.code === 0) {
          this.iconUrl = '//' + res.data.data.domain + res.data.data.website_icon
          this.platform_name = res.data.data.platform_name
        }
      }).catch(err => {
        console.log(err)
      })
    },
    sendCode (mobile) {
      if (/^1[34578]\d{9}$/.test(mobile)) {
        getCode(mobile).then(res => {
          this.codeActived = true
          var timer = setInterval(function () {
            this.num -= 1
            if (this.num <= 0) {
              clearInterval(timer)
              this.codeActived = false
              this.num = 60
            }
          }.bind(this), 1000)
        }).catch(error => {
          this.$message.error(error)
        })
      } else {
        this.$message.error('手机号码格式错误')
      }
    },
    goLogin () {
      this.$refs['resetForm'].resetFields()
      this.$router.push({ name: 'login' })
    },
    submitAction (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetPass(this.resetForm).then(res => {
            if (res.data.code === 1) {
              this.$message.error(res.data.message)
            } else if (res.data.code === 0) {
              this.$confirm('密码已经重置成功, 是否跳转到登录页?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                this.$router.push({ name: 'login' })
              }).catch(() => {
                this.$refs['resetForm'].resetFields()
                this.resetForm.captcha_sms = ''
              })
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .bg-img{
    height: 100%;
    width: 100%;
  }
  .logo{
    position: absolute;
    top: 41px;
    left: 44px;
    height: 38px;
    display: flex;
    &>img{
      display: inline-block;
      height: 38px;
      margin-right: 15px;
    }
    .title{
      color: #4993FF;
      font-size: 23px;
      font-weight: bold;
      line-height: 38px;
    }
  }
  .login-content{
    width: 1440px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 474px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .forget-img{
      width: 493px;
      height: 432px;
      margin-right: 262px;
    }
    .form{
      width: 440px;
      height: 474px;
      padding: 40px;
      margin-right: 123px;
      box-sizing: border-box;
      background: #fff;
      box-shadow:0px 5px 15px 0px rgba(229,239,255,1);
      .headBar{
        position: relative;
        padding: 0 10px;
        margin-bottom: 33px;
        display: flex;
        justify-content: space-between;
        .tag{
          height: 28px;
          font-size: 20px;
          font-weight: 600;
          line-height: 28px;
          color: #444444;
          text-align: center;
        }
        .actived{
          color: #4993FF;
          border-bottom: 2px solid #4993FF;
        }
      }
      .ipt{
        margin-bottom: 20px;
      }
      .code{
        display: flex;
        .code-btn{
          min-width: 100px;
          margin-left: 16px;
        }
      }
      .login-btn{
        width: 100%;
      }
      .notHave{
        text-align: center;
      }
      .other{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
