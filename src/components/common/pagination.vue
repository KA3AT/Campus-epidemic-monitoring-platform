<template>
  <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      pageSizes: [15,50,100],
      pageSize: 15,
      pageIndex: 1,
      total: 20,
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
