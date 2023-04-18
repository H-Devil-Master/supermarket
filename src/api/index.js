import requests from './request'
//登录接口
export const userLogin = (data)=>{
    return requests({url:'/login',data,method:'post'});
}

//注册接口
export const userRegister = (data)=>{
    return requests({url:'/register',data,method:'post'})
}

//图片验证码接口
export const kaptcha = ()=>{
    return requests({url:'/kaptcha',method:'get'});
}

//邮箱验证码接口
export const resqustMailKaptcha = (mail)=>{
    return requests({url:`/mailKaptcha?mail=${mail}`,method:'get'})
}

//更新管理员信息接口 http://localhost:8080/user/   put
export const requestUpdataUser = (data)=>{
    return requests({url:'/user/',data,method:'put'})
}

//查询人员接口
export const requestSelectAllUser = ()=>{
    return requests({url:'/user/',method:'get'})
}

//查询id为什么的人
export const requestSelectUser =(userId)=>{
    return requests({url:`/user/${userId}`,method:'get'})
}

//删除id为什么的人
export const requestDeleteUser = (userId)=>{
    return requests({url:`/user/${userId}`,method:'delete'})
}