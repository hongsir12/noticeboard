<!--数据录入页面-->
<template>
  <div class="screen-container">
    <div class="screen-header">
      <entryHead></entryHead>
    </div>
    <div class="screen-body">
      <div class="top">
          <!-- <dv-border-box-11 :color="['black', 'black']"  title="运行情况"> -->
              <devEntry></devEntry>
          <!-- </dv-border-box-11> -->
          </div>
      <div class="bottom">
        <!-- <dv-border-box-11 :color="['black', 'black']"  title="资源情况"> -->
          <rsEntry></rsEntry>
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
    return {}
  },

  mounted() {},

  methods: {},
  components: {
    entryHead,
    devEntry,
    rsEntry
  },
}
</script>
<style lang="less" scoped>
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 200px;
  background-color: #fff;
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
      border-radius:10px;
      box-shadow:  8px 8px 16px #bebebe,
             -8px -8px 16px #ffffff;
    }
    .bottom {
      width: 100%;
      height: 45%;
      margin-top: 10px;
      // border: 1px solid #111;
      border-radius:10px;
      box-shadow:  8px 8px 16px #bebebe,
             -8px -8px 16px #ffffff;
    }
  }
}
</style>
