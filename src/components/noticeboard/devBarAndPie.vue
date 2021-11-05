<!--一周设备故障优化统计图-->
<template>
  <div class="com-container">
    <div class="com-chart" ref="devBarAndPieRef"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null, //获取的所有数据
      pDevData: null, //物理设备数据
      osData: null, //操作系统数据
      mvData: null, //mv线路数据
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
    this.initChart()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.devBarAndPieRef)
      const initOption = {
        title: {
          text: '本周故障及需优化统计',
          left: 'center',
          top: '2%',
          textStyle: {
            color: 'white',
          },
        },
        tooltip: {
          formatter: function(value) {
            // console.log(value)
            if (value.componentSubType == 'pie') {
              return `${value.marker + value.name}:${value.value.正常}`
            } else {
              if (value.seriesName == '关注') {
                return `
                            ${value.seriesName}<br>
                            ${value.marker + value.name}:${value.value.关注}`
              } else if (value.seriesName == '故障') {
                return `
                            ${value.seriesName}<br>
                            ${value.marker + value.name}:${value.value.故障}`
              }
            }
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
          top: '25%',
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
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'orange',
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
                color: 'red',
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
            type: 'pie',
            radius: '35%',
            center: ['75%', '25%'],
            top: '10%',
            label: {
              formatter: function(a) {
                // console.log(a)
                return `${a.data.正常}`
              },
              textStyle: {
                //数值样式
                color: 'white',
              },
            },
            datasetIndex: 1,
            color: ['blue', 'grey', 'gold'],
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
      // 处理数据相关配置项
      let osData = this.osData
      let pDevData = this.pDevData
      let mvData = this.mvData
      // 计算周数据
      function calc(data, str) {
        //   console.log(data);
        let total = 0
        data.forEach((value, index, arr) => {
          total += value[str]
        })
        // console.log(total);
        return total
      }
      const dataOption = {
        dataset: [
          {
            dimensions: ['product', '关注', '故障'],
            source: [
              {
                product: '操作系统(套)',
                关注: calc(osData, 'focus'),
                故障: calc(osData, 'err'),
              },
              {
                product: '物理设备(台)',
                关注: calc(pDevData, 'focus'),
                故障: calc(pDevData, 'err'),
              },
              {
                product: 'MV线路(条)',
                关注: calc(mvData, 'focus'),
                故障: calc(mvData, 'err'),
              },
            ],
          },
          {
            source: [
              { product: '操作系统(套)正常', 正常: calc(osData, 'normal') },
              { product: '物理设备(台)正常', 正常: calc(pDevData, 'normal') },
              { product: 'MV线路(条)正常', 正常: calc(mvData, 'normal') },
            ],
          },
        ],
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      // 处理屏幕适配相关配置项
      const titleFontSize = (this.$refs.devBarAndPieRef.offsetWidth / 100) * 3
      const labelFontSize = (this.$refs.devBarAndPieRef.offsetWidth / 100) * 2
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
            label: {
              textStyle: {
                fontSize: labelFontSize,
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(adapterOption)
      // 手动调用图表对象的resize才能产生效果
      this.chartInstance.resize()
    },
  },
}
</script>
<style lang="less" scoped></style>
