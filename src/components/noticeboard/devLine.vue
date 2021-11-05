<!--设备一周趋势折线图-->
<template>
  <div class="com-container">
    <div class="com-chart" ref="devLineRef"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      pDevData: null,
      osData: null,
      mvData: null,
    }
  },
  props: ['currentWeek'], //周数
  watch: {
    // 监听父组件传来的新周数
    currentWeek: function(newVal, oldVal) {
      this.getData()
    },
  },
  mounted() {
    this.getData()
    this.initChart(),
    window.addEventListener('resize', this.screenAdapter),
    // 在页面加载完成时候，主动进行屏幕适配
    this.screenAdapter()
  },
  destroyed() {
    // 在组件销毁时需要将监听器取消掉
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.devLineRef)
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '各设备一周故障优化趋势',
          left: 'center',
          top: '2%',
          textStyle: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: '10%',
          textStyle: {
            color: 'white',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '16%',
          // 开启距离包含坐标轴上的文字
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: 'white',
            },
          },
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: 'white',
            },
          },
        },
        series: [
          {
            type: 'line',
            itemStyle: {
              color: '#845538',
            },
          },
          {
            type: 'line',
            itemStyle: {
              color: '#f26522',
            },
          },
          {
            type: 'line',
            itemStyle: {
              color: '#ad8b3d',
            },
          },
          {
            type: 'line',
            itemStyle: {
              color: '#ff0000',
            },
          },
          {
            type: 'line',
            itemStyle: {
              color: '#fcaf17',
            },
          },
          {
            type: 'line',
            itemStyle: {
              color: '#E4007F',
            },
          },
        ],
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }
      this.chartInstance.setOption(initOption)
    },
    async getData() {
      let data = []
      let params = {
        data: [
          {
            report_type: '设备运行情况周报数据',
            // 根据当周头末时间查询该周数据
            starttime: this.currentWeek[1],
            overtime: this.currentWeek[2],
          },
        ],
      }
      let { data: tabledata } = await this.$request('apiQuery', params, 'post')
      tabledata = tabledata.list
      for (let rec of tabledata) {
        rec = JSON.parse(rec.report_data)
        data.push(rec)
      }
      this.allData = data
      this.pDevData = data.filter((value, index, arr) => {
        return value.type == '物理设备'
      })
      this.osData = data.filter((value, index, arr) => {
        return value.type == '操作系统'
      })
      this.mvData = data.filter((value, index, arr) => {
        return value.type == 'MV线路'
      })
      this.updateChart()
    },
    updateChart() {
      // 前n天状态数据
      const that = this
      function currentDayDevFocusAndErr(n = 0) {
        let arr = []
        arr.push(
          that.pDevData[n].focus,
          that.pDevData[n].err,
          that.osData[n].focus,
          that.osData[n].err,
          that.mvData[n].focus,
          that.mvData[n].err
        )
        return arr
      }
      const dataOption = {
        dataset: {
          // 提供一份数据。
          source: [
            [
              'product',
              '物理设备-关注',
              '物理设备-故障',
              '操作系统-关注',
              '操作系统-故障',
              'MV线路-关注',
              'MV线路-故障',
            ],
            [this.currentWeek[1], ...currentDayDevFocusAndErr(0)],
            [
              this.$moment(this.currentWeek[1])
                .add(1, 'd')
                .format('YYYY-MM-DD'),
              ...currentDayDevFocusAndErr(1),
            ],
            [
              this.$moment(this.currentWeek[1])
                .add(2, 'd')
                .format('YYYY-MM-DD'),
              ...currentDayDevFocusAndErr(2),
            ],
            [
              this.$moment(this.currentWeek[1])
                .add(3, 'd')
                .format('YYYY-MM-DD'),
              ...currentDayDevFocusAndErr(3),
            ],
            [
              this.$moment(this.currentWeek[1])
                .add(4, 'd')
                .format('YYYY-MM-DD'),
              ...currentDayDevFocusAndErr(4),
            ],
            [
              this.$moment(this.currentWeek[1])
                .add(5, 'd')
                .format('YYYY-MM-DD'),
              ...currentDayDevFocusAndErr(5),
            ],
            [this.currentWeek[2], ...currentDayDevFocusAndErr(6)],
          ],
        },
      }
      this.chartInstance.setOption(dataOption)
    },
    // 当浏览器大小发生变化时候，调用方法完成屏幕适配
    screenAdapter() {
      const titleFontSize = (this.$refs.devLineRef.offsetWidth / 100) * 3
      // 和分辨率大小相关的配置项
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
      }
      this.chartInstance.setOption(adapterOption)
      // 手动调用图表对象的resize才能产生效果
      this.chartInstance.resize()
    },
  },
}
</script>
<style lang="less" scoped></style>
