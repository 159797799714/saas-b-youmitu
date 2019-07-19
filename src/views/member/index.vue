<template>
  <div class="main">
    <div class="info">会员管理</div>
    <div class="main-info">
      <div class="header">
        <div>
          <!-- <el-button type="primary" size="small">导出CVS</el-button> -->
          <el-button size="small" v-if="false">批量操作</el-button>
        </div>
        <div class="head-info">
          <el-select v-model="accountStatusChecked" placeholder="账户状态" size="small" class="select-frame">
            <el-option
              v-for="item in accountStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"/>
          </el-select>
          <el-select v-model="roleStatusChecked" placeholder="角色列表" size="small" class="select-frame">
            <el-option
              v-for="item in roleStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"/>
          </el-select>
          <el-date-picker
            v-model="dateArr"
            :picker-options="pickerOptions"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="center"
            size="small"/>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="memberList"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="用户ID/姓名" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.id }}/{{ scope.row.realname ? scope.row.realname: '' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" show-overflow-tooltip/>
        <el-table-column prop="level_id_text" label="角色等级" show-overflow-tooltip/>
        <el-table-column label="上级ID">
          <template slot-scope="scope">
            <div>{{ scope.row.pid === 0 ? '平台': scope.row.pid }}</div>
          </template>
        </el-table-column>
        <el-table-column label="总收益">
          <template slot-scope="scope">
            <div>{{ scope.row.total_income? (scope.row.total_income / 100).toFixed(2) : '0' }}元</div>
          </template>
        </el-table-column>
        <el-table-column label="账户余额">
          <template slot-scope="scope">
            <div>{{ scope.row.balance? (scope.row.balance / 100).toFixed(2) : '0' }}元</div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间"/>
        <el-table-column label="账户状态">
          <template slot-scope="scope">
            <div :class="['status', 'status-' + scope.row.status]">{{ scope.row.status_text }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="gotoDetail(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <Footbar :currentPage="memberPage" :maxPage="memberPageMax" :total="memberTotal" :size="memberNumber" @changePageSize="changePageSize" @changePageCurrent="changePageCurrent"/>
    </div>
  </div>
</template>
<script>
import Footbar from '@/components/pagination/index.vue'
import { getMemberList, getRolerList, getStatusList } from '@/api/member'

export default {
  components: {
    Footbar
  },
  data () {
    return {
      memberPage: 1,                                                        // 当前页数
      memberPageMax: 1,                                                     // 最大页数
      memberNumber: 10,                                                     // 每页显示的条数
      memberTotal: 0,                                                       // 总条数
      memberList: [],                                                       // 用户数据列表
      accountStatus: [                                                      // 帐号的状态列表，用于筛选
        {
          name: '账户状态',
          value: -1
        }
      ],
      accountStatusChecked: -1,                                             // 筛选的账户状态id值
      roleStatus: [                                                         // 角色等级列表，用户筛选
        {
          name: '全部用户',
          value: -1
        }
      ],
      roleStatusChecked: -1,                                                // 筛选的角色等级id值
      dateArr: '',                                                          // 筛选的日期
      pickerOptions: {                                                      // 筛选日期的配置
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
    // 获取用户列表
    this.getList()
    // 获取角色列表
    getRolerList().then(res => {
      if (res.data && res.data.code === 0) {
        res.data.data.forEach(item => {
          this.$set(this.roleStatus, this.roleStatus.length, { name: item.name, value: item.id })
        })
      } else {
        this.$message({
          message: '获取角色列表失败',
          type: 'warning',
          duration: 1000
        })
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取账户状态列表
    getStatusList().then(res => {
      if (res.data && res.data.code === 0) {
        for (const key in res.data.data) {
          this.$set(this.accountStatus, this.accountStatus.length, { name: res.data.data[key], value: key })
        }
      } else {
        this.$message({
          message: '获取帐号状态列表失败',
          type: 'warning'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    getList () {
      // 获取会员列表
      getMemberList({
        page: this.memberPage,
        number: this.memberNumber
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.memberList = res.data.data
          this.memberPage = res.data.stat.page
          this.memberPageMax = res.data.stat.total_page
          this.memberNumber = res.data.stat.number
          this.memberTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取会员列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changePageSize (val) {
      // 分页选择每页显示多少条数据
      this.memberNumber = val.size
      this.memberPage = 1
      this.getList()
    },
    changePageCurrent (val) {
      // 分页选择的页码
      this.memberPage = val.page
      this.getList()
    },
    gotoDetail (id) {
      // 跳转到详情页
      this.$router.push({ name: 'detail', query: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/views/member/common/common.scss";
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    .head-info {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
      &> div {
        flex-grow: 1;
        margin: 0 8px;
        overflow: hidden;
      }
    }
    .search-icon {
      width: 300px;
      margin-left: 16px;
    }
  }
}
.select-frame{
  max-width: 110px !important;
}
.el-table{
  .status{
    &.status-1{
      color: #4A4A4A;
    }
    &.status-0{
      color: #FF4158;
    }
    &.status-2{
      color: #FF4158;
    }
  }
}
</style>
