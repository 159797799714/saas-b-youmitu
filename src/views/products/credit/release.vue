<template>
  <div class="main">
    <div class="info">新增{{ this.$route.params.from }}</div>
    <div class="main-info">
      <div class="channels">
        <div class="words">
          <span>*</span>
          <div>所属渠道：</div>
        </div>
        <el-select v-model="value" size="small" class="select-ipt" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="goods">
        <div class="words">
          <span>*</span>
          <div>选择产品：</div>
        </div>
        <div class="select-good" @click="goodSelect">选择产品</div>
      </div>
      <div class="good-name">
        <div class="words">
          <span>*</span>
          <div>产品名称：</div>
        </div>
        <el-input v-model="input10" size="small" class="ipt" placeholder="请输入内容" clearable/>
      </div>
      <div class="href">
        <div class="words">
          <span>*</span>
          <div>推广链接：</div>
        </div>
        <el-input v-model="input10" size="small" class="ipt" placeholder="请输入内容" clearable/>
      </div>
      <div class="period">
        <div class="words">
          <span>*</span>
          <div>结算周期：</div>
        </div>
        <el-select v-model="value" size="small" class="select-ipt" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="type">
        <div class="words">
          <span>*</span>
          <div>分佣类型：</div>
        </div>
        <el-select v-model="value" size="small" class="select-ipt" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="terrace-price">
        <div class="words">
          <span>*</span>
          <div>平台分佣价格：</div>
        </div>
        <el-input v-model="input10" size="small" class="ipt" placeholder="请输入内容" clearable/> &nbsp;&nbsp;元
      </div>
      <div class="terrace-price2">
        <div class="words">
          <span>*</span>
          <div>平台二次分佣价格：</div>
        </div>
        <el-input v-model="input10" size="small" class="ipt" placeholder="请输入内容" clearable/> &nbsp;&nbsp;元
      </div>
      <div class="lower-price">
        <div class="words">
          <span>*</span>
          <div>下游佣金价格：</div>
        </div>
        <el-input v-model="input10" size="small" class="ipt" placeholder="请输入内容" clearable/> &nbsp;&nbsp;元
      </div>
      <div class="lower-price2">
        <div class="words">
          <span>*</span>
          <div>下游二次佣金价格：</div>
        </div>
        <el-input v-model="input10" size="small" class="ipt" placeholder="请输入内容" clearable/> &nbsp;&nbsp;元
      </div>
      <div class="btn">
        <div class="words"/>
        <el-button type="primary" size="small" @click="submitAction">新增</el-button>
        <!-- <el-button size="small">导出</el-button> -->
      </div>
      <el-dialog :visible.sync="Visible" title="收货地址">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="date" label="产品编号" width="120"/>
          <el-table-column prop="name" label="产品名称"/>
          <el-table-column prop="mode" label="产品状态" />
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: '锅巴'
        },
        {
          value: '选项2',
          label: '米线'
        },
        {
          value: '选项3',
          label: '薯片'
        },
        {
          value: '选项4',
          label: '鸡蛋'
        }
      ],
      value: '',
      input10: '',
      info: '新增银行',
      Visible: false,
      multipleSelection: [], // 弹框已选的
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        mode: '待添加'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        mode: '待添加'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        mode: '待添加'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        mode: '待添加'
      }]
    }
  },
  methods: {
    submitAction () {
      console.log('点击了提交')
    },
    goodSelect () {
      console.log('点击了选择产品')
      this.Visible = !this.Visible
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    cancel () {
      console.log('点击了取消')
      this.Visible = false
    },
    sure () {
      this.cancel()
    }
  },
  beforCreate () {
    console.log(this.$router.params)
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.main {
  flex: 1;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  .channels,.goods,.good-name,.href,.period,.type,.terrace-price,.terrace-price2,.lower-price,.lower-price2,.btn{
    display: flex;
    height: $height-32;
    line-height: $height-32;
    margin-bottom: 30px;
    .words {
      width: 140px;
      display: flex;
      justify-content: flex-end;
      span {
        color: #ff0000;
        line-height: $height-32;
        display: block;
      }
    }
    .select-good{
      height: $height-32;
      width: 112px;
      border: $ipt-border;
      text-align: center;
      line-height: $height-32;
    }
    .ipt,.select-ipt{
      width: 50%;
      max-width: 500px;
    }
  }
  .info {
      height: 48px;
      width: 100%;
      line-height: 48px;
      background: $color-bg-white;
      padding: 0 36px;
  }
}
</style>
