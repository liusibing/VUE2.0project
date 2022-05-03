<template>
  <div>
    <!-- 条件查询 -->
    <el-form
      :inline="true"
      :model="search"
      ref="searchForm"
      style="margin-top: 20px"
    >
      <el-form-item prop="name">
        <el-input
          v-model="search.name"
          placeholder="根据学生姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item prop="teacher">
        <el-input
          v-model="search.teacher"
          placeholder="根据教师姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item prop="manager">
        <el-input v-model="search.manager" placeholder="辅导员"></el-input>
      </el-form-item>

      <el-form-item prop="direction">
        <el-select
          v-model="search.direction"
          placeholder="根据学习方向查询"
          style="width: 180px"
        >
          <el-option
            v-for="(option, index) in directionOptions"
            :key="index"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="class">
        <el-select
          v-model="search.class"
          placeholder="根据班级查询"
          style="width: 150px"
        >
          <el-option
            v-for="(option, index) in classOptions"
            :key="index"
            :label="option.name"
            :value="option.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchData"
          >查询</el-button
        >
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd"
          >新增</el-button
        >
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 学员管理列表 -->
    <el-table :data="students" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            class="student-table-expand"
            style="padding-left: 60px"
          >
            <el-form-item label="学生名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender | dataFilter(genderOptions) }}</span>
            </el-form-item>
            <el-form-item label="所在学校">
              <span>{{ props.row.school }}</span>
            </el-form-item>
            <el-form-item label="专业">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="年级">
              <span>{{ props.row.grade | dataFilter(gradeOptions) }}</span>
            </el-form-item>
            <el-form-item label="学历">
              <span>{{
                props.row.education | dataFilter(educationOptions)
              }}</span>
            </el-form-item>
            <el-form-item label="学习方向">
              <span>{{
                props.row.direction | dataFilter(directionOptions)
              }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.id_number }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="家长姓名">
              <span>{{ props.row.parent }}</span>
            </el-form-item>
            <el-form-item label="家长电话">
              <span>{{ props.row.parent_phone }}</span>
            </el-form-item>
            <el-form-item label="家庭地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="qq">
              <span>{{ props.row.qq }}</span>
            </el-form-item>
            <el-form-item label="所在班级">
              <span>{{ props.row.class }}</span>
            </el-form-item>
            <el-form-item label="入学时间">
              <span>{{ props.row.admission_data }}</span>
            </el-form-item>
            <el-form-item label="授课教师">
              <span>{{
                props.row.teacher_id | teacherOrManagerFilter(teacherOptions)
              }}</span>
            </el-form-item>
            <el-form-item label="辅导员">
              <span>{{
                props.row.manager_id | teacherOrManagerFilter(managerOptions)
              }}</span>
            </el-form-item>
            <el-form-item label="照片">
              <!-- <span>{{ props.row.pictures }}</span> -->
              <el-image
                v-for="(item, index) in props.row.pictures"
                :key="index"
                style="
                  width: 150px;
                  height: 150px;
                  margin-right: 10px;
                  padding: 5px;
                  border: 1px solid #ccc;
                "
                :src="baseUrl + '/upload/' + item"
                :preview-src-list="setSrcList(props.row.pictures)"
              >
              </el-image>
            </el-form-item>
            <el-form-item label="备注">
              <span v-html="props.row.note"></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="学员姓名" prop="name"> </el-table-column>
      <el-table-column label="性别" prop="gender">
        <template slot-scope="scope">
          <span>{{ scope.row.gender | dataFilter(genderOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学习方向" prop="direction">
        <template slot-scope="scope">
          <span>{{ scope.row.direction | dataFilter(directionOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" prop="phone"> </el-table-column>
      <el-table-column label="所在班级" prop="class"> </el-table-column>
      <el-table-column label="授课教师" prop="teacher_id">
        <template slot-scope="scope">
          <span>{{
            scope.row.teacher_id | teacherOrManagerFilter(teacherOptions)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="辅导员" prop="manager_id">
        <template slot-scope="scope">
          <span>{{
            scope.row.manager_id | teacherOrManagerFilter(managerOptions)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="size"
      layout="total,sizes, prev, pager, next,jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
import userApi from "@/api/user.js";
import classApi from "@/api/class.js";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_SERVICE_URL,
      currentPage: 1,
      size: 5,
      total: 0,
      students: [],
      search: {
        name: "",
        teacher: "",
        manager: "",
        direction: "",
        class: "",
      },
      searchMap: {
        name: "",
        teacher: "",
        manager: "",
        direction: "",
        class: "",
      },
      genderOptions: [
        { type: "0", name: "男" },
        { type: "1", name: "女" },
      ],
      schoolOptions: [],
      majorOptions: [],
      gradeOptions: [
        { type: "1", name: "大一" },
        { type: "2", name: "大二" },
        { type: "3", name: "大三" },
        { type: "4", name: "大四" },
        { type: "5", name: "在读研究生" },
      ],
      educationOptions: [
        { type: "1", name: "专科" },
        { type: "2", name: "本科" },
        { type: "3", name: "硕士研究生" },
        { type: "4", name: "其他" },
      ],
      directionOptions: [
        { type: "1", name: "web前端" },
        { type: "2", name: "JAVA" },
        { type: "3", name: "UI/UE" },
        { type: "4", name: "C/C++" },
      ],
      classOptions: [],
      teacherOptions: [],
      managerOptions: [],
      userAll: [],
    };
  },
  components: {},

  mounted() {
    this.fetchStudents();
    this.getUserList();
    this.getClassList();
  },
  // 过滤器  用来转换数据 --- 转换表格当中数据显示的内容
  filters: {
    // 授课教师 导员过滤器
    teacherOrManagerFilter(_id, options) {
      const obj = options.find((obj) => obj._id === _id);
      return obj ? obj.name : null;
    },

    // 性别、年龄、学历、学习方向过滤器
    dataFilter(type, options) {
      const obj = options.find((obj) => obj.type === type);
      return obj ? obj.name : null;
    },
  },
  methods: {
    handleEdit(id) {
      this.$router.push(`/student/update/${id}`);
    },
    handleAdd() {
      this.$router.push("/student/update/-1");
    },
    handleDelete(id) {
      this.$confirm("确定删除这条记录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        studentApi.deleteById(id).then((response) => {
          const res = response.data;

          // this.$message({
          //   message: res.msg,
          //   type: res.status === 0 ? "success" : "error",
          // });

          if (res.status === 0) {
            this.fetchStudents();
          }
        });
      }).catch(()=>{})
    },
    setSrcList(imgList) {
      return imgList.map((item) => this.baseUrl + "/upload/" + item);
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchStudents();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchStudents();
    },
    fetchStudents() {
      studentApi
        .getStudentList(this.currentPage, this.size, this.searchMap)
        .then((response) => {
          const res = response.data;
          if (res.status === 0) {
            // this.$message({
            //   message: "获取学生列表成功",
            //   type: "success",
            // });
            this.students = res.data.data;
            this.total = res.data.total;
          }
        });
    },
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
    getClassList() {
      classApi.getClassAll().then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.classOptions = res.data;
        }
      });
    },
    searchData() {
      console.log(this.search);
      this.currentPage = 1;
      const resTeacher =
        this.userAll.find((item) => item.name === this.search.teacher) || {};
      const resManager =
        this.userAll.find((item) => item.name === this.search.manager) || {};

      this.searchMap.teacher_id = resTeacher._id || "";
      this.searchMap.manager_id = resManager._id || "";
      this.searchMap.direction = this.search.direction || "";
      this.searchMap.name = this.search.name || "";
      this.searchMap.class = this.search.class || "";

      this.fetchStudents();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.student-table-expand {
  font-size: 0;
}
.student-table-expand label {
  width: 90px;
  color: rgb(110, 110, 106);
}
.student-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>