<template>
  <div class="pagination">
    <button @click="previousPage" :disabled="pageNo <= 1">上一页</button>
    <button v-show="pageNumbers[0] > 1" @click="goPageNo1">1</button>
    <button v-show="pageNumbers[0] > 2" @click="">...</button>

    <button 
    v-for="pageNumber in pageNumbers" 
    @click="goPageNumber(pageNumber)"
    :class="{active: pageNo == pageNumber}"
    >{{ pageNumber }}</button>

    <button v-show="pageNumbers[pageNumbers.length - 1] < totalPage - 1">···</button>
    <button v-show="pageNumbers[pageNumbers.length - 1] < totalPage" @click="goPageNoEnd">{{ totalPage }}</button>
    <button @click="nextPage" :disabled="pageNo >= totalPage">下一页</button>
    <button style="margin-left: 30px" >共 {{ totalPage }} 页</button>
  </div>
</template>

<script>
// pageNo: 当前的页码
// pageSize: 每一页展示多少条数据
// total: 一共展示多少条数据
// continues: 连续页码的个数
  export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],

    computed: {
      // 计算一共需要多少页来获取总页数
      totalPage() {
        return Math.ceil(this.total/this.pageSize);
      },
      
      //计算展示的页码
      pageNumbers() {
        let pageNumberArr = []
        // 获取开始页数和结束页数
        let startNumber = this.pageNo - parseInt(this.continues/2)
        let endNumber = this.pageNo + parseInt(this.continues/2)
        // 让开始页数不小于1，且结束页数不大于总页数
        if(startNumber < 1) {
          startNumber = 1
          endNumber = this.continues
        } else if(endNumber > this.totalPage) {
          startNumber = (this.totalPage - this.continues) +1
          endNumber = this.totalPage
        }
        
        for(let i = startNumber; i <= endNumber; i++) {
          pageNumberArr.push(i)
        }

        return pageNumberArr
      }
      
    },
    methods: {
      // 跳转到第一页
      goPageNo1() {
        this.$emit('goPageNo1')
      },
      // 跳转到尾页
      goPageNoEnd() {
        this.$emit('goPageNoEnd', this.totalPage)
      },
      // 跳转到点击的页码
      goPageNumber(pageNumber) {
        this.$emit('goPageNumber', pageNumber)
      },
      // 上一页
      previousPage() {
        this.$emit('previousPage')
      },
      // 下一页
      nextPage() {
        this.$emit('nextPage')
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    margin-bottom: 20px;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
