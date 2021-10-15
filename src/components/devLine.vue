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

  mounted() {
    this.initChart(),
      this.getData(),
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
          top:'2%',
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
    getData() {
      let data = [
        {
          type: '物理设备',
          normal: 2000,
          focus: 50,
          err: 5,
          date: '2021-10-10',
          user: 'abc',
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 58,
          err: 1,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 48,
          err: 2,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 47,
          err: 7,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 54,
          err: 4,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 47,
          err: 4,
          date: '2021-10-15',
          user: 'abc',
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 40,
          err: 3,
          date: '2021-10-16',
          user: 'abc',
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 110,
          err: 20,
          date: '2021-10-10',
          user: 'abc',
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 102,
          err: 11,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 77,
          err: 18,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 98,
          err: 19,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 101,
          err: 21,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 88,
          err: 16,
          date: '2021-10-15',
          user: 'abc',
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 107,
          err: 19,
          date: '2021-10-16',
          user: 'abc',
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 27,
          err: 1,
          date: '2021-10-10',
          user: 'abc',
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 36,
          err: 0,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 17,
          err: 2,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 28,
          err: 4,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 36,
          err: 5,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 17,
          err: 1,
          date: '2021-10-15',
          user: 'abc',
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 29,
          err: 4,
          date: '2021-10-16',
          user: 'abc',
        },
      ]
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
      // 前十天状态数据
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
            ['2021-10-10', ...currentDayDevFocusAndErr()],
            ['2021-10-11', ...currentDayDevFocusAndErr(1)],
            ['2021-10-12', ...currentDayDevFocusAndErr(2)],
            ['2021-10-13', ...currentDayDevFocusAndErr(3)],
            ['2021-10-14', ...currentDayDevFocusAndErr(4)],
            ['2021-10-15', ...currentDayDevFocusAndErr(5)],
            ['2021-10-16', ...currentDayDevFocusAndErr(6)],
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
