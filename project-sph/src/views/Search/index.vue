<template>
  <div>
    <!-- <Toolbar/> -->
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <Bread :searchData="searchData" @delTrademark="getData" @delAttrValue="getData" />
        <Selector @searchTrademark="searchTrademark" @attrAndAttrValue="attrAndAttrValue"  />
        <Details @getSort="getSort"></Details>
        <pagination 
        :pageNo="searchData.pageNo" 
        :pageSize="searchData.pageSize" 
        :total="$store.state.search.searchList.total" 
        :continues="5"
        @goPageNo1="goPageNo1"
        @goPageNoEnd="goPageNoEnd"
        @goPageNumber="goPageNumber"
        @previousPage="previousPage"
        @nextPage="nextPage"
        ></pagination>
        <HotSale />
      </div>
    </div>
  </div>
</template>

<script>
// import Toolbar from './Toolbar'
import TypeNav from '@/components/TypeNav'
import Bread from './Bread'
import Selector from './Selector'
import Details from './Details'
import pagination from '@/components/pagination'
import HotSale from './HotSale'
export default {
  data() {
    return {
      searchData: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ""

      }
    }
  },
  components: {
    // Toolbar,
    TypeNav,
    Bread,
    Selector,
    Details,
    pagination,
    HotSale
  },
  mounted() {
    // 在进入搜索页面时获取$route的携带的数据并发送网络请求
    this.searchData = {
      ...this.searchData,
      ...this.$route.params,
      ...this.$route.query
    }
    this.getData()
  },

  methods: {
    // 发送网络请求
    getData() {
      this.$store.dispatch('SearchList', this.searchData)
      this.searchData = {
        ...this.searchData,
        category1Id: "",
        category2Id: "",
        category3Id: ""
      }
    },
    // 点击品牌logo进行搜索
    searchTrademark(id, name) {
      this.searchData.trademark = `${id}:${name}`
      this.getData()
    },
    // 搜索属性值(106:苹果手机:手机系统)
    attrAndAttrValue(attr, attrValue) {
      let newProps = `${attr.attrId}:${attrValue}:${attr.attrName}`;

      if (this.searchData.props.indexOf(newProps) == -1) {
        this.searchData.props.push(newProps);
      }
      this.getData()
    },
    // 按销量、价格高低进行排序
    getSort(queryNumber, sort) {
      this.searchData.order = `${queryNumber}:${sort}`
      this.getData()
    },
    // 分页器：跳转至第一页
    goPageNo1() {
      this.searchData.pageNo = 1
    },
    // 分页器：跳转至尾页
    goPageNoEnd(totalPage) {
      this.searchData.pageNo = totalPage
    },
    // 分页器：跳转到点击的页码
    goPageNumber(pageNumber) {
      this.searchData.pageNo = pageNumber
    },
    // 分页器：上一页
    previousPage() {
      this.searchData.pageNo--
    },
    // 分页器：下一页
    nextPage() {
      this.searchData.pageNo++
    }
  },

  // 监视路由的变化。发送网络请求
  watch: {
    $route: {
      handler() {
        this.searchData = {
          ...this.searchData,
          ...this.$route.params,
          ...this.$route.query
        }
        this.getData()
      }
    }
  }
}

</script>

<style lang="less">
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .selector {
      border: 1px solid #ddd;
      margin-bottom: 5px;
      overflow: hidden;

      .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;

        .key {
          padding-bottom: 87px !important;
        }
      }

      .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;

        .key {
          width: 100px;
          background: #f1f1f1;
          line-height: 26px;
          text-align: right;
          padding: 10px 10px 0 15px;
          float: left;
        }

        .value {
          overflow: hidden;
          padding: 10px 0 0 15px;
          color: #333;
          margin-left: 120px;
          padding-right: 90px;

          .logo-list {
            li {
              float: left;
              border: 1px solid #e4e4e4;
              margin: -1px -1px 0 0;
              width: 105px;
              height: 52px;
              text-align: center;
              line-height: 52px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
              color: #e1251b;
              font-style: italic;
              font-size: 14px;

              img {
                max-width: 100%;
                vertical-align: middle;
              }
            }
          }

          .type-list {
            li {
              float: left;
              display: block;
              margin-right: 30px;
              line-height: 26px;

              a {
                text-decoration: none;
                color: #666;
              }
            }
          }
        }

        .ext {
          position: absolute;
          top: 10px;
          right: 10px;

          .sui-btn {
            display: inline-block;
            padding: 2px 14px;
            box-sizing: border-box;
            margin-bottom: 0;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #d5d5d5;
          }

          a {
            color: #666;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }

    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;

      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }

      .hot-list {
        padding: 15px;

        ul {
          display: flex;

          li {
            width: 25%;
            height: 100%;

            .list-wrap {

              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }

              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }

              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }

              .price {
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
