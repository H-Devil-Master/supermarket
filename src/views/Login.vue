<template>
  <div class="bigBox">
    <div class="box">
      <div ref="prebox" class="pre-box">
        <h1>WELCOME</h1>
        <P>痴汉购</P>
        <div class="img-box">
          <img src="./img/preview.jpg" alt="网络不佳">
        </div>
      </div>
      <div class="register-form">
        <span id="register-prompt-text">用户名或密码格式错误！</span>
        <div id="register_form">
          <div class="title-box">
            <h1>注册</h1>
          </div>
          <div class="input-box">
            <input type="text" v-model="username" placeholder="用户名" id="registered-user" name="user">
            <input type="password" v-model="password" placeholder="密码" id="registered-psw1" ref="registeredPswA"
                   name="password">
            <span id="toggleBtn01" ref="toggleBtnA" @click="toggleBtnA" class="hide"></span>

            <div class="verify">
              <input v-model="email" type="email" name="verify" class="newCode" placeholder="输入邮箱" required>
              <div class="code">
                <div class="codeText" @click="sendCode">发送验证码</div>
              </div>
            </div>

            <!--            <span id="toggleBtn02" ref="toggleBtnB" @click="toggleBtnB" class="hide"></span>-->
            <input type="text" v-model="activationCode" placeholder="邮箱验证码" name="code">
          </div>
          <div class="btn-box">
            <button id="loginr" @click="registe">注册</button>
            <p id="login" @click="login">已有账号？去登录</p>
          </div>
        </div>
      </div>
      <div class="login-form">
        <span id="login-prompt-text">用户名或密码错误！</span>
        <div id="login_form">
          <div class="title-box">
            <h1>登录</h1>
          </div>
          <div class="input-box">
            <input type="text" v-model="username" id="login-user" placeholder="用户名" name="user" required>
            <input type="password" v-model="password" id="login-psw" ref="loginPsw" placeholder="密码" name="user"
                   required>
            <span id="toggleBtn" @click="toggleBtnC" ref="toggleBtn" class="hide"></span>
            <div class="verify">
              <input type="text" v-model="activationCode" name="verify" class="newCode" placeholder="请输入验证码" required
                     oninvalid="setCustomValidity('请输入正确的验证码')" oninput="setCustomValidity('');">
              <div class="code">
                <img @click="freshCode" :src="imageUrl">
              </div>
            </div>
          </div>
          <div class="btn-box">
            <button id="register" @click="userLogin">登录</button>
            <p id="enter" @click="register">没有账号？去注册</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userLogin, kaptcha, userRegister, resqustMailKaptcha} from "@/api";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      imageUrl: 'http://192.168.96.211:8080/kaptcha?q=',
      username: '',
      password: null,
      password1: null,
      email: null,
      activationCode: ''
    }
  },
  mounted() {
    // login();
    // kaptcha()
  },
  methods: {
    move2(obj, target, callback) {
      var iSpeed = 0;
      clearInterval(obj.timer);
      obj.timer = setInterval(function () {

        iSpeed += (target - obj.offsetLeft) / 5;
        iSpeed *= 0.7;

        if (Math.abs(iSpeed) < 1 && Math.abs(target - obj.offsetLeft) < 1) {
          clearInterval(obj.timer);
          callback && callback();
        } else {
          obj.style.left = obj.offsetLeft + iSpeed + 'px';
        }
      }, 30);
    },
    register() {
      this.move2(this.$refs.prebox, 523, function () {
      })
    },
    login() {
      this.move2(this.$refs.prebox, 0, function () {
      })
    },
    changeEyes(btn, psw) {
      if (psw.type === "password") {
        psw.setAttribute('type', 'text');
        btn.classList.remove('hide');
      } else {
        psw.setAttribute('type', 'password');
        btn.classList.add('hide');
      }
    },
    toggleBtnA() {
      this.changeEyes(this.$refs.toggleBtnA, this.$refs.registeredPswA)
    },
    toggleBtnB() {
      this.changeEyes(this.$refs.toggleBtnB, this.$refs.registeredPswB)
    },
    toggleBtnC() {
      this.changeEyes(this.$refs.toggleBtn, this.$refs.loginPsw)
    },
    //图片验证码
    async freshCode() {
      document.cookie = null;
      let resout = await kaptcha()
      this.imageUrl += 'e';
    },
    //注册
    async registe() {
      try {
        const {username, password, email, activationCode} = this;
        console.log({username, password, email, activationCode})
        const result = await userRegister({username, password, email, activationCode})
        console.log(result)
      } catch (err) {
        console.log(err.message)
      }
    },
    //发送邮件验证码
    async sendCode() {
      try {
        let code = this.email
        const result = await resqustMailKaptcha(code)
        console.log(result)
      } catch (err) {
        console.log(err.message)
      }
    },
    //登录
    async userLogin() {
      try {
        const {username, password, activationCode} = this;
        let result = await userLogin({username, password, activationCode});
        console.log(result)
        if (result.status==200){
          localStorage.setItem('token', result.data);
        }
      }catch (err){
        console.log(err.message)
      }
    }
  },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input {
  outline: none;
  width: 60%;
  height: 40px;
  margin-bottom: 20px;
  /*输入框中的字体离边框太近了，设置一个4px的距离*/
  text-indent: 8px;
  border: 1px solid #efdcef;
  border-radius: 4px;
}

html, .bigBox {
  height: 100%;
  width: 100%;
}

.bigBox {
  /*居中*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*设置背景颜色*/
  background: linear-gradient(to right, pink, skyblue);
}

.box {
  display: flex;
  width: 1050px;
  height: 600px;
  /*background-color: #fff;*/
  border: 1px solid black;
  /*设置圆角*/
  border-radius: 8px;
  /*设置阴影*/
  box-shadow: 4px 3px 3px rgba(0, 0, 0, .1);
  /*justify-content: space-between;*/
  position: relative;
}

.pre-box {
  position: absolute;
  width: calc(1050px / 2);
  /*设置背景颜色，遮住下面的注册盒子*/
  background-color: rgb(231, 194, 209);
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 4px;
  box-shadow: 4px 3px 3px rgba(0, 0, 0, .1);
  /*left: 520px;*/
  z-index: 99999999999999;
}

.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  letter-spacing: 5px;
  /*字体阴影*/
  text-shadow: 4px 3px 3px rgba(0, 0, 0, .1);
  color: white;
}

.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  /*字体阴影*/
  text-shadow: 4px 3px 3px rgba(0, 0, 0, .1);
  color: white;
}

.img-box {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
  box-shadow: 4px 3px 3px rgba(0, 0, 0, .1);
}

.img-box img {
  width: 100%;
}

.login-form, .register-form {
  /*占一份宽度*/
  flex: 1;
  height: 100%;
  position: relative;
}

.title-box {
  height: 250px;
  /*设置行高大于高度，把内容往下挤*/
  line-height: 300px;
}

.title-box h1 {
  text-align: center;
  /*文字左右间距为5px*/
  letter-spacing: 5px;
  text-shadow: 4px 3px 3px rgba(0, 0, 0, .1);
}

.input-box {
  display: flex;
  /*设置纵向排列*/
  flex-direction: column;
  align-items: center;
  position: relative;
}

/*设置聚焦后光标的颜色*/
input:focus {
  color: #bac4e8;
}

/*聚焦时隐藏提示信息*/
input:focus::placeholder {
  opacity: 0;
}

.btn-box {
  display: flex;
  justify-content: center;
}

button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  border: none;
  background-color: skyblue;
  color: white;
  margin: 0 7px;
}

button:hover {
  cursor: pointer;
  opacity: .8;
}

.btn-box p {
  /*与按钮对齐*/
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: white;
}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}

.code {
  width: 80px;
  height: 40px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: #ddd;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: red;
  font-weight: bold;
  margin-left: 10px;
}

.code img {
  width: 100%;
  height: 100%;
}

input {
  outline: none;
}

.verify {
  display: flex;
  justify-content: space-between;
  width: 60%;
}

.newCode {
  width: 70%;
}

#toggleBtn {
  position: absolute;
  top: 63px;
  left: 380px;
  width: 34px;
  height: 34px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

#toggleBtn01 {
  position: absolute;
  width: 34px;
  height: 34px;
  top: 63px;
  left: 380px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

#toggleBtn02 {
  position: absolute;
  width: 34px;
  height: 34px;
  top: 123px;
  left: 380px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

#toggleBtn.hide::before, #toggleBtn01.hide::before, #toggleBtn02.hide::before {
  content: "\f070";
  font-family: 'Font Awesome 5 Free';
  font-weight: 1000;
}

#toggleBtn::before, #toggleBtn01::before, #toggleBtn02::before {
  content: "\f06e";
  font-family: 'Font Awesome 5 Free';
}

#login-prompt-text {
  position: absolute;
  top: 272px;
  left: 190px;
  color: red;
  display: none;
}

#register-prompt-text {
  position: absolute;
  top: 272px;
  left: 185px;
  color: red;
  display: none;
}

.codeText {
  font-size: 13px;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
</style>