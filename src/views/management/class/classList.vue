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
            @click="search"
            circle></el-button>
      </div>
      <el-button type="primary" @click="addDialog">新增班级信息</el-button>
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
            prop="className"
            label="班级"
            width="180">
        </el-table-column>
        <el-table-column
            prop="instructorID"
            label="辅导员编号">
        </el-table-column>
        <el-table-column
            prop="instructor"
            label="辅导员">
        </el-table-column>
        <el-table-column
            prop="a"
            label="入学人数">
        </el-table-column>
        <el-table-column
            prop="b"
            label="在读人数">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button
                @click="update(scope.row)"
                type="text"
                size="small">
              编辑
            </el-button>
            <el-button
                @click="deleteHandle(scope.row.classID)"
                type="text"
                size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <!--  新增班级信息  -->
    <el-dialog
        title="新增班级信息"
        :visible.sync="addVisible">
      <el-form
          ref="addForm"
          :model="addForm">
        <el-form-item :label-width="formLabelWidth" label="班级号">
          <el-input style="width: 300px" v-model="addForm.classID"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="班级">
          <el-input style="width: 300px" v-model="addForm.className"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="辅导员编号">
          <el-input style="width: 300px" v-model="addForm.instructorID"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="辅导员">
          <el-input style="width: 300px" v-model="addForm.instructor"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="入学人数">
          <el-input style="width: 300px" v-model="addForm.a"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="在校人数">
          <el-input style="width: 300px" v-model="addForm.b"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
    </span>
    </el-dialog>

  <!--  编辑班级信息  -->
    <el-dialog
        title="编辑班级信息"
        :visible.sync="editVisible">
      <el-form
          ref="editForm"
          :model="editForm">
        <el-form-item :label-width="formLabelWidth" label="班级号">
          <el-input style="width: 300px" v-model="editForm.classID"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="班级">
          <el-input style="width: 300px" v-model="editForm.className"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="辅导员编号">
          <el-input style="width: 300px" v-model="editForm.instructorID"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="辅导员">
          <el-input style="width: 300px" v-model="editForm.instructor"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="入学人数">
          <el-input style="width: 300px" v-model="editForm.a"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="在校人数">
          <el-input style="width: 300px" v-model="editForm.b"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editVisible = false">取 消</el-button>
    <el-button type="primary" @click="editSubmit">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "classList",
  components: {},
  data() {
    return {
      input: '',
      classList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      addVisible: false,
      editVisible: false,
      formLabelWidth: '200px',
      addForm: {
        classID: '',
        className: '',
        instructorID: '',
        instructor: '',
        a: '',
        b: '',
      },
      editForm: {
        classID: '',
        className: '',
        instructorID: '',
        instructor: '',
        a: '',
        b: '',
      }
    }
  },
  created() {
      this.loadPage()
  },
  methods: {
      loadPage(pageNum,pageSize) {
        let url = 'api/class/getAll';
        this.$axios.get(url,{
          params:{
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            id: this.input,
          }
        }).then(resp => {
          resp.data.list.get
          this.classList = resp.data.list;
          this.total = resp.data.total;
          console.log(resp.data);
        });
      },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadPage(this.pageNum, this.pageSize);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.loadPage(this.pageNum, this.pageSize);
      console.log(`当前页: ${val}`);
    },
    search() {
      this.loadPage()
    },
    addDialog() {
      this.addVisible = true
      this.addForm = {
        classID: '',
        className: '',
        instructorID: '',
        instructor: '',
        a: '',
        b: '',
      }
    },
    addSubmit(addForm) {
      let url = 'api/class/insertClass'
      this.$axios.post(url, this.addForm).then(res => {
        this.loadPage()
        this.addVisible = false
      })
    },
    update(row) {
      this.editVisible = true
      this.editForm = row
    },
    editSubmit(editForm) {
      let url = 'api/class/UpdateById'
      this.$axios.post(url, this.editForm).then(res => {
        this.loadPage()
        this.editVisible = false
      })
    },
    deleteHandle(id) {
      this.$confirm(`确定对classID：${id}进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(`/api/class/deleteClass`,{
          params:{
            id: id
          }
        }).then(({data}) => {
          this.loadPage()
        })
      })
    },
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
