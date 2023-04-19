import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:()=>import('@/views/Home.vue'),
            meta:{show:true}
        },
        {
            path:'/login',
            component:()=>import('@/views/Login.vue'),
            meta:{show: false}
        },
        {
            path:'/shopDetails',
            component:()=>import('@/views/ShopDetails.vue'),
            meta:{show: false}
        },
        {
            path:'/shopCar',
            component:()=>import('@/views/ShopCar.vue'),
            meta:{show: false}
        },
        {
            path:'/orderConfirmation',
            component:()=>import('@/views/OrderConfirmation.vue'),
            meta:{show: false}
        },
        {
            path:'/user',
            component:()=>import('@/views/User.vue'),
            meta:{show: false},
            children:[
                {
                    path:'userManagement',
                    component:()=>import('@/views/UserManagement.vue'),
                    meta:{show: false},
                },
                {
                    path:'shopManagement',
                    component:()=>import('@/views/ShopManagement.vue'),
                    meta:{show: false},
                }
            ]
        },
        {
            path:'*',
            redirect:'/login'
        }
    ]
})