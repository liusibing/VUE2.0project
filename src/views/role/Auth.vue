<template>
  <div>
    <!-- 1、 -->
    <el-form
      :model="updateRole"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      label-position="right"
      class="demo-ruleForm"
      style="wideth: 400px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="updateRole.name"></el-input>
      </el-form-item>
    </el-form>

<!-- 2、树 -->
    <el-tree
      :data="authList"
      show-checkbox
      node-key="index"
      :default-expanded-all="true"
      :default-checked-keys="checkedKeys"
      @check-change="handleCheckChange"
      ref="tree"
    >
    </el-tree>
  </div>
</template>

<script>
import menuList from "@/config/menuConfig.js";
export default {
  data() {
    return {
      updateRole: {
        
      },
      authList: [],
      rules: {
        
          name: [
            {
              required: true,
              message: "请输入角色名称",
              trigger: ["blur", "change"],
            },
          ],
      },
      checkedKeys:[]
    };
  },

/*  
    问题：
    选中某一个角色点击设置按钮展示权限列表，关闭再次选择其他角色依然显示上一个角色的权限列表
    解决思路：
    通过watch监听父组件传入的role对象（选中的一行信息），如果发生变化，就给updataRole和checkedKeys重新赋值
  */
  watch:{
    // 监听role  如果role发生了改变  即val就是新传入的role
    // 更新得到的props数据
    role(val){
      if(val){
        this.updateRole={...val}
        this.checkedKeys=val.menus
        this.$refs["tree"].setCheckedKeys(this.checkedKeys)
      }
    }
  },

  mounted(){
    this.updateRole={...this.role}
    this.authList=this.getAuthNodes(menuList);
    this.checkedKeys=this.role.menus;
  },
  components: {},
  // 父组件往子组件传值
  props: ["role"],
  methods: {
    getAuthNodes(menuList) {
      return menuList.map((item) => {
        if (!item.children) {
          return {
            index: item.index,
            label: item.title,
          };
        } else {
          return {
            index: item.index,
            label: item.title,
            children: this.getAuthNodes(item.children),
          };
        }
      });
    },
    /*树形控件节点点击回调handleCheckChange
      data:当前点击节点数据
      checked:当前节点是否选中
      indeterminate:当前节点中的子节点是否有选中状态
      */
    //  修改权限列表
    handleCheckChange(data,checked,indeterminate){      
     if(checked){
       this.checkedKeys.push(data.index)
     }else{
       this.checkedKeys.splice(this.checkedKeys.indexOf(data.index),1)
     }
     console.log("this.checkedKeys",this.checkedKeys);
    },

// 取最新的数据，在父组件调用
    getMenus(){
      this.updateRole.menus=this.checkedKeys
      return this.updateRole
    }
  },
};
</script>

<style scoped>
</style>