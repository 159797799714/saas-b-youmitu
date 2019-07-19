<template>
  <div class="login-container">
    <img src="@/assets/login/bg.png" class="bg-img">
    <div class="logo">
      <img v-if="iconUrl" :src="iconUrl" alt="LOGO">
      <div class="title">{{ platform_name }}</div>
    </div>
    <div class="login-content">
      <img src="@/assets/login/login.png" class="login-img">
      <div class="form">
        <div class="headBar">
          <div class="tag">账号密码登录</div>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" status-icon class="demo-ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model.number="loginForm.mobile" placeholder="手机号码" prefix-icon="iconfont icon-wode" size="small" @keyup.enter.native="submitForm('loginForm')" maxlength="11" auto-complete="off"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="6-16位密码，区分大小写" prefix-icon="iconfont icon-suo" size="small" @keyup.enter.native="submitForm('loginForm')" minlength="6" maxlength="16"/>
          </el-form-item>
        </el-form>
        <div class="other ipt">
          <el-checkbox v-model="checked">记住登录状态</el-checkbox>
          <el-button type="text" @click="goForget">忘记密码</el-button>
        </div>
        <div class="submit-btn ipt">
          <el-button native-type="submit" type="primary" :loading="loading" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      }
      setTimeout(() => {
        if (value.length < 6) {
          callback(new Error('密码须为6-16位'))
        } else {
          callback()
        }
      }, 500)
    }
    var checkCaptcha = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      }
      setTimeout(() => {
        if (value.length !== 4) {
          callback(new Error('验证码必须为4位数'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      loginForm: {
        mobile: '',
        password: '',
        verify_code: '',
        uuid: ''
      },
      tabList: ['账号密码登录', '验证码登录'],
      checked: false,
      tabItem: 0,
      codeActived: false,
      num: 60,
      rules: {
        mobile: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        verify_code: [
          { validator: checkCaptcha, trigger: 'blur' }
        ]
      },
      imgUrl: '',
      loading: false,
      iconUrl: '',
      platform_name: ''
    }
  },
  watch: {
    tabItem (val, oldval) {
      this.$refs['loginForm'].resetFields()
      this.codeActived = false
    },
    checked (val, oldval) {
      if (!val) {
        sessionStorage.clear()
      }
    }
  },
  created () {
    if (sessionStorage.loginForm !== undefined) {
      var loginForm = sessionStorage.loginForm
      this.loginForm = JSON.parse(loginForm)
    }
    // this.updateCaptcha()
    // 获取用户logo
    this.getUserLogo()
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
    selectedBar (index) {
      this.tabItem = index
    },
    goForget () {
      this.$router.push({ name: 'forget', query: { iconUrl: this.iconUrl, platform_name: this.platform_name } })
    },
    submitForm (formName) {
      // 初始化sessionStorage 和  localStorage
      sessionStorage.clear()
      localStorage.clear()
      // 退出以往旧账号
      this.$store.dispatch('FedLogOut')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            this.loading = false
            if (res.data.code === 0) {
              if (this.checked) {
                sessionStorage.setItem('token', res.headers.authorization)
                sessionStorage.setItem('loginForm', JSON.stringify(this.loginForm))
              } else {
                sessionStorage.clear()
              }
              this.$refs['loginForm'].resetFields()
              this.$router.push({ path: this.redirect || '/' })
            } else {
              this.$message.error(res.data.message)
            }
          }).catch((err) => {
            this.$message.error(err)
            // this.$refs['loginForm'].resetFields()
          })
          this.loading = false
          this.$router.push({ name: 'index' })
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
    .login-img{
      height: 364px;
      width: 555px;
      margin-right: 278px;
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
          height: 38px;
          font-size: 20px;
          font-weight: 600;
          line-height: 38px;
          color: #444444;
          text-align: center;
        }
        .actived{
          color: #4993FF;
          border-bottom: 2px solid #4993FF;
        }
      }
      .ipt{
        margin-bottom: 22px;
      }
      .code{
        height: 40px;
        display: flex;
        .code-ipt{
          margin-top: 4px;
          max-width: 260px;
        }
        .code-btn{
          height: 32px;
          width: 84px;
          margin-top: 4px;
          margin-left: 16px;
          border: 1px solid #f5f5f5;
          border-radius: 2px;
          img{
            height: 32px;
            width: 84px;
          }
        }
      }
      .login-btn{
        width: 100%;
      }
      .notHave{
        text-align: center;
      }
      .other{
        height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
