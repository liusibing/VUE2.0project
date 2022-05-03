<template>
  <div class="student-update">
    <el-button
      icon="el-icon-arrow-left"
      @click="$router.push('/student')"
      circle
    ></el-button>
    <el-form
      :model="updateStudent"
      ref="studentForm"
      label-width="100px"
      label-position="right"
      style="width: 100%; height: 100%"
      :rules="rules"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="updateStudent.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="updateStudent.gender" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in genderOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在学校" prop="school">
        <el-autocomplete
          class="inline-input"
          v-model="updateStudent.school"
          :fetch-suggestions="querySearchSchool"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="专业" prop="major">
        <el-autocomplete
          class="inline-input"
          v-model="updateStudent.major"
          :fetch-suggestions="querySearchMajor"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="年级" prop="grade">
        <el-select v-model="updateStudent.grade" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in gradeOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-select v-model="updateStudent.education" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in educationOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学习方向" prop="direction">
        <el-select v-model="updateStudent.direction" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in directionOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="身份证号" prop="id_number">
        <el-input v-model="updateStudent.id_number"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="updateStudent.phone"></el-input>
      </el-form-item>
      <el-form-item label="家长姓名" prop="parent">
        <el-input v-model="updateStudent.parent"></el-input>
      </el-form-item>
      <el-form-item label="家长电话" prop="parent_phone">
        <el-input v-model="updateStudent.parent_phone"></el-input>
      </el-form-item>
      <el-form-item label="家庭地址" prop="address">
        <el-input v-model="updateStudent.address"></el-input>
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="updateStudent.qq"></el-input>
      </el-form-item>

      <el-form-item label="所在班级" prop="class">
        <el-select v-model="updateStudent.class" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in classOptions"
            :key="index"
            :label="option.name"
            :value="option.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学时间" prop="admission_data">
        <el-date-picker
          v-model="updateStudent.admission_data"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="授课教师" prop="teacher_id">
        <el-select v-model="updateStudent.teacher_id" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in teacherOptions"
            :key="index"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="辅导员" prop="manager_id">
        <el-select v-model="updateStudent.manager_id" placeholder="请点击选择">
          <el-option
            v-for="(option, index) in managerOptions"
            :key="index"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="照片" prop="pictures">
        <el-upload
          :action="baseApi + '/manage/img/upload'"
          list-type="picture-card"
          :auto-upload="true"
          :file-list="fileList"
          name="image"
          accept="image/*"
          :on-change="handleChange"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="pictureDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="=" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="备注" prop="note"></el-form-item>
      <vue-tinymce v-model="updateStudent.note" />
      <el-form-item>
        <el-button
          type="primary"
          @click="
            updateStudent._id === null
              ? addData('studentForm')
              : updateData('studentForm')
          "
          >确定</el-button
        >
        <el-button  @click="resetForm('studentForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
import userApi from "@/api/user.js";
import classApi from "@/api/class.js";
import schoolApi from "@/api/school.js";
import majorApi from "@/api/major.js";

export default {
  data() {
    // 自定义校验规则（手机号）
    const validatePhone = (rule, value, callback) => {
      value = value.trim();
      const pwdReg =
        /^(13[0-9]|14[01456789]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    // 自定义校验规则（身份证号）
    const validateIdNumber = (rule, value, callback) => {
      value = value.trim();
      const _IDRe18 =
        /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      const _IDRe15 =
        /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
      if (_IDRe18.test(value) || _IDRe15.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的身份证号"));
      }
    };
    return {
      setting: {
        menubar: false,
        toolbar:
          "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars imagetools",
        language: "zh_CN",
        height: 350,
      },
      baseApi: process.env.VUE_APP_BASE_API,
      baseUrl: process.env.VUE_APP_SERVICE_URL,
      updateStudent: {
        _id: null,
        name: "",
        gender: "",
        school: "", //学校
        major: "", //专业
        grade: "", //年级
        education: "", //学历
        direction: "",
        id_number: "", //身份证号
        phone: "",
        parent: "", //家长姓名
        parent_phone: "", //家长电话
        address: "", //家庭地址
        qq: "", //qq
        class: "",
        admission_data: "", //入学时间
        teacher_id: "",
        manager_id: "",
        pictures: [], //照片
        note: "", //备注
      },
      // 性别列表
      genderOptions: [
        {
          type: "0",
          name: "男",
        },
        {
          type: "1",
          name: "女",
        },
      ],
      // 学校列表
      schoolOptions: [],
      // 专业列表
      majorOptions: [],
      // 年级列表
      gradeOptions: [
        { type: "1", name: "大一" },
        { type: "2", name: "大二" },
        { type: "3", name: "大三" },
        { type: "4", name: "大四" },
        { type: "5", name: "在读研究生" },
      ],
      // 学历列表
      educationOptions: [
        { type: "1", name: "专科" },
        { type: "2", name: "本科" },
        { type: "3", name: "硕士研究生" },
        { type: "4", name: "其他" },
      ],
      // 学习方向列表
      directionOptions: [
        { type: "1", name: "web前端" },
        { type: "2", name: "JAVA" },
        { type: "3", name: "UI/UE" },
        { type: "4", name: "C/C++" },
      ],
      // 班级列表
      classOptions: [],
      // 教师列表
      teacherOptions: [],
      // 导员列表
      managerOptions: [],
      //查看大图的地址
      dialogImageUrl: "",
      //查看大图是否显示
      pictureDialogVisible: false,
      // 所有已经上传图片的数组
      fileList: [
        /* 
        {
          uid: 
          url: 
          name: 
          status: success fail
        }
        */
      ],
      // 代表查看大图 删除
      disabled: false,
      userAll: [],
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        direction: [
          { required: true, message: "请选择学习方向", trigger: "blur" },
        ],
        id_number: [
          { validator: validateIdNumber, trigger: ["blur", "change"] },
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: ["blur", "change"],
          },
        ],
        class: [{ required: true, message: "请选择所在班级", trigger: "blur" }],
        teacher_id: [
          { required: true, message: "请选择授课教师", trigger: "blur" },
        ],
        manager_id: [
          { required: true, message: "请选择辅导员", trigger: "blur" },
        ],
      },
    };
  },

  components: {},
  mounted() {
    this.getUserList();
    this.getClassList();
    this.getShoolList();
    this.getMajorList();
    this.getStudent();
  },

  methods: {
    resetForm(formName){
      this.$refs[formName].resetFields();
      this.fileList=[];
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.updateStudent);
          this.updateStudent.pictures = this.getImgs();
          studentApi.add(this.updateStudent).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   type: "success",
              //   message: "创建学员信息成功",
              // });
              this.$router.replace("/student");
            }
          });
        } else {
          console.log("表单验证不通过");
          return false;
        }
      });
    },
    updateData(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
          // console.log(this.updateStudent);
          this.updateStudent.pictures = this.getImgs();
          studentApi.update(this.updateStudent).then(response=>{
            const res = response.data;
            if(res.status === 0){
              // this.$message({
              //   message:'修改学员信息成功',
              //   type:'success'
              // })
              // replace跳转不会记录路径  push跳转会记录路径
              this.$router.replace('/student')
            }
          })
        }else{
          return false;
        }
      })
    },
    querySearchSchool(queryString, cb) {
      var schoolOptions = this.schoolOptions;
      var results = queryString
        ? schoolOptions.filter(this.createFilter(queryString))
        : schoolOptions;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.indexOf(queryString) === 0;
      };
    },
    querySearchMajor(queryString, cb) {
      var majorOptions = this.majorOptions;
      var results = queryString
        ? majorOptions.filter(this.createFilter(queryString))
        : majorOptions;
      cb(results);
    },
    // 查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.pictureDialogVisible = true;
    },
    handleDownload(file) {
      // console.log(this.fileList);
    },
    /* 文件状态改变时的钩子,添加 上传成功 上传失败都会被调用
      file:当前上传的文件
      fileList:所有已经上传的文件
    */
    handleChange(file, fileList) {
      if (file.status === "success") {
        const result = file.response;
        if (result.status === 0) {
          const { name, url } = result.data;
          file = fileList[fileList.length - 1];
          file.name = name;
          file.url = url;
        }
      }
      this.fileList = fileList;
    },
    // 删除图片
    handleRemove(file, fileList) {
      studentApi.reqDeleteImg(file.name).then((response) => {
        const resp = response.data;
        if (resp.status === 0) {
          this.fileList.splice(this.fileList.indexOf(file.name));
        }
      });
    },
    // 获取有用户列表
    getUserList() {
      userApi.getUserAll().then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.userAll = res.data;
          this.userAll.map((item) => {
            if (
              //导员
              item.role_id === "61db9efd697b65ac0d7606f0"
            ) {
              this.managerOptions.push(item);
            } else if (
              //老师
              item.role_id === "61de8bd227b63ce37598f7f0"
            ) {
              this.teacherOptions.push(item);
            }
          });
        }
      });
    },
    // 获取班级列表
    getClassList() {
      classApi.getClassAll().then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.classOptions = res.data;
        }
      });
    },
    // 获取学校列表
    getShoolList() {
      schoolApi.getSchoolAll().then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.schoolOptions = res.data;
          const arr = res.data;
          for (let i = 0; i < arr.length; i++) {
            this.schoolOptions[i].value = arr[i].schoolname;
            this.schoolOptions[i]._id = arr[i]._id;
          }
        }
      });
    },

    // 获取专业列表
    getMajorList() {
      majorApi.getMajorAll().then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.majorOptions = res.data;
          const arr = res.data;
          for (let i = 0; i < arr.length; i++) {
            this.majorOptions[i].value = arr[i].name;
            this.majorOptions[i]._id = arr[i]._id;
          }
        }
      });
    },
    getImgs() {
      return this.fileList.map((item) => item.name);
    },
    getStudent() {
      const { _id } = this.$route.params;
      if (_id !== "-1") {
        // alert(_id)
        studentApi.getById(_id).then((response) => {
          const res = response.data;
          if (res.status === 0) {
            this.updateStudent = res.data;
            const { pictures } = res.data;
            // console.log(pictures);
            this.fileList = pictures.map((img, index) => ({
              //返回的是对象
              uid: -index,
              name: img,
              status: "success",
              // url: 'http://localhost:3000' + "/upload/" + img,
              url: this.baseUrl + "/upload/" + img,
            }));
            // console.log(this.fileList);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.studnet-update {
  padding: 20px;
}
.el-form {
  margin-top: 20px;
}
.el-input {
  width: 30%;
}
</style>