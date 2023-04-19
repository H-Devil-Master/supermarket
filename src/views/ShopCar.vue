<template>
  <div class="cart-checkout">
    <h1>购物车结算</h1>
    <div class="cart">
      <el-table :data="cart" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="quantity" label="数量">
          <template slot-scope="{ row }">
            <el-input-number v-model="row.quantity" min="1" @change="handleQuantityChange(row)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="subtotal" label="小计"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="danger" size="mini" icon="delete" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="summary">
      <el-row>
        <el-col span="12">商品总计：</el-col>
        <el-col span="12">{{ totalQuantity }}件商品</el-col>
      </el-row>
      <el-row>
        <el-col span="12">合计金额：</el-col>
        <el-col span="12">￥{{ totalPrice }}</el-col>
      </el-row>
      <el-row>
        <el-button type="primary" size="medium" @click="handleCheckout">去结算</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name:'ShopCar',
  data() {
    return {
      cart: [
        { id: 1, name: "商品A", price: 100, quantity: 2 },
        { id: 2, name: "商品B", price: 50, quantity: 3 },
        { id: 3, name: "商品C", price: 80, quantity: 1 },
      ],
    };
  },
  computed: {
    totalQuantity() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.subtotal, 0);
    },
  },
  methods: {
    handleQuantityChange(item) {
      item.subtotal = item.price * item.quantity;
    },
    handleDelete(item) {
      const index = this.cart.indexOf(item);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    handleCheckout() {
      this.$message.success("结算成功！");
      // TODO: 跳转到订单确认页面
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
.cart {
  margin-bottom: 30px;
}
.el-input-number__decrease,
.el-input-number__increase {
  display: none;
}
.summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.summary el-row {
  margin-bottom: 10px;
}
.summary el-button {
  margin-top: 20px;
}
</style>