<template>
  <div class="commentParent">
    <div v-for="(item , index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt="" />
          <img v-else src="../../assets/default_img.jpg" alt="">
        </div>
        <div class="commentContent">
          <p>
            <span v-if ="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else> 暂未编辑</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
              {{item.comment_content}}
          </div>
        </div>
      </div>
      <div style="padding-left:8.333vw">
      <comment-item :commentChild="item.child"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>

import commentItem from './commentItem.vue'

export default {
    data() {
        return{
            commentList: null
        }
    },
  components: {
        commentItem
    },
  methods: {
    async commentDate() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commentList = this.changeCommentDate(res.data)
      console.log(this.commentList);
    },
    changeCommentDate(data) {
        function fn(temp) {
            let arr1 = []
            for(var i = 0; i < data.length; i++ ) {
                if (data[i].parent_id == temp) {
                    arr1.push(data[i])
                    data[i].child = fn(data[i].comment_id)
                }
            }
            return arr1
        }
        return fn(null)
    }
  },
  created() {
    this.commentDate();
  },
};
</script>

<style lang="less">
.commentParent {
    padding: 2.778vw 2.778vw;
    >div {
        border-bottom: 0.278vw solid #e7e7e7;
    }
    .commentItem {
        display: flex;
        padding: 2.778vw 0;
        .userImg {
            margin-right: 2.778vw;
            img {
                width: 9.722vw;
                height: 9.722vw;
            }
        }
        .commentContent {
            flex: 1;
            p {
                font-size: 3.61vw;
                color: #555;
                display: flex;
                justify-content: space-between;
                margin-bottom: 1.389vw;
            }
            div {
                font-size: 3.611vw;
            }
        }
    }
}
</style>