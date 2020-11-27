<template>
  <div>
    <login-top middletop="注册bilibili"></login-top>

    <Login-text label="姓名" 
      style="margin:4.167vw 0" 
      placeholder="请输入姓名" 
      rule="^.{6,16}$"
      @inputchange=" res => name = res"
      ></Login-text>

    <Login-text label="账号" 
      placeholder="请输入账号" 
      rule="^.{6,16}$"
      @inputchange=" res => username = res"
      ></Login-text>

    <Login-text label="密码" 
      placeholder="请输入密码" 
      type="password" 
      rule="^.{6,16}$"
      @inputchange=" res => password = res"
      ></Login-text>

    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>

import LoginTop from '../components/common/LoginTop.vue'
import LoginText from '../components/common/LoginText.vue'
import LoginBtn from '../components/common/LoginBtn.vue'

export default {
  data() {
    return {
      name: '',
      username: '',
      password: ''
    }
  },
  components:{
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    registerSubmit() {
      if(this.name && this.username && this.password) {
        this.$http.post('/register', {
          name:this.name,
          username:this.username,
          password: this.password,
        })
      }
    }
  }
}
</script>

<style>

</style>