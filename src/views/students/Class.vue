<template>
  <div>
    <!-- 行内表单 查询 -->
    <el-form
      :inline="true"
      ref="searchForm"
      :model="search"
      style="margin-top: 20px"
    >
      <el-form-item prop="teacher">
        <el-input
          v-model="search.teacher"
          placeholder="根据教师查询"
          style="width: 200px"
        ></el-input>
      </el-form-item>

      <el-form-item prop="manager">
        <el-input
          v-model="search.manager"
          placeholder="根据辅导员查询"
          style="width: 200px"
        ></el-input>
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

    <!-- 列表 -->
    <el-table :data="classs" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="班级名称"> </el-table-column>
      <el-table-column
        prop="teacher_id"
        label="授课教师"
        :formatter="formatTeacher"
      >
      </el-table-column>
      <el-table-column
        prop="manager_id"
        label="辅导员"
        :formatter="formatManager"
      >
      </el-table-column>
      <el-table-column prop="stage" label="授课阶段"> </el-table-column>
      <el-table-column label="操作" width="250px">
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

    <!-- 新增班级 -->
    <el-dialog title="编辑班级" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        status-icon
        ref="classForm"
        label-width="100px"
        label-position="right"
        :model="updateClass"
        style="width: 400px"
        :rules="rules"
      >
        <!-- prop是表单校验的作用 -->
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="updateClass.name"></el-input>
        </el-form-item>

        <el-form-item label="授课教师" prop="teacher_id">
          <el-select
            v-model="updateClass.teacher_id"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="option in teacherOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="辅导员" prop="manager_id">
          <el-select
            v-model="updateClass.manager_id"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="option in managerOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="授课阶段" prop="stage">
          <el-input v-model="updateClass.stage" placeholder="请填写授课阶段">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="classFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            updateClass._id === null
              ? addDate('classForm')
              : updateData('classForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import classApi from "@/api/class.js";
import userApi from "@/api/user.js";
export default {
  data() {
    return {
      classs: [],
      currentPage: 1,
      size: 5,
      total: 0,
      //   收集行内表单数据
      search: {
        teacher: "",
        manager: "",
      },
      //  查询条件对象
      searchMap: {
        teacher_id: "",
        manager_id: "",
      },
      userAll: [],
      teacherOptions: [],
      managerOptions: [],
      dialogFormVisible: false,
      updateClass: {
        _id: null,
        name: "",
        teacher_id: "",
        manager_id: "",
        stage: "",
      },
      rules: {
        name: [
          { required: true, message: "班级名称必须填写", trigger: "blur" },
        ],
        teacher_id: [
          { required: true, message: "请选择教师", trigger: "blur" },
        ],
        manager_id: [
          { required: true, message: "请选择辅导员", trigger: "blur" },
        ],
      },
    };
  },
  components: {},

  mounted() {
    this.fetchClass();
    this.getUserList();
  },
  methods: {
    handleEdit(id) {
      this.handleAdd();

      classApi.getById(id).then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.updateClass = res.data;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("确定删除这条信息吗","提示",{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
      }).then(()=>{
        classApi.deleteById(id).then((response)=>{
          const res = response.data;
          if(res.status === 0){
            // this.$message({
            //   type:'success',
            //   message:'删除班级成功',
            // })
            this.size = 5;
            this.currentPage =1;
            this.fetchClass();

          }
        })
      }).catch(error=>{

      })
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchClass();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchClass();
    },
    fetchClass() {
      classApi
        .getClassList(this.currentPage, this.size, this.searchMap)
        .then((response) => {
          const res = response.data;
          if (res.status === 0) {
            this.classs = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    searchData() {
      this.currentPage = 1;

      const resTeacher =
        this.userAll.find((item) => item.name === this.search.teacher) || {};
      const resManager =
        this.userAll.find((item) => item.name === this.search.manager) || {};
      this.searchMap.teacher_id = resTeacher._id || "";
      this.searchMap.manager_id = resManager._id || "";

      this.fetchClass();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getUserList() {
      userApi.getUserAll().then((response) => {
        const res = response.data;
        console.log(res.data);
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
    // 获取这一行
    formatTeacher(row, column, cellValue, index) {
      const teacher = this.userAll.find((item) => item._id === cellValue) || {};
      return teacher.name;
    },
    formatManager(row, column, cellValue, index) {
      const manager = this.userAll.find((item) => item._id === cellValue) || {};
      return manager.name;
    },
    handleAdd() {
      this.updateClass = {
        _id: null,
        name: "",
        teacher_id: "",
        manager_id: "",
        stage: "",
      };
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["classForm"].resetFields();
      });
    },
    addDate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          classApi.add(this.updateClass).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   message: "添加班级成功",
              //   type: "success",
              // });
              this.fetchClass();
              this.dialogFormVisible = false;
            }
            // else {
              // this.$message({
              //   message: res.msg,
              //   type: "warning",
              // });
            // }
          });
        } else {
          return false;
        }
      });
    },
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          classApi.update(this.updateClass).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   message: "更新班级成功",
              //   type: "success",
              // });
              this.fetchClass();
              this.dialogFormVisible = false;
              this.updateClass = {
                _id: null,
                name: "",
                teacher_id: "",
                manager_id: "",
                stage: "",
              };
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>