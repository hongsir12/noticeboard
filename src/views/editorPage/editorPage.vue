<template>
  <div class="com-container">
    <div class="mainPage">
      <!-- 顶部导航区域 -->
      <el-menu
        :default-active="activePath"
        class="el-menu-demo"
        mode="horizontal"
        router
        @select="handleSelect"
      >
        <el-menu-item
          v-for="(item, i) in navList"
          :key="i"
          :index="item.path"
          @click="saveNavState(item.path)"
        >
          <template slot="title">
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
        <el-submenu index="/">
          <template slot="title">数据录入</template>
          <el-menu-item index="/dataEntry" @click="saveNavState('/dataEntry')"
            >南中心系统与设备运行情况</el-menu-item
          >
          <el-menu-item
            index="/wrDataEntry"
            @click="saveNavState('/wrDataEntry')"
            >人员周报</el-menu-item
          >
        </el-submenu>
        <el-menu-item>
          <template>
            <el-switch
              v-model="editorShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="turnOnEditor"
            >
            </el-switch>
          </template>
        </el-menu-item>
        <el-menu-item>
          <template>
            <!-- 选择周次下拉框 -->
            <div class="selectWeek">
              <el-date-picker
                v-model="time"
                type="week"
                format="yyyy-MM-dd 第 WW 周"
                placeholder="选择周"
                :clearable="false"
              >
              </el-date-picker>
            </div>
          </template>
        </el-menu-item>
      </el-menu>
      <!-- echart图表区域 -->
      <div class="echart-area">
        <div class="editor-area" v-if="editorShow">
          <ace :option="scriptStr" :chartName="ChartOptionName"></ace>
        </div>
        <router-view
          ref="ref"
          :currentWeek="[currentWeek, startOfWeek, endOfWeek]"
        ></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: this.$moment(new Date()).format('YYYY-MM-DD'),
      currentWeek:'',
      startOfWeek:'',
      endOfWeek:'',
      // 编辑器显示状态
      editorShow: false,
      activePath: '',
      haveEchart: false,
      // 图表组件的option配置字符串
      scriptStr: '',
      // 图表名称
      ChartOptionName: '',
      optionList: [], //图表组件传来的历史配置
      navList: [
        { path: '/diskIOPage', name: '磁盘IO分布' },
        { path: '/SIUPage', name: '交换机接口使用' },
        { path: '/fdPage', name: '故障分布' },
        { path: '/screen', name: '南中心系统与设备运行情况' },
        { path: '/wrPage', name: '人员周报表' },
      ],
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
    this.getOption()
    this.getChartOptionName()
    this.getOptionList()
  },
  beforeMount(){
    
  },
  mounted() {
    this.getDateRange(this.time)
    this.getOption()

  },
  watch: {
    // scriptStr: function(newVal, oldVal) {},
    time: function(newVal) {
      // newVal = newVal.format('yyyy-MM-dd')
      this.getDateRange(newVal)
      this.$emit('sendCurrentWeek',  [this.currentWeek,this.startOfWeek,this.endOfWeek])
    },
  },
  methods: {
    handleSelect(key, keyPath) {},
    // 显示编辑器区域
    turnOnEditor(cb) {
      // this.haveEchart ? (this.editorShow = true) : (this.editorShow = false)
      this.$nextTick(() => {
        this.$refs.ref.$children[0].screenAdapter()
      })
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      // 每次点击菜单链接时，应该把对应的地址先保存到sessionStorage
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 获取图表组件传来的option配置
    getOption() {
      this.$bus.$on('sendOption', res => {
        // console.log(res);
        // 接收图表组件传来的option对象，将其转换为字符串形式
        res = JSON.stringify(res, null, 2)
        // 拼接成要返回给编辑器内容的字符串格式，传给编辑器子组件
        this.scriptStr = `option = ${res};`
      })
    },
    // 获取各图表组件传来的图表名称
    getChartOptionName() {
      this.$bus.$on('sendChartOptionName', res => {
        this.ChartOptionName = res
      })
    },
    // 接收图表组件传来的保存配置列表
    getOptionList() {
      this.$bus.$on('sendOptionList', res => {
        this.optionList = res
      })
    },
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
  },
}
</script>
<style lang="less" scoped>
.mainPage {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.el-menu-demo {
  width: 100%;
}
.echart-area {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
