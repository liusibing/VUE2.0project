import request from '@/utils/request'

export default {
    // 获取学员列表 带分页
    getStudentList(page, size, searchMap) {
        return request({
            url: '/manage/student/list',
            method: 'post',
            data: {
                page,
                size,
                searchMap
            }
        })
    },
    // 删除图片
    reqDeleteImg(name) {
        return request({
            url: '/manage/img/delete',
            method: 'post',
            data: { name }
        })
    },
    // 添加学员
    add(student){
        return request({
            url:'/manage/student/add',
            method:'post',
            data:student
        })
    },
    // 通过id查找学员
    getById(_id){
        return request({
            url:`/manage/student/find?_id=${_id}`,
            method:'get'
        })
    },
    // 修改学员信息
    update(student){
        return request({
            url:'/manage/student/update',
            method:'post',
            data:student
        })
    },
    // 删除学员
    deleteById(studentId){
        return request({
            url:'/manage/student/delete',
            method:'post',
            data:{
                studentId
            }
        })
    },
    // 根据年份查询当月学员数量
    getStudentListForMonth(year){
        return request({
            url:'/manage/student/date',
            method:'post',
            data:{year}
        })
    }
}