<template>
  <div class="main">
    <div class="info">
      <BonusHeadBar
        :selected="header.selectType"
        :list="header.list"/>
    </div>
    <div class="details" v-if="header.selectType === 'repay'">
      <repaySetting/>
    </div>
  </div>
</template>

<script>
import BonusHeadBar from '@/views/setting/components/headBar.vue'
import repaySetting from './components/repay.vue'

export default {
  components: {
    BonusHeadBar,
    repaySetting
  },
  data () {
    return {
      header: {
        selectType: 'repay',
        list: [
          {
            text: '代还分润管理',
            type: 'repay'
          }
        ]
      }
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
  .details{
    padding: 40px 30px;
  }
}
</style>
