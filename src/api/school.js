import request from '@/utils/request'
export default {
    /* 
    获取学校列表
    page是当前页码，size是显示条数
    */
    getSchoolList(page, size) {
        return request({
            url: '/manage/school/list',
            method: 'post',
            data: {
                page,
                size
            }
        })
    },

    //    school是一个对象了 所以在这边传值的时候不用加大括号了
    add(school) {
        return request({
            url: '/manage/school/add',
            method: 'post',
            data: school
        })
    },

    getById(_id){
        return request({
            url:`/manage/school/find?_id=${_id}`,
            method:'get',

        })
    },

    // 更新学校信息
    update(school){
        return request({
            url:'/manage/school/update',
            method:'post',
            data:school
        })
    },

    // 删除学校
    deleteById(schoolId){
        return request({
            url:'/manage/school/delete',
            method:'post',
            data:{schoolId}
        })
    },
    getSchoolAll(){
        return request({
            url:'/manage/school/all',
            method:'get'
        })
    }
}