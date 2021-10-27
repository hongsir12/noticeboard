<!--存储磁盘IO分布图-->
<template>
  <div class="com-container">
    <div class="com-chart" ref="diskIORef"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      sasData: [],
      sataData: [],
      ssdData: [],
    }
  },

  mounted() {
    this.initChart(),
    this.getData(),
    window.addEventListener('resize', this.screenAdapter),
    // 在页面加载完成时候，主动进行屏幕适配
    this.screenAdapter()
  },

  methods: {
    // 初始化echartInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.diskIORef)
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '3Par存储-磁盘IO分布图',
          left: '1%',
        },
        legend: {
          data: ['SAS', 'SATA', 'SSD'],
        },
        xAxis: {
          scale: true,
          type: 'value',
          splitNumber: 10,
          //max: 2000,
          name: '写IOPS',
        },
        yAxis: {
          scale: true,
          type: 'value',
          splitNumber: 10,
          //max: 2000,
          name: '读IOPS',
        },
        tooltip: {
          formatter: param => {
            return `读IOPS: ${param.value[1]} <br/>写IOPS: ${param.value[0]}`
          },
        },
        // 数据格式为: 每个存储一共有多少个盘, 每个盘的型号是什么, 每月平均读写是多少
        // 每月平均读数对应各个点的坐标.
        series: [
          {
            name: 'SAS',
            type: 'scatter',
            // symbolSize: 20,
          },
          {
            name: 'SATA',
            type: 'scatter',
            // symbolSize: 20,
          },
          {
            name: 'SSD',
            type: 'scatter',
          },
        ],
      }
      this.chartInstance.setOption(initOption)
    },
    getData() {
      for (let i = 0; i < 288; i++) {
        let factor = Math.random()
        if (factor < 0.1) {
          this.sasData.push([
            Math.floor(170 * Math.random()) + 180,
            Math.floor(100 * Math.random()),
          ])
        } else if (factor < 0.2) {
          this.sasData.push([
            Math.floor(150 * Math.random()),
            Math.floor(150 * Math.random()),
          ])
        } else if (factor < 0.9) {
          this.sasData.push([
            Math.floor(170 * Math.random()) + 180,
            Math.floor(170 * Math.random()) + 180,
          ])
        } else {
          this.sasData.push([
            Math.floor(100 * Math.random()),
            Math.floor(170 * Math.random()) + 180,
          ])
        }
      }
      for (let i = 0; i < 48; i++) {
        let factor = Math.random()
        if (factor < 0.1) {
          this.sataData.push([
            Math.floor(70 * Math.random()) + 130,
            Math.floor(50 * Math.random()),
          ])
        } else if (factor < 0.2) {
          this.sataData.push([
            Math.floor(100 * Math.random()),
            Math.floor(100 * Math.random()),
          ])
        } else if (factor < 0.9) {
          this.sataData.push([
            Math.floor(80 * Math.random()) + 120,
            Math.floor(80 * Math.random()) + 120,
          ])
        } else {
          this.sataData.push([
            Math.floor(50 * Math.random()),
            Math.floor(70 * Math.random()) + 130,
          ])
        }
      }
      for (let i = 0; i < 96; i++) {
        let factor = Math.random()
        if (factor < 0.1) {
          this.ssdData.push([
            Math.floor(1000 * Math.random()) + 1000,
            Math.floor(1000 * Math.random()),
          ])
        } else if (factor < 0.2) {
          this.ssdData.push([
            Math.floor(500 * Math.random()),
            Math.floor(500 * Math.random()),
          ])
        } else if (factor < 0.8) {
          this.ssdData.push([
            Math.floor(500 * Math.random()) + 1000,
            Math.floor(500 * Math.random()) + 1000,
          ])
        } else if (factor < 0.9) {
          this.ssdData.push([
            Math.floor(1000 * Math.random()) + 1000,
            Math.floor(1000 * Math.random()) + 1000,
          ])
        } else {
          this.ssdData.push([
            Math.floor(1000 * Math.random()),
            Math.floor(1000 * Math.random()) + 1000,
          ])
        }
      }
      
      this.updateChart()
    },
    updateChart() {
      const dataOption = {
        series: [
          {
            data: this.sasData,
          },
          {
            data: this.sataData,
          },
          {
            data: this.ssdData,
          },
        ],
      }
      this.chartInstance.setOption(dataOption)
    },
    // 当浏览器大小发生变化时候，调用方法完成屏幕适配
    screenAdapter() {
      const titleFontSize = (this.$refs.diskIORef.offsetWidth / 100) * 1.5
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
