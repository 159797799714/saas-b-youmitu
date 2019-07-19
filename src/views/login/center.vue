<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      token: ''
    }
  },
  created () {
    function GetQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.href.substr(window.location.href.indexOf('?') + 1).match(reg)// search,查询？后面的参数，并匹配正则
      if (r != null) {
        return decodeURI(r[2])
      } return null
    }
    let token = GetQueryString('token')
    this.$store.dispatch('FedLogOut').then(res => {
      this.$store.dispatch('OutSetToken', token).then(res => {
        if (res) {
          this.$router.push('/')
        } else {
          sessionStorage.setItem('Authorization', token)
          this.$router.push('/')
        }
      })
    })
  }
}
</script>
