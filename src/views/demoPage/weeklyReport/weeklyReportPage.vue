<!---->
<template>
  <div class="com-page">
      <weeklyReport2 :currentWeek="currentWeek" ></weeklyReport2>
  </div>
</template>
<script>
// import weeklyReport from '@/components/weeklyReport/weeklyReport'
import weeklyReport2 from '@/components/weeklyReport/weeklyReport2'

export default {
  data() {
    return {}
  },
  props:['currentWeek'],
  mounted() {
    
  },

  methods: {
    
  },
  components:{
      weeklyReport2,
  }
}
</script>
<style lang="less" scoped></style>