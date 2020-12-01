<template>
    <div @click="bannerClick">
      <div  class="edit_banner">
          <span>{{left}}</span>
          <span>
              <slot name="right"></slot>
          </span>
      </div>
    </div>
</template>

<script>
export default {
    props: ['left'],
    methods: {
        bannerClick() {
            this.$emit('bannerClick')
        }
    }
}
</script>
    
<style>

.edit_banner {
    background-color: white;
    padding: 4.167vw;
    color: #333;
    font-size: 3.889vw;
    border-bottom: 0.278vw solid #fafafa;
    align-items: center;
    display: flex;
    justify-content: space-between;
}
</style>