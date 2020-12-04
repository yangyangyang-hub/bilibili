<template>
  <div v-if="model">
    <nav-bar></nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video src="../assets/111.mp4" controls="controls"></video>
      </div>
      <div class="detailinfo_text">
        <div>
          <span>{{ model.category.title }}</span>
          <span>{{ model.name }}</span>
        </div>
        <div>
          <span>{{ model.userinfo.name }}</span>
          <span>146.4万次观看</span>
          <span>588弹幕</span>
          <span>{{ model.date }}</span>
        </div>
        <div>
          <p @click="collectionClick" :class="{activeColor:collectionActive}">
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
        <detail
          class="detailitem"
          v-for="(item, index) in commendList"
          :key="index"
          :detailitem="item"
        ></detail>
      </div>
    </div>
    <comment-title
      :dataLength="lens"
      @postcomment="postSuccess"
      ref="commentIpt"
    ></comment-title>
    <comment
      @lengthselect="(len) => (lens = len)"
      @publishClick="PostChildClick"
      ref="commentPulish"
    ></comment>
  </div>
</template>

<script>
import NavBar from "../components/common/Navbar.vue";
import Detail from "./Detail.vue";
import CommentTitle from "../components/article/commentTitle.vue";
import Comment from "../components/article/comment.vue";

export default {
  data() {
    return {
      model: null,
      commendList: null,
      a: "",
      lens: null,
      Postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null,
      },
      collectionActive: null
    };
  },
  components: {
    NavBar,
    Detail,
    CommentTitle,
    Comment,
  },
  methods: {
    async articleitemDate() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      this.a = this.model.content;
    },
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    // 输入评论
    async postSuccess(res) {
      // 处理评论的时间
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      let str = `${m}-${d}`;
      this.Postcom.comment_date = str;

      this.Postcom.comment_content = res;
      this.Postcom.article_id = this.$route.params.id;
      console.log(this.Postcom);
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.Postcom
      );
      this.$refs.commentPulish.commentDate();
      this.Postcom.parent_id = null;
      if (result.status == 200) {
        this.$msg.fail("评论发表成功");
      }
    },
    PostChildClick(id) {
      this.Postcom.parent_id = id;
      this.$refs.commentIpt.focusIpt();
    },
    // 收藏文章
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if(res.data.msg == '收藏成功') {
            this.collectionActive = true
        } else {
            this.collectionActive = false
        }
        console.log(res);
      }
    },
    // 进入页面获取是否收藏
    async collectionInit() {
        if(localStorage.getItem('token')) {
            const res = await this.$http.get( "/collection/" + localStorage.getItem("id"), {
                params:{
                    article_id:this.$route.params.id
                }
            })
            this.collectionActive = res.data.success
        }
    }

  },
  created() {
    console.log(111);
    this.articleitemDate(), this.commendData();
    this.collectionInit()
  },
  watch: {
    $route() {
      this.articleitemDate(),
        // 获取推荐视频
        this.commendData();
        // 获取是否关注
        this.collectionInit()
    },
  },
};
</script>

<style lang="less">
.detailinfo {
  background-color: white;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.detailinfo_text {
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
    span:nth-child(1) {
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
    .activeColor {
        color: #fb7299;
    }
  }
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.398vw 0;
    width: 45%;
  }
}
</style>