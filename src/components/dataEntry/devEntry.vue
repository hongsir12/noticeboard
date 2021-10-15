<template>
  <div class="com-container">
    <div class="devEntryContainer">
      <div class="left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>周报</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >保存</el-button
            >
          </div>
        </el-card>
      </div>
      <div class="right">56</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>
<style lang="less" scoped>
.devEntryContainer {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 82%;
  padding: 0 20px 20px 20px;
  .left {
    width: 30%;
    height: 100%;
    .box-card {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 67%;
    height: 100%;
  }
}
</style>
