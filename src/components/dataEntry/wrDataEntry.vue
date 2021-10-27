<template>
  <div class="com-container">
    <div class="typeNav">
      <el-select
        v-model="value"
        placeholder="请选择"
        @change="changeOption(value)"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="wrEntryContainer">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="100%"
        slot="empty"
      >
        <el-table-column
          prop="date"
          label="日期"
          min-width="120"
          sortable
          align="center"
          data-iseditor="false"
        >
          <template slot-scope="scope">
            <div class="block">
              <el-date-picker
                v-model="scope.row.date"
                align="center"
                type="date"
                placeholder="选择日期"
                :clearable="false"
              >
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="workOrder" label="工单号" align="center">
        </el-table-column>
        <el-table-column prop="tasks" label="工作内容" align="center">
          <template slot-scope="scope">
            <input
              type="text"
              v-model="scope.row.tasks"
              v-show="scope.row.iseditor"
            />
            <span v-show="!scope.row.iseditor">{{ scope.row.tasks }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="开始和结束时间"
          min-width="200"
          align="center"
        >
          <template slot-scope="scope">
            <div class="block">
              <el-date-picker
                v-model="scope.row.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
              >
              </el-date-picker>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="workHours" label="作业时长" align="center">
        </el-table-column>
        <el-table-column fixed="right" align="center">
          <template slot="header" slot-scope="">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              :disabled="tableData.length === 7 ? true : false"
              >新增</el-button
            >
          </template>
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              icon="el-icon-edit"
              v-show="!scope.row.iseditor"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              icon="el-icon-check"
              v-show="scope.row.iseditor"
              >保存</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allData:[],  
      tableData: [],
      options: [],
      value: '李四',
    }
  },

  mounted() {
    this.getData()
    this.changeOption(this.value)
    // this.$bus.$emit('sendTitle','人员周报数据录入')
  },
  methods: {
    getData() {
      let data = [
        {
          name: '张三',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0020',
          tasks: '方案编写',
          time: ['2021-10-23 11:00:00', '2021-10-23 11:00:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '张三',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0021',
          tasks:
            'e动柜面测试环境服务器配置核查复检申请ssh临时root登陆，实施方案、测试方案编写',
          time: ['2021-10-23 11:30:00', '2021-10-23 12:00:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '张三',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0022',
          tasks:
            'e动柜面测试环境服务器配置核查复检申请ssh临时root登陆，实施方案、测试方案编写',
          time: ['2021-10-23 13:00:00', '2021-10-23 13:45:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '张三',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0023',
          tasks:
            'e动柜面测试环境服务器配置核查复检申请ssh临时root登陆，实施方案、测试方案编写',
          time: ['2021-10-23 14:00:00', '2021-10-23 14:45:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '张三',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0024',
          tasks:
            'e动柜面测试环境服务器配置核查复检申请ssh临时root登陆，实施方案、测试方案编写',
          time: ['2021-10-23 15:00:00', '2021-10-23 15:45:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '张三',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0025',
          tasks:
            'e动柜面测试环境服务器配置核查复检申请ssh临时root登陆，实施方案、测试方案编写',
          time: ['2021-10-23 16:00:00', '2021-10-23 16:45:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '张三',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0026',
          tasks:
            'e动柜面测试环境服务器配置核查复检申请ssh临时root登陆，实施方案、测试方案编写',
          time: ['2021-10-23 16:50:00', '2021-10-23 17:45:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '张三',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0026',
          tasks:
            'e动柜面测试环境服务器配置核查复检申请ssh临时root登陆，实施方案、测试方案编写',
          time: ['2021-10-23 20:50:00', '2021-10-24 8:45:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '张三',
          date: '2021-10-24',
          workOrder: 'CH3-20211024-0027',
          tasks: 'e动柜面案编写',
          time: ['2021-10-24 16:50:00', '2021-10-24 17:45:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '李四',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0021',
          tasks: 'e日版巡检',
          time: ['2021-10-23 11:30:00', '2021-10-23 12:00:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '李四',
          date: '2021-10-23',
          workOrder: 'CH3-20211023-0021',
          tasks: '夜班巡检',
          time: ['2021-10-23 20:30:00', '2021-10-24 8:30:00'],
          workHours: null,
          iseditor: false,
        },
        {
          name: '王五',
          date: '2021-10-24',
          workOrder: 'CH3-20211024-0021',
          tasks: '一二三四',
          time: ['2021-10-24 8:30:00', '2021-10-24 17:30:00'],
          workHours: null,
          iseditor: false,
        },
      ]
      //   定义下拉框选项
      let options = []
      for (let rec of data) {
        // 获取结束时间
        let endTime = new Date(rec['time'][1])
        // 获取开始时间
        let startTime = new Date(rec['time'][0])
        // 计算工作时长
        rec['workHours'] = (endTime - startTime) / 1000
        // 将工作时长转换为HH:mm:ss格式
        rec['workHours'] = rec['workHours'].toHHmmss()
        if (!options.includes(rec['name'])) {
          options.push(rec['name'])
        }
      }

      this.allData = data

      // 遍历数组并修改下拉选线值
      //   options.forEach((val,index) => {
      //       options[index] = {value:val,label:val}
      //   })
      options = options.map(item => {
        item = { value: item, label: item }
        return item
      })
      this.options = options
    },
    changeOption(value) {
      this.value = value
      this.updateData()      
    },
    updateData() {
      let data = this.allData
      // 定义要显示的人员数据
      let currentData = []
      for (let rec of data) {
        if (rec['name'] === this.value) {
          currentData.push(rec)
        }
      }
      // 将该人员数据赋值给表格
      this.tableData = currentData
    },
  },
}
</script>
<style lang="less" scoped>
.typeNav {
  align-items: center;
  padding: 10px 20px;
  font-size: 24px;
}
.wrEntryContainer {
  display: flex;
  bottom: 0;
  width: 100%;
  height: 82%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
  /deep/ .el-input__inner {
  }
}
</style>
