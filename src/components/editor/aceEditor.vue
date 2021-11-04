<template>
  <div class="ace-container">
    <div class="btn-wrap">
      <vue-xlsx-table @on-select-file="handleSelectedFile"
        >上传Excel</vue-xlsx-table
      >
      <el-button type="warning" size="mini" @click="saveChartOption"
        >保存配置</el-button
      >
      <el-button type="info" size="mini" @click="resetChartData"
        >重置数据</el-button
      >
      <el-dropdown>
        <el-button type="success" size="mini">
          历史配置
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, i) in optionList" :key="i">{{
            item.optionName
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" size="mini" @click="sendChartOption"
        >运行</el-button
      >
    </div>
    <div class="ace-editor" ref="ace"></div>
  </div>
</template>
<script>
import ace from 'ace-builds'
// 在webpack环境中使用必须要导入
import 'ace-builds/webpack-resolver'
// 默认设置的主题
import 'ace-builds/src-noconflict/theme-monokai'
// 默认设置的语言模式
import 'ace-builds/src-noconflict/mode-javascript'
export default {
  data() {
    return {
      aceEditor: null,
      // 不导入webpack-resolver该模块路径会报错
      themePath: 'ace/theme/monokai',
      modePath: 'ace/mode/javascript',
      scriptStr: '', //编辑器内容字符串
      data: null, // excel表的数据
      optionList: [], //保存的历史配置信息
    }
  },
  props: ['option', 'chartName'],
  created() {
    
  },
  mounted() {
    this.aceEditor = ace.edit(this.$refs.ace, {
      // 最大行数，超过会自动出现滚动条
      maxLines: 48,
      // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
      minLines: 48,
      // 编辑器内字体大小
      fontSize: 14,
      // 默认设置的主体
      theme: this.themePath,
      // 默认设置的语言模式
      mode: this.modePath,
      // 制表符设置为4个空格大小
      tabSize: 4,
    })
    this.scriptStr = this.option
    this.setAceEditorValue()
  },
  watch: {
    // 监听父组件传来的新的编辑器内容字符串
    option: function(newVal, oldVal) {
      // 将新值，也就是option编辑器内容字符串，赋值给scriptStr
      this.scriptStr = newVal
      // 设置编辑器内容
      this.setAceEditorValue()
    },
  },
  beforeDestroy() {},
  methods: {
    // 设置编辑器内容
    setAceEditorValue() {
      this.$nextTick(() => {
        this.aceEditor.setValue(this.scriptStr, 1)
      })
    },
    // 点击上传按钮获取excel表数据
    handleSelectedFile(convertedData) {
      this.data = convertedData.body
    },
    // 点击运行按钮向图表组件传输新的图表配置
    sendChartOption() {
      // 点击运行按钮获取编辑器内容
      this.scriptStr = this.aceEditor.getValue()
      let script = this.scriptStr
      // 将新的 编辑器内容 以及 excel表数据 传给图表组件
      this.$bus.$emit('sendScript', [script, this.data])
    },
    // 点击保存按钮保存当前配置
    saveChartOption() {
      console.log(this.chartName)
      // 获取编辑器代码内容字符串
      let currentOption = this.aceEditor.getValue()
      this.$messageBox
        .prompt('', '配置名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        .then(async ({ value }) => {
          // 将保存的配置名和代码传给图表组件
          // this.$bus.$emit('saveOption',[value,currentOption]);

          let params = {
            data: [
              {
                report_type: '全部已保存图表配置',
                report_data: {
                  chartName: this.chartName,
                  optionName: value,
                  content: currentOption,
                },
                report_time: new Date().format('yyyy-MM-dd hh:mm:ss'),
              },
            ],
          }
          let { data } = await this.$request('apiInsert', params, 'post')
          this.$message({
            message: '保存成功',
            type: 'success',
          })
        })
        .catch(() => {
          this.$message({
            message: '已取消',
            type: 'info',
          })
        })
    },
    
    // 清除excel数据
    resetChartData() {
      this.data = null
    },
  },
}
</script>
<style lang="less" scoped>
.ace-container {
  width: 100%;
  height: 100%;
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
    /deep/ .el-button + .el-button {
      margin: 0;
    }
  }
  .ace-editor {
    height: 100%;
  }
}
</style>
