<template>
  <div class="com-container">
    <div class="entryHead">
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <div class="date-container">
        <!-- <el-date-picker
          v-model="time"
          type="week"
          format="yyyy-MM-dd 第 WW 周"
          placeholder="选择周"
          :clearable="false"
          ref="dpRef"
          @change="changeTime"
        >
        </el-date-picker> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: new Date(), //当天日期时间
      title: '',
      // currentWeek: '',  // 当天所处周数
      // startOfWeek: '',  // 当周第一天
      // endOfWeek: '',    // 当周最后一天
    }
  },
  props: ['dataEntryTitle'],
  created() {},
  mounted() {
    this.getDateRange(this.time)
    this.title = this.dataEntryTitle
    // this.$emit('sendCurrentWeek', [this.currentWeek,this.startOfWeek,this.endOfWeek])
  },
  watch: {
    // time: function(newVal) {
    //   newVal = newVal.format('yyyy-MM-dd')
    //   this.getDateRange(newVal)
    //   this.$emit('sendCurrentWeek',  [this.currentWeek,this.startOfWeek,this.endOfWeek])
    // },
    // 监听父组件传来的新周数
    // currentWeek: function(newVal) {
    //   // console.log(newVal);
    // },
  },
  methods: {
    getDateRange(time) {
      this.currentWeek = this.$moment(time).isoWeek()
      this.startOfWeek = this.$moment(time)
        .startOf('week')
        .toDate()
        .format('yyyy-MM-dd')
      this.endOfWeek = this.$moment(time)
        .endOf('week')
        .toDate()
        .format('yyyy-MM-dd')
    },
    changeTime(val){
      
    }

  },
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
