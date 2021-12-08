<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon
        slot="left"
        name="cross"
        @click="$router.back()"
      >
      </van-icon>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          >
          </van-count-down>
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            round
            type="default"
            @click="onSendSms"
            native-type="button"
          >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },{
          pattern: /1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          mssage: '验证码不能为空'
        },{
          pattern: /\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;

      this.$toast.loading({
        message: "登录中",
        forbidClick: true, // 禁用背景点击
        duration: 0,
      });
      try {
        const { data } = await login(user);
        console.log("登录成功", res);
        this.$store.commit('setUser',data.data)
        this.$toast.success("登录成功");

        this.$router.back()
      } catch (err) {
        // if(err.response.status === 400){
        //  this.$toast.fail('手机号或验证码错误')
        // }else{
        this.$toast.fail("登录失败，请稍后重试");
        // }
      }
    },
    async onSendSms(){
      try {
        const res = await this.$refs.loginForm.validate('mobile')
        console.log('验证成功',res)
      } catch(err) {
        console.log('验证失败',err)
      }
      this.isCountDownShow = true

      try{
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      }catch(err){
        this.isCountDownShow = false
        if(err.response.status === 429){
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 20px;
  }
  .send-sms-btn {
    width: 86px;
    height: 28px;
    line-height: 28px;
    background-color: #ededed;
    font-size: 11px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
