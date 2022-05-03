<template>
  <div>
    <!-- 4、创建角色、设置权限 -->
    <div style="margin-top: 20px" class="btn_box">
      <el-button type="primary" @click="handleAdd()">创建角色</el-button>
      <el-button
        type="primary"
        @click="roleAuthVisible = true"
        :disabled="!currentRow ? true : false"
        >设置角色权限</el-button
      >
    </div>

    <!-- 1、渲染的角色列表 -->
    <el-table
      :data="roleList"
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      border
      height="400"
    >
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        :formatter="resetDate"
      >
      </el-table-column>
      <el-table-column prop="auth_name" label="授权人"> </el-table-column>
      <el-table-column prop="auth_time" label="授权时间" :formatter="resetDate">
      </el-table-column>
    </el-table>

    <!-- 6、新增角色弹窗 -->
    <!-- 
      :visible.sync 判定是此弹窗否可见

     -->
    <el-dialog title="添加角色" :visible.sync="roleFormVisible" width="500px">
      <el-form
        status-icon
        :model="role"
        :rules="roleRules"
        ref="roleForm"
        style="wideth: 400px"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="角色名称" props="name">
          <el-input v-model="role.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('roleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--9、为角色添加权限弹窗-->
    <el-dialog
      title="设置角色权限"
      :visible.sync="roleAuthVisible"
      width="500px"
    >
      <Auth :role="currentRow" ref="auth" />
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleAuthVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, updateRole } from "@/api/role.js";
import Auth from "./Auth.vue";
import memoryUtils from "@/utils/memoryUtils.js";
import { formateDate } from "@/utils/dateUtils.js";
export default {
  data() {
    return {
      // 3、被选中一行的数据先设为空
      currentRow: null,
      // 角色列表要从后端取 所以先为空
      roleList: [],


      role: {
        name: "",
        menus: [],
      },
      roleFormVisible: false,
      roleRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
      roleAuthVisible: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  components: { Auth },

  methods: {
    //2、val可以拿到被选中一行的所有数据内容
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(this.currentRow);
    },

    //5、获取数据
    fetchData() {
      getRoleList().then((response) => {
        // console.log(response);
        const res = response.data;
        if (res.status === 0) {
          
          // let c=res.data;
          // console.log(c);
          // c.sort((a,b)=>{
          //   return b.auth_time-a.auth_time
          // })
          // this.roleList = c;

          this.roleList = res.data;
        }
        else {
        this.$message({
          message: res.msg,
          type: "warning",
        });
        }
      });
    },

    // 7、添加角色
    addData(formName) {
      // validate是此表单的验证器  valid是验证结果
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addRole(this.role.name).then((response) => {
            const res = response.data;
            if (res.status === 0) {
              // this.$message({
              //   message: "新增角色成功",
              //   type: "success",
              // });
              this.roleFormVisible = false;
              // 刷新数据，即更新数组内的信息
              this.fetchData();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 8、添加角色 --- 弹出窗显示、重置表单
    handleAdd() {
      this.roleFormVisible = true;
      /* this.$nextTick()异步事件，当渲染结束后，它的回调才会被执行
      触发新增角色时，打开弹窗以及渲染表单需要加载DOM,这个过程需要一定的时间，等待DOM加载完成之后，再调用.resetFields()重置表单
      */
      this.$nextTick(() => {
        this.$refs["roleForm"].resetFields();
      });
    },
    // 9、
    updateRole() {
      const newRole = this.$refs["auth"].getMenus();
      this.currentRow.menus = newRole.menus;
      this.currentRow.name = newRole.name;
      this.currentRow.auth_name = memoryUtils.user.username;
      updateRole(this.currentRow).then((response) => {
        const res = response.data;
        // if(res.status===0){
        //   this.$message({
        //     message:'更新成功',
        //     type:'success'
        //   })
        // }
        this.roleAuthVisible = false;
        this.fetchData();
      });
    },
    resetDate(row, column, cellValue, index) {
      return formateDate(cellValue);
    },
  },
};
</script>

<style scoped>
</style>