<template>
  <div>
    <el-button type="primary" @click="dialogVisible1 = true">+ 新增</el-button>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible1"
        width="50%"
        :before-close="handleClose">
      <div class="eidefrom">
        <div class="eidecotent">
        商品名称<input type="text" v-model="productName">
        </div>
        <div class="eidecotent">
          商品价格<input type="text" v-model="price">
        </div>
        <div class="eidecotent">
          商品数量<input type="text" v-model="count">
        </div>
        <div class="eidecotent">
          商品热度<input type="text" v-model="heat">
        </div>
        <div class="eidecotent">
          商品详情<input type="text" v-model="details">
        </div>
        <div class="eidecotent">
          商品类型<input type="text" v-model="type">
        </div>
        <div class="eidecotent">
        <el-upload
          class="upload-demo"
          action="http://192.168.96.211:8080/file/products"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-success="handleUploadSuccess"
          list-type="picture">
        <el-button size="small" type="primary">图片上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="addproduct">确 定</el-button>
  </span>
    </el-dialog>
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="商品名称"
          prop="productName">
      </el-table-column>
      <el-table-column
      label="商品样式"
      >
  <!--        <template slot-scope="scope">
            <img :src="scope.row.productImage">
          </template>-->
      </el-table-column>
      <el-table-column
          label="价格"
          prop="price">
      </el-table-column>
      <el-table-column
          label="热度"
          prop="heat">
      </el-table-column>
      <el-table-column
          label="商品详情"
          prop="details">
        <template slot-scope="scope">
          <span @click="handleGenderClick(scope.row)">{{ scope.row.details }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="类型"
          prop="type">
<!--        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.type==1?'游客':'管理员'}}</span>
        </template>-->
      </el-table-column>
      <el-table-column
          label="剩余数量"
          prop="count">
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
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose">
      <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
          >
      ></quill-editor>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {requestGetAllProduct,requestAddProduct,requesetGetImg} from "@/api";
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: "ShopManagement",
  components: {
    quillEditor
  },
  mounted() {
    requestGetAllProduct().then((res)=>{
      this.tableData = res.data
      console.log(res.data)
    })
  },
  data() {
    return {
      fileList: [],
      content:'',
      productName:'',
      price:null,
      heat:null,
      details:'',
      count:null,
      productImage:'',
      type:'',
      dialogVisible:false,
      dialogVisible1:false,
      tableData: [],
      search: '',
      // 富文本编辑器配置
      editorOption: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ]
        },
        placeholder: '请输入正文'
      },
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

// 失去焦点事件
    onEditorBlur(quill) {
      console.log('editor blur!', quill,this.content)
    },
// 获得焦点事件
    onEditorFocus(quill) {
      // console.log('editor focus!', quill)
    },
// 准备富文本编辑器
    onEditorReady(quill) {
      // console.log('editor ready!', quill)
    },
// 内容改变事件
    onEditorChange({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      // this.content = text
      console.log(this.content)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleGenderClick(row) {
      this.dialogVisible = true
      // 在这里可以写点击事件的业务逻辑。
    },
    //添加商品
    async addproduct(){
      this.dialogVisible1 = false
      const {productName, price, heat, details, count, type} = this;
      const result = await requestAddProduct({productName, price, heat, details, count, type});
      if (result.status == 200){
        console.log(result)
        requestGetAllProduct();
      }
    },
    //图片上传成功的回调
    handleUploadSuccess(response, file, fileList) {
      // 从响应数据中获取图片地址
      console.log(response)
      const { status, data } = response;
      if (status == 200 && data) {
        requesetGetImg(data).then((res)=>{
          this.productImage = res;
        })
        console.log(this.productImage)
      } else {
        console.error('上传失败');
      }
    },
  }
}
</script>

<style scoped>
.eidefrom{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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