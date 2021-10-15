<template>
  <div class="com-container">
    <div class="entryHead">
      <div class="title"><span>南中心系统与设备运行情况数据录入</span></div>
      <div class="date-container">
        <el-date-picker
          v-model="time"
          type="week"
          format="yyyy-MM-dd 第 WW 周"
          placeholder="选择周"
          :clearable="false"
        >
        </el-date-picker>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: new Date(),
    }
  },

  mounted() {},

  methods: {},
}
</script>
<style lang="less" scoped>
.entryHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  .title {
    font-size: 26px;
  }
  .date-container {
  }
}
</style>
