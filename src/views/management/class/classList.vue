<template>
  <div class="clasList">
    <div class="head">
      <div class="search">
        <el-input
            placeholder="请输入班级号"
            v-model="input"
            clearable></el-input>
        <el-button
            style="margin-left: 15px"
            icon="el-icon-search"
            circle></el-button>
      </div>
      <el-button type="primary">新增班级信息</el-button>
    </div>
    <div class="table">
      <el-table
          :data="classList"
          border
          style="width: 100%">
        <el-table-column
            prop="classID"
            label="班级号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="class"
            label="班级"
            width="180">
        </el-table-column>
        <el-table-column
            prop="grade"
            label="年级">
        </el-table-column>
        <el-table-column
            prop="instructorID"
            label="辅导员编号">
        </el-table-column>
        <el-table-column
            prop="entranceCount"
            label="入学人数">
        </el-table-column>
        <el-table-column
            prop="existingCount"
            label="在读人数">
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
  name: "classList",
  components: {Pagination},
  data() {
    return {
      input: '',
      classList: [],
    }
  },
  created() {
    this.$axios.get('/api/class/findAll')
        .then(resp => {
          this.classList = resp.data
        })
  }
}
</script>

<style scoped>
.clasList {
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
