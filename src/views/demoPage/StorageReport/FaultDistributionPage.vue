<!---->
<template>
  <div class="com-page">
      <FaultDistribution></FaultDistribution>
  </div>
</template>
<script>
import FaultDistribution from '@/components/storageReport/FaultDistribution'
export default {
  data() {
    return {}
  },

  mounted() {},

  methods: {},
  components:{
      FaultDistribution:FaultDistribution,
  }
}
</script>
<style lang="less" scoped></style>