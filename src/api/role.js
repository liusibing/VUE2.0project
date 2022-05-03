import request from "@/utils/request"
// 1、从服务器端得到列表
export function getRoleList(){
    return request({
        url:'/manage/role/list',
        method:'get'
    })
}
// 2、添加角色
export function addRole(name){
    return request({
        url:'/manage/role/add',
        method:'post',
        data:{
            name
        }
    })
}


export function updateRole(role){
    return request({
        url:'/manage/role/update',
        method:'post',
        data:role
    })
}