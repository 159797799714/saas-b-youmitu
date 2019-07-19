<template>
  <div class="main">
    <div class="info">
      <BonusHeadBar
        :selected="header.selectType"
        :list="header.list"/>
    </div>
    <div class="form" v-if="hasRequest">
      <!-- <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">平台后台名称：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="form.name" size="small" placeholder="平台后台名称"/>
        </div>
      </div> -->
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">平台前台名称：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="form.platform_name" size="small" placeholder="平台前台名称" maxlength="10"/>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">前台首页logo：</div>
        </div>
        <div class="item-detail">
          <div class="upload-box">
            <el-upload
              ref="uploadLogo"
              :show-file-list="false"
              :multiple="false"
              :limit="1"
              :before-upload="(file) => beforeUpload(file, 'uploadLogo')"
              :on-success="(response, file, fileList) => uploadSuccess(response, file, fileList, 'uploadLogo', 'logoUrl', 'logoFullUrl')"
              :http-request="(file) => autoUpload(file, 'uploadLogo', 'logoUrl', 'logoFullUrl')"
              :on-remove="(file, fileList) => removeUpload(file, fileList, 'uploadLogo')"
              action="">
              <el-button slot="trigger" size="small" class="tag">上传图片</el-button>
            </el-upload>
            <div class="tips">建议上传264*120px的图片</div>
          </div>
          <div v-if="form.logoFullUrl" class="preview">
            <img :src="form.logoFullUrl">
          </div>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">网站icon：</div>
        </div>
        <div class="item-detail">
          <div class="upload-box">
            <el-upload
              ref="uploadIcon"
              :show-file-list="false"
              :multiple="false"
              :limit="1"
              :before-upload="(file) => beforeUpload(file, 'uploadIcon')"
              :on-success="(response, file, fileList) => uploadSuccess(response, file, fileList, 'uploadIcon', 'iconUrl', 'iconFullUrl')"
              :http-request="(file) => autoUpload(file, 'uploadIcon', 'iconUrl', 'iconFullUrl')"
              :on-remove="(file, fileList) => removeUpload(file, fileList, 'uploadIcon')"
              action="">
              <el-button slot="trigger" size="small" class="tag">上传图片</el-button>
            </el-upload>
            <div class="tips">建议上传100*100px的图片</div>
          </div>
          <div v-if="form.iconFullUrl" class="preview">
            <img :src="form.iconFullUrl">
          </div>
        </div>
      </div>
      <!-- <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">前台首页logo：</div>
        </div>
        <div class="item-detail">
          <div class="upload-box">
            <el-upload
              ref="uploadFooterLogo"
              :show-file-list="false"
              :multiple="false"
              :limit="1"
              :before-upload="(file) => beforeUpload(file, 'uploadFooterLogo')"
              :on-success="(response, file, fileList) => uploadSuccess(response, file, fileList, 'uploadFooterLogo', 'footerLogo', 'footerFullLogo')"
              :http-request="(file) => autoUpload(file, 'uploadFooterLogo', 'footerLogo', 'footerFullLogo')"
              :on-remove="(file, fileList) => removeUpload(file, fileList, 'uploadFooterLogo')"
              action="">
              <el-button slot="trigger" size="small" class="tag">上传图片</el-button>
            </el-upload>
            <div class="tips">建议上传264*120px的图片</div>
          </div>
          <div v-if="form.footerFullLogo !== ''" class="preview">
            <img :src="form.footerFullLogo">
          </div>
        </div>
      </div> -->
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">关于我们：</div>
        </div>
        <div class="item-detail">
          <el-input
            :rows="2"
            v-model="form.about"
            type="textarea"
            placeholder="关于我们描述"
            maxlength="140"/>
        </div>
      </div>
      <div v-if="false" class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">管理员联系方式：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="form.adminMobile" size="small" placeholder="管理员联系方式" maxlength="20"/>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">微信公众号：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="form.wx_account" size="small" placeholder="微信公众号" maxlength="20"/>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">商务联系人方式：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="form.businessMobile" size="small" placeholder="商务联系人方式" maxlength="20"/>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">客服联系方式：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="form.kfMobile" size="small" placeholder="客服联系方式" maxlength="20"/>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <div class="star">*</div>
          <div class="words">联系地址：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="form.address" size="small" placeholder="联系地址" maxlength="50"/>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info"/>
        <div class="item-detail">
          <el-button type="primary" size="small" @click="submit">发布</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import center from '@/views/setting/js/center.js'
import BonusHeadBar from '@/views/setting/components/headBar.vue'
import { upload } from '@/api/public'
import { getBaseWebConfig, addBaseWebConfig } from '@/api/setting'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    return {
      header: {
        selectType: 'website',
        list: [
          {
            text: '网站信息',
            type: 'website'
          }
        ]
      },
      hasRequest: false,
      form: {
        name: '',
        platform_name: '',
        logoUrl: '',
        logoFullUrl: '',
        iconUrl: '',
        iconFullUrl: '',
        footerLogo: '',
        footerFullLogo: '',
        about: '',
        adminMobile: '',
        businessMobile: '',
        wx_account: '',
        kfMobile: '',
        address: ''
      },
      fileList: []
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      // 获取网站基础配置
      getBaseWebConfig().then(res => {
        if (res.data.data !== {} && res.data.code === 0) {
          this.form.name = res.data.data.website_name || ''
          this.form.platform_name = res.data.data.platform_name || ''
          this.form.logoUrl = res.data.data.website_logo || ''
          this.form.logoFullUrl = res.data.data.website_logo ? ('//' + res.data.data.domain + res.data.data.website_logo) : ''
          this.form.iconUrl = res.data.data.website_icon || ''
          this.form.iconFullUrl = res.data.data.website_icon ? ('//' + res.data.data.domain + res.data.data.website_icon) : ''
          // this.form.footerLogo = res.data.data.footer_icon || ''                                                                        // 前台logo
          // this.form.footerFullLogo = res.data.data.footer_icon ? ('//' + res.data.data.domain + res.data.data.footer_icon) : ''         // 前台logo
          this.form.about = res.data.data.about_us || ''
          this.form.adminMobile = res.data.data.administrator_link || ''
          this.form.businessMobile = res.data.data.business_link || ''
          this.form.kfMobile = res.data.data.service_link || ''
          this.form.address = res.data.data.address_link || ''
          this.form.wx_account = res.data.data.wx_account || ''
          center.$emit('event1', { logoUrl: this.form.logoFullUrl, iconUrl: this.form.iconFullUrl })
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取网站基础信息失败')
        }
        this.hasRequest = true
      }).catch(err => {
        this.hasRequest = true
        console.log(err)
      })
    },
    beforeUpload (file, ref) {
      const isImage = file.type.indexOf('image') !== -1
      if (!isImage) {
        this.$message.error('请上传jpg或者png格式的图片!')
      }
      return isImage
    },
    uploadSuccess (res, file, fileList, ref, key1, key2) {
      this.form[key1] = ''
      this.form[key2] = ''
    },
    autoUpload (file, ref, key1, key2) {
      let fd = new FormData()
      fd.append('image', file.file)
      upload(fd).then(res => {
        if (res.data && res.data.code === 0) {
          this.form[key1] = res.data.data.path
          this.form[key2] = res.data.data.domain + res.data.data.path
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '上传失败，请重新上传')
        }
        this.$refs[ref].clearFiles()
      }).catch(() => {
        this.$message.error('上传失败，请重新上传')
        this.$refs[ref].clearFiles()
      })
    },
    removeUpload (file, fileList, ref) {
      console.log(file, fileList)
    },
    submit () {
      // if (this.form.name === '') {
      //   this.$message({
      //     message: '请输入平台后台名称',
      //     type: 'warning',
      //     duration: 1000
      //   })
      //   return
      // } else
      if (this.form.platform_name === '') {
        this.$message({
          message: '请输入平台前台名称',
          type: 'warning',
          duration: 1000
        })
        return
      } else if (this.form.logoUrl === '') {
        this.$message({
          message: '请按要求上传网站logo',
          type: 'warning',
          duration: 1000
        })
        return
      } else if (this.form.iconUrl === '') {
        this.$message({
          message: '请按要求上传网站icon',
          type: 'warning',
          duration: 1000
        })
        return
      // } else if (this.form.footerLogo === '') {
      //   this.$message({
      //     message: '请按要求上传前台后也logo',
      //     type: 'warning',
      //     duration: 1000
      //   })
      //   return
      } else if (this.form.about === '') {
        this.$message({
          message: '请输入关于我们的描述',
          type: 'warning',
          duration: 1000
        })
        return
      } else if (this.form.wx_account === '') {
        this.$message({
          message: '请输入的微信公众号',
          type: 'warning',
          duration: 1000
        })
        return
      } else if (this.form.businessMobile === '') {
        this.$message({
          message: '请输入的商务联系人方式',
          type: 'warning',
          duration: 1000
        })
        return
      } else if (this.form.kfMobile === '') {
        this.$message({
          message: '请输入的客服联系方式',
          type: 'warning',
          duration: 1000
        })
        return
      } else if (this.form.address === '') {
        this.$message({
          message: '请输入联系地址',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$confirm('确认是否发布，点击发布立即生效?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        addBaseWebConfig({
          website_name: this.form.name,
          platform_name: this.form.platform_name,
          website_icon: this.form.iconUrl,
          website_logo: this.form.logoUrl,
          about_us: this.form.about,
          administrator_link: this.form.adminMobile,
          business_link: this.form.businessMobile,
          service_link: this.form.kfMobile,
          address_link: this.form.address,
          wx_account: this.form.wx_account
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message({
              message: '发布成功',
              type: 'success',
              duration: 1000
            })
            this.getInfo()
          } else {
            this.$message.error(res.data && res.data.message ? res.data.message : '发布失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布',
          duration: 500
        })
      })
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
  .form{
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
        .upload-box{
          display: flex;
          align-items: center;
          width: 100%;
          .tips{
            margin-left: 20px;
            color: #FF0000;
          }
        }
        .preview{
          margin-top: 10px;
          width: 80px;
          height: 80px;
          overflow: hidden;
          img{
            position: relative;
            top: 50%;
            width: 100%;
            height: auto;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>
