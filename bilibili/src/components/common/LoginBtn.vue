<template>
  <div>
      <div class="btnparent">
          <div class="loginbtn" >{{btntext}}</div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['btntext']

}
</script>

<style>
    .btnparent{
        padding: 15px 10px;
    }
    .loginbtn {
        height: 45px;
        background-color: #ff9db5;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 22.5px;
        font-size: 16px;
    }

</style>