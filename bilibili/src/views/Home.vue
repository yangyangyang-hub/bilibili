<template>
  <div class="home">
    <nav-bar></nav-bar>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item, index) in category" :key="index" :title="item.title">
        <van-list
        :immediate-check="false"
        v-model="item.loading"
        :finished="item.finished"
        finished-text="我也是有底线的"
        @load="onLoad"
        >
        <div class="detailparent">
          <detail 
          class="detailitem"
          v-for="(categoryitem, categoryindex) in item.list" 
          :key="categoryindex"
          :detailitem="categoryitem">
          </detail>
        </div>

        </van-list>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import Detail from './Detail.vue'
import NavBar from '../components/common/Navbar.vue'

export default {
  data() {
    return {
      category: [],
      active: 0
    }
  },
  components: {
    NavBar,
    Detail
  },
  methods: {
    async selectCategory() {
      const res = await this.$http.get('/category')
      this.changeCategory(res.data)
     
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = []
        item.page = 0
        item.finished = false
        item.loading = false
        item.pagesize = 10
        return item
      })
       this.category = category1
       this.selectArticle()
    },
    // 获取数据
    async selectArticle() {
      const categoryitem = this.categoryItem()
      const res = await this.$http.get('/detail/' + categoryitem._id, {
        params: {
          page:categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      })
      categoryitem.list.push(...res.data)
      categoryitem.loading = false
      if(res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true
      }
    },
    categoryItem() {
      const categoryitem = this.category[this.active]
      return categoryitem
    },
    onLoad() {
      const categoryitem = this.categoryItem()
      
      setTimeout(() => {
        categoryitem.page += 1
        this.selectArticle()
      }, 1000)
     
    }
  },
  watch: {
    active() {
      this.selectArticle()
    }
  },
  created() {
    this.selectCategory()
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: white;
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