<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="main-info">
      <div class="good-num">
        <div class="item-info">
          <div class="words">产品编号：</div>
        </div>
        <div class="item-detail">
          <el-radio-group v-model="type" class="check-radio">
            <div class="item">
              <el-radio :label="0" class="check-li">朋友圈文案</el-radio>
            </div>
            <div class="item">
              <el-radio :label="1" class="check-li">链接长文</el-radio>
            </div>
            <div class="item">
              <el-radio :label="2" class="check-li">视频资料</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="good-name">
        <div class="item-info">
          <span class="star">*</span>
          <div class="words">标题：</div>
        </div>
        <div class="item-detail">
          <el-input v-model="form.title" size="small"/>
        </div>
      </div>
      <!-- 朋友圈文案显示 -->
      <div v-if="type === 0">
        <div class="item-info">
          <div class="words">上传素材图片：</div>
        </div>
        <div class="item-detail">
          <el-upload
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="imgFile"
            :auto-upload="false"
            class="upload-demo"
            action="">
            <el-button slot="trigger" size="small" class="tag">选取文件</el-button>
          </el-upload>
        </div>
      </div>
      <!-- 链接长文显示 -->
      <div v-if="type === 1">
        <div class="item-info">
          <span class="star">*</span>
          <div class="words">内容：</div>
        </div>
        <div class="item-detail"/>
      </div>
      <!-- 视频资料显示 -->
      <div v-if="type === 2">
        <div class="item-info">
          <div class="words">上传素材视频封面：</div>
        </div>
        <div class="item-detail">
          <el-upload
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="imgFile"
            :auto-upload="false"
            class="upload-demo"
            action="">
            <el-button slot="trigger" size="small" class="tag">选取文件</el-button>
          </el-upload>
        </div>
      </div>
      <div v-if="type === 2">
        <div class="item-info">
          <div class="words">上传素材视频：</div>
        </div>
        <div class="item-detail">
          <el-upload
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="imgFile"
            :auto-upload="false"
            class="upload-demo"
            action="">
            <el-button slot="trigger" size="small" class="tag">选取文件</el-button>
          </el-upload>
        </div>
      </div>
      <div>
        <div class="item-info">
          <div class="words">二维码设置：</div>
        </div>
        <div class="item-detail">
          <el-checkbox v-model="form.yardSet">是否启用用户二维码</el-checkbox>
        </div>
      </div>
      <div>
        <div class="item-info">
          <div class="words">展示角色：</div>
        </div>
        <div class="item-detail">
          <el-checkbox-group v-model="form.openRole">
            <el-checkbox v-for="(item, index) in roleOption" :key="index" :label="item"/>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <div class="item-info">
          <div class="words">素材分类：</div>
        </div>
        <div class="item-detail">
          <el-checkbox-group v-model="form.materialType">
            <el-checkbox v-for="(item, index) in materialOption" :key="index" :label="item"/>
          </el-checkbox-group>
        </div>
      </div>
      <div class="foot-btn">
        <div class="item-info"/>
        <div class="item-detail">
          <el-button type="primary" size="small" @click="submitAction">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: 0,
      imgFile: [],
      form: {
        title: '',
        yardSet: false,
        openRole: [],
        materialType: []
      },
      roleOption: ['全部', '代理', '普通会员'],
      materialOption: ['全部', '招代理', '扩业务', '正能量', '活动']
    }
  },
  watch: {
    type (val, oldval) {
      console.log(val, oldval)
    },
    imgFile (val, oldval) {
      console.log(val, oldval)
    }

  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    submitAction () {
      console.log('点击了提交')
    },
    goback () {
      this.$router.go(-1)
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
    &>div{
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
        overflow: hidden;
        .check-radio{
          display: flex;
          .item{
            margin-right: 60px;
            .check-li{
              line-height: 32px;
            }
          }
        }
        .el-checkbox{
          min-width: 80px;
        }
        .add-tag{
          border: 1px dashed $border-color;
        }
      }
    }
  }
}
</style>
