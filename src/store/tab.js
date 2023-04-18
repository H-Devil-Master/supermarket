export default {
    state:{
        isCollapse:false //用于控制菜单的展开与收起
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse;
        }
    }
}