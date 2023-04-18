<template>
  <div class="user">
    <el-container>
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <UserHearder></UserHearder>
        </el-header>
        <el-main>
<!--          路由出口-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside'
import UserHearder from '../components/UserHearder'
export default {
  name: "user",
  components:{
    CommonAside,
    UserHearder
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
}
}
</script>

<style scoped>
/*.user{*/
/*  display: flex;*/
/*}*/
.nav{
  width: 200px;
}
.el-header{
  padding: 0;
}
</style>