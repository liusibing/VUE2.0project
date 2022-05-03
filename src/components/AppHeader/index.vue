<template>
  <div class="header">
    <!-- 头部logo -->
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="25px" />
      <span class="company">学员管理系统</span>
    </a>

    <!-- 头部下拉菜单 --- 修改密码/退出登录 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 日期与天气 -->
    <span class="date-weather">
      <span class="date">{{ currentTime }}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span class="weather">
        <i :class="wea_img"></i>&nbsp;{{ wea }}&nbsp;{{ tem_day }}/{{
          tem_night
        }}
      </span>
    </span>

    <!-- 修改密码弹出窗口 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="userForm"
        status-icon
        :rules="rules"
        ref="userForm"
        label-width="100px"
        style="width: 400px"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="userForm.oldPass"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="userForm.pass"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userForm.checkPass"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')"
            >提交</el-button
          >
          <el-button @click="$refs['userForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reqWeather } from "@/api/jsonp.js";
import { formateDate } from "@/utils/dateUtils.js";
import memoryUtils from "@/utils/memoryUtils.js";
import storageUtils from "@/utils/storageUtils.js";
import userApi from "@/api/user.js";
export default {
  data() {
    const validateOldPass = (rule, value, callback) => {
      value = value.trim();
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        userApi.checkPwd(this.user._id, value).then((response) => {
          const res = response.data;
          if (res.status === 0) {
            callback();
          } else {
            callback(new Error(res.msg));
          }
        });
      }
    };
    const validatePass = (rule, value, callback) => {
      value = value.trim();
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.userForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      user: memoryUtils.user,
      currentTime: formateDate(Date.now()),
      tem_day: "",
      tem_night: "",
      wea: "",
      wea_img: "",
      userForm: {
        oldPass: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        oldPass: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" },
        ],
        pass: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass, trigger: ["change", "blur"] },
        ],
      },
      dialogFormVisible: false,
    };
  },
  components: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi
            .updatePwd(this.user._id, this.userForm.checkPass)
            .then((response) => {
              const res = response.data;
              // console.log(res);
              // this.$message({
              //   message: res.msg,
              //   type: res.status === 0 ? "success" : "error",
              // });
              if (res.status === 0) {
                this.handleLogOut();
                this.dialogFormVisible = false;
              }
            });
        } else {
          return false;
        }
      });
    },
    // 1、获取天气
    getWeather() {
      reqWeather("沈阳").then((response) => {
        const { tem_day, tem_night, wea, wea_img } = response;
        const weaImgs = {
          xue: "el-icon-light-rain",
          lei: "el-icon-lightning",
          shachen: "el-icon-sunrise",
          wu: "el-icon-cloudy-and-sunny",
          // bingbao:'',
          yun: "el-icon-cloudy",
          yu: "el-icon-heavy-rain",
          yin: "el-icon-partly-cloudy",
          qing: "el-icon-sunny",
        };
        // 通过对象[key名]可以得到对应的值，比如：weaImgs[wea_img];
        this.wea_img = weaImgs[wea_img];
        this.tem_day = tem_day;
        this.tem_night = tem_night;
        this.wea = wea;
      });
    },

    //2、每隔1s获取当前时间，并更新data里的currentTime 
    getTime() {
      setInterval(() => {
        this.currentTime = formateDate(Date.now());
      }, 1000);
    },

    // 点击下拉菜单触发的事件
    handleCommand(command) {
      switch (command) {
        case "a":
          //修改密码
          this.handlePwd();
          break;
        case "b":
          //退出
          // alert('exit')
          this.handleLogOut();
          break;
        default:
          break;
      }
    },
    handlePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["userForm"].resetFields();
      });
    },
    handleLogOut() {
      // 清除内存中的用户
      memoryUtils.user = {};
      // 清除浏览器的用户信息
      storageUtils.removeUser();
      // 跳转到登录页面
      this.$router.replace("/login");
    },
    
  },

  // 数据挂载之后 ---  即拿到数据和模板且数据已经挂载到模板中
  mounted() {
    this.getWeather();
    this.getTime();
  },
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0px 10px 0px 40px;
}
.company {
  position: absolute;
  color: white;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.date-weather {
  float: right;
  color: white;
  margin-right: 30px;
  font-size: 12px;
}
</style>