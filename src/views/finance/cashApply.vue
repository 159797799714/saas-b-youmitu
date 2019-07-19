<template>
  <div class="main">
    <div class="info">提现申请管理</div>
    <div class="main-info">
      <div class="header">
        <div>
        </div>
        <div class="head-info">
          <el-select v-model="status" placeholder="审核状态" size="small" class="select-frame">
            <el-option
              v-for="item in chargedStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </div>
      </div>
      <div class="table-info">
        <el-table
          v-if="orderTable"
          ref="multipleTable"
          :data="orderTable"
          id="out-table"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="申请人ID/姓名">
            <template slot-scope="scope">
              {{ scope.row.user_id ? scope.row.user_id : '' }}/{{ scope.row.user_realname }}
            </template>
          </el-table-column>
          <el-table-column prop="user_mobile" label="手机号"/>
          <el-table-column prop="user_level" label="用户等级"/>
          <el-table-column prop="amount_text" label="提现金额"/>
          <el-table-column prop="fee_text" label="提现手续费"/>
          <el-table-column prop="transfer_amount_text" label="实际打款金额"/>
          <el-table-column prop="created_at" label="提现申请时间"/>
          <el-table-column prop="updated_at" label="审核时间"/>
          <el-table-column prop="status_text" label="打款状态"/>
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
import { cashApplyList, cashApplyStatus } from '@/api/finance'
import { exportExcel } from '@/utils/excel'  // 导出excel表格
export default {
  data () {
    return {
      restaurants: [],
      state3: '',
      requestData: {
        page: 1,
        number: 10
      },
      stat: {},
      orderTable: [],
      chargedStatus: [],
      status: '',
      paymentStatus: [
        {
          name: '已收款',
          value: 0
        },
        {
          name: '未收款',
          value: 1
        },
        {
          name: '收款异常',
          value: 2
        }
      ],
      paymentStatusChecked: '',
      dateArr: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created () {
    // 获取提现申请管理列表
    this.getTableList()
    // 获取审核状态选项
    cashApplyStatus().then(res => {
      // console.log(res.data.data)
      this.chargedStatus = res.data.data.status
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    status (val, oldval) {
      this.requestData.status = val
      this.getTableList()
    }
  },
  methods: {
    // 导出excel
    outExcel (idName, excelName) {
      // console.log(idName, excelName)
      exportExcel(idName, excelName)
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect (item) {
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    // 获取表格数据
    getTableList () {
      cashApplyList(this.requestData).then(res => {
        this.orderTable = res.data.data
        this.stat = res.data.stat
      }).catch(err => {
        console.log(err)
      })
    },
    gotoDetail (index, id) {
      this.$router.push({ name: 'applyDetail', query: { id: id, transfer_type: this.typeList } })
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
