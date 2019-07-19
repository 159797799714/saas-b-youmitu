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
          <el-table-column prop="provider" label="通道名称" align="left"/>
          <el-table-column prop="rate" label="上游交易费率" align="left"/>
          <el-table-column label="状态" align="left">
            <template slot-scope="scope">
              <div :class="{'open': scope.row.isOpen}">{{ scope.row.isOpen ? '启用中' : '关闭' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" align="left">
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
            <div class="label">通道名称</div>
            <div class="box">
              <el-input size="small" placeholder=""/>
            </div>
          </div>
          <div class="item">
            <div class="label">上游交易费率</div>
            <div class="box">
              <el-input :disabled="true" size="small" placeholder=""/>
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
        selectType: 'nocardChannel',
        list: [
          {
            text: '无卡支付通道设置',
            type: 'nocardChannel'
          }
        ]
      },
      providerLists: [
        {
          provider: '汇付天下',
          rate: '0.06%+50元',
          isOpen: true
        },
        {
          provider: '一麻袋',
          rate: '0.06%+50元',
          isOpen: false
        },
        {
          provider: '金码付',
          rate: '0.06%+50元',
          isOpen: false
        }
      ],
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
    border-bottom: 1px solid $border-color;
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
            width: 90px;
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
