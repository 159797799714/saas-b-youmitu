<template>
  <div class="header-bar">
    <div v-for="(item, index) in list" :key="index" :class="{bar: true, selected: index === selectIndex}" @click="selectAction(index)">{{ item }}</div>
    <div ref="slipe" class="slipe-span"/>
  </div>
</template>
<script>
export default {
  name: 'BonusHdeaBar',
  props: {
    selected: {
      type: Number,
      default: 0
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
      selectIndex: 0
    }
  },
  watch: {
    selected (val) {
      this.selectIndex = val
    }
  },
  methods: {
    selectAction (index) {
      if (this.selectIndex === index) return
      this.selectIndex = index
      this.$refs.slipe.style.left = index * 110 + 'px'
      this.$emit('change', { index: index })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.header-bar{
  display: flex;
  position: relative;
  .bar{
    margin-right: 20px;
    width: 90px;
    height: 48px;
    text-align: center;
    &:hover{
      cursor: pointer;
    }
  }
  .selected{
    color: $btn-color;
  }
  .slipe-span{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 90px;
    background: $btn-color;
    transition: 0.8s;
  }
}
</style>
