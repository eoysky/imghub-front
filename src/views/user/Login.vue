<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :active-key="customActiveKey"
        :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <!-- 用户名 -->
        <a-tab-pane key="tab1" tab="用户名/邮箱登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            show-icon
            style="margin-bottom: 24px;"
            message="账号或密码错误"
          />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="用户名或邮箱"
              v-decorator="[
                'userName',
                {
                  rules: [
                    { required: true, message: '请输入帐户名或邮箱地址' },
                    { validator: handleUserNameOrEmail }
                  ],
                  validateTrigger: 'change'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              size="large"
              placeholder="密码"
              v-decorator="[
                'passwd',
                {
                  rules: [{ required: true, message: '请输入密码' }],
                  validateTrigger: 'blur'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
        <!-- 手机号 -->
        <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-decorator="[
                'phone',
                {
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '请输入正确的手机号'
                    }
                  ],
                  validateTrigger: 'change'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>
          <!-- 验证码 -->
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="验证码"
                  v-decorator="[
                    'captcha',
                    {
                      rules: [{ required: true, message: '请输入验证码' }],
                      validateTrigger: 'blur'
                    }
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    :style="{ color: 'rgba(0,0,0,.25)' }"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="
                  (!state.smsSendBtn && '获取验证码') || state.time + ' s'
                "
              />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
      <!-- 忘记密码 -->
      <a-form-item>
        <a-checkbox
          v-decorator="['rememberMe', { valuePropName: 'checked' }]"
        >
          自动登录
        </a-checkbox>
        <router-link
          :to="{ name: 'login', params: { user: 'userid' } }"
          class="forge-passwd"
          style="float: right;"
        >
          忘记密码
        </router-link>
      </a-form-item>
      <!-- 确定 -->
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >
          确定
        </a-button>
      </a-form-item>
      <!-- 微信扫码登陆  -->
      <div class="user-login-other">
        <span>微信扫码登陆</span>
        <a>
          <a-icon class="item-icon" type="wechat" />
        </a>
        <router-link
          class="register"
          :to="{ name: 'register' }"
        >
          注册账户
        </router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";
import { getSmsCaptcha } from "@/api/auth/login";

export default {
  name: "Login",
  data() {
    return {
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 userName, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 userName, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  methods: {
    ...mapActions(["Login", "Logout"]),
    // handler
    handleUserNameOrEmail(rule, value, callback) {
      const { state } = this;
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      callback();
    },
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this;

      state.loginBtn = true;

      const validateFieldsKey =
        customActiveKey === "tab1"
          ? ["userName", "passwd"]
          : ["phone", "captcha"];

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log("login form", values);
          const loginParams = { ...values };
          delete loginParams.userName;
          loginParams[!state.loginType ? "email" : "userName"] =
            values.userName;
          loginParams.passwd = values.passwd; // md5(values.passwd)
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },
    getCaptcha(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state
      } = this;

      validateFields(["phone"], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true;

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60;
              state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);

          const hide = this.$message.loading("验证码发送中..", 0);
          getSmsCaptcha({ phone: values.phone })
            .then(res => {
              setTimeout(hide, 2500);
              this.$notification.success({
                message: "提示",
                description:
                  "验证码获取成功，您的验证码为：" + res.result.captcha,
                duration: 8
              });
            })
            .catch(err => {
              setTimeout(hide, 1);
              clearInterval(interval);
              state.time = 60;
              state.smsSendBtn = false;
              this.requestFailed(err);
            });
        }
      });
    },
    stepCaptchaSuccess() {
      this.loginSuccess();
    },
    stepCaptchaCancel() {
      this.Logout().then(() => {
        this.loginBtn = false;
        this.stepCaptchaVisible = false;
      });
    },
    loginSuccess(res) {
      console.log(res);
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      this.$router.push({ path: "/" });
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: "欢迎",
          description: "登陆成功！"
        });
      }, 1000);
      this.isLoginError = false;
    },
    requestFailed(err) {
      this.isLoginError = true;
      this.$notification.error({
        message: "错误",
        description:
          ((err.response || {}).data || {}).message ||
          "请求出现错误，请稍后再试",
        duration: 4
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-form {
   width:340px;
  padding: 20px 15px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  margin-top:10px;
}
.ant-input {
  background-color: rgba(255, 255, 255, 0.85);
  border: 0px;
}

.container .top[data-v-21bb1854] {
  padding-right: 18px;
}

.container .top .desc[data-v-21bb1854] {
  font-size: 16px;
  color: rgba(255,255,255, 0.8);
}

.container .top .header .title[data-v-21bb1854] {
  font-size: 36px;
  color: rgba(24,144,255, 0.85);
}

.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-passwd {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
