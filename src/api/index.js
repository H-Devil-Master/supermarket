import requests from './request'

export const login = (data)=>{
    return requests({url:'/login',data,method:'post'});
}

export const userRegister = (data)=>{
    return requests({url:'/register',data,method:'post'})
}

export const kaptcha = ()=>{
    return requests({url:'/kaptcha',method:'get'});
}
