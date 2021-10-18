<template>
  <div class="com-container">
    <div class="typeNav">资源使用情况</div>
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
          <el-table-column prop="total" label="总量" align="center">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.total"
                v-show="scope.row.iseditor"
              />
              <span v-show="!scope.row.iseditor">{{ scope.row.total }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="used" label="已使用" align="center">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.used"
                v-show="scope.row.iseditor"
              />
              <span v-show="!scope.row.iseditor">{{ scope.row.used }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="consumed" label="消耗" align="center">
            <template slot-scope="scope">
              <input
                type="text"
                v-model="scope.row.consumed"
                v-show="scope.row.iseditor"
              />
              <span v-show="!scope.row.iseditor">{{ scope.row.consumed }}</span>
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
          value: 'CPU(核)',
          label: 'CPU(核)',
        },
        {
          value: '内存(GB)',
          label: '内存(GB)',
        },
        {
          value: '存储(TB)',
          label: '存储(TB)',
        },
      ],
      // 设置下拉框默认选中项的值
      value: 'CPU(核)',
      cpuData: null, // CPU数据
      ramData: null, // 内存数据
      storageData: null, // 存储数据
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
            {type:'CPU(核)',total:200,used:190,consumed:90,date:'2021-10-10',user:'abc',iseditor:false},
            {type:'CPU(核)',total:200,used:190,consumed:90,date:'2021-10-11',user:'abc',iseditor:false},
            {type:'CPU(核)',total:200,used:190,consumed:90,date:'2021-10-12',user:'abc',iseditor:false},
            {type:'CPU(核)',total:200,used:190,consumed:90,date:'2021-10-13',user:'abc',iseditor:false},
            {type:'CPU(核)',total:200,used:190,consumed:90,date:'2021-10-14',user:'abc',iseditor:false},
            {type:'CPU(核)',total:200,used:190,consumed:90,date:'2021-10-15',user:'abc',iseditor:false},
            {type:'CPU(核)',total:200,used:190,consumed:90,date:'2021-10-16',user:'abc',iseditor:false},
            {type:'内存(GB)',total:220,used:190,consumed:90,date:'2021-10-10',user:'abc',iseditor:false},
            {type:'内存(GB)',total:220,used:190,consumed:90,date:'2021-10-11',user:'abc',iseditor:false},
            {type:'内存(GB)',total:220,used:190,consumed:90,date:'2021-10-12',user:'abc',iseditor:false},
            {type:'内存(GB)',total:220,used:190,consumed:90,date:'2021-10-13',user:'abc',iseditor:false},
            {type:'内存(GB)',total:220,used:190,consumed:90,date:'2021-10-14',user:'abc',iseditor:false},
            {type:'内存(GB)',total:220,used:190,consumed:90,date:'2021-10-15',user:'abc',iseditor:false},
            {type:'内存(GB)',total:220,used:190,consumed:90,date:'2021-10-16',user:'abc',iseditor:false},
            {type:'存储(TB)',total:180,used:100,consumed:90,date:'2021-10-10',user:'abc',iseditor:false},
            {type:'存储(TB)',total:180,used:100,consumed:90,date:'2021-10-11',user:'abc',iseditor:false},
            {type:'存储(TB)',total:180,used:100,consumed:90,date:'2021-10-12',user:'abc',iseditor:false},
            {type:'存储(TB)',total:180,used:100,consumed:90,date:'2021-10-13',user:'abc',iseditor:false},
            {type:'存储(TB)',total:180,used:100,consumed:90,date:'2021-10-14',user:'abc',iseditor:false},
            {type:'存储(TB)',total:180,used:100,consumed:90,date:'2021-10-15',user:'abc',iseditor:false},
            {type:'存储(TB)',total:180,used:100,consumed:90,date:'2021-10-16',user:'abc',iseditor:false},
        ];
      let cpuData = data.filter((value, index, arr) => {
        return value.type == 'CPU(核)'
      })
      let ramData = data.filter((value, index, arr) => {
        return value.type == '内存(GB)'
      })
      let storageData = data.filter((value, index, arr) => {
        return value.type == '存储(TB)'
      })
      this.cpuData = cpuData
      this.ramData = ramData
      this.storageData = storageData
      if (this.value === 'CPU(核)') {
        this.tableData = cpuData
      } else if (this.value === '内存(GB)') {
        this.tableData = ramData
      } else if (this.value === '存储(TB)') {
        this.tableData = storageData
      }
    },
    changeOption(val) {
      if (val === '内存(GB)') {
        this.tableData = this.ramData
      } else if (val === 'CPU(核)') {
        this.tableData = this.cpuData
      } else if (val === '存储(TB)') {
        this.tableData = this.storageData
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
