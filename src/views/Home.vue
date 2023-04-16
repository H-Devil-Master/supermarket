<script src="../api/request.js"></script>
<template>
  <div>
  <div class="box">
  <el-carousel class="carousel" :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in 6" :key="item">
      <img src="./img/preview.jpg" alt="" style="width: 100%;height: 100%">
    </el-carousel-item>
  </el-carousel>

    <div class="gather">
    <h1>好物聚集</h1>
    </div>
    <div class="recommend">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <div class="gather">
      <h1>为你推荐</h1>
    </div>
    <div class="tuijian">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: "Home",
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.box{
  width: 70%;
  margin: 0 auto;
}
.carousel{
  margin: 20px;
}
.gather{
  width: 100%;
  height: 50px;
  align-items: center;
  text-align: center;
}
.recommend{
  width: 100%;
  height: 400px;
  border: 1px solid red;
}
.recommend ul,.tuijian ul{
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.recommend ul li,.tuijian ul li{
  width: 30%;
  height: 150px;
  border: 1px solid red;
  margin-top: 30px;
}
.tuijian{
  width: 100%;
  /*height: 400px;*/
  border: 1px solid red;
}
</style>