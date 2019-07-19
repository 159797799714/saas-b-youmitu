<template>
  <div class="main">
    <div class="info">会员银行卡管理</div>
    <div class="main-info">
      <div class="header">
        <div>
        </div>
        <div class="head-info">
        </div>
      </div>
      <div class="table-info">
        <el-table
          v-if="bankList"
          ref="multipleTable"
          :data="bankList"
          id="out-table"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="申请人ID/姓名">
            <template slot-scope="scope">
              {{ scope.row.id ? scope.row.id : '' }}/{{ scope.row.realname }}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号"/>
          <el-table-column prop="bank_card_count" label="已绑储蓄卡"/>
          <el-table-column prop="credit_card_count" label="已绑信用卡"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="gotoDetail(scope.$index, scope.row.id)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot">
        <div class="sum">
          <div class="sum-num">共{{ stat.total_number }}条纪录</div>
          <div class="position">第{{ stat.page }}/{{ stat.total_page }}页</div>
        </div>
        <div class="page">
          <el-pagination
            :total="stat.total_number"
            :page-sizes="[10, 20, 30, 40]"
            popper-class="页"
            layout="prev, pager, next, sizes, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberBankList } from '@/api/finance'
import { exportExcel } from '@/utils/excel'
export default {
  data () {
    return {
      state3: '',
      requestData: {
        number: 10,
        page: 1
      },
      bankList: [],
      stat: {}
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    // 导出excel
    outExcel (idName, excelName) {
      exportExcel(idName, excelName)
    },
    // 获取表格数据
    getTableList () {
      memberBankList(this.requestData).then(res => {
        this.bankList = res.data.data
        this.stat = res.data.stat
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelect (item) {
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    // 详情
    gotoDetail (index, id) {
      this.$router.push({ name: 'memberCardDetail', query: { id: id } })
    },
    // 分页器事件
    handleSizeChange (val) {
      this.requestData.number = val
      this.getTableList()
    },
    handleCurrentChange (val) {
      this.requestData.page = val
      this.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .main-info{
    padding: 16px;
    .header{
      display: flex;
      justify-content: space-between;
      .head-info{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;
        &> div {
          margin-left: 16px;
          overflow: hidden;
        }
        .select-frame{
          max-width: 110px;
          background: #E8E8E8;
        }
        .select-time{
          max-width: 260px;
        }
      }
    }
  }
}
</style>
