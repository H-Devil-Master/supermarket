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

//获取某一个商品
export const requsetGetProduct = (productId)=>{
    return requests({url:`/product/${productId}`,method:'get'})
}

//获取全部商品
export const requestGetAllProduct = ()=>{
    return requests({url:'/product/',method:'get'})
}

//添加商品接口
export const requestAddProduct = (data)=>{
    return requests({url:'/product/',data,method:'post'})
}

//删除商品接口
export const requestDeleteProduct = (productId)=>{
    return requests({url:`/product/${productId}`,method:'delete'})
}

//更新接口
export const requestUpdateProduct = ()=>{
    return requests({url:'/product/',method:'put'})
}

//获取图片的接口  GET http://localhost:8080/file/?path={{path}}
export const requesetGetImg = (path)=>{
    return requests({url:`/file/?path=${path}`,method:'get'})
}