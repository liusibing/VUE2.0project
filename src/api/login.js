// 登录的axios配置

// 导入自己封装的axios对象
import request from '@/utils/request';

// 登录 
// 导出非默认成员
export function login(username,password){
    return request({
        url:'/login',
        method:'post',
        data:{
            username,
            password
        }
    })
}