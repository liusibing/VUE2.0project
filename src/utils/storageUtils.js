/* 写在本地浏览器中的 */

/* 
    store是兼容所有浏览器的loaclStorage包装器 
    包含N个想换工具函数  即不需要使用localStorage的方法将数据存储，可以直接使用store的方法存储数据
*/
import store from 'store';  //用来操作localStorage
const USER_KEY='user_key'  //localStorage中存储的变量

// 导出默认成员
export default{
    saveUser(user){
        /* localStorage只能存String，需要将对象在转化成String类型 */ 

        //                      代表属性     代表属性值
        // localStorage.setItem(USER_KEY,JSON.stringify(user))

        // 存储数据---内部自动化转化
        store.set(USER_KEY,user)
    },
    getUser(){
        return store.get(USER_KEY)||{}
    },
    removeUser(){
        store.remove(USER_KEY)
    }
}