<template>
  <div>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
           @open="handleOpen"
           @close="handleClose"
           :collapse="isCollapse"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b">
    <h3>{{isCollapse?'后台':'管理员系统'}}</h3>
    <el-menu-item index="1">
      <i class="el-icon-s-home"></i>
      <span slot="title">
        <router-link class="routerLink" to="/user/userManagement">首页</router-link>
      </span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-shopping-bag-1"></i>
        <span slot="title">
          <router-link class="routerLink" to="/user/shopManagement">商品</router-link>
        </span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>

    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
  </div>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {

    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed:{
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  border: none;
}
.el-menu h3{
  color: white;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
  font-weight: 400;
}
.routerLink{
  text-decoration: none;
  color: white;
}
</style>