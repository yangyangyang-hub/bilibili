<template>
  <div class="comment">
    <p class="comment-title">
        <span>评论</span>
        <span>{{dataLength}}</span>
    </p>
    <div class="commentMyinfo">
        <img :src="a" alt="" v-if="myuser">
        <img src="../../assets/default_img.jpg" alt="" v-else>
        <input type="text" placeholder="说点什么吧" v-model="comcontent">
        <button @focus="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['dataLength'],
    data() {
        return {
            myuser:null,
            a: '',
            comcontent: ''
        }
    },
    methods: {
        async myUserinfo() {
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            this.myuser = res.data[0]
            this.a = this.myuser.user_img
        },
        commentPublish() {
            if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
                this.$msg.fail('请先登录')
                return
            }
            this.$emit('postcomment', this.comcontent)
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            // 评论
            this.myUserinfo()
        }

    }
}
</script>

<style lang="less">

.comment {
    padding: 8.333vw 2.778vw 0 2.778vw;
    background-color: #fff;
    .comment-title {
        span:nth-child(2) {
            color: #aaa;
            margin-left: 2.778vw;
        }
    }
    .commentMyinfo {
        background-color: white;
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