<template>
  <div>
    <div>
      <el-button
        class="btn_box"
        type="primary"
        style="margin: 20px"
        @click="handleAdd"
        >添加专业</el-button
      >
    </div>

    <!-- 列表 -->
    <el-table :data="majors" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="专业名称"> </el-table-column>
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

    <!-- 添加/编辑专业 -->
    <el-dialog title="编辑专业" :visible.sync="majorFormVisible" width="500px">
      <el-form
        status-icon
        ref="majorForm"
        label-width="100px"
        label-position="right"
        :model="major"
        style="width: 400px"
        :rules="rules"
      >
        <!-- prop是表单校验的作用 -->
        <el-form-item label="专业名称" prop="name">
          <el-input v-model="major.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="majorFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            major._id === null ? addDate('majorForm') : updateData('majorForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import majorApi from "@/api/major.js";
export default {
  data() {
    return {
      majors: [],
      currentPage: 1,
      size: 5,
      total: 0,
      majorFormVisible: false,
      major: {
        _id: null,
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "专业名称必须输入",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  components: {},

  mounted() {
    this.fetchMajors();
  },
  methods: {
    addDate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          majorApi.add(this.major).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   message: "添加专业成功",
              //   type: "success",
              // });
              this.fetchMajors();
              this.majorFormVisible = false;
            } 
            // else if (res.status === 1) {
              // this.$message({
              //   message: "此专业已经存在",
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
          majorApi.update(this.major).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   message: "更新专业成功",
              //   type: "success",
              // });
              this.fetchMajors();
              this.majorFormVisible = false;
              this.major._id = null;
            }
          });
        } else {
          return false;
        }
      });
    },
    handleAdd() {
      this.majorFormVisible = true;
      this.$nextTick(() => {
        this.$refs["majorForm"].resetFields();
      });
    },
    handleEdit(id) {
      this.handleAdd();
      majorApi.getById(id).then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.major = res.data;
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
          majorApi.deleteById(id).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   message: "删除专业信息成功",
              //   type: "success",
              // });
              this.fetchMajors();
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchMajors();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchMajors();
    },
    fetchMajors() {
      majorApi.getMajorList(this.currentPage, this.size).then((response) => {
        const res = response.data;
        if (res.status === 0) {
          this.majors = res.data.data;
          this.total = res.data.total;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>