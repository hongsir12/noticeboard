<template>
  <div class="com-container">
    <div class="container" ref="rsWeeklyRef">
      <div class="weeklyTitle"><span>本周资源信息简述</span></div>
      <div class="describeContainer">
        <span>1.本周CPU共消耗3000核，同比上周消耗明显增加</span><br />
        <span>2.本周存储共消耗30TB，存储出现紧张，需要扩容</span><br />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },

  mounted() {
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
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
