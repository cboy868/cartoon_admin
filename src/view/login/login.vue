<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="poem">
      <img :src="poem" alt="">
    </div>

    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip"></p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
import poem from "@/assets/images/poem.jpg";
export default {
  data() {
    return {
      poem
    };
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
      });
    }
  }
};
</script>

<style>
.poem img {
  height: 700px;
  margin-left: 180px;
  margin-top: 120px;
  opacity: 0.9;
  transform: skew(-12deg) rotate(-4deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.9);
  filter: alpha(opacity=50);
  box-sizing: border-box;
  border: 10px solid transparent;
}
</style>
