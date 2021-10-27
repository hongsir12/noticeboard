<template>
  <div class="screen-container">
    <div class="screen-header">
      <entryHead :dataEntryTitle="dataEntryTitle"></entryHead>
    </div>
    <div class="screen-body">
      <wrDataEntry></wrDataEntry>
    </div>
  </div>
</template>
<script>
import entryHead from '@/components/dataEntry/entryHead'
import wrDataEntry from '@/components/dataEntry/wrDataEntry'
export default {
  data() {
    return {
      dataEntryTitle:'人员周报数据录入'
    }
  },

  mounted() {},

  methods: {},
  components: {
    entryHead,
    wrDataEntry,
  },
}
</script>
<style lang="less" scoped></style>
