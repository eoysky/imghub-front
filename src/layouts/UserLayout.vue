<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <!-- <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']"> -->
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/logo.png" class="logo" alt="logo">
            <span class="title">ImgHub - 用户</span>
          </a>
        </div>
        <div class="desc">
          行走在西湖边上的图床
        </div>
      </div>

      <router-view />

      <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          <span style="color:rgba(255, 255, 255, 0.85)">Copyright &copy; 2019 - 2020</span> <a href="https://lmsite.cn">EOYSKY</a> |  <a href="https://beian.miit.gov.cn/">浙ICP备18052140号-1</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  },
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      // width: 100%;
      min-height: 100%;
      background: #000000 url(~@/assets/loginbackground.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      padding: 0px 0 120px !important;
      position: relative;

      a {
        color: #1890ff !important;
        text-decoration: none;
      }

      .top {
        top: 12px;
        position: relative;
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 10px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(255, 255, 255, 0.85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(255, 255, 255, 0.85);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(255, 255, 255, 0.85);
          font-size: 14px;
        }
      }
    }
  }
</style>
