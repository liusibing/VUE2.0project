/* 因为菜单栏内容是动态的，所以需要创建导航菜单配置文件用于动态创建菜单项 */

/* 使用index作为路由的名称，是因为再渲染导航栏时，如果导航栏开启路由模式（点击跳转到对应的路由），
    会使用index作为path进行路由跳转 */
    
const menuList = [{
    title: '首页', //菜单标题
    index: '/home', //对应的path
    icon: 'el-icon-s-hme',//图标
    isPublic:true  //对所有人公开
},
{
    title: '用户管理',
    index: '/user',
    icon: 'el-icon-user'
},
{
    title: '角色管理',
    index: '/role',
    icon: 'el-icon-medal'
},
{
    title: '学员管理',
    index: '/students',
    icon: 'el-icon-cooperation',
    children: [{  //子菜单
        title: '学校管理',
        index: '/school',
        icon: 'el-icon-office-building'
    }, {
        title: '专业管理',
        index: '/majors',
        icon: 'el-icon-reading'
    }, {
        title: '班级管理',
        index: '/class',
        icon: 'el-icon-s-grid'
    }, {
        title: '学生管理',
        index: '/student',
        icon: 'el-icon-notebook-1'
    }]
}
]

export default menuList