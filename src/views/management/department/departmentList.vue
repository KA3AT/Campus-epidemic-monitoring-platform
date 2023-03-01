<template>
  <div class="department">
    <div class="head">
      <div class="search">
        <el-input
            placeholder="请输入院系号"
            v-model="input"
            clearable></el-input>
        <el-button
            style="margin-left: 15px"
            icon="el-icon-search"
            circle></el-button>
      </div>
      <el-button type="primary">新增学院信息</el-button>
    </div>
    <div class="table">
      <el-table
          :data="departmentList"
          border
          style="width: 100%">
        <el-table-column
            prop="departmentID"
            label="院系号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="department"
            label="院系名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="studentCount"
            label="院系人数">
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <pagination/>
    </div>
  </div>
</template>

<script>
export default {
  name: "departmentList",
  data() {
    return {
      input: '',
      departmentList: [],
    }
  }
}
</script>

<style scoped>
.department {
  margin: 0;
  padding: 0;
  background-color: white;
}

.head {
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.search {
  display: flex;
}

.table {
  display: flex;
  width: 100%;
  height: calc(100vh - 265px);
}

.foot {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
