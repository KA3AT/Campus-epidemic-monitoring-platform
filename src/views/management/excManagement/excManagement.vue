<template>
  <div class="excManagement">
    <div class="head">
      <div class="search">
        <el-input
            placeholder="请输入学号"
            v-model="input"
            clearable></el-input>
        <el-button
            style="margin-left: 15px"
            icon="el-icon-search"
            circle></el-button>
      </div>
      <el-button type="primary">新增异常信息</el-button>
    </div>
    <div class="table">
      <el-table
        :data="excData"
        border
        style="width: 100%;height: calc(100vh - 265px)">
        <el-table-column
            prop="studentID"
            label="学号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="temperature"
            label="体温">
        </el-table-column>
        <el-table-column
            prop="positive"
            label="阳性">
        </el-table-column>
        <el-table-column
            prop="touch·"
            label="密接、次密接">
        </el-table-column>
        <el-table-column
            prop="quarantine"
            label="隔离">
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <pagination/>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination.vue";

export default {
  name: "excManagement",
  components: {Pagination},
  data() {
    return {
      input: '',
      excData:[],
    }
  }
}
</script>

<style scoped>
.excManagement {
  margin: 0;
  padding: 0;
  background-color: white;
}

.head {
  width: 100%;
  height: 40px;
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
