<template>
  <div class="login">
    <!-- 返回按钮 -->
    <van-icon
      name="arrow-left"
      size="20"
      color="#999"
      @click="goHome"
    />
    <h2>短信登录</h2>
    <van-form
      ref="form"
      :show-error="false"
    >
      <van-field
        v-model="params.mobile"
        placeholder="请输入手机号"
        :rules="[
          {
            required: true,
            message: '手机号格式错误',
            pattern: /^1[3-9][0-9]{9}$/,
            trigger: 'onBlur',
          }
        ]"
      />
      <van-field
        v-model="params.code"
        placeholder="请输入验证码"
        :rules="[
          {
            required: true,
            message: '验证码格式错误',
            pattern: /^[0-9]{6}$/,
            trigger: 'onBlur',
          }
        ]"
      >
        <template #button>
          <span class="send-code">发送验证码</span>
        </template>
      </van-field>
      <van-button
        @click="onLogin"
        class="login-btn"
        color="linear-gradient(to bottom right, #fe4f4d, #fc652c)"
      >
        登 录
      </van-button>
    </van-form>
  </div>
</template>

<script>
import * as userApi from '@/api/user.js';
import { Toast } from 'vant';
export default {
  data() {
    return {
      params: {
        mobile: '13012341235',
        code: '246810',
      },
    };
  },
  methods: {
    goHome() {
      // 回到首页
      // 路由: 编程式导航
      this.$router.push('/');
    },
    onLogin() {
      // 登录
      // 表单验证成功后开始发请求
      this.$refs.form.validate().then(() => {
        // 发请求
        userApi.login(this.params)
          .then(res => {
          // 本地存储
            localStorage.setItem('token', res.data.data.token);
            // 提示成功
            Toast.success(res.data.message);
            // 返回上一页面
            this.$router.go(-1);
            // this.$router.push('/my');
          })
          .catch(() => {
          // 提示失败
            Toast.fail('登录失败');
            // console.log('err');
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.van-cell {
  padding: 16px 16px;
}
.login {
  padding: 16px;

  h2 {
    font-weight: normal;
    margin: 32px 0;
    font-size: 20px;
    text-indent: 16px;
  }

  .send-code {
    color: @text-gray;
  }

  .login-btn {
    width: calc(100% - 32px);
    margin: 32px 16px;
    color: #fff;
  }
}
</style>
