<template>
  <div class="foot" v-if="totalData > 0">
    <div class="sum">
      <div class="sum-num">共{{ totalData }}条纪录</div>
      <div class="position">第{{ nowPage }}/{{ totalPage }}页</div>
    </div>
    <div class="page">
      <el-pagination
        :current-page="nowPage"
        :total="totalData"
        :page-sizes="[10, 20, 30, 40]"
        popper-class="页"
        layout="prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footbar',
  props: [
    'currentPage',
    'maxPage',
    'total',
    'size'
  ],
  data () {
    return {
      nowPage: 1,
      totalPage: 1,
      totalData: 0,
      pageSize: 10
    }
  },
  watch: {
    currentPage (val) {
      if (isNaN(parseInt(val))) return
      this.nowPage = parseInt(val)
    },
    maxPage (val) {
      if (isNaN(parseInt(val))) return
      this.totalPage = parseInt(val)
    },
    total (val) {
      if (isNaN(parseInt(val))) return
      this.totalData = parseInt(val)
    },
    size (val) {
      if (isNaN(parseInt(val))) return
      this.pageSize = parseInt(val)
    }
  },
  methods: {
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.$emit('changePageSize', { size: val })
    },
    handleCurrentChange (val) {
      // 切换页码
      this.$emit('changePageCurrent', { page: val })
    }
  }
}
</script>
<style lang="scss" scoped>
.foot{
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  .sum{
    display: flex;
    line-height: 32px;
    .sum-num{
      margin-right: 5px;
    }
  }
}
</style>
