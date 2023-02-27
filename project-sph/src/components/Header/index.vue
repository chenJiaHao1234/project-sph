<template>
  <div>
    <div class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList" >
            <p>尚品汇欢迎您！</p>
            <p v-if="$store.state.login.userInfo.name">
              <span  class="router">{{ $store.state.login.userInfo.name }}</span>
              <span  class="register router" @click="logout">退出登录</span>
            </p>
            <p v-else>
              <span>请</span>
              <span @click="goLogin"  class="router">登录</span>
              <span @click="goRegister" class="register router">注册</span>
            </p>
          </div>
          <div class="typeList">
            <a href="###">我的订单</a>
            <a @click="goShopCart">我的购物车</a>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <span @click="goHome" class="logo router" title="尚品汇">
            <img src="./images/logo.png" alt="" />
          </span>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="searchContent"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch(searchContent)"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContent: "",
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    },
    goHome() {
      this.$router.push("/home");
    },
    goSearch(searchContent) {
      const location = {
        name:'search',
        params: {
          keyword: searchContent !== ''? searchContent : undefined
        }}
      if(this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location);
      this.searchContent = ''
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace({name: 'home'})
    },
    goShopCart() {
      this.$router.push({name: 'shopCart'})
    }
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }

  .router {
    color: #666;
  }

  .router:hover {
    color: skyblue;
    cursor: pointer;
  }
}
</style>