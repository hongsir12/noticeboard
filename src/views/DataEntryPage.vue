<!--数据录入页面-->
<template>
  <div class="screen-container">
    <div class="screen-header">
      <entryHead></entryHead>
    </div>
    <div class="screen-body">
      <div class="top">
          <dv-border-box-11 title="运行情况">
              <devEntry></devEntry>
          </dv-border-box-11></div>
      <div class="bottom"><dv-border-box-11 title="资源情况"></dv-border-box-11></div>
    </div>
  </div>
</template>
<script>
import entryHead from '@/components/dataEntry/entryHead'
import devEntry from '@/components/dataEntry/devEntry'
export default {
  data() {
    return {}
  },

  mounted() {},

  methods: {},
  components: {
    entryHead,
    devEntry
  },
}
</script>
<style lang="less" scoped>
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 200px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
  background-image: url('../assets/pageBg.png');
  background-size: cover;
  background-position: center center;
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
    }
    .bottom {
      width: 100%;
      height: 45%;
      margin-top: 10px;
    }
  }
}
</style>
