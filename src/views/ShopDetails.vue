<template>
  <div class="product-detail">
    <el-header class="header">
      <h1>{{ product.name }}</h1>
      <p>￥ {{ product.price }}</p>
    </el-header>

    <el-main>
      <el-carousel :interval="5000" height="460px">
        <el-carousel-item v-for="(image, index) in product.images" :key="index">
          <el-image style="width:100%;height:100%" :src="image" fit="fit"></el-image>
        </el-carousel-item>
      </el-carousel>

      <div class="description">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-table :data="product.attributes" border style="width: 100%">
              <el-table-column prop="name" label="属性名称"></el-table-column>
              <el-table-column prop="value" label="属性值"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="详细参数">
            <el-table :data="product.details" border style="width: 100%">
              <el-table-column prop="name" label="参数名称"></el-table-column>
              <el-table-column prop="value" label="参数值"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="用户评价">
            <div class="user-reviews">
              <p v-if="product.reviews.length === 0">暂无评价</p>
              <div v-for="(review, index) in product.reviews" :key="index">
                <p class="username">{{ review.username }}</p>
                <p class="content">{{ review.content }}</p>
                <p class="datetime">{{ review.datetime }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>

    <el-footer class="footer">
      <el-button type="primary" icon="shopping-cart">加入购物车</el-button>
      <el-button type="success" icon="check">立即购买</el-button>
    </el-footer>
  </div>
</template>

<script>
export default {
  name:'ShopDetail',
  data() {
    return {
      product: {
        name: "商品名称",
        price: 888,
        images: [
          "https://picsum.photos/600/400?random=1",
          "https://picsum.photos/600/400?random=2",
          "https://picsum.photos/600/400?random=3",
        ],
        attributes: [
          { name: "品牌", value: "XXX" },
          { name: "型号", value: "XXX-001" },
          { name: "颜色", value: "黑色" },
        ],
        details: [
          { name: "尺寸", value: "100mm x 100mm x 100mm" },
          { name: "重量", value: "1kg" },
          { name: "材质", value: "ABS塑料" },
        ],
        reviews: [
          {
            username: "用户A",
            content: "这个商品很好看，值得购买！",
            datetime: "2023-01-01 10:00:00",
          },
          {
            username: "用户B",
            content: "商品质量很不错，赞一个！",
            datetime: "2023-01-02 14:00:00",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 20px;
  font-size: 24px;
  font-weight: bold;
  background-color: #f5f5f5;
}
.description {
  padding: 20px;
}
.user-reviews {
  margin-top: 30px;
}
.username {
  font-weight: bold;
}
.content {
  margin: 5px 0;
}
.datetime {
  color: #999;
  font-size: 12px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 80px;
  padding: 0 20px;
  background-color: #f5f5f5;
}
</style>