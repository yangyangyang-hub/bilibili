<template>
    <div @click="pathPush">
      <div class="detailItem">
        <div class="imgparent">
            <img src="../assets/bgc.jpg" alt="" style="width:100%">
            <div class="bottom">
                <div class="icon-play2"><span class="video">123</span></div>
                <div class="icon-file-text"><span>{{!detailitem.commentlen ? 66: detailitem.commentlen}}</span></div>  
            </div>
        </div>
        <p>{{detailitem.name}}</p>
      </div>
    </div>
</template>

<script>
export default {
    props: ['detailitem'],
    methods: {
        pathPush() {
            if(this.$route.path != `/article/${this.detailitem.id}`) {
                this.$router.push(`/article/${this.detailitem.id}`)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.detailItem{
    p{
        font-size: 3.333vw;
    }
}
.imgparent{
    position: relative;
    .bottom {
        padding: 0 2.778vw;
        margin-bottom: 1.389vw;
        position: absolute;
        bottom: 0.556vw;
        display: flex;
        background: linear-gradient(0deg, rgba(0,0,0, .85), transparent);
        justify-content: space-between;
        color: white;
        display: flex;
        left: 0;
        right: 0;
}

}
</style>