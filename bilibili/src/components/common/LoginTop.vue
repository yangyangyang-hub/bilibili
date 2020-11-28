<template>
  <div>
    <div class="LoginTop">
      <div></div>
      <div>{{middletop}}</div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['middletop']
}
</script>

<style lang="less">
  .LoginTop{
    height: 50PX;
    background-color: white;
    display: flex;
    div{
      flex:1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4.44vw;
    }

  }
</style>