<template>
  <a-layout class="container">
    <a-layout-header>
      <img src="~@/assets/logo.png" class="indexLogo"><img>
      <span class="titleFirst">ImgHub - </span>
      <span class="titleSecond">行走在西湖边上的图床</span>
      <a-button size="large" type="primary" class="buttonHeaderRight">登陆</a-button>
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <a-layout-footer>
      <div class="copyright">
        <span style="color:rgba(255, 255, 255, 0.85)">Copyright &copy; 2019 - 2020</span> <a href="https://lmsite.cn">EOYSKY</a> |  <a href="https://beian.miit.gov.cn/">浙ICP备18052140号-1</a>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script>

export default {
  name: 'HomeLayout',
  mounted () {
    document.body.classList.add('homeLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('homeLayout')
  },
}
</script>

<style lang="less">
  @import "./HomeLayout.less";
</style>
