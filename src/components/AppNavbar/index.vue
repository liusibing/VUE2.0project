

<script>
import menuList from "@/config/menuConfig.js";
import memoryUtils from "@/utils/memoryUtils.js";
export default {
  data() {
    return {
      menuNodes: "", //储存所有菜单项
    };
  },

  // 3、 数据挂载时将导航渲染出来
  mounted() {
    this.menuNodes = this.getMenuNodes(menuList);
  },

  methods: {
    // 2、使用递归调用，将导航栏依次显示
    getMenuNodes(menuList) {
      return menuList.map((item) => {
        if (this.hasAuth(item)) {
          if (!item.children) {
            return (
              <el-menu-item index={item.index}>
                <i class={item.icon}></i>
                <span slot="title">{item.title}</span>
              </el-menu-item>
            );
          } else {
            return (
              <el-submenu index={item.index}>
                <template slot="title">
                  <i class={item.icon}></i>
                  <span>{item.title}</span>
                </template>
                {this.getMenuNodes(item.children)}
              </el-submenu>
            );
          }
        }
      });
    },

    // 这是菜单列表中的每一项
    hasAuth(item) {
      const { index, isPublic } = item;
      const menus = memoryUtils.user.role.menus;
      const username = memoryUtils.user.username;

      /* 
            1、如果用户名是admin:全部通过
            2、如果当前item是公开的：全部通过
            3、当前用户有此item的权限：index是否在menus当中
            */
      if (username === "admin" || isPublic || menus.indexOf(index) != -1) {
        return true;
      } else if (item.children) {
        return !!item.children.find(
          (child) => menus.indexOf(child.index) !== -1
        );
      }
      return false;
    },
  },

// 1、使用render渲染组件信息，使用时要去掉template标签
  render() {
    return (
      <div class="navbar">
        <el-menu
          router={true}
          default-openeds={["/students"]}
          default-active={this.$route.path}
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          {this.menuNodes}
        </el-menu>
      </div>
    );
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  border: 0;
}
</style>