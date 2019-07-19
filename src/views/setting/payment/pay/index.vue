<template>
  <div class="main">
    <div class="info">
      <BonusHeadBar
        :selected="header.selectType"
        :list="header.list"/>
    </div>
    <div class="details">
      <div class="details-left">
        <el-table
          ref="table"
          :data="providerLists"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="provider" label="支付方式" align="left"/>
          <el-table-column label="状态" align="left">
            <template slot-scope="scope">
              <div :class="{'open': scope.row.isOpen}">{{ scope.row.isOpen ? '启用中' : '关闭' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isOpen"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="details-right">
        <div class="title">编辑配置</div>
        <div class="form">
          <div class="item">
            <div class="label">app_id</div>
            <div class="box">
              <el-input size="small" placeholder=""/>
            </div>
          </div>
          <div class="item">
            <div class="label">apikey</div>
            <div class="box">
              <el-input size="small" placeholder=""/>
            </div>
          </div>
          <div class="item">
            <div class="label">app_secret</div>
            <div class="box">
              <el-input size="small" placeholder=""/>
            </div>
          </div>
          <div class="item">
            <div class="label">mchid</div>
            <div class="box">
              <el-input size="small" placeholder=""/>
            </div>
          </div>
          <div class="item">
            <div class="label">&nbsp;</div>
            <div class="box">
              <el-button type="primary" size="small">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BonusHeadBar from '@/views/setting/components/headBar.vue'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    return {
      header: {
        selectType: 'payWay',
        list: [
          {
            text: '支付方式设置',
            type: 'payWay'
          }
        ]
      },
      providerLists: [],
      currentRow: null,
      currentIndex: 0
    }
  },
  mounted () {
    // 第一行选中
    this.$refs.table.setCurrentRow(this.providerLists[this.currentIndex])
  },
  methods: {
    handleCurrentChange (item) {
      this.currentRow = item
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
  .info{
    padding: 0;
  }
  .details{
    display: flex;
    padding: 40px 30px;
    .details-left{
      flex-grow: 1;
      min-width: 380px;
      margin-right: 30px;
      .open{
        color: #4993FF;
      }
    }
    .details-right{
      box-sizing: border-box;
      width: 440px;
      background-color: #F7F9FB;
      border: 1px solid #e8e8e8;
      .title{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 50px;
        padding: 0 30px;
        font-size: 14px;
        color: #4A4A4A;
        border-bottom: 1px solid #eee;
      }
      .form{
        padding: 30px 30px 0;
        overflow: hidden;
        .item{
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .label{
            width: 70px;
            margin-right: 15px;
            font-size: 14px;
            color: #333;
            text-align: right;
          }
          .box{
            flex-grow: 1;
          }
        }
      }
    }
  }
}
</style>
