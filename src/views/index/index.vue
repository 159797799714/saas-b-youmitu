<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="user-type">
        <div class="data">
          <div class="data-name">今日新增用户</div>
          <div class="data-sum">{{ userNum.today }}</div>
          <div class="small-data">总用户：{{ userNum.all }}</div>
        </div>
        <div class="data">
          <div class="data-name">今日收入</div>
          <div class="data-sum">￥ {{ incomeTotal.today }}</div>
          <div class="small-data">总收入：￥{{ incomeTotal.all }}</div>
        </div>
        <div class="data">
          <div class="data-name">无卡支付今日金额</div>
          <div class="data-sum">￥0</div>
          <div class="small-data">总收入：￥0</div>
        </div>
        <div class="data last-data">
          <div class="data-name">代还今日金额</div>
          <div class="data-sum">￥{{ incomeRepay.today }}</div>
          <div class="small-data">总收入：￥{{ incomeRepay.all }}</div>
        </div>
      </div>
      <div class="center-cultrue">
        <div class="left-chart">
          <div class="list-title">
            <span>会员占比</span>
          </div>
          <div id="memberChart"/>
        </div>
        <div class="right-chart">
          <div class="list-title">
            <span>用户分析</span>
            <div>
              <el-radio-group v-model="radio1" size="small" class="time">
                <el-radio-button label="近七日"/>
                <el-radio-button label="本月"/>
                <el-radio-button label="本年"/>
              </el-radio-group>
              <el-date-picker
                v-model="dateVal1"
                type="daterange"
                size="small"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </div>
          </div>
          <div id="testChart"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser, getIncome } from '@/api/index'

export default {
  name: 'Dashboard',
  data () {
    return {
      fullWidth: document.documentElement.clientHeight,
      url: window.location.href,
      radio1: '近七日',
      radio2: '近七日',
      dateVal1: [],
      dateVal2: [],
      data: ['前七天', '前六天', '前五天', '前四天', '前三天', '前二天', '前一天'],
      data2: ['前七天', '前六天', '前五天', '前四天', '前三天', '前二天', '前一天'],
      userNum: {                         // 今日新增用户数量
        today: '',
        all: ''
      },
      userInfo: [],                      // 返回的用户统计数组
      userArr: [],                       // 会员占比series的data值
      userName: [],                      // 会员占比legend的data值
      Income: [],
      incomeTotal: {},
      incomeRepay: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created () {
    // 收入统计
    this.getIncome()
    // 用户统计
    getUser().then(res => {
      if (res.data.data.info.length > 0) {
        this.userNum.all = res.data.data.all
        this.userNum.today = res.data.data.today
        this.userInfo = res.data.data.info
        this.userInfo.map((item, index) => {
          let data = {
            value: item.num,
            name: item.name
          }
          switch (index) {
            case 0:
              data.itemStyle = { color: '#BAE7FE' }
              break
            case 1:
              data.itemStyle = { color: '#91D5FE' }
              break
            case 2:
              data.itemStyle = { color: '#69C0FD' }
              break
            case 3:
              data.itemStyle = { color: '#40A9FD' }
              break
            case 4:
              data.itemStyle = { color: '#1790FC' }
              break
          }
          this.userArr.push(data)
          this.userName.push(item.name)
        })
      } else {
        this.userInfo = [{
          name: '空',
          num: 0
        }]
      }
      this.drawLine() // 调用绘图
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {
    this.fullWidth = document.documentElement.clientWidth
  },
  watch: {
    // 第一个日期切换监听
    radio1 (val, oldval) {
      this.dateVal1 = []
      var end = new Date()
      end = new Date(end)
      var start
      switch (val) {
        case '近七日':
          start = end - 3600 * 1000 * 24 * 7
          start = new Date(start)
          this.dateVal1.push(start)
          this.dateVal1.push(end)
          this.data = ['前七天', '前六天', '前五天', '前四天', '前三天', '前二天', '前一天']
          this.drawLine()
          break
        case '本月' :
          start = end - 3600 * 1000 * 24 * 30
          start = new Date(start)
          this.dateVal1.push(start)
          this.dateVal1.push(end)
          this.data = ['1日', '2日', '3日', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '13日', '14日', '15日', '1日', '2日', '3日', '1日', '2日', '3日', '1日', '2日', '3日']
          this.drawLine()
          break
        case '本年':
          start = end - 3600 * 1000 * 24 * 365
          start = new Date(start)
          this.dateVal1.push(start)
          this.dateVal1.push(end)
          this.data = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          this.drawLine()
          break
      }
    },
    // 第二个日期切换监听
    radio2 (val, oldval) {
      this.dateVal2 = []
      var end = new Date()
      end = new Date(end)
      var start
      switch (val) {
        case '近七日':
          start = end - 3600 * 1000 * 24 * 7
          start = new Date(start)
          this.dateVal2.push(start)
          this.dateVal2.push(end)
          this.data2 = ['前七天', '前六天', '前五天', '前四天', '前三天', '前二天', '前一天']
          break
        case '本月' :
          start = end - 3600 * 1000 * 24 * 30
          start = new Date(start)
          this.dateVal2.push(start)
          this.dateVal2.push(end)
          this.data2 = ['1日', '2日', '3日', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '13日', '14日', '15日', '1日', '2日', '3日', '1日', '2日', '3日', '1日', '2日', '3日']
          break
        case '本年':
          start = end - 3600 * 1000 * 24 * 365
          start = new Date(start)
          this.dateVal2.push(start)
          this.dateVal2.push(end)
          this.data2 = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          break
      }
    },
    fullWidth (val) {
      if (!this.timer) {
        this.fullWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
          // that.drawLine()
        }, 1000)
      }
      // this.drawLine()
      // console.log(val)
    }
  },
  methods: {
    getIncome () {
      // 收入统计
      getIncome().then(res => {
        if (res.data.data) {
          this.incomeTotal = res.data.data.total
          this.incomeRepay = res.data.data.repay
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 会员占比
    drawLine () {
      const memberChart = this.$echarts.init(document.getElementById('memberChart'))
      memberChart.setOption({
        title: {
          x: 'center'
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)',
        //   backgroundColor: '#fff',
        //   textStyle: {
        //     fontSize: '14px',
        //     color: '#333' // 设置文本颜色 默认#FFF
        //   }
        // },
        // 默认
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
          orient: 'vertical',
          left: '16',
          top: '60',
          data: this.userName,
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 20
        },
        series: [
          {
            name: '总人数',
            type: 'pie',
            radius: '55%',
            center: ['60%', '40%'],
            data: this.userArr,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#4993FF'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            }
          }
        ]
      })
      // 用户分析
      const testChart = this.$echarts.init(document.getElementById('testChart'))
      testChart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data,
          axisLine: { show: true, lineStyle: { color: '#333' } },
          // axisLine: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: true, lineStyle: { color: '#444' } },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#979797'
            }
          }// 横线
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
          data: ['普通会员', '实习银行家', '正式银行家'],
          right: '0'
        },
        series: [{
          name: '普通会员',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          // data: [4, 5, 4, 5, 7, 8, 6, 4, 7, 5, 6, 8],
          type: 'line',
          showSymbol: true,
          // symbol: 'circle', // 设定为实心点
          // symbolSize: 8, // 设定实心点的大小
          itemStyle: {
            color: '#4A90E2'
          },
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          markPoint: {
            symbolSize: 30,
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
          // 平均值
          // markLine: {
          //   data: [
          //     { type: 'average', name: '平均值' }
          //   ]
          // }
        }, {
          name: '实习银行家',
          data: [8, 4, 5, 3, 4, 3, 5, 4, 7, 6, 5, 11],
          type: 'line',
          showSymbol: true,
          // symbol: 'circle', // 设定为实心点
          // symbolSize: 8, // 设定实心点的大小
          itemStyle: {
            color: '#FF9B49'
          },
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          markPoint: {
            symbolSize: 30,
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
          // 平均值
          // markLine: {
          //   data: [
          //     { type: 'average', name: '平均值' }
          //   ]
          // }
        }, {
          name: '正式银行家',
          data: [6, 2, 8, 2, 5, 1, 2, 1, 0, 2, 0, 3],
          type: 'line',
          showSymbol: true,
          // symbol: 'circle', // 设定为实心点
          // symbolSize: 8, // 设定实心点的大小
          itemStyle: {
            color: '#52C41A'
          },
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          markPoint: {
            symbolSize: 30,
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
          // 平均值线
          // markLine: {
          //   data: [
          //     { type: 'average', name: '平均值' }
          //   ]
          // }
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })

      // 访问量统计
      const billChart = this.$echarts.init(document.getElementById('billChart'))
      billChart.setOption({
        // 鼠标放入的显示
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data2,
          axisLine: { show: true, lineStyle: { color: '#333' } },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#979797'
            }
          }// 横线
        },
        legend: {
          data: ['IP', 'PV'],
          right: 35,
          top: 20
        },
        // 折线图的位置
        grid: {
          x: 46, // 左上角距离左边
          x2: 20, // 右下角距离右边距离
          y2: 30, // 下面距离
          containLabel: true
        },
        series: [{
          name: 'IP',
          data: [18, 32, 23, 24, 12, 42, 64, 3, 20, 6, 5, 12],
          type: 'line',
          itemStyle: {
            color: '#52C41A'
          },
          showSymbol: true,
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          markPoint: {
            symbolSize: 30,
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
        }, {
          name: 'PV',
          data: [44, 5, 4, 43, 83, 64, 24, 45, 12, 24, 22, 45],
          type: 'line',
          itemStyle: {
            color: '#F85E5E'
          },
          showSymbol: true,
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          markPoint: {
            symbolSize: 30,
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
          // areaStyle: { // 颜色渐变
          //   color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ // $echart 在main.js里面已经写到了
          //     offset: 0,
          //     color: 'rgb(24, 143, 244)'
          //   }, {
          //     offset: 1,
          //     color: 'rgb(207, 232, 253)'
          //   }])
          // }
        }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$color-title: #4993FF;
$color-font-title: #333;
$color-font-info: #444;
$color-white: #fff;
$height-20: 20px;
#memberChart{
  flex: 1;
  max-width: 583px;
  max-height: 350px;
}
#testChart{
  width: 100%;
  height: 350px;
  margin:0 auto;
  height: 350px;
  min-width: 730px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#billChart{
  width: 100%;
  height: 100%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main{
  flex: 1;
  display: flex;
  padding: 16px;
  background: #F0F7FF;
  .dashboard-container{
    flex: 1;
    padding:14px;
  }
    .list-title{
      height: 50px;
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      font-weight: 600;
      color: $color-font-title;
      &>span{
        padding-left: 16px;
      }
    }
    .user-type{
      display: flex;
      padding-bottom: 15px;
      justify-content: space-between;
      overflow: hidden;
      color: $color-font-info;
      .data{
        flex: 1;
        margin-right: 16px;
        min-width: 150px;
        height: 181px;
        padding: 16px;
        background: $color-white;
        border-radius: 2px;
        .data-name{
          line-height: $height-20;
        }
        .data-sum{
          height: 93px;
          color: $color-font-title;
          font-size: 32px;
          font-weight: 600;
          line-height: 93px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          border-bottom: 1px solid #E7E8EF;
        }
        .small-data{
          line-height: 50px;
        }
      }
      .last-data{
        margin-right: 0;
      }
    }
    .center-cultrue{
      width: 100%;
      height: 420px;
      display: flex;
      margin-bottom: 16px;
      .left-chart{
        margin-right: 16px;
        min-width: 580px;
        background: $color-white;
        display: flex;
        flex-direction: column;
      }
      .right-chart{
        flex: 1;
        background: $color-white;
        padding: 0 16px;
        box-sizing: border-box;
        position: relative;
        .time{
          margin-right: 10px;
        }
      }
    }
    .visit-count{
      background: $color-white;
      width: 100%;
      height: 555px;
      padding:0 16px;
      box-sizing: border-box;
      .time{
        margin-right: 10px;
      }
    }
  }
</style>
