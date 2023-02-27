<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @change="reverseIsChecked(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">￥{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <button class="mins" @click="reduceSkuNum(cartInfo)">-</button>
            <input
              autocomplete="off"
              :value="cartInfo.skuNum"
              @change="changeSkuNum($event, cartInfo)"
              minnum="1"
              class="itxt"
            />
            <button class="plus" @click="addSkuNum(cartInfo)">+</button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">￥{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delShop(cartInfo)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="
            selectShop.length == cartInfoList.length &&
            cartInfoList.length !== 0
          "
          @click="isCheckedAllSelect"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="delAllShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectShopInfo.num }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价(不含运费):</em>
          <i class="summoney">￥{{ selectShopInfo.totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      timer: null,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 选中状态的商品
    selectShop() {
      let isChecked_true = this.cartInfoList.filter((cartInfo) => {
        return cartInfo.isChecked;
      });
      // console.log(isChecked_true);
      return isChecked_true;
    },
    // 计算已选择的商品数量和总价格
    selectShopInfo() {
      let num = 0;
      let totalPrice = 0;
      this.selectShop.forEach((shop) => {
        // console.log(shop);
        num += shop.skuNum;
        totalPrice += shop.skuNum * shop.skuPrice;
      });
      return { num, totalPrice };
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 产品数量减一
    async reduceSkuNum(cartInfo) {
      // console.log(cartInfo.skuId, cartInfo.skuNum);
      // 👇节流 避免点击过快出现负数
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null;
        }, 500);
        try {
            if (cartInfo.skuNum > 1) {
              await this.$store.dispatch("addShoppingCart", {
                skuId: cartInfo.skuId,
                skuNum: -1,
              });
            }
            this.getData();
          } catch (error) {
            alert(error.message);
          }
      }
    },
    // 产品数量加一
    async addSkuNum(cartInfo) {
      try {
        await this.$store.dispatch("addShoppingCart", {
          skuId: cartInfo.skuId,
          skuNum: 1,
        });

        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 手动输入产品数量
    async changeSkuNum(event, cartInfo) {
      if (isNaN(event.target.value) || event.target.value < 1) {
        event.target.value = cartInfo.skuNum;
      } else {
        let difference = parseInt(event.target.value) - cartInfo.skuNum;
        try {
          await this.$store.dispatch("addShoppingCart", {
            skuId: cartInfo.skuId,
            skuNum: difference,
          });
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      }
    },
    // 选中和取消选中商品
    async reverseIsChecked(cartInfo, event) {
      let checked = event.target.checked ? 1 : 0;

      try {
        await this.$store.dispatch("getChangeIsChecked", {
          skuId: cartInfo.skuId,
          isChecked: checked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 全选和取消全选
    async isCheckedAllSelect(event) {
      let checked = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("isCheckedAllSelect", checked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除商品
    async delShop(cartInfo) {
      try {
        await this.$store.dispatch("delShop", cartInfo.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除选中的全部商品
    async delAllShop() {
      try {
        await this.$store.dispatch("delAllShop");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    goTrade() {
      this.$router.push({ name: "trade" });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 8.5%;
        }

        .cart-list-con5 {
          width: 16%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 40px;
            height: 33px;
            text-align: center;
            padding: 8px;
            background-color: #fff;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 40px;
            height: 33px;
            text-align: center;
            background-color: #fff;
          }
        }

        .cart-list-con6 {
          width: 13%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 10%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>