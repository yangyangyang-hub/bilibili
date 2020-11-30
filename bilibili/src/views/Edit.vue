<template>
  <div v-if="model" class="edit_view">
      <div style="margin-bottom:2.778vw">
          <nav-bar></nav-bar>
      </div>
      <div class="uploadfile">
          <van-uploader preview-size="100vw" class="uploadimg" :after-read="afterRead" />
          <edit-banner left="头像">
            <img :src="model.user_img" alt="" slot="right" v-if="model.user_img">
            <img src="../assets/default_img.jpg" alt="" slot="right" v-else>
          </edit-banner>
      </div>
      <edit-banner left="昵称">
          <a href="javascript:;" slot="right">{{model.name}}</a>
      </edit-banner>
      <edit-banner left="账号">
          <a href="javascript:;" slot="right">{{model.username}}</a>
      </edit-banner>
      <edit-banner left="性别"></edit-banner>
      <edit-banner left="个性签名"></edit-banner> 
  </div>
</template>

<script>

import NavBar from '../components/common/Navbar.vue'
import editBanner from '../components/common/editBanner.vue'

export default {
    data() {
        return {
            model: {}
        }
    },
    components: {
        NavBar,
        editBanner
    },
    methods: {
        async selectUser() {
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            this.model = res.data[0]
        },
        async afterRead(file) {
            const fromdata = new FormData()
            fromdata.append('file', file.file)
           
            const res = await this.$http.post('/upload', fromdata)
            this.model.user_img = res.data.url
        }
    },
    created(){
        this.selectUser()
    }
}
</script>

<style scoped lang="less">

.edit_view a {
    color: #333;
}
.edit_view img {
    height: 46px;
    width: 46px;
    border-radius: 50%;
}
.uploadfile {
    position: relative;
    overflow: hidden;
    .uploadimg {
        opacity: 0;
        position: absolute;
    }
}
</style>