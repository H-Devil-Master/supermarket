<template>
  <div>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
        <div class="user">
<!--          头像上传-->
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="headerUrl" :src="headerUrl" class="avatar">
            <img v-else src="./img/preview.jpg" class="avatar-uploader-icon" alt="网络不佳">
          </el-upload>

          <div class="userInfo">
            <p class="name">爱坤你最强</p>
            <p class="access">超级管理员</p>
          </div>
          <div></div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2023-4-17</span></p>
          <p>上次登录地点：<span>重庆</span></p>
        </div>
      </el-card>
      </el-col>

    <el-col :span="16">
      <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
        <el-table-column
            label="创建时间"
            prop="createTime">
        </el-table-column>
        <el-table-column
            label="用户"
            prop="username">
        </el-table-column>
        <el-table-column
            label="邮箱"
            prop="email">
        </el-table-column>
        <el-table-column
            label="身份"
            prop="type">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.type==1?'游客':'管理员'}}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="right">
          <template slot="header" slot-scope="scope">
            <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">操作</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

    <el-dialog :visible.sync="dialogVisible" title="编辑信息">
      <!-- 编辑用户的表单内容 -->
      <div class="eidefrom">
        <div class="eidecotent">
        <span style="color: red">*</span>用户<input type="text" v-model="username">
        </div>
        <div class="eidecotent">
        <span style="color: red">*</span>密码<input type="text" v-model="password">
        </div>
        <div class="eidecotent">
        <span style="color: red">*</span>邮箱<input type="text" v-model="email">
        </div>
        <div class="eidecotent">
          <span style="color: red;">*</span>头像上传
          <el-upload
              class="avatar-uploader"
              style="border: 1px solid silver"
              action="http://192.168.96.211:8080/file/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :visible.sync="dialogVisible"
              :before-close="handleDialogClose"
              :name="file"
          >
            <img v-if="headerUrl" :src="headerUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handletrue">确定</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {requestSelectAllUser,requestDeleteUser,requestUpdataUser,requestSelectUser} from "@/api";

export default {
  name: "UserManagement",
  mounted() {
    requestSelectAllUser().then((res)=>{
      console.log(res.data)
      this.tableData = res.data
    });
  },
  data() {
    return {
      headerUrl: '',
      file:'',
      tableData: [],
      search: '',
      dialogVisible:false,
      userId:'',
      password:null,
      email:'',
      username:''
    };
  },
  methods: {
    handletrue() {
      // 执行删除记录的操作
      this.dialogVisible = false;
      const {username,userId,password,email,headerUrl}  = this;
      requestUpdataUser({username,userId,password,email,headerUrl});
      requestSelectUser(userId)
    },
    handleDialogClose(done) {
      if (done) {
        return;
      }
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.headerUrl = URL.createObjectURL(file.raw);
    },
    /*uploadFile(file, options) {
      options.method = 'put';
      // 在这里对文件进行上传处理，例如使用 Axios 封装的 PUT 方法
      return axios.put('/upload', file.raw);
    },*/
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.userId = row.userId
      const {username,password,email,headerUrl} = this
      console.log(index, row);
    },
    handleDelete(index, row) {
      const userId = row.userId
      console.log(userId)
      const result = requestDeleteUser(userId)
      requestSelectUser(userId)
      console.log(index, row);
    }
  }
}
</script>

<style scoped>
.user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid silver;
  display: flex;
  align-items: center;
}
.user img{
  width: 150px;
  height: 150px;
  margin-right: 40px;
  border-radius: 50%;
}
.login-info p{
  font-size: 14px;
  line-height: 28px;
  color: #999999;
}
.userInfo .name{
  font-size: 32px;
  margin-bottom: 10px;
}
.userInfo .access{
  font-size: 25px;
  color: #9a9393;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.eidefrom{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.eidefrom span{
  margin-right: 5px;
}
.eidefrom input{
  width: 200px;
  height: 30px;
  margin-left: 20px;
}
.eidecotent{
  margin-top: 20px;
}

</style>