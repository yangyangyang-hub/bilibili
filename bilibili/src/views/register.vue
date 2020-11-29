<template>
  <div>
    <login-top middletop="注册bilibili">
      <div slot="right" @click="$router.push('/Login')" style="font-size:3.611vw">
        切换到登录
      </div>
    </login-top>

    <Login-text label="姓名" 
      style="margin:4.167vw 0" 
      placeholder="请输入姓名" 
      rule="^.{6,16}$"
      @inputchange=" res => model.name = res"
      ></Login-text>

    <Login-text label="账号" 
      placeholder="请输入账号" 
      rule="^.{6,16}$"
      @inputchange=" res => model.username = res"
      ></Login-text>

    <Login-text label="密码" 
      placeholder="请输入密码" 
      type="password" 
      rule="^.{6,16}$"
      @inputchange=" res => model.password = res"
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
      model: {
        name: '',
        username: '',
        password: '',
      }
    }
  },
  components:{
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    async registerSubmit() {
      let rulg = /^.{6,16}$/
      console.log('1111');
      if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post('/register', this.model)
        console.log(2222);
        this.$msg.fail(res.data.msg)
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.objtoken)
        setTimeout(() => {
          this.$router.push('/userinfo')
        },1000)
      } else {
        this.$msg.fail('格式不正确，重新输入')
      }
    }
  }
}
</script>

<style>

</style>