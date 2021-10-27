<template>
  <div class="screen-container">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <!-- 屏幕顶部 -->
    <header class="screen-header" id="capture">
      <dv-decoration-10 class="dv-dec-10" />

      <!-- 大屏标题 -->
      <div class="header-title">
        <dv-decoration-8 class="dv-dec-8" />
        <div class="title">
          <span class="title-text">南中心系统与设备运行情况</span>
        </div>
        <dv-decoration-8 class="dv-dec-8" :reverse="true" />
      </div>

      <dv-decoration-10 class="dv-dec-10-s" />

      <!-- 选择周次下拉框 -->
      <div class="selectWeek">
        <el-date-picker
          v-model="time"
          type="week"
          format="yyyy-MM-dd 第 WW 周"
          placeholder="选择周"
          :clearable = 'false'
        >
        </el-date-picker>
      </div>

      <!-- 截图按钮 -->
      <div class="screenshot" @click="screenshot()">
        <span class="iconfont icon-camera-full"></span>
      </div>
    </header>

    <!-- 屏幕主体 -->
    <div class="screen-body">
      <noticeboard></noticeboard>
      <!-- <weeklyReport></weeklyReport> -->
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import noticeboard from '@/components/noticeboard/noticeboard'
import weeklyReport from '@/components/weeklyReport/weeklyReport'

export default {
  data() {
    return {
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

  mounted() {
    this.cancelLoading()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
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
    // 拍照截图
    screenshot() {
      // window.pageYOffset = 0
      // document.documentElement.scrollTop = 0
      // document.body.scrollTop = 0
      html2canvas(document.querySelector('.screen-container'), {
        backgroundColor: '#111',
      }).then(canvas => {
        // 得到图片的base64编码数据
        const imgUrl = canvas.toDataURL('image/jpeg')
        let creatDom = document.createElement('a')
        document.body.appendChild(creatDom)
        creatDom.href = imgUrl
        creatDom.download = '第41周截图'
        creatDom.click()
      })
    },
    screenAdapter() {
      const headTitleFontSize =
        (document.getElementById('capture').offsetWidth / 100) * 1.5
      let headTitle = document.getElementsByClassName('title-text')[0]
      headTitle.style.fontSize = `${headTitleFontSize}px`
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
  },
  components: {
    noticeboard,
    weeklyReport,
  },
}
</script>
<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  background-image: url('../assets/pageBg.png');
  background-size: cover;
  background-position: center center;
  z-index: 999;
}
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
  background-image: url('../assets/pageBg.png');
  background-size: cover;
  background-position: center center;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  display: flex;
  .dv-dec-10,
  .dv-dec-10-s {
    width: 33.3%;
    height: 5px;
  }
  .dv-dec-10-s {
    transform: rotateY(180deg);
  }
  .dv-dec-8 {
    width: 200px;
    height: 50px;
  }
  .header-title {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  .title {
    position: relative;
    width: 500px;
    justify-content: center;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    .title-text {
      width: 100%;
      font-size: 28px;
      position: absolute;
      bottom: 25%;
      // left: 50%;
      transform: translate(-50%);
    }
  }
  .selectWeek {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 20px;
    right: 200px;
    font-size: 26px;
    .option {
      width: 70px;
      height: 40px;
      margin: 0 10px;
      border-radius: 10px;
      overflow: hidden;
      select {
        border: none;
        outline: none;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 26px;
        text-align: center;
        border-radius: 10px;
      }
    }
  }
  .screenshot {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    span {
      font-size: 40px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  // margin-top: 10px;
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
