/*  路由守卫---权限校验
    通过router路由前置钩子函数 beforeEach()，
    在跳转路由之前进行拦截，判断用户是否登录
    如果已经登录路由正常跳转，如果未登录，跳转到登录页
*/

import router from './router'
import memoryUtils from './utils/memoryUtils'

/* 
    前置路由钩子函数：
    to:即将要进入的目标路由对象
    from:当前导航要离开的路由对象
    next:调用方法，进入到目标路由
*/

router.beforeEach((to,from,next)=>{

    const user = memoryUtils.user;
    // 登录的情况
    if(user&&user._id){
        // 如果已经登录，再点击登录页面的话就跳回首页
        if(to.path=="/login"){
            next({path:'/'})
        // 否则，点在哪个页面就跳转到哪个页面
        }else{
            next();
        }
    // 未登录
    }else{
        // 如果未登录，要去登录页面，直接就跳转到登录页面
        if(to.path=='/login'){
            next()
        }
        // 如果未登录，想去其他页面，就会跳转到登录页面
        else{
            next({path:'/login'})
        }
    }
})