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
              <el-radio :label="0" class="check-li">详情模式</el-radio>
            </div>
            <div class="item">
              <el-radio :label="1" class="check-li">长图模式</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <!-- 详细模式 -->
      <div v-if="showModel === 0" class="detail-model">
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">所属银行：</div>
          </div>
          <div class="item-detail">
            <el-select v-model="Form1.bank_id" placeholder="请选择所属银行" size="small" class="slect-ipt">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">产品编号：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="ordering" size="small" placeholder="请输入产品编号"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">卡片名称：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.name" size="small" placeholder="请输入卡片名称"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">简短描述：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.summary" size="small" placeholder="简短描述"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">卡片图片：</div>
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
              <el-button slot="trigger" size="small" class="tag">选择图片</el-button>
            </el-upload>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">展示标签：</div>
          </div>
          <div class="item-detail">
            <div v-for="(item, index) in tagList" :key="index" class="tag">{{ item }}
              <i class="el-icon-circle-close close-icon" @click="delTag(index)"/>
            </div>
            <span class="add-tag tag" @click="addAction">+添加标签</span>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">推荐类型：</div>
          </div>
          <div class="item-detail">
            <el-checkbox-group v-model="type1">
              <el-checkbox :label="1">新手办卡</el-checkbox>
              <el-checkbox :label="2">大额度</el-checkbox>
              <el-checkbox :label="3">审批快</el-checkbox>
              <el-checkbox :label="4">易下卡</el-checkbox>
              <el-checkbox :label="5">推荐卡片</el-checkbox>
              <el-checkbox :label="6">卡片排行</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">排序：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="ordering" size="small" placeholder="请输入内容"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">卡片级别：</div>
          </div>
          <div class="item-detail">
            <el-select v-model="Form1.card_level" placeholder="请选择" size="small" class="slect-ipt">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">最长免息期：</div>
          </div>
          <div class="item-detail">
            <el-select v-model="Form1.max_free_interest" placeholder="50天" size="small" class="slect-ipt">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">发卡组织：</div>
          </div>
          <div class="item-detail">
            <el-checkbox-group v-model="Form1.card_organization">
              <el-checkbox :label="1">银联</el-checkbox>
              <el-checkbox :label="2">VISA</el-checkbox>
              <el-checkbox :label="3">万事达</el-checkbox>
              <el-checkbox :label="4">大来卡</el-checkbox>
              <el-checkbox :label="5">美国运通</el-checkbox>
              <el-checkbox :label="6">JCB</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">年费介绍标题：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.annual_fee_title" size="small" placeholder="请输入内容"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">年费介绍副标题：</div>
          </div>
          <div class="item-detail">
            <el-input size="small" placeholder="请输入内容"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">积分介绍标题：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.point_title" size="small" placeholder="请输入内容"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">积分介绍副标题：</div>
          </div>
          <div class="item-detail">
            <el-input size="small" placeholder="请输入内容"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">优惠权益：</div>
          </div>
          <div class="item-detail">
            <el-input
              :rows="2"
              v-model="Form1.preferential"
              type="textarea"
              placeholder="请输入内容"/>
          </div>
        </div>
      </div>
      <!-- 长图模式 -->
      <div v-if="showModel === 1" class="detail-model">
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">所属银行：</div>
          </div>
          <div class="item-detail">
            <el-select v-model="Form1.bank_id" placeholder="请选择" size="small" class="slect-ipt">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">产品编号：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="ordering" size="small" placeholder="请输入产品编号"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">卡片名称：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.name" size="small" placeholder="请输入卡片名称"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">简短描述：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="Form1.summary" size="small" placeholder="简短描述"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">卡片图片：</div>
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
            <div v-for="(item, index) in tagList" :key="index" class="tag">{{ item }}
              <i class="el-icon-circle-close close-icon" @click="delTag(index)"/>
            </div>
            <span class="add-tag tag" @click="addAction">+添加标签</span>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">推荐类型：</div>
          </div>
          <div class="item-detail">
            <el-checkbox-group v-model="type1">
              <el-checkbox :label="1">新手办卡</el-checkbox>
              <el-checkbox :label="2">大额度</el-checkbox>
              <el-checkbox :label="3">审批快</el-checkbox>
              <el-checkbox :label="4">易下卡</el-checkbox>
              <el-checkbox :label="5">推荐卡片</el-checkbox>
              <el-checkbox :label="6">卡片排行</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">排序：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="ordering" size="small" placeholder="请输入内容"/>
          </div>
        </div>
        <div class="good-name">
          <div class="item-info">
            <div class="star">*</div>
            <div class="words">上传长图：</div>
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
      </div>
      <div class="good-name">
        <div class="item-info"/>
        <div class="item-detail">
          <el-button type="primary" size="small" @click="submitAction">发布</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
      <el-dialog :visible.sync="Visible" title="添加标签">
        <el-form>
          <el-form-item :label-width="formLabelWidth" label="标签名称">
            <el-input v-model="tagName" autofocus="true"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="sure">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addCredit, getGoodsBankList } from '@/api/goods'
export default {
  data () {
    return {
      showModel: 0,
      fileList: [],
      options: [],
      type1: '',
      value: '',
      from: '',
      tagList: ['超级靓卡'],
      Visible: false,
      tagName: '',
      formLabelWidth: '80px',
      ordering: 2,
      Form1: {
        bank_id: '',
        name: '',
        sort: 2,
        category: ['11'],
        logo_url: '/it/u=570588613,1429417628&fm=26&gp=0.jpg',
        summary: '',
        max_free_interest: '',
        card_level: '',
        card_organization: '',
        annual_fee_title: '',
        annual_fee_content: '',
        point_title: '',
        point_content: '',
        preferential: '',
        show_type: '1',
        content_image_url: '',
        tag: ['1']
      }
    }
  },
  watch: {
    ordering (val, oldval) {
      this.Form1.sort = val
    }
  },
  created () {
    // 初始化银行列表
    getGoodsBankList().then(res => {
      console.log(res.data.data)
      res.data.data.map(item => {
        const obj = {
          value: item.id,
          label: item.name
        }
        this.options.push(obj)
      })
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    submitAction () {
      console.log('点击了提交', this.Form1)
      addCredit(this.Form1).then(res => {
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
      if (this.tagName) {
        this.tagList.push(this.tagName)
        this.cancel()
      } else {
        this.$message.error('不能添加空标签')
      }
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
    }
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

<div class="good-num">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">所属银行：</div>
        </div>
        <div class="item-detail">
          <el-select v-model="value" placeholder="请选择" size="small" class="slect-ipt">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">产品编号：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="input" size="small" placeholder="请输入产品编号"/>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">卡片名称：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="input" size="small" placeholder="请输入卡片名称"/>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">简短描述：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="input" size="small" placeholder="简短描述"/>
        </div>
      </div>
      <div class="good-img">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">卡片图片：</div>
        </div>
        <div class="item-detail">
          <div class="tag">选择图片
            <input type="file" class="tag" size="small">
          </div>
        </div>
      </div>
      <div class="show-tag">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">展示标签：</div>
        </div>
        <div class="item-detail">
          <div v-for="(item, index) in tagList" :key="index" class="tag">{{ item }}
            <i class="el-icon-circle-close close-icon" @click="delTag(index)"/>
          </div>
          <span class="add-tag tag" @click="addAction">+添加标签</span>
        </div>
      </div>
      <div class="type1">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">推荐类型：</div>
        </div>
        <div class="item-detail">
          <el-checkbox-group v-model="type1">
            <el-checkbox :label="1">新手办卡</el-checkbox>
            <el-checkbox :label="2">大额度</el-checkbox>
            <el-checkbox :label="3">审批快</el-checkbox>
            <el-checkbox :label="4">易下卡</el-checkbox>
            <el-checkbox :label="5">推荐卡片</el-checkbox>
            <el-checkbox :label="6">卡片排行</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="compositor">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">排序：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="input" size="small" placeholder="请输入内容"/>
        </div>
      </div>
      <div class="card-level">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">卡片级别：</div>
        </div>
        <div class="item-detail">
          <el-select v-model="value" placeholder="请选择" size="small" class="slect-ipt">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
      </div>
      <div class="longdst-time">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">最长免息期：</div>
        </div>
        <div class="item-detail">
          <el-select v-model="value" placeholder="50天" size="small" class="slect-ipt">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
      </div>
      <div class="type2">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">推荐类型：</div>
        </div>
        <div class="item-detail">
          <el-checkbox-group v-model="type2">
            <el-checkbox :label="1">银联</el-checkbox>
            <el-checkbox :label="2">VISA</el-checkbox>
            <el-checkbox :label="3">万事达</el-checkbox>
            <el-checkbox :label="4">大来卡</el-checkbox>
            <el-checkbox :label="5">美国运通</el-checkbox>
            <el-checkbox :label="6">JCB</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="caption">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">年费介绍标题：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="input" size="small" placeholder="请输入内容"/>
        </div>
      </div>
      <div class="price-subhead">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">年费介绍副标题：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="input" size="small" placeholder="请输入内容"/>
        </div>
      </div>
      <div class="integral-caption">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">积分介绍标题：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="input" size="small" placeholder="请输入内容"/>
        </div>
      </div>
      <div class="integral-subhead">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">积分介绍副标题：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="input" size="small" placeholder="请输入内容"/>
        </div>
      </div>
      <div class="preference">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">优惠权益：</div>
        </div>
        <div class="item-detail">
          <el-input
            :rows="2"
            v-model="textarea"
            type="textarea"
            placeholder="请输入内容"/>
        </div>
      </div>
