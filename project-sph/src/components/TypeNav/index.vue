<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all"
      @mouseenter="mouseenterAll()"
      @mouseleave="mouseleaveAll()"
      >全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" 
      v-show="categoryShow || $route.meta.categoryShow"
      @mouseenter="mouseenterAll()"
      @mouseleave="mouseleaveAll()"
      >
        <div
          class="all-sort-list2"
          v-for="c1 in TypeNavList"
          :key="c1.categoryId"
          @click="goSearch"
          
        >
          <div class="item" >
            <h3>
              <a
                href="#"
                :data-categoryName="c1.categoryName"
                :data-categoryId1="c1.categoryId"
                >{{ c1.categoryName }}</a
              >
            </h3>
            <div class="item-list clearfix">
              <div
                class="subitem"
                v-for="c2 in c1.categoryChild"
                :key="c2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a
                      href="#"
                      :data-categoryName="c2.categoryName"
                      :data-categoryId="c2.categoryId"
                      >{{ c2.categoryName }}</a
                    >
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a
                        href="#"
                        :data-categoryName="c3.categoryName"
                        :data-categoryId3="c3.categoryId"
                      >
                        {{ c3.categoryName }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryShow: false
    };
  },

  methods: {
    goSearch(event) {
      // console.log(event.target.getAttribute('data-categoryName'));
      const categoryName = event.target.getAttribute("data-categoryName");
      const category1Id = event.target.getAttribute("data-categoryId1");
      const category2Id = event.target.getAttribute("data-categoryId2");
      const category3Id = event.target.getAttribute("data-categoryId3");

      let location = {name:'search'}
      let querys = {}

      if (categoryName) {
        querys.categoryName = categoryName
        if (category1Id) {
          querys.category1Id = category1Id;
        } else if (category2Id) {
          querys.category2Id = category2Id;
        } else {
          querys.category3Id = category3Id;
        }
      }

      location.query = querys

      if (this.$route.params) {
        location.params = this.$route.params
      }
      
      this.$router.push(location);
    },

    mouseenterAll() {
        this.categoryShow = true
    },
    mouseleaveAll() {
        this.categoryShow = false
    }
  },
  computed: {
      TypeNavList() {
        return this.$store.state.home.TypeNavList
      }
  }
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }

      .all-sort-list2:hover {
        background-color: skyblue;
      }
    }
  }
}
</style>