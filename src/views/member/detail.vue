<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="header" v-if="userDetail">
      <div class="head-top">
        <div class="info-span">
          <div class="user-img">
            <img v-if="userDetail.avatar_url" :src="userDetail.avatar_url">
          </div>
          <div class="sum">
            <p class="name">{{ userDetail.nickname }}</p>
            <p class="id">用户ID：{{ userDetail.id }}</p>
          </div>
        </div>
        <div>
          <el-button size="small" @click="changeParent">变更上级</el-button>
          <el-button size="small" @click="changeLevel">升降级</el-button>
          <el-button v-if="userDetail.status === 1" size="small" type="danger" @click="freezeMember">冻结账户</el-button>
          <el-button v-else size="small" type="warning" @click="unfreezeMember">解冻用户</el-button>
          <el-button v-if="false" size="small" type="primary" @click="changeBalance">充扣值</el-button>
        </div>
      </div>
      <div class="header-info">
        <div class="item">
          <p class="tag">当前账户余额</p>
          <p>¥{{ (userDetail.balance / 100).toFixed(2) }}</p>
        </div>
        <div class="item">
          <p class="tag">已提现收益</p>
          <p>¥{{ (userDetail.withdraw_amout_account / 100).toFixed(2) }}</p>
        </div>
        <div class="item">
          <p class="tag">总收益</p>
          <p>¥{{ (userDetail.total_income / 100).toFixed(2) }}</p>
        </div>
      </div>
      <div class="subnav">
        <el-tabs v-model="subSelectType" @tab-click="subAction">
          <el-tab-pane v-for="(item, index) in subList" :key="index" :label="item.text" :name="item.type"/>
        </el-tabs>
      </div>
    </div>
    <div class="main-info" v-if="userDetail">
      <!-- 基本信息 -->
      <div v-show="subSelectType === 'base'" class="center-info">
        <div class="info-title">基本资料</div>
        <div class="info-lists">
          <!-- <div class="item">
            <div class="tag">用户名称</div>
            <div class="data">{{ userDetail.nickname }}</div>
          </div> -->
          <div class="item">
            <div class="tag">真实姓名</div>
            <div class="data">{{ userDetail.realname || '未实名' }}</div>
          </div>
          <div class="item">
            <div class="tag">所属地区</div>
            <div class="data">{{ userDetail.address }}</div>
          </div>
          <div class="item">
            <div class="tag">用户ID</div>
            <div class="data">{{ userDetail.id }}</div>
          </div>
          <div class="item">
            <div class="tag">手机号码</div>
            <div class="data">{{ userDetail.mobile }}</div>
          </div>
          <div class="item">
            <div class="tag">用户等级</div>
            <div class="data">{{ userDetail.level_id_text }}</div>
          </div>
          <div class="item">
            <div class="tag">微信号</div>
            <div class="data">{{ userDetail.wx_account || '未设置微信号' }}</div>
          </div>
          
          <div class="item">
            <div class="tag">注册时间</div>
            <div class="data">{{ userDetail.created_at }}</div>
          </div>
          <div class="item">
            <div class="tag">身份证号</div>
            <div class="data">{{ userDetail.id_card || '未实名' }}</div>
          </div>
          <div class="item">
            <div class="tag">上级等级</div>
            <div class="data">{{ userParent.level_id_text ? userParent.level_id_text : '平台' }}</div>
          </div>
          <div class="item">
            <div class="tag">上级ID</div>
            <div class="data">{{ userParent.id ? userParent.id : '平台' }}</div>
          </div>
          <div class="item">
            <div class="tag">上级手机</div>
            <div class="data">{{ userParent.id ? userParent.mobile : '平台' }}</div>
          </div>
        </div>
      </div>
      <!-- 资金明细 -->
      <div v-show="subSelectType === 'balance'">
        <div class="main-head">
          <div>
            <!-- <el-button type="primary" size="small">导出CVS</el-button> -->
          </div>
          <div class="head-info">
            <el-input size="small" placeholder="搜索收支类型/来源/金额" class="input-with-select search-icon">
              <el-button slot="append" icon="el-icon-search"/>
            </el-input>
          </div>
        </div>
        <div class="table-box">
          <el-table
            :data="balanceList"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="created_at" label="时间" show-overflow-tooltip/>
            <el-table-column prop="from_type_text" label="收支类型" show-overflow-tooltip/>
            <el-table-column prop="from_id" label="来源" show-overflow-tooltip/>
            <el-table-column prop="type_text" label="账户收支">
              <template slot-scope="scope">
                <div :class="{'status': true, 'status-in': scope.row.type === 1, 'status-out': scope.row.type === 2}">{{ scope.row.type_text }}</div>
              </template>
            </el-table-column>
            <el-table-column label="变动金额">
              <template slot-scope="scope">
                <div :class="{'status': true, 'status-in': scope.row.type === 1, 'status-out': scope.row.type === 2}">{{ (scope.row.type === 1 ? '+' : '-') + (scope.row.amount / 100).toFixed(2) }}</div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <Footbar :currentPage="balancePage" :maxPage="balancePageMax" :total="balanceTotal" :size="balanceNumber" @changePageSize="(val) => changePageSize(val, 'balance')" @changePageCurrent="(val) => changePageCurrent(val, 'balance')"/>
        </div>
      </div>
      <!-- 锁粉信息 -->
      <div v-show="subSelectType === 'lock'">
        <div class="table-box">
          <el-table
            :data="lockList"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="id" label="用户ID"/>
            <!-- <el-table-column prop="nickname" label="用户名称" show-overflow-tooltip/> -->
            <el-table-column prop="realname" label="姓名"/>
            <el-table-column prop="mobile" label="手机号" show-overflow-tooltip/>
            <el-table-column prop="level_id_text" label="角色" show-overflow-tooltip/>
          </el-table>
          <!-- 分页 -->
          <Footbar :currentPage="lockPage" :maxPage="lockPageMax" :total="lockTotal" :size="lockNumber" @changePageSize="(val) => changePageSize(val, 'lock')" @changePageCurrent="(val) => changePageCurrent(val, 'lock')"/>
        </div>
      </div>
      <!-- 商户信息 -->
      <div v-if="false" v-show="subSelectType === 'business'" class="center-info">
        <div class="info-title">商户信息</div>
        <div class="info-lists info-lists-2">
          <div class="item">
            <div class="tag">店铺名称</div>
            <div class="data">咔咔新零售</div>
          </div>
          <div class="item">
            <div class="tag">法人姓名</div>
            <div class="data">刘德华</div>
          </div>
          <div class="item">
            <div class="tag">店铺地址</div>
            <div class="data">深圳市华强北F101</div>
          </div>
          <div class="item">
            <div class="tag">身份证号</div>
            <div class="data">421036199810698516</div>
          </div>
        </div>
      </div>
      <!-- 信用卡/储蓄卡 -->
      <div v-show="subSelectType === 'card'">
        <div class="table-box">
          <div class="info-title">信用卡</div>
          <el-table
            :data="creditcardList"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="holder_name" label="持卡人姓名"/>
            <el-table-column prop="account_no" label="信用卡卡号" />
            <el-table-column prop="holder_telephone" label="预留手机号" />
            <el-table-column prop="bank_name" label="银行名称" show-overflow-tooltip/>
            <el-table-column prop="expire_date" label="有效期" show-overflow-tooltip/>
            <el-table-column prop="repayment_day" label="还款日" show-overflow-tooltip/>
            <el-table-column label="卡片额度">
              <template slot-scope="scope">
                <div>{{ (scope.row.amount / 100).toFixed(2) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" label="添加时间" show-overflow-tooltip/>
          </el-table>
          <!-- 分页 -->
          <Footbar :currentPage="creditcardPage" :maxPage="creditcardPageMax" :total="creditcardTotal" :size="creditcardNumber" @changePageSize="(val) => changePageSize(val, 'creditcard')" @changePageCurrent="(val) => changePageCurrent(val, 'creditcard')"/>
        </div>
        <div class="table-box">
          <div class="info-title">储蓄卡</div>
          <el-table
            :data="depositcardList"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="realname" label="持卡人姓名"/>
            <el-table-column prop="card_number" label="银行卡号" />
            <el-table-column prop="bank_name" label="银行名称" show-overflow-tooltip/>
            <el-table-column prop="bank_code" label="银行信息" show-overflow-tooltip/>
            <el-table-column prop="created_at" label="添加时间" show-overflow-tooltip/>
          </el-table>
          <!-- 分页 -->
          <Footbar :currentPage="depositcardPage" :maxPage="depositcardPageMax" :total="depositcardTotal" :size="depositcardNumber" @changePageSize="(val) => changePageSize(val, 'depositcard')" @changePageCurrent="(val) => changePageCurrent(val, 'depositcard')"/>
        </div>
      </div>
      <!-- 无卡支付订单 -->
      <div v-if="false" v-show="subSelectType === 'notcardOrder'">
        <div class="main-head">
          <div>
            <!-- <el-button type="primary" size="small">导出CVS</el-button> -->
          </div>
          <div class="head-info">
            <el-input size="small" placeholder="搜索收支类型/来源/金额" class="input-with-select search-icon">
              <el-button slot="append" icon="el-icon-search"/>
            </el-input>
          </div>
        </div>
        <div class="table-box">
          <el-table
            :data="notcardOrderList"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="ID" label="订单编号"/>
            <el-table-column prop="name" label="通道别称"/>
            <el-table-column prop="name" label="交易金额"/>
            <el-table-column prop="address" label="交易费率"/>
            <el-table-column prop="address" label="到账金额"/>
            <el-table-column prop="address" label="申请时间"/>
            <el-table-column prop="address" label="扣款状态"/>
            <el-table-column label="操作">
              <template>
                <el-button size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <Footbar/>
        </div>
      </div>
      <!-- 代还订单 -->
      <div v-show="subSelectType === 'repayOrder'">
        <div class="main-head">
          <div>
            <!-- <el-button type="primary" size="small">导出CVS</el-button> -->
          </div>
          <div class="head-info">
            <el-input size="small" placeholder="搜索收支类型/来源/金额" class="input-with-select search-icon">
              <el-button slot="append" icon="el-icon-search"/>
            </el-input>
          </div>
        </div>
        <div class="table-box">
          <el-table
            :data="repayOrderList"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column prop="id" label="计划还款编号"/>
            <el-table-column prop="gateway_alias" label="通道别称"/>
            <el-table-column label="信用卡号">
              <template slot-scope="scope">
                <div>{{ scope.row.credit_card ? scope.row.credit_card.account_no : '-' }}</div>
              </template>
            </el-table-column>
            <el-table-column label="代还金额">
              <template slot-scope="scope">
                <div>{{ (scope.row.settlement_amount / 100).toFixed(2) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="settlement_count" label="还款总笔数"/>
            <el-table-column prop="created_at" label="计划创建时间"/>
            <el-table-column prop="start_date" label="还款开始时间"/>
            <el-table-column prop="end_date" label="还款结束时间"/>
            <el-table-column label="计划状态">
              <template slot-scope="scope">
                <div class="status status-0" v-if="scope.row.status === 0">执行中</div>
                <div class="status status-1" v-if="scope.row.status === 1">已完成</div>
                <div class="status status-2" v-if="scope.row.status === 2">取消还款</div>
                <div class="status status-3" v-if="scope.row.status === 3">还款失败</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" @click="showRepayOrderDetail(scope.row.id)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <Footbar :currentPage="repayOrderPage" :maxPage="repayOrderPageMax" :total="repayOrderTotal" :size="repayOrderNumber" @changePageSize="(val) => changePageSize(val, 'repayOrder')" @changePageCurrent="(val) => changePageCurrent(val, 'repayOrder')"/>
        </div>
      </div>
    </div>
    <el-dialog v-if="userDetail" class="dialog" title="是否冻结该用户？" :visible.sync="freezePop">
      <div class="box">
        <el-radio-group v-model="checkAccountStatus">
          <el-radio :label="item.value" v-for="(item, index) in accountStatus" :key="index">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div class="box">
        <el-input v-model="congealRemark" placeholder="请输入冻结备注" size="small"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="freezePop = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmFreezeMember">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="userDetail" class="dialog" title="变更上级" :visible.sync="changeParentPop">
      <div class="box">
        当前上级为：{{ userParent.id ? userParent.nickname : '平台' }}
      </div>
      <div class="box">
        <el-input v-model="changeParentValue" placeholder="请输入要变更的直接上级ID"/>
      </div>
      <div class="box">
        <div class="tips">变更上级后，当前会员旗下会员同时随之全部变更</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="changeParentPop = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmChangeParent">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="userDetail" class="dialog" title="升降级" :visible.sync="changeLevelPop">
      <div class="box">
        当前角色等级：{{ userDetail.level_id_text }}
      </div>
      <div class="box">
        <el-select v-model="roleStatusChecked" placeholder="请选择" size="small">
          <el-option
            v-for="item in roleStatus"
            :key="item.value"
            :label="item.name"
            :value="item.value"/>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="changeLevelPop = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmChangeLevel">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="userDetail" class="dialog" title="充扣值" :visible.sync="changeMemberBalancePop">
      <div class="box">
        <el-select v-model="changeMemberBalanceChecked" placeholder="请选择" size="small">
          <el-option
            v-for="item in changeMemberBalanceList"
            :key="item.value"
            :label="item.name"
            :value="item.value"/>
        </el-select>
      </div>
      <div class="box">
        <el-input v-model="changeMemberBalanceNumber" placeholder="金额" size="small"/>
      </div>
      <div class="box">
        <div class="tips txr">代理账户余额：{{ this.userDetail.balance }}元</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="changeMemberBalancePop = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmChangeBalace">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Footbar from '@/components/pagination/index.vue'
import { getMemberDetail, getStatusList, memberFreeze, memberChangeParent, getRolerList, memberChangeLevel, getMemberBalance, getMemberLockList, getMemberCreditcardList, getMemberDepositcardList } from '@/api/member'
import { getRepayPlanList } from '@/api/order'

export default {
  components: {
    Footbar
  },
  data () {
    return {
      subList: [
        {
          text: '基本信息',
          type: 'base'
        },
        {
          text: '资金明细',
          type: 'balance'
        },
        {
          text: '锁粉信息',
          type: 'lock'
        },
        {
          text: '信用卡/储蓄卡',
          type: 'card'
        },
        {
          text: '代还计划',
          type: 'repayOrder'
        }
      ],                                                                                                // tab列表
      subSelectType: 'base',                                                                            // 当前选中的tab的type值
      userId: '',                                                                                       // 用户id
      userDetail: null,                                                                                 // 用户详情数据
      userParent: null,                                                                                 // 上级用户数据
      balancePage: 1,                                                                                   // 资金明细分页-当前页
      balancePageMax: 1,                                                                                // 资金明细分页-最大页
      balanceNumber: 10,                                                                                // 资金明细分页-每页显示的条数
      balanceTotal: 0,                                                                                  // 资金明细分页-总条数
      balanceList: [],                                                                                  // 资金明细数据列表
      lockPage: 1,                                                                                      // 锁粉信息分页-当前页
      lockPageMax: 1,                                                                                   // 锁粉信息分页-最大页
      lockNumber: 10,                                                                                   // 锁粉信息分页-每页显示的条数
      lockTotal: 0,                                                                                     // 锁粉信息分页-总条数
      lockList: [],                                                                                     // 锁粉信息数据列表
      creditcardPage: 1,                                                                                // 信用卡分页-当前页
      creditcardPageMax: 1,                                                                             // 信用卡分页-最大页
      creditcardNumber: 10,                                                                             // 信用卡分页-每页显示的条数
      creditcardTotal: 0,                                                                               // 信用卡分页-总条数
      creditcardList: [],                                                                               // 信用卡数据列表
      depositcardPage: 1,                                                                               // 储蓄卡分页-当前页
      depositcardPageMax: 1,                                                                            // 储蓄卡分页-最大页
      depositcardNumber: 10,                                                                            // 储蓄卡分页-每页显示的条数
      depositcardTotal: 0,                                                                              // 储蓄卡分页-总条数
      depositcardList: [],                                                                              // 储蓄卡数据列表
      notcardOrderList: [],                                                                             // 无卡支付订单列表
      repayOrderPage: 1,                                                                                // 代还订单分页-当前页
      repayOrderPageMax: 1,                                                                             // 代还订单分页-最大页
      repayOrderNumber: 10,                                                                             // 代还订单分页-每页显示的条数
      repayOrderTotal: 0,                                                                               // 代还订单分页-总条数
      repayOrderList: [],                                                                               // 代还订单列表
      freezePop: false,                                                                                 // 控制冻结用户的弹窗
      accountStatus: [],                                                                                // 用户状态的列表，在冻结用户的弹窗展示
      checkAccountStatus: '',                                                                           // 选中的用户状态，在冻结用户的弹窗选中
      congealRemark: '',                                                                                // 冻结备注输入框的值
      changeParentPop: false,                                                                           // 改变用户上级的弹窗
      changeParentValue: '',                                                                            // 输入的新的上级id
      changeLevelPop: false,                                                                            // 控制改变用户等级的弹窗
      roleStatus: [],                                                                                   // 所有的用户等级列表，在改变上级的弹窗展示
      roleStatusChecked: -1,                                                                            // 选中的用户等级，在改变上级的弹窗选中
      changeMemberBalancePop: false,                                                                    // 控制充值扣款的弹窗
      changeMemberBalanceList: [                                                                        // 选择操作类型，在充值扣款的弹窗选择
        {
          value: -1,
          name: '请选择充值或扣款'
        },
        {
          value: 1,
          name: '充值'
        },
        {
          value: 2,
          name: '扣款'
        }
      ],
      changeMemberBalanceChecked: -1,                                                                   // 选中的类型，在充值扣款的弹窗选中
      changeMemberBalanceNumber: ''                                                                     // 输入充值扣款的金额，在充值扣款的弹窗中输入
    }
  },
  created () {
    this.userId = this.$route.query.id
    // 会员详情
    this.getMemberDetail()
    // 资金明细
    this.getBalanceList()
    // 锁粉信息
    this.getLockList()
    // 信用卡
    this.getCreditcardList()
    // 储蓄卡
    this.getDepositcardList()
    // 代还订单
    this.getRepayOrder()
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    subAction (tab) {
      this.subSelectType = tab.name
    },
    getMemberDetail () {
      // 获取用户详情
      getMemberDetail({
        user_id: this.userId
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.userDetail = res.data.data.user
          this.userParent = res.data.data.parent
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取会员详情失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    freezeMember () {
      // 冻结用户弹窗
      if (this.accountStatus.length <= 0) {
        // 获取账户状态
        getStatusList().then(res => {
          if (res.data && res.data.code === 0) {
            for (const key in res.data.data) {
              if (parseInt(key) !== 1) this.$set(this.accountStatus, this.accountStatus.length, { name: res.data.data[key], value: key })
            }
            if (this.accountStatus.length > 0) this.checkAccountStatus = this.accountStatus[0].value
            this.freezePop = true
          } else {
            this.$message({
              message: '获取帐号状态列表失败',
              type: 'warning',
              duration: 500
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.freezePop = true
        if (this.accountStatus.length > 0) this.checkAccountStatus = this.accountStatus[0].value
      }
    },
    confirmFreezeMember () {
      // 确认冻结用户
      this.freezePop = false
      this.congealRemark = ''
      memberFreeze({
        user_ids: [this.userDetail.id],
        status: this.checkAccountStatus
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getMemberDetail()
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '操作失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    unfreezeMember () {
      // 解冻用户
      this.$confirm('确认解冻该用户吗？', '解冻用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        memberFreeze({
          user_ids: [this.userDetail.id],
          status: 1
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getMemberDetail()
          } else {
            this.$message.error(res.data && res.data.message ? res.data.message : '操作失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {})
    },
    changeParent () {
      // 更改上级弹窗
      this.changeParentValue = ''
      this.changeParentPop = true
    },
    confirmChangeParent () {
      // 确认更改上级
      this.changeParentPop = false
      memberChangeParent({
        user_id: this.userDetail.id,
        new_pid: this.changeParentValue
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getMemberDetail()
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '操作失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeLevel () {
      // 更改用户等级
      if (this.roleStatus.length <= 0) {
        // 获取角色列表
        getRolerList().then(res => {
          if (res.data && res.data.code === 0) {
            res.data.data.forEach(item => {
              this.$set(this.roleStatus, this.roleStatus.length, { name: item.name, value: item.id })
            })
            if (this.roleStatus.length > 0) this.roleStatusChecked = this.roleStatus[0].value
            this.changeLevelPop = true
          } else {
            this.$message({
              message: '获取角色列表失败',
              type: 'warning'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        if (this.roleStatus.length > 0) this.roleStatusChecked = this.roleStatus[0].value
        this.changeLevelPop = true
      }
    },
    confirmChangeLevel () {
      // 确认改变用户等级
      this.changeLevelPop = false
      memberChangeLevel({
        user_id: this.userDetail.id,
        level_id: this.roleStatusChecked
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getMemberDetail()
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '操作失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeBalance () {
      // 充值扣款弹窗
      this.changeMemberBalanceChecked = -1
      this.changeMemberBalanceNumber = ''
      this.changeMemberBalancePop = true
    },
    confirmChangeBalace () {
      // 确认充值或者扣款
      this.changeMemberBalancePop = false
    },
    getBalanceList () {
      // 获取资金明细
      getMemberBalance({
        user_id: this.userId,
        page: this.balancePage,
        number: this.balanceNumber
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.balanceList = res.data.data
          this.balancePage = res.data.stat.page
          this.balanceNumber = res.data.stat.number
          this.balancePageMax = res.data.stat.total_page
          this.balanceTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取资金明细失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getLockList () {
      // 获取锁粉列表
      getMemberLockList({
        user_id: this.userId,
        page: this.lockPage,
        number: this.lockNumber
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.lockList = res.data.data
          this.lockPage = res.data.stat.page
          this.lockNumber = res.data.stat.number
          this.lockPageMax = res.data.stat.total_page
          this.lockTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取锁粉列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCreditcardList () {
      // 获取信用卡列表
      getMemberCreditcardList({
        user_id: this.userId
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.creditcardList = res.data.data
          this.creditcardPage = res.data.stat.page
          this.creditcardNumber = res.data.stat.number
          this.creditcardPageMax = res.data.stat.total_page
          this.creditcardTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取信用卡列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDepositcardList () {
      // 获取储蓄卡列表
      getMemberDepositcardList({
        user_id: this.userId
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.depositcardList = res.data.data
          this.depositcardPage = res.data.stat.page
          this.depositcardNumber = res.data.stat.number
          this.depositcardPageMax = res.data.stat.total_page
          this.depositcardTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取储蓄卡列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getRepayOrder () {
      // 获取代还订单
      getRepayPlanList({
        user_id: this.userId
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.repayOrderList = res.data.data
          this.repayOrderPage = res.data.stat.page
          this.repayOrderNumber = res.data.stat.number
          this.repayOrderPageMax = res.data.stat.total_page
          this.repayOrderTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取代还订单失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showRepayOrderDetail (id) {
      // 查看代还计划详情
      this.$router.push({ name: 'repaymentPlanDetails', query: { id: id } })
    },
    changePageSize (val, type) {
      // 分页选择每页显示多少条数据
      switch (type) {
        case 'balance':
          this.balanceNumber = val.size
          this.balancePage = 1
          this.getBalanceList()
          break
        case 'lock':
          this.lockNumber = val.size
          this.lockPage = 1
          this.getLockList()
          break
        case 'creditcard':
          this.creditcardNumber = val.size
          this.creditcardPage = 1
          this.getCreditcardList()
          break
        case 'depositcard':
          this.depositcardNumber = val.size
          this.depositcardPage = 1
          this.getDepositcardList()
          break
        case 'repayOrder':
          this.repayOrderNumber = val.size
          this.repayOrderPage = 1
          this.getRepayOrder()
          break
      }
    },
    changePageCurrent (val, type) {
      // 分页选择的页码
      switch (type) {
        case 'balance':
          this.balancePage = val.page
          this.getBalanceList()
          break
        case 'lock':
          this.lockPage = val.page
          this.getLockList()
          break
        case 'creditcard':
          this.creditcardPage = val.page
          this.getCreditcardList()
          break
        case 'depositcard':
          this.depositcardPage = val.page
          this.getDepositcardList()
          break
        case 'repayOrder':
          this.repayOrderPage = val.page
          this.getRepayOrder()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$font-color: #4a4a4a;
$border: 1px solid #EBEBEB;
$color: #4993FF;
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .header{
    position: relative;
    padding: 20px 26px;
    padding-bottom: 0;
    margin-top: 1px;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;
    // 字体加粗
    .sum{
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      .id{
        font-size: 14px;
        font-weight: normal;
        line-height: 20px;
      }
    }
    .head-top{
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      .info-span{
        display: flex;
        align-items: center;
        .user-img{
          margin-right: 10px;
          height: 48px;
          width: 48px;
          border-radius: 100%;
          overflow: hidden;
          border: 1px solid #4993FF;
          &>img{
            height: 48px;
            width: 48px;
          }
        }
      }
    }
    .header-info{
      padding-left: 58px;
      margin-bottom: 30px;
      display: flex;
      .item{
        flex-grow: 1;
        max-width: 170px;
        margin-right: 20px;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        .tag{
          margin-bottom: 14px;
          font-size: 14px;
          font-weight: normal;
          line-height: 20px;
        }
      }
    }
    .subnav{
      padding-bottom: 1px;
    }
  }
  .main-info{
    flex: 1;
    background: #fff;
    .center-info{
      padding: 16px;
    }
    .main-head {
      display: flex;
      justify-content: space-between;
      div {
        min-width: 200px;
        overflow: hidden;
      }
      .head-info {
        margin-bottom: 16px;
      }
      .search-icon {
        width: 300px;
        float: right;
        margin-left: 16px;
      }
    }
    .info-title{
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: $font-color;
    }
    .info-lists{
      display: flex;
      flex-wrap: wrap;
      .item{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 33.33%;
        height: 40px;
        padding-right: 20px;
        margin-bottom: 10px;
        font-size: 14px;
        color: #666;
        overflow: hidden;
        .tag{
          width: 80px;
          margin-right: 20px;
          white-space: nowrap;
        }
        .data{
          flex-grow: 1;
          font-weight: 600;
          color: #333;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      &.info-lists{
        .item{
          width: calc(100% / 3);
        }
      }
    }
    .table-box{
      margin-bottom: 30px;
      .info-title{
        font-size: 14px;
        line-height: 20px;
      }
      .status{
        &.status-in{
          color: #52C41A;
        }
        &.status-out{
          color: #F85E5E;
        }
      }
    }
  }
}
.el-table{
  .status{
    &.status-0{
      color: #0067FF;
    }
    &.status-1{
      color: #65C200;
    }
    &.status-2{
      color: #FF1111;
    }
    &.status-3{
      color: #FF1111;
    }
  }
}
.dialog{
  .box{
    margin-bottom: 20px;
    .tips{
      color: #F85E5E;
      &.txr{
        text-align: right;
      }
    }
  }
}
</style>
<style scoped>
  >>> .subnav .el-tabs__header{
    margin-bottom: 0;
  }
  >>> .subnav .is-active{
    background-color: transparent;
  }
  >>> .subnav .el-tabs__nav-wrap::after{
    display: none;
  }
</style>
