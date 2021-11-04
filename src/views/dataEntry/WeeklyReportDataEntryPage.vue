<template>
  <div class="screen-container">
    <div class="screen-header">
      <entryHead :dataEntryTitle="dataEntryTitle" @sendCurrentWeek="getCurrentWeek"></entryHead>
    </div>
    <div class="screen-body">
      <wrDataEntry :currentWeek="[currentWeek,startOfWeek,endOfWeek]"></wrDataEntry>
    </div>
  </div>
</template>
<script>
import entryHead from '@/components/dataEntry/entryHead'
import wrDataEntry from '@/components/dataEntry/wrDataEntry'
export default {
  data() {
    return {
      dataEntryTitle:'人员周报数据录入',
      currentWeek: '', // 当天所处周数
      startOfWeek: '', // 当周第一天
      endOfWeek: '', // 当周最后一天
    }
  },

  mounted() {},

  methods: {
    getCurrentWeek(res) {
      this.currentWeek = res[0]
      this.startOfWeek = res[1]
      this.endOfWeek = res[2]
    },
  },
  components: {
    entryHead,
    wrDataEntry,
  },
}
</script>
<style lang="less" scoped></style>
