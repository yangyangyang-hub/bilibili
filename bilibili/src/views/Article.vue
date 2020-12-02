<template>
  <div v-if="model">
     <nav-bar></nav-bar>
     <div class="detailinfo">
         <div class="video">
             <video :src="model.content" controls="controls"></video>
         </div>
         <div class="detailinfo_text">
             <div>
                 <span>{{model.category.title}}</span>
                 <span>{{model.name}}</span>
             </div>
             <div>
                 <span>{{model.userinfo.name}}</span>
                 <span>146.4万次观看</span>
                 <span>588弹幕</span>
                 <span>{{model.date}}</span>
             </div>
             <div>
                 <p>
                    <span class="icon-star-full"></span>
                    <span class="">收藏</span>
                </p>
                <p>
                    <span class="icon-box-add"></span>
                    <span class="">缓存</span>
                </p>
                <p>
                    <span class="icon-redo2"></span>
                    <span class="">分享</span>
                </p>
             </div>
         </div>
         <div class="detailparent">
             <detail class="detailitem" v-for="(item, index) in commendList" :key="index" :detailitem="item"></detail>
         </div>
     </div>
  </div>
</template>

<script>

import NavBar from '../components/common/Navbar.vue'
import Detail from './Detail.vue'

export default {
    data() {
        return {
            model: null,
            commendList: null,

        }
    },
    components: {
        NavBar,
        Detail,
    },
    methods: {
        async articleitemDate() {
            const res = await this.$http.get('/article/' + this.$route.params.id)
            this.model = res.data[0]
        },
        async commendData() {
            const res = await this.$http.get('/commend')
            this.commendList = res.data
        }
    },
    created() {
        this.articleitemDate(),
        this.commendData()
    },
    watch: {
        $route() {
            this.articleitemDate(),
            this.commendData()
        }
    }
}
</script>

<style lang="less">
.detailinfo {
    background-color: white;
    .video{
        width: 100%;
        video{
            width: 100%;
        }
    }      
}
.detailinfo_text{
     padding: 4.167vw;   
     div:nth-child(1) {
         span:nth-child(1) {
             padding: 0 2.778vw;
             color: #fb7299;
             background-color: #f4f4f4;
             border-radius: 2.778vw;
         }
     }
     div:nth-child(2) {
         padding: 3.778vw 2.778vw;
         span {
             color: #aaa;
             font-size: 3.333vw;
         }
         span:nth-child(1){
             color: black;
             font-size: 4vw;
             padding-right: 2.778vw;
         }
     }
      div:nth-child(3) {
          padding: 0 2.778vw;
          display: flex;
          p {
              margin-right: 4.167vw;
              display: flex;
              align-items: center;
              color: #757575;
              span:nth-child(1) {
                  font-size: 5.833vw;
                  padding-right: 0.833vw;

              }
              span:nth-child(2) {
                  font-size: 3.611vw;
              }
          }
      }
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem{
    margin: 1.398vw 0;
    width: 45%;
  }
}
</style>