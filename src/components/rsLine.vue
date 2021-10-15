<!--一周资源使用折线图-->
<template>
  <div class="com-container">
    <div class="com-chart" ref="rsLineRef"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null, //获取的所有数据
      cpuData: null, //cpu数据
      ramData: null, //内存数据
      storageData: null, //存储数据
    }
  },

  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
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
      this.chartInstance = this.$echarts.init(this.$refs.rsLineRef)
      const initOption = {
        title: {
          text: '各资源一周使用趋势',
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
              color: '#f26522',
            },
          },
          {
            type: 'line',
            itemStyle: {
              color: '#aa363d',
            },
          },
          {
            type: 'line',
            itemStyle: {
              color: 'green',
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
          type: 'CPU(核)',
          total: 200,
          used: 190,
          consumed: 90,
          date: '2021-10-10',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 200,
          consumed: 90,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 140,
          consumed: 90,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 150,
          consumed: 90,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 170,
          consumed: 90,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 194,
          consumed: 90,
          date: '2021-10-15',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 190,
          consumed: 90,
          date: '2021-10-16',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 150,
          consumed: 90,
          date: '2021-10-10',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 130,
          consumed: 90,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 142,
          consumed: 90,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 124,
          consumed: 90,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 156,
          consumed: 90,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 122,
          consumed: 90,
          date: '2021-10-15',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 132,
          consumed: 90,
          date: '2021-10-16',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 113,
          consumed: 90,
          date: '2021-10-10',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 124,
          consumed: 90,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 88,
          consumed: 90,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 98,
          consumed: 90,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 102,
          consumed: 90,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 76,
          consumed: 90,
          date: '2021-10-15',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 100,
          consumed: 90,
          date: '2021-10-16',
          user: 'abc',
        },
      ]
      this.allData = data
      this.cpuData = data.filter((value, index, arr) => {
        return value.type == 'CPU(核)'
      })
      this.ramData = data.filter((value, index, arr) => {
        return value.type == '内存(GB)'
      })
      this.storageData = data.filter((value, index, arr) => {
        return value.type == '存储(TB)'
      })
      this.updateChart()
    },
    updateChart() {
      // 计算当天资源使用量
      const that = this
      function currentDayResourceUsed(n = 0) {
        let arr = []
        arr.push(
          that.cpuData[n].used,
          that.ramData[n].used,
          that.storageData[n].used
        )
        // console.log(arr)
        return arr
      }
      // 处理数据相关配置项
      const dataOption = {
        dataset: {
          // 提供一份数据。
          source: [
            ['product', 'CPU(核)', '内存(GB)', '存储(TB)'],
            ['2021-10-10', ...currentDayResourceUsed()],
            ['2021-10-11', ...currentDayResourceUsed(1)],
            ['2021-10-12', ...currentDayResourceUsed(2)],
            ['2021-10-13', ...currentDayResourceUsed(3)],
            ['2021-10-14', ...currentDayResourceUsed(4)],
            ['2021-10-15', ...currentDayResourceUsed(5)],
            ['2021-10-16', ...currentDayResourceUsed(6)],
          ],
        },
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      // 处理屏幕适配相关配置项
      const titleFontSize = (this.$refs.rsLineRef.offsetWidth / 100) * 3
      // console.log(titleFontSize);
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
