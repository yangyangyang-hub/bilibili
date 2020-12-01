<template>
  <div class="home">
    <nav-bar></nav-bar>
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in category" :key="index" :title="item.title">
        {{index}}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import NavBar from '../components/common/Navbar.vue'

export default {
  data() {
    return {
      category: [],
      active: 0
    }
  },
  components: {
    NavBar
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
        item.pagesize = 10
        return item
      })
       this.category = category1
    },
    async selectArticle() {
      const categoryitem = this.categoryItem()
      const res = await this.$http.get('/detail/' + categoryitem._id, {
        params: {
          page:categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      })
      categoryitem.list = res.data
    },
    categoryItem() {
      const categoryitem = this.category[this.active]
            console.log(222);
      return categoryitem
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
