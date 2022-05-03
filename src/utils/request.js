import axios from "axios";
import memoryUtils from './memoryUtils.js'
import { Message, Loading } from 'element-ui'
import storageUtils from './storageUtils.js'

const request = axios.create({
    /* 
        根据不同环境设置baseUrl，最终发送的请求URL为：baseUrl+发送请求时写的Url
        例如： baseUrl：'/dev-api'
        axios发送get请求 get('/test')
        最终发送的请求为：/dev-api/test
    */
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 500  //请求超时
})


// 判断用户权限的 
const getMenus = () => {
    if (memoryUtils.user.role_id) {

        // 获取缓存中的用户角色id和权限数组
        const roleId = memoryUtils.user.role_id;
        const userMenus = memoryUtils.user.role.menus;

        // 根据角色id发送请求获取最新的权限数组
        request({
            url: '/menus',
            method: 'post',
            data: { roleId }
        }).then(response => {
            const res = response.data;
            if (res.status === 0) {
                const menus = res.data.menus;

                // 判断权限数组长度是否相同 
                if (userMenus.length === menus.length) {

                    // 若相同 判断权限数组内容是否相同，如果不同就提示权限已经更改
                    userMenus.forEach(item => {
                        if (menus.indexOf(item) === -1) {
                            memoryUtils.user = {};
                            storageUtils.removeUser();
                            Message({
                                message: '当前用户权限被修改，请重新登录',
                                type: 'warning'
                            });
                            // 权限改变 即重新登录
                            window.location.href = '/login'
                        }
                    })
                    // 权限长度不同  权限一定更改
                } else {
                    memoryUtils.user = {};
                    storageUtils.removeUser();
                    Message({
                        message: '当前用户权限被修改，请重新登录',
                        type: 'warning'
                    });
                    // 权限改变 即重新登录
                    window.location.href = '/login'
                }
            }
        }).catch(error => {
            return
        })

    }
}

// 加载数据时打开和关闭动效
const loading = {
    loadingInstance: null,
    open: function () {
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({
                text: '拼命加载中...',
                target: '.main',
                background: 'rgb(0,0,0,.5)'
            })
        }
    },
    close: function () {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close();
        }
        this.loadingInstance = null;
    }
}


// 请求拦截器
// 第一个request代表上面 const request对象 
// interceptors是拦截器 
// 第二个request是拦截器上的请求
request.interceptors.request.use(config => {
    // 拦截请求
    if (config.url !== '/menus') {
        getMenus();
    }

    // 打开加载效果
    loading.open();
    return config
},
    error => {
        loading.close()
        // 出现异常抛出错误
        return Promise.reject(error)
    })

// 响应拦截器  参数同上
request.interceptors.response.use(response => {
    // 响应拦截

    // 关闭加载效果
    loading.close()
    const res = response.data;
    if (res.status !== 0) {
        Message({
            message: res.msg || '系统异常',
            type: 'warning',
            duration: 5 * 1000
        })
    } else {
        Message({
            message: res.msg || '获取成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
    return response
}, error => {
    loading.close()
    Message({
        message: error.message || '系统错误',
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
}
)


// 导出封装后的axios对象
export default request  