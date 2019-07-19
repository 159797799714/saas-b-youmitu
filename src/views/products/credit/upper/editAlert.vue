<template>
  <div class="cover">
    <div class="leftWhite"/>
    <!-- 编辑 -->
    <div v-if="origin == 0" class="rightSection">
      <div class="head">
        <span>编辑</span>
        <i class="el-icon-close" @click="closeAlert"/>
      </div>
      <div class="meat">
        <div class="row">
          <div class="row-name">
            <i class="star">*</i>
            <div class="words">结算周期</div>
          </div>
          <div class="row-ipt">
            <el-input size="small" placeholder="请输入内容" clearable/>
          </div>
        </div>
        <div class="lump">
          <div class="row">
            <div class="row-name">
              <i class="star">*</i>
              <div class="words">上游佣金价格</div>
            </div>
            <div class="row-ipt">
              <el-input size="small" placeholder="请输入上游佣金价格" clearable/>
            </div>
          </div>
          <div class="row">
            <div class="row-name">
              <i class="star">*</i>
              <div class="words">请输入上游佣金价格</div>
            </div>
            <div class="row-ipt">
              <el-input size="small" placeholder="请输入前端展示价格" clearable/>
            </div>
          </div>
        </div>
        <div class="lump">
          <div class="row">
            <div class="row-name">
              <div class="words">上游二次佣金价格</div>
            </div>
            <div class="row-ipt">
              <el-input size="small" placeholder="请输入上游二次佣金价格" clearable/>
            </div>
          </div>
          <div class="row">
            <div class="row-name">
              <div class="words">前端展示价格</div>
            </div>
            <div class="row-ipt">
              <el-input size="small" placeholder="请输入前端展示价格" clearable/>
            </div>
          </div>
        </div>
        <div class="user-define">
          <div class="row">
            <div class="row-name">
              <i class="star">*</i>
              <div class="words">推广链接</div>
            </div>
            <div class="row-ipt">
              <el-input size="small" placeholder="请输入推广链接" clearable/>
            </div>
          </div>
          <div v-for="(item, index) in sum" :key="index" class="row user-add">
            <div class="row-name">
              <i v-if="item.must" class="star">*</i>
              <div class="words">推广链接</div>
            </div>
            <div class="row-ipt">
              <el-input size="small" placeholder="请输入推广链接" clearable/>
              <i class="el-icon-remove-outline remove-icon" @click="deleteAction"/>
            </div>
          </div>
        </div>
        <div class="add-span" @click="addAction">新增链接</div>
      </div>
      <div class="footer">
        <el-button size="small" @click="closeAlert">取消</el-button>
        <el-button type="primary" size="small" @click="closeAlert">保存</el-button>
      </div>
    </div>
    <!-- 设置代理价格 -->
    <div v-if="origin === 1" class="rightSection">
      <div class="head">
        <span>设置代理价格</span>
        <i class="el-icon-close" @click="closeAlert"/>
      </div>
      <div class="meat">
        <div class="lump">
          <div class="row">
            <div class="row-name">
              <i class="star">*</i>
              <div class="words">一级代理</div>
            </div>
            <div class="row-ipt">
              <el-input size="small" placeholder="请输入一级代理价格" clearable/>
            </div>
          </div>
          <div class="row">
            <div class="row-name">
              <i class="star">*</i>
              <div class="words">二级代理</div>
            </div>
            <div class="row-ipt">
              <el-input size="small" placeholder="请输入二级代理价格" clearable/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row-name">
            <i class="star">*</i>
            <div class="words">三级代理</div>
          </div>
          <div class="row-ipt">
            <el-input size="small" placeholder="请输入三级代理价格" clearable/>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button size="small" @click="closeAlert">取消</el-button>
        <el-button type="primary" size="small" @click="closeAlert">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tab',
  props: {
    from: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      title: '',
      sum: 0,
      origin: this.from
    }
  },
  methods: {
    deleteAction () {
      if (this.sum > 0) {
        this.sum -= 1
      }
    },
    addAction () {
      this.sum += 1
    },
    closeAlert () {
      this.$emit('editAlert', '1')
    }
  }
}
</script>
<style lang="scss" scoped>
.cover{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
  background: rgba(0,0,0,.4);
  .lefttWhite{
    flex: 1;
  }
  .rightSection{
    float: right;
    height: 100%;
    width: 720px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #fff;
    .head{
      display: flex;
      padding: 18px 24px;
      justify-content: space-between;
      font-weight: bold;
      border-bottom: 1px solid #E8E8E8;
    }
    .meat{
      flex: 1;
      padding: 25px;
      .row{
        margin-right: 16px;
      }
      .lump{
        display: flex;
        overflow: hidden;
      }
      .user-define{
        overflow: hidden;
        &>div{
          float: left;
        }
      }
      .user-add{
        margin-right: 23px;
      }
      .add-span{
        height: 32px;
        width: 312px;
        border: 1px dashed #ccc;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
      }
      .row-name{
        display: flex;
        margin-bottom: 12px;
        font-weight: bold;
        line-height: 20px;
        .star{
          color:#FF0000;
        }
      }
      .row-ipt{
        width: 312px;
        height: 32px;
        margin-bottom: 35px;
        position: relative;
        .remove-icon{
          position: absolute;
          top: 9px;
          right: -20px;
        }
      }
    }
    .footer{
      padding: 10px 0;
      text-align: right;
      border-top: 1px solid #E8E8E8;
    }
  }
}

</style>
