<template>
  <div>
    <div>
      <el-button
        class="btn_box"
        type="primary"
        style="margin: 20px"
        @click="handleAdd"
        >添加学校</el-button
      >
    </div>
    <!-- 列表 -->
    <el-table :data="schools" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="schoolname" label="学校名称"> </el-table-column>
      <el-table-column label="操作">
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

    <!-- 添加/编辑学校 -->
    <el-dialog title="编辑学校" :visible.sync="schoolFormVisible" width="500px">
      <el-form
        status-icon
        ref="schoolForm"
        label-width="100px"
        label-position="right"
        :model="school"
        style="width: 400px"
        :rules="rules"
      >
        <!-- prop是表单校验的作用 -->
        <el-form-item label="学校名称" prop="schoolname">
          <el-input v-model="school.schoolname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schoolFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            school._id === null
              ? addDate('schoolForm')
              : updateData('schoolForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import schoolApi from "@/api/school.js";
export default {
  data() {
    return {
      schools: [],
      currentPage: 1,
      size: 5,
      total: 0,
      schoolFormVisible: false,
      school: {
        _id: null,
        schoolname: "",
      },
      rules: {
        schoolname: [
          {
            required: true,
            message: "学校名称必须输入",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  components: {},

  mounted() {
    this.fetchSchools();
  },
  methods: {
    handleEdit(id) {
      // alert(id);
      this.handleAdd();
      schoolApi.getById(id).then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.school = res.data;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
         schoolApi.deleteById(id).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   message: "删除学校信息成功",
              //   type: "success",
              // });
              this.fetchSchools();
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchSchools();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchSchools();
    },
    fetchSchools() {
      schoolApi.getSchoolList(this.currentPage, this.size).then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.schools = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handleAdd() {
      this.schoolFormVisible = true;
      this.$nextTick(() => {
        this.$refs["schoolForm"].resetFields();
      });
    },
    addDate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          schoolApi.add(this.school).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   message: "添加学校成功",
              //   type: "success",
              // });
              this.fetchSchools();
              this.schoolFormVisible = false;
            } 
            // else if (res.status === 1) {
              // this.$message({
              //   message: "此学校已经存在",
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
          schoolApi.update(this.school).then(response=>{
            const res = response.data
            if(res.status === 0){
              // this.$message({
              //       message:'更新学校成功',
              //       type:'success'
              //   })
              this.fetchSchools();
              this.schoolFormVisible = false;
             this.school._id = null 
            }
          })
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