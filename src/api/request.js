
//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//start：进度条开始 done：进度条结束
// console.log(nprogress);
//引入进度条的样式
import 'nprogress/nprogress.css';
const Authorization = localStorage.getItem('token');
//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下

const requests = axios.create({
    //配置对象
    //基础路径：发请求的时候，路径当中的会出现api
    baseURL:"http://192.168.96.211:8080",
    timeout:5000,
    withCredentials: true,
    headers:{
        'Access-Control-A1low-Credentials':true,
        "Content-type":"application/json;charset:utf-8",
        'kaptchaOwner':document.cookie,
        'mailKaptchaOwner':localStorage.getItem('cookie1')
    }
})
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，hearders请求头
    //进度条开始动
    nprogress.start();
    config.headers.Authorization = Authorization;
    const cookie = localStorage.getItem('cookie')
    const imgcode = localStorage.getItem('imgcode')
    config.headers.mailKaptchaOwner = cookie;
    config.headers.kaptchaOwner = imgcode;
    return config;
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    const cookie = res.headers.get('mailKaptchaOwner');
    const imgcode = res.headers.get('kaptchaOwner')
    localStorage.setItem('cookie',cookie);
    localStorage.setItem('imgcode',imgcode);
    return res.data;
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})
export default requests;