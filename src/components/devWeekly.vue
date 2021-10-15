<template>
  <div class="com-container">
    <div class="container" ref="devWeeklyRef">
      <div class="weeklyTitle"><span>本周设备信息简述</span></div>
      <div class="describeContainer">
        <span>1.本周需关注优化设备总数：1200台</span><br />
        <span>2.本周故障设备总数：400件</span><br />
        <span>3.系统运行稳定，设备运转正常，MV线路平稳</span><br />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
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
      const titleFontSize = (this.$refs.devWeeklyRef.offsetWidth / 100) * 8
      const describeContainerFontSize = (this.$refs.devWeeklyRef.offsetWidth /100)*4.8
      let weeklyTitle = document.getElementsByClassName('weeklyTitle')[0]
      let describeContainer = document.getElementsByClassName('describeContainer')[0]
      weeklyTitle.style.fontSize = `${titleFontSize}px`
      describeContainer.style.fontSize = `${describeContainerFontSize}px`
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 92%;
  height: 92%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
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
