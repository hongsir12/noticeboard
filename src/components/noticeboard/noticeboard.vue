<template>
  <div class="com-container">
    <section class="screen-left">
      <div
        id="left-top"
        :class="[fullScreenStatus.devLine ? 'fullscreen' : '']"
      >
        <dv-border-box-12>
          <!--一周设备运行折线图-->
          <devLine ref="devLine"></devLine>
          <div class="resize">
            <span
              @click="changeSize('devLine', 0)"
              :class="[
                'iconfont',
                fullScreenStatus.devLine
                  ? 'icon-caozuo-quanping-shousuo'
                  : 'icon-caozuo-quanping-zhankai',
              ]"
            ></span>
          </div>
        </dv-border-box-12>
      </div>
      <div
        id="left-bottom"
        :class="[fullScreenStatus.rsLine ? 'fullscreen' : '']"
      >
        <dv-border-box-12>
          <!--一周资源使用折线图-->
          <rsLine ref="rsLine"></rsLine>
          <div class="resize">
            <span
              @click="changeSize('rsLine', 1)"
              :class="[
                'iconfont',
                fullScreenStatus.rsLine
                  ? 'icon-caozuo-quanping-shousuo'
                  : 'icon-caozuo-quanping-zhankai',
              ]"
            ></span>
          </div>
        </dv-border-box-12>
      </div>
    </section>
    <section class="screen-middle">
      <div
        id="middle-top"
        :class="[fullScreenStatus.devBarAndPie ? 'fullscreen' : '']"
      >
        <dv-border-box-12>
          <!--一周设备故障优化柱形图-->
          <devBarAndPie ref="devBarAndPie"></devBarAndPie>
          <div class="resize">
            <span
              @click="changeSize('devBarAndPie', 2)"
              :class="[
                'iconfont',
                fullScreenStatus.devBarAndPie
                  ? 'icon-caozuo-quanping-shousuo'
                  : 'icon-caozuo-quanping-zhankai',
              ]"
            ></span>
          </div>
        </dv-border-box-12>
      </div>
      <div
        id="middle-bottom"
        :class="[fullScreenStatus.rsBar ? 'fullscreen' : '']"
      >
        <dv-border-box-12>
          <!--一周资源消耗统计柱形图-->
          <rsBar ref="rsBar"></rsBar>
          <div class="resize">
            <span
              @click="changeSize('rsBar', 3)"
              :class="[
                'iconfont',
                fullScreenStatus.rsBar
                  ? 'icon-caozuo-quanping-shousuo'
                  : 'icon-caozuo-quanping-zhankai',
              ]"
            ></span>
          </div>
        </dv-border-box-12>
      </div>
    </section>
    <section class="screen-right">
      <div id="right-top">
        <dv-border-box-13>
          <devWeekly ref="devWeeklyRef"></devWeekly>
        </dv-border-box-13>
      </div>
      <div id="right-bottom">
        <dv-border-box-13>
          <rsWeekly ref="rsWeeklyRef"></rsWeekly>
        </dv-border-box-13>
      </div>
    </section>
  </div>
</template>
<script>
import devLine from '@/components/noticeboard/devLine'
import rsLine from '@/components/noticeboard/rsLine'
import devBarAndPie from '@/components/noticeboard/devBarAndPie'
import rsBar from '@/components/noticeboard/rsBar'
import devWeekly from '@/components/noticeboard/devWeekly'
import rsWeekly from '@/components/noticeboard/rsWeekly'
export default {
  data() {
    return {
      chartInstance:null,
        loading: true,
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        rsBar: false,
        rsLine: false,
        devBarAndPie: false,
        devLine: false,
      },
      time:new Date(),     
    }
  },

  mounted() {},

  methods: {
      // 缩放全屏视图切换
    changeSize(chartName, n) {
      this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      let dvBorderSvgContainer = document.getElementsByClassName(
        'dv-border-svg-container'
      )
      if (this.fullScreenStatus[chartName]) {
        dvBorderSvgContainer[n].style.display = 'none'
      } else {
        dvBorderSvgContainer[n].style.display = 'block'
      }
      //   调用每个图表组件的screenAdapter方法
      // this.$refs[chartName].screenAdapter()
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      })
    },
      screenAdapter() {
      const headTitleFontSize =
        (document.getElementById('capture').offsetWidth / 100) * 1.5
      let headTitle = document.getElementsByClassName('title-text')[0]
      headTitle.style.fontSize = `${headTitleFontSize}px`
    },
  },
  components: {
    rsBar,
    rsLine,
    devBarAndPie,
    devLine,
    devWeekly,
    rsWeekly,
  },
}
</script>
<style lang="less" scoped>
.com-container {
  width: 100%;
  height: 100%;
  display: flex;
  .screen-left {
    height: 100%;
    width: 40%;
    margin-right: 10px;
    #left-top {
      height: 45%;
      position: relative;
    }
    #left-bottom {
      height: 45%;
      position: relative;
      margin-top: 10px;
    }
  }
  .screen-middle {
    height: 100%;
    width: 40%;
    margin-right: 10px;
    #middle-top {
      height: 45%;
      position: relative;
    }
    #middle-bottom {
      height: 45%;
      position: relative;
      margin-top: 10px;
    }
  }
  .screen-right {
    height: 100%;
    width: 20%;
    #right-top {
      height: 45%;
      position: relative;
    }
    #right-bottom {
      height: 45%;
      position: relative;
      margin-top: 10px;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
}
</style>
