<template>
  <div class="navbar">
      <div class="logo">
          <img src="../../assets/logo.png" alt="" @click="zz">
      </div>
      <div>
          <p>
              请输入内容
              <van-icon name="search"  class="ipt-icon" />
          </p>
      </div>
      <div>
          <img :src="imgUrl" alt="" @click="ss" v-if="imgUrl">
          <img src="../../assets/default_img.jpg" alt="" @click="$router.push('/login')" v-else>
          <p>下载APP</p>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: ''
        }
    },
    methods: {
        ss() {
            console.log(this.$route)
            if (this.$route.path == '/userinfo') {
                return
            } else {
                this.$router.push('/userinfo')
            }   
        },
        zz() {
            if (this.$route.path == '/') {
                return
            } else {
                this.$router.push('/')
            }  
        }
        
    },
    async mounted() {
        if (localStorage.getItem('token')) {
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            this.imgUrl = res.data[0].user_img
        }

    },
}
</script>

<style lang="less">
    .navbar {
        height: 12.5vw;
        background-color: white;
        display: flex;
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
                img{
                    width: 80%;
                }
        }
        div:nth-child(2) {
            flex: 1;
            display: flex;
            align-items: center;
            margin: 0 5px;
            p {
                font-size: 12px;
                line-height: 26px;
                padding-left: 25px;
                background-color:#f4f4f4;
                height: 24px;
                width: 100%;
                border-radius: 13px;
                position: relative;
                color: #aaa;
                .ipt-icon {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translate(0, -40%);
                    color: #aaa;
                }
            }
        }
        div:nth-child(3) {
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 24px;
                height: 24px;
            }
            p {
                padding: 5px 10px;
                margin: 0 8px;
                background-color: #fb7299;
                color: white;
                border-radius: 3px;
                font-size: 13px;
            }
        }
    }
</style>