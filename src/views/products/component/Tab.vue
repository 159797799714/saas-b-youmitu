<template>
  <div class="tab-link">
    <li v-for="(item, index) in tabsList" :key="index" :class="{selected: selectIndex === index}" @click="tabAction(index)">{{ item.title }}</li>
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
      tabsList: [{
        title: '银行卡发布',
        href: '/products/bank'
      }, {
        title: '信用卡发布',
        href: '/products/credit'
      }],
      selectIndex: this.from
    }
  },
  methods: {
    tabAction (index) {
      this.selectIndex = index
      this.$router.push(this.tabsList[index].href)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
