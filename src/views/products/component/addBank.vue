<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="main-info">
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">产品名称：</div>
        </div>
        <div class="item-detail">
          <el-radio-group v-model="showModel" class="check-radio">
            <div class="item">
              <el-radio :label="1" class="check-li">详情模式</el-radio>
            </div>
            <div class="item">
              <el-radio :label="2" class="check-li">长图模式</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <!-- 详细模式 -->
      <div v-if="showModel === 1" class="detail-model">
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行名称：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.name" size="small" placeholder="请输入银行名称"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行编号：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.code" size="small" placeholder="请输入银行编号"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">排序：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="ordering" size="small" placeholder="请输入排序"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行代码：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.code" size="small" placeholder="请输入银行代码"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行LOGO：</div>
          </div>
          <div class="item-detail">
            <el-upload
              ref="upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              action=""
              class="upload-demo">
              <el-button slot="trigger" size="small" class="tag">上传图片</el-button>
            </el-upload>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">展示标签：</div>
          </div>
          <div class="item-detail">
            <span v-for="(item, index) in tagList" :key="index" class="tag">{{ item }}
              <i class="el-icon-circle-close close-icon" @click="delTag(index)"/>
            </span>
            <span class="add-tag tag" @click="addAction">+添加标签</span>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">前端展示价格：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.show_price" size="small" placeholder="请输入前端展示价格"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行申请基数数量：</div>
          </div>
          <div class="item-detail">
            <el-input size="small" placeholder="请输入银行申请基数数量"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">详情介绍：</div>
          </div>
          <div class="item-detail">
            <el-input
              :rows="2"
              v-model="Form1.introduction"
              type="textarea"
              placeholder="请输入详情介绍"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">批卡速度：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.approval_speed" size="small" placeholder="请输入批卡速度"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">平均额度：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.average_amount" size="small" placeholder="请输入平均额度"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">通过率：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.passing_rate" size="small" placeholder="请输入通过率"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">结算标准标题：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.settle_title" size="small" placeholder="请输入结算标准标题"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">结算标准内容：</div>
          </div>
          <div class="item-detail">
            <el-input
              :rows="2"
              v-model="Form1.settle_content"
              type="textarea"
              placeholder="请输入结算标准内容"/>
          </div>
        </div>
      </div>
      <!-- 长图模式 -->
      <div v-if="showModel === 2" class="detail-model">
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行名称：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.name" size="small" placeholder="请输入银行名称"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行编号：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.code" size="small" placeholder="请输入银行编号"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">排序：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="ordering" size="small" placeholder="请输入序号"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行代码：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.code" size="small" placeholder="请输入银行代码"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行logo：</div>
          </div>
          <div class="item-detail">
            <el-upload
              ref="upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              action=""
              class="upload-demo">
              <el-button slot="trigger" size="small" class="tag">上传图片</el-button>
            </el-upload>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">LOGO标签：</div>
          </div>
          <div class="item-detail">
            <span v-for="(item, index) in tagList" :key="index" class="tag">{{ item }}
              <i class="el-icon-circle-close close-icon" @click="delTag(index)"/>
            </span>
            <span class="add-tag tag" @click="addAction">+添加标签</span>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">展示标签：</div>
          </div>
          <div class="item-detail">
            <span v-for="(item, index) in tagList" :key="index" class="tag">{{ item }}
              <i class="el-icon-circle-close close-icon" @click="delTag(index)"/>
            </span>
            <span class="add-tag tag" @click="addAction">+添加标签</span>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">前端显示价格：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.show_price" size="small" placeholder="请输入序号"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">银行申请基数数量：</div>
          </div>
          <div class="item-detail">
            <el-input size="small" placeholder="请输入银行代码"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">上传长图：</div>
          </div>
          <div class="item-detail">
            <!-- action="http://localhost:9528/index/upload/image" -->
            <el-upload
              ref="upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :file-list="fileList"
              :auto-upload="false"
              action=""
              class="upload-demo">
              <el-button slot="trigger" size="small" class="tag">上传图片</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info"/>
        <div class="item-detail">
          <el-button type="primary" size="small" @click="submitAction">发布</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
      <!-- 添加标签弹窗 -->
      <el-dialog :visible.sync="Visible" title="添加标签">
        <el-form>
          <el-form-item :label-width="formLabelWidth" label="标签名称">
            <el-input v-model="tagName" autofocus="true"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="cancel">取 消</el-button>
          <el-button size="small" type="primary" @click="sure">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addBank } from '@/api/goods'
export default {
  data () {
    return {
      value: '',
      from: '',
      tagList: [],
      tagName: '',
      ordering: '',
      fileList: [],
      showModel: 1,
      Visible: false,
      formLabelWidth: '80px',
      Form1: {
        name: '',
        code: '',
        sort: '',
        tag: ['1'],
        show_order_number: '',
        show_price: '',
        logo_url: '/it/u=570588613,1429417628&fm=26&gp=0.jpg',
        approval_speed: '',
        average_amount: '',
        passing_rate: '',
        settle_title: '',
        settle_content: '',
        introduction: '',
        show_type: 1,
        content_image_url: '/it/u=570588613,1429417628&fm=26&gp=0.jpg'
      }
    }
  },
  watch: {
    showModel (val, oldval) {
      console.log(val)
      this.Form1.show_type = val
    },
    tagList (val, oldval) {
      this.Form1.tag = val
    },
    ordering (val, oldval) {
      this.Form1.sort = val
    }
  },
  methods: {
    submitAction () {
      // const FORM = this.$qs.stringify(this.Form1)
      addBank(this.Form1).then(res => {
        if (res.data.message === 'success') {
          this.$message({
            showClose: true,
            message: '新增成功',
            type: 'success'
          })
        } else {
          this.$message.error('格式错误，请检查格式')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    goodSelect () {
      console.log('点击了选择产品')
      this.Visible = !this.Visible
    },
    addAction () {
      this.Visible = true
    },
    delTag (index) {
      this.tagList.splice(index, 1)
    },
    cancel () {
      this.Visible = false
      this.tagName = ''
    },
    sure () {
      this.tagList.push(this.tagName)
      this.cancel()
    },
    goback () {
      this.$router.go(-1)
    },
    // 上传图片操作
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    uploadSuccess (response, file, fileList) {
      console.log('上传成功', response, file, fileList)
    }
  },
  beforCreate () {
    console.log(this.$route.params.from)
    this.from = this.$route.params.from
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
  .info {
    height: 48px;
    width: 100%;
    line-height: 48px;
    background: $color-bg-white;
    padding: 0 36px;
  }
  .main-info{
    padding: 0;
    overflow: auto;
    .detail-model{
      display: flex;
      flex-direction: column;

    }
    .good-name{
      margin-top: 20px;
      display: flex;
      line-height: 32px;
      .star{
        color: #FF0000;
      }
      .item-info{
        width: 140px;
        display: flex;
        justify-content: flex-end;
      }
      .item-detail{
        flex: 1;
        display: flex;
        .check-radio{
          display: flex;
          .item{
            margin-right: 60px;
            .check-li{
              line-height: 32px;
            }
          }
        }
        .tag{
          margin-right: 16px;
          width: 112px;
          height: 32px;
          border: $ipt-border;
          border-radius: 4px;
          text-align: center;
          background: #fff;
          position: relative;
          input{
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
            filter: alpha(opacity=0);
            cursor: pointer
          }
          .close-icon{
            position: absolute;
            top: 2px;
            right: 2px;
          }
        }
        .add-tag{
          border: 1px dashed $border-color;
        }
      }
    }
  }
}
</style>
