<template>
  <div>
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
  </div>
</template>
<script>
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
      routerArr: []
    }
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
        this.selectIndex = i + '-' + 0
        for (let j = 0; j < this.routerArr[i].child.length; j++) {
          if (this.routerArr[i].child[j].pathName === name) {
            this.selectIndex = i + '-' + j
            return true
          }
        }
      }
    }
  },
  watch: {
    index (val) {
      this.selectIndex = val
    },
    list (val) {
      this.$nextTick(() => {
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
      })
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/views/setting/css/index.scss';
.el-menu{
  padding-left: 0;
  border-right: 0;
  font-weight: 600;
  // background: #E6EBF4;
  .el-menu-item{
    min-width: 100%;
    box-sizing: border-box;
    width: 100%;
    &:hover{
      border-right: 4px solid #4993FF;
    }
  }
  .iconfont{
    margin-right: 10px;
    font-weight: normal;
  }
}
.selected{
  color: #4993FF;
  border-right: 4px solid #4993FF;
  background: #F0F8FF;
}
</style>
