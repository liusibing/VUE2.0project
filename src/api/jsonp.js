/* 
    通过jsonp用来请求天气信息
*/

import jsonp from 'jsonp';


export function reqWeather(city){
    const url=`https://www.yiketianqi.com/free/day?appid=19849558&appsecret=Akd0r8iz&unescape=1&city=${city}`;
    return new Promise((resolve,reject)=>{
        jsonp(url,{param:'callback'},(error,response)=>{
            if(!error&&response.cityid){
                const {tem_day,tem_night,wea,wea_img}=response;
                // 没有问题则输出
                resolve({
                    tem_day,
                    tem_night,
                    wea,
                    wea_img
                })
            }else{
                alert('获取天气失败')
            }
        })
    })
}