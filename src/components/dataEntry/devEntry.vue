<template>
  <div class="com-container">
    <div class="typeNav">设备运行情况</div>
    <div class="devEntryContainer">
      <div class="left">
        <el-card class="box-card">
          <div slot="header" class="clearfix boardHeader">
            <span>周报</span>
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
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea1"
          >
          </el-input>
          <el-button type="primary" class="saveBtn">保存</el-button>
        </el-card>
      </div>
      <div class="right">
        <el-table
          :data="tableData"
          border
          show-summary
          style="width: 100%"
          height="100%"
          slot="empty"
          @header-click="headerClick"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="180"
            sortable
            align="center"
            data-iseditor="false"
          >
          </el-table-column>
          <el-table-column
            prop="user"
            label="录入员"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="normal" label="正常" align="center">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.normal"
                v-show="scope.row.iseditor"
              />
              <span v-show="!scope.row.iseditor">{{ scope.row.normal }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="focus" label="关注" align="center">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.focus"
                v-show="scope.row.iseditor"
              />
              <span v-show="!scope.row.iseditor">{{ scope.row.focus }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="err" label="故障" align="center">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.err"
                v-show="scope.row.iseditor"
              />
              <span v-show="!scope.row.iseditor">{{ scope.row.err }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center">
            <template slot="header" slot-scope="">
              <el-button type="primary" size="small" icon="el-icon-plus" :disabled="tableData.length === 7 ? 'false':'true' "
               >新增</el-button
              >
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="edit(scope.row, scope)"
                v-show="!scope.row.iseditor"
                >修改</el-button
              >
              <el-button
                type="text"
                size="small"
                icon="el-icon-check"
                @click="save(scope.row, scope)"
                v-show="scope.row.iseditor"
                >保存</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { Debounce } from '@/utils/debounce'
export default {
  data() {
    return {
      tableData: null, // 表格数据
      options: [
        {
          value: '物理设备',
          label: '物理设备',
        },
        {
          value: '操作系统',
          label: '操作系统',
        },
        {
          value: 'MV线路',
          label: 'MV线路',
        },
      ],
      // 设置下拉框默认选中项的值
      value: '物理设备',
      pDevData: null, // 物理设备数据
      osData: null, // 操作系统数据
      mvData: null, // mv线路数据
      textarea1: '',
    }
  },

  mounted() {
    this.getData()
    this.changeOption()
  },
  watch: {
    // 监听文本框输入内容
    textarea1: Debounce(function(val) {
      console.log(this.textarea1)
    }, 1000),
  },
  methods: {
    getData() {
      let data = [
        {
          type: '物理设备',
          normal: 2000,
          focus: 50,
          err: 5,
          date: '2021-10-10',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 58,
          err: 1,
          date: '2021-10-11',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 48,
          err: 2,
          date: '2021-10-12',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 47,
          err: 7,
          date: '2021-10-13',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 54,
          err: 4,
          date: '2021-10-14',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 47,
          err: 4,
          date: '2021-10-15',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '物理设备',
          normal: 200,
          focus: 60,
          err: 3,
          date: '2021-10-16',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 110,
          err: 20,
          date: '2021-10-10',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 102,
          err: 11,
          date: '2021-10-11',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 77,
          err: 18,
          date: '2021-10-12',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 98,
          err: 19,
          date: '2021-10-13',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 101,
          err: 21,
          date: '2021-10-14',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 88,
          err: 16,
          date: '2021-10-15',
          user: 'abc',
          iseditor: false,
        },
        {
          type: '操作系统',
          normal: 220,
          focus: 107,
          err: 19,
          date: '2021-10-16',
          user: 'abc',
          iseditor: false,
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 27,
          err: 1,
          date: '2021-10-10',
          user: 'abc',
          iseditor: false,
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 36,
          err: 0,
          date: '2021-10-11',
          user: 'abc',
          iseditor: false,
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 17,
          err: 2,
          date: '2021-10-12',
          user: 'abc',
          iseditor: false,
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 28,
          err: 4,
          date: '2021-10-13',
          user: 'abc',
          iseditor: false,
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 36,
          err: 5,
          date: '2021-10-14',
          user: 'abc',
          iseditor: false,
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 17,
          err: 1,
          date: '2021-10-15',
          user: 'abc',
          iseditor: false,
        },
        {
          type: 'MV线路',
          normal: 180,
          focus: 29,
          err: 4,
          date: '2021-10-16',
          user: 'abc',
          iseditor: false,
        },
      ]
      let pDevData = data.filter((value, index, arr) => {
        return value.type == '物理设备'
      })
      let osData = data.filter((value, index, arr) => {
        return value.type == '操作系统'
      })
      let mvData = data.filter((value, index, arr) => {
        return value.type == 'MV线路'
      })
      this.pDevData = pDevData
      this.osData = osData
      this.mvData = mvData
      if (this.value === '物理设备') {
        this.tableData = pDevData
      } else if (this.value === '操作系统') {
        this.tableData = osData
      } else if (this.value === 'MV线路') {
        this.tableData = mvData
      }
    },
    changeOption(val) {
      if (val === '操作系统') {
        this.tableData = this.osData
      } else if (val === '物理设备') {
        this.tableData = this.pDevData
      } else if (val === 'MV线路') {
        this.tableData = this.mvData
      }
    },
    edit(row, index) {
      row.iseditor = true
    },
    save(row, index) {
      row.iseditor = false
    },
    headerClick(column,  event){
      console.log(column);
    }
  },
}
</script>
<style lang="less" scoped>
.typeNav{
  align-items: center;
  padding:10px 20px;
  font-size: 24px;
}
.devEntryContainer {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 82%;
  padding: 0 20px 20px 20px;
  .left {
    width: 30%;
    height: 100%;
    border-radius: 5px 0 0 5px;
    overflow: hidden;
    .box-card {
      position: relative;
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 0;
      .boardHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      /deep/ .el-card__header {
        padding: 9px;
      }
      /deep/ .el-card__body {
        padding: 0px;
      }
      /deep/ .el-textarea {
        textarea {
          height: 274px;
          resize: none;
        }
      }
      .saveBtn {
        position: absolute;
        right: 25px;
        bottom: 5px;
      }
    }
  }
  .right {
    width: 67%;
    height: 100%;
    border-radius: 0 5px 5px 0;
    overflow: hidden;
    // .el-table {
    //   /deep/ .el-table__cell {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //   }
    // }
    /deep/ .cell {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input {
      width: 100px;
      text-align: center;
      outline-style: none;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 15px;
    }
    input:focus {
      border-color: #66afe9;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
    }
  }
}
</style>
