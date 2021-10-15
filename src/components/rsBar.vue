<template>
  <div class="com-container">
    <div class="com-chart" ref="rsBarRef"></div>
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
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.rsBarRef)
      const initOption = {
        title: {
          text: '本周资源消耗统计',
          left: 'center',
          top: '2%',
          textStyle: {
            color: 'white',
          },
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
          top: '15%',
          // 开启距离包含坐标轴上的文字
          containLabel: true,
        },
        tooltip: {},
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
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'green',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'white',
                    
                  },
                },
              },
            },
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'skyblue',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'white',
                    
                  },
                },
              },
            },
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'yellow',
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'white',
                    
                  },
                },
              },
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
          used: 190,
          consumed: 90,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 190,
          consumed: 90,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 190,
          consumed: 90,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 190,
          consumed: 90,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: 'CPU(核)',
          total: 200,
          used: 190,
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
          used: 190,
          consumed: 90,
          date: '2021-10-10',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 190,
          consumed: 90,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 190,
          consumed: 90,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 190,
          consumed: 90,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 190,
          consumed: 90,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 190,
          consumed: 90,
          date: '2021-10-15',
          user: 'abc',
        },
        {
          type: '内存(GB)',
          total: 220,
          used: 190,
          consumed: 90,
          date: '2021-10-16',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 100,
          consumed: 90,
          date: '2021-10-10',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 100,
          consumed: 90,
          date: '2021-10-11',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 100,
          consumed: 90,
          date: '2021-10-12',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 100,
          consumed: 90,
          date: '2021-10-13',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 100,
          consumed: 90,
          date: '2021-10-14',
          user: 'abc',
        },
        {
          type: '存储(TB)',
          total: 180,
          used: 100,
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
      this.cpuData = data.filter((value, index, arr) => {
        return value.type == 'CPU(核)'
      })
      this.ramData = data.filter((value, index, arr) => {
        return value.type == '内存(GB)'
      })
      this.storageData = data.filter((value, index, arr) => {
        return value.type == '存储(TB)'
      })
      this.allData = data
      this.updateChart()
    },
    updateChart() {
      let cpuData = this.cpuData
      let ramData = this.ramData
      let storageData = this.storageData
      // 计算周数据
      function calc(data, str) {
        let total = 0
        data.forEach((value, index, arr) => {
          total += value[str]
        })
        return total
      }
      // 处理数据相关配置项
      const dataOption = {
        dataset: {
          dimensions: ['product', '总量', '使用', '本周消耗'],
          source: [
            {
              product: 'CPU(核)',
              总量: calc(cpuData, 'total'),
              使用: calc(cpuData, 'used'),
              本周消耗: calc(cpuData, 'consumed'),
            },
            {
              product: '内存(GB)',
              总量: calc(ramData, 'total'),
              使用: calc(cpuData, 'used'),
              本周消耗: calc(cpuData, 'consumed'),
            },
            {
              product: '存储(TB)',
              总量: calc(storageData, 'total'),
              使用: calc(cpuData, 'used'),
              本周消耗: calc(cpuData, 'consumed'),
            },
          ],
        },
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      // 处理屏幕适配相关配置项
      const titleFontSize = (this.$refs.rsBarRef.offsetWidth / 100) * 3
      const labelFontSize = (this.$refs.rsBarRef.offsetWidth /100)*2
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    fontSize: labelFontSize,
                  },
                },
              },
            },
          },
          {
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    fontSize: labelFontSize,
                  },
                },
              },
            },
          },
          {
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    fontSize: labelFontSize,
                  },
                },
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
  },
}
</script>
<style lang="less" scoped></style>
