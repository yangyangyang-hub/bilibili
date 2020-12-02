<template>
  <div class="comment">
    <p class="comment-title">
        <span>评论</span>
        <span>(4070)</span>
    </p>
    <div class="commentMyinfo">
        <img :src="a" alt="" v-if="a">
        <img src="../../assets/default_img.jpg" alt="" v-if="!a">
        <input type="text" placeholder="说点什么吧" >
        <button @focus="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {

    data() {
        return {
            myuser:null,
            a: ''
        }
    },
    methods: {
        async myUserinfo() {
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            console.log(res);
            this.myuser = res.data[0]
            this.a = this.myuser.user_img
        },
        commentPublish() {
            if(!this.myuser && !localStorage.getItem('token') && localStorage.getItem('id')){
                this.$msg.file('请先登录')
                return
            }
            
        }
    },
    created() {
        // 评论
        this.myUserinfo()
    }
}
</script>

<style lang="less">

.comment {
    padding: 8.333vw 2.778vw;
    .comment-title {
        span:nth-child(2) {
            color: #aaa;
            margin-left: 2.778vw;
        }
    }
    .commentMyinfo {
        padding: 2.778vw 0;
        display: flex;
        img{
            height: 7.944vw;
            width: 7.944vw;
            border-radius: 50%;
        }
        input {
            outline: none;
            border: 0;
            background-color: #f4f4f4;
            border-radius: 3.611vw;
            font-size: 3.333vw;
            padding: 0 5.556vw 0 4.167vw;
            margin-left: 2.778vw;
        }
        button {
            outline: none;
            border: 0;
            border-radius: 3.333vw;
            background: #fb7299;
            color: white;
            font-size: 3.333vw;
            padding: 0 4.167vw;
        }
    }
}
</style>