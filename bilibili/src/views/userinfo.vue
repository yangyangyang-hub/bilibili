<template>
  <div class="userinfo">
      <nav-bar></nav-bar>
      <img src="../assets/bannerTop_new.png" alt="" class="backimg">
      <user-detail></user-detail>
  </div>
</template>

<script>
import NavBar from '../components/common/Navbar.vue'
import userDetail from '../components/userComponent/userDetail.vue'
export default {
    components: {
        NavBar,
        userDetail
    }
}
</script>

<style lang="less">
    .userinfo {
        .backimg{
            height: 101px;
            width: 100%;
        }

    }
</style>