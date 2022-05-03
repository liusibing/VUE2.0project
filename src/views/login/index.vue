<template>
  <!-- ref相当于id 
     :model用于绑定script中的form数据  也是用来双向数据绑定  -->
  <div class="login-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">Login</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/login.js";
import memoryUtils from "@/utils/memoryUtils.js";
import storageUtils from "@/utils/storageUtils.js";
export default {
  data() {
    // 设定username的规则
    var validateUsername = (rule, value, callback) => {
      value = value.trim();
      const length = value && value.length;
      const pwdReg = /^[a-zA-Z0-9_]+$/;
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (length < 4 || length > 12) {
        callback(new Error("长度应在4-12位间"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("账号必须由英文数字下划线组成"));
      } else {
        callback();
      }
    };

    return {
      form: {
        username: "",
        password: "",
      },
      // 为表单添加规则 --- 即增加：rules属性  每一个表单内容的prop相当于id  根据添加的prop属性设置对应的规则
      rules: {
        username: [
          {
            required: true,
            validator: validateUsername,  //validator是username的规则，validateUsername是具体的方法
            trigger: ["blur", "change"],  //trigger触发情况 
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      //调用这个表单的所有validate 即规则，之后在执行箭头函数内的信息
      this.$refs[formName].validate(async (valid) => {

        // 如果规则全部通过就执行
        if (valid) {
          // console.log(this.form.username,this.form.password);

          /* async  await  成对出现，只在异步函数中有作用，
             await作用会暂停当前async function的执行 等待promise处理完成，
             若promise正常处理，其回调的resolve函数参数作为await表达式的值，继续执行async function

             即在这块的用处是 当获得用户的账号密码时，await会暂停在当前获取信息的位置，如果用户成功获取，就会往下执行其他语句
          */
         //发送axios请求  此时调用的是login.js中的axios请求 返回用户的名称和密码
          let result = await login(this.form.username, this.form.password);
          result = result.data;
          if (result.status === 0) {
            /* this.$message默认的信息提示 */
            // this.$message({
            //   message:"登陆成功",
            //   type:"success"
            // });

            //将创建的用户保存到内存、本地浏览器中
            const user = result.data;
            storageUtils.saveUser(user);
            memoryUtils.user = user;
            /* this.$router获取当前路由 */
            this.$router.replace("/");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #383b3f;
}
.login-title {
  text-align: center;
  color: #111111;
}
</style>