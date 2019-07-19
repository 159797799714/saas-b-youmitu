<template>
  <div>
    <div class="logo">
      <img :src="iconUrl" alt="">
    </div>
    <el-menu
      :default-active="selectIndex"
      @select="handleSelect">
      <template v-for="(item, index) in routerArr">
        <el-submenu v-if="item.child.length > 1" :key="index" :index="'' + index">
          <template slot="title" >
            <i :class="item.iconClass" class="iconfont"/>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <template slot="title" class="item-title"/>
            <el-menu-item v-for="(sitem, sindex) in item.child" :key="sindex" :class="{selected: selectIndex === (index + '-' + sindex)}" :index="index + '-' + sindex">{{ sitem.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :class="{selected: selectIndex === '' + index}" :key="index" :index="'' + index">
          <i :class="item.iconClass" class="iconfont"/>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="goOut">
      <el-button type="primary" size="small" @click="goOut">返回总览</el-button>
    </div>
  </div>
</template>
<script>
import center from '@/views/setting/js/center.js'   // 中间件
import { getWebSiteIcon } from '@/api/setting'
export default {
  name: 'LeftNav',
  props: {
    index: {
      type: String,
      default: '0'
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      selectIndex: '0',
      routerArr: [],
      iconUrl: ''
    }
  },
  mounted () {
    // 监听网站基础设置logo变化
    center.$on('event1', data => {
      this.iconUrl = data.iconUrl
    })
  },
  created () {
    this.selectIndex = this.index
    this.routerArr = this.list
    const name = this.$route.name
    this.selectIndex = '0'
    for (let i = 0; i < this.routerArr.length; i++) {
      if (this.routerArr[i].child.length <= 1 && this.routerArr[i].child[0].pathName === name) {
        this.selectIndex = '' + i
        break
      }
      if (this.routerArr[i].child.length > 1) {
        for (let j = 0; j < this.routerArr[i].child.length; j++) {
          if (this.routerArr[i].child[j].pathName === name) {
            this.selectIndex = i + '-' + j
            return true
          }
        }
      }
    }
  },
  beforeMount () {
    this.getInfo()
  },
  watch: {
    index (val) {
      this.selectIndex = val
    },
    list (val) {
      this.routerArr = val
      const name = this.$route.name
      this.selectIndex = '0'
      for (let i = 0; i < this.routerArr.length; i++) {
        if (this.routerArr[i].child.length <= 1 && this.routerArr[i].child[0].pathName === name) {
          this.selectIndex = '' + i
          break
        }
        if (this.routerArr[i].child.length > 1) {
          this.selectIndex = i + '-' + 0
          for (let j = 0; j < this.routerArr[i].child.length; j++) {
            if (this.routerArr[i].child[j].pathName === name) {
              this.selectIndex = i + '-' + j
              return true
            }
          }
        }
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.selectIndex = key
      if (keyPath.length > 1) {
        this.$router.push({ name: this.routerArr[keyPath[0]].child[keyPath[1].split('-').pop()].pathName })
      } else {
        this.$router.push({ name: this.routerArr[keyPath[0]].child[0].pathName })
      }
    },
    goOut () {
      sessionStorage.setItem('topItem', 0)
      this.$router.push({ name: 'index' })
    },
    getInfo () {
      // 获取logo
      getWebSiteIcon().then(res => {
        if (res.data.code === 0) {
          this.iconUrl = '//' + res.data.data.domain + res.data.data.website_icon
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/views/setting/css/index.scss';
.el-menu{
  // background: #E6EBF4;
  // font-weight: bold;
  .el-menu-item{
    min-width: 180px;
    color: #444;
    &:hover{
      border-right: 4px solid #4993FF;
    }
  }
  // .el-menu-item-group{
  //   background: #F0F8FF;
  // }
  .iconfont{
    margin-right: 10px;
    font-weight: normal;
  }
}
.logo{
  height: 100px;
  position: relative;
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50px;
  }
}
.selected{
  border-right: 4px solid #4993FF;
  color: #2478FF !important;
  background: #F0F8FF;
}
.goOut{
  position: absolute;
  left: 48px;
  bottom: 60px;
}
</style>
<style scoped>
.el-menu{
  border-right: 0;
  z-index: 5;
  font-weight: 600;
}
</style>
