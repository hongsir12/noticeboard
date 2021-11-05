<template>
  <div class="com-container">
    <div class="container" ref="rsWeeklyRef">
      <div class="weeklyTitle"><span>本周资源信息简述</span></div>
      <div class="describeContainer">
        {{ weeklyReport }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weeklyReport: null,
    }
  },
  props: ['currentWeek'], //周数
  watch: {
    // 监听父组件传来的新周数
    currentWeek: function(newVal) {
      // console.log(newVal);
      this.getWeeklyReport()
    },
  },
  mounted() {
    this.getWeeklyReport()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    async getWeeklyReport() {
      let params = {
        data: [
          {
            report_type: '资源使用情况周报',
            conditions: [
              {
                //根据第几年第几周来查询周报内容
                week:
                  this.$moment(this.currentWeek[1]).format('YYYY') +
                  ' ' +
                  this.currentWeek[0],
              },
            ],
          },
        ],
      }
      let { data } = await this.$request('apiQuery', params, 'post')
      if (data.total) {
        this.weeklyReport = JSON.parse(data.list[0].report_data).content
        
      }else{
        this.weeklyReport = ''
      }
    },
    screenAdapter() {
      // 周报标题字体大小
      const titleFontSize = (this.$refs.rsWeeklyRef.offsetWidth / 100) * 8
      // 周报内容字体大小
      const describeContainerFontSize =
        (this.$refs.rsWeeklyRef.offsetWidth / 100) * 4.8

      let weeklyTitle = document.getElementsByClassName('weeklyTitle')[1]
      let describeContainer = document.getElementsByClassName(
        'describeContainer'
      )[1]

      weeklyTitle.style.fontSize = `${titleFontSize}px`
      describeContainer.style.fontSize = `${describeContainerFontSize}px`
    },
  },
}
</script>
<style lang="less" scoped>
// 周报容器
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 92%;
  height: 92%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  //   周报标题
  .weeklyTitle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    margin: 10px 0;
  }
  //   周报描述内容
  .describeContainer {
    padding: 0 10px;
  }
}
</style>
