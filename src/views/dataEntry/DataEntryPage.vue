<!--数据录入页面-->
<template>
  <div class="screen-container">
    <div class="screen-header">
      <entryHead
        :dataEntryTitle="dataEntryTitle"
        
        ref="entryHeadRef"
      ></entryHead>
    </div>
    <div class="screen-body">
      <div class="top">
        <!-- <dv-border-box-11 :color="['black', 'black']"  title="运行情况"> -->
        <devEntry :currentWeek="currentWeek"></devEntry>
        <!-- </dv-border-box-11> -->
      </div>
      <div class="bottom">
        <!-- <dv-border-box-11 :color="['black', 'black']"  title="资源情况"> -->
        <rsEntry :currentWeek="currentWeek"></rsEntry>
        <!-- </dv-border-box-11> -->
      </div>
    </div>
  </div>
</template>
<script>
import entryHead from '@/components/dataEntry/entryHead'
import devEntry from '@/components/dataEntry/devEntry'
import rsEntry from '@/components/dataEntry/rsEntry'

export default {
  data() {
    return {
      dataEntryTitle: '南中心系统与设备运行情况数据录入',
      // currentWeek: '', // 当天所处周数
      // startOfWeek: '', // 当周第一天
      // endOfWeek: '', // 当周最后一天
    }
  },
  props: ['currentWeek'],
  watch: {
    // 监听父组件传来的新周数
    currentWeek: function(newVal, oldVal) {
      
    },
  },
  created() {},
  mounted() {},
  methods: {
    // getCurrentWeek(res) {
    //   this.currentWeek = res[0]
    //   this.startOfWeek = res[1]
    //   this.endOfWeek = res[2]
    // },
  },
  components: {
    entryHead,
    devEntry,
    rsEntry,
  },
}
</script>
<style lang="less" scoped>
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 200px;
  background-color: #f2f3f5;
  color: #111;
  box-sizing: border-box;
  // background-image: url('../assets/pageBg.png');
  // background-size: cover;
  // background-position: center center;
  .screen-header {
    width: 100%;
    height: 64px;
  }
  .screen-body {
    width: 100%;
    height: 100%;
    .top {
      width: 100%;
      height: 45%;
      // border: 1px solid #111;
      border-radius: 10px;
      box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
    }
    .bottom {
      width: 100%;
      height: 45%;
      margin-top: 10px;
      // border: 1px solid #111;
      border-radius: 10px;
      box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
    }
  }
}
</style>
