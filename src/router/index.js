import Vue from "vue";
import Router from "vue-router";
import Login from '../views/login';
import Layout from '../components/Layout.vue';
import Home from '@/views/home/Home.vue'
import User from '@/views/user/User.vue'
import Role from '@/views/role/Role.vue'
import School from '@/views/students/School.vue'
import Majors from '@/views/students/Majors.vue'
import Class from '@/views/students/Class.vue'
import Student from '@/views/students/Student.vue'
import StudentUpdate from '@/views/students/StudentUpdate.vue'

Vue.use(Router);

export default new Router({
  mode:"history",
  base:process.env.BASE_URL,
    routes:[
      {//登录页
        path:'/login',
        name:'login',
        component:Login
      },
      {
        //基础布局--首页
        path:'/',
        name:'layout',
        component:Layout,
        redirect:'/home',  //直接打开首页

        children:[{
          // 此时的路由时/home
          path:'/home',
          component:Home,
          meta:{title:'首页'}
        }]
      },
      {
        path:'/user',
        component:Layout,
        children:[{
          // 此时的路由时/user
          path:'/',
          component:User,
          meta:{title:'用户管理'} 
        }]
      },
      {
        path:'/school',
        component:Layout,
        children:[{
          path:'/',
          component:School,
          meta:{title:'学校管理'} 
        }]
      },
      {
        path:'/majors',
        component:Layout,
        children:[{
          path:'/',
          component:Majors,
          meta:{title:'专业管理'} 
        }]
      },
      {
        path:'/class',
        component:Layout,
        children:[{
          path:'/',
          component:Class,
          meta:{title:'班级管理'} 
        }]
      },
      {
        path:'/student',
        component:Layout,
        children:[{
          path:'/',
          component:Student,
          meta:{title:'学生管理'} 
        }]
      },
      {
        path:'/role',
        component:Layout,
        children:[{
          path:'/',
          component:Role,
          meta:{title:'角色管理'} 
        }]
      },
      {
        path:'/student/update/:_id',
        component:Layout,
        children:[{
          path:'/',
          component:StudentUpdate,
          meta:{title:'学生管理'} 
        }]
      }
    ]
});
