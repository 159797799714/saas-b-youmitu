<template>
  <div class="header-bar">
    <el-tabs v-model="selectType" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.text" :name="item.type"/>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'BonusHdeaBar',
  props: {
    selected: {
      type: String,
      default: ''
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
      selectType: '',
      oldSelectType: ''
    }
  },
  created () {
    this.selectType = this.selected
    this.oldSelectType = this.selectType
  },
  watch: {
    selected (val) {
      this.selectType = val
      this.oldSelectType = this.selectType
    }
  },
  methods: {
    handleClick (tab) {
      if (this.oldSelectType === tab.name) return
      this.oldSelectType = this.selectType
      this.$emit('change', { index: parseInt(tab.index), type: tab.name })
    }
  }
}
</script>
<style scoped>
>>> .el-tabs__nav-wrap{
  padding: 0 36px;
}
>>> .is-active{
  background-color: transparent;
}
</style>
