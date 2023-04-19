<template>
  <div class="cart-confirm">
    <h1>订单确认</h1>
    <el-card shadow="hover" class="cart">
      <p class="title">商品清单</p>
      <div class="list">
        <el-row class="item" v-for="(item, index) in cart" :key="index">
          <el-col :span="4">{{ item.name }}</el-col>
          <el-col :span="5">￥{{ item.price }}</el-col>
          <el-col :span="4">{{ item.quantity }}件</el-col>
          <el-col :span="5">小计：{{ item.subtotal }}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card shadow="hover" class="summary">
      <p class="title">订单总金额</p>
      <div class="total">
        <el-row>
          <el-col :span="12">商品总价：</el-col>
          <el-col :span="12" class="price">￥{{ totalPrice }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">运费：</el-col>
          <el-col :span="12" class="price">￥{{ shippingFee }}</el-col>
        </el-row>
        <el-row class="total-price">
          <el-col :span="12">合计：</el-col>
          <el-col :span="12" class="price">￥{{ totalAmount }}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-button type="primary" size="medium" @click="submitOrder">提交订单</el-button>
  </div>
</template>

<script>
export default {
  name:'OrderConfirmation',
  data() {
    return {
      cart: [
        { id: 1, name: "商品A", price: 100, quantity: 2 },
        { id: 2, name: "商品B", price: 50, quantity: 3 },
        { id: 3, name: "商品C", price: 80, quantity: 1 },
      ],
      shippingFee: 10,
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.subtotal, 0);
    },
    totalAmount() {
      return this.totalPrice + this.shippingFee;
    },
  },
  methods: {
    submitOrder() {
      if (this.totalAmount > 0) {
        this.$message.success("订单已提交！");
        // TODO: 跳转到支付页面
      } else {
        this.$message.warning("购物车为空，无法提交订单！");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}
.cart-confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cart {
  width: 800px;
  margin-bottom: 30px;
}
.cart .title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
.list {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.item {
  margin-bottom: 10px;
}
.summary {
  width: 600px;
  margin-bottom: 30px;
}
.summary .title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
.total {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.total el-row {
  margin-bottom: 10px;
}
.total-price .price {
  font-size: 18px;
  font-weight: bold;
  color: #f60;
}
.el-button {
  margin-top: 30px;
}
</style>
