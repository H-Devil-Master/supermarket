<template>
  <div class="header">
    <div class="l-content">
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <!--      面包屑-->
      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
          <span class="el-dropdown-link">
            <img src="./images/preview.jpg" class="userImg">
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserHearder",
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.text {
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}
.userImg{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>