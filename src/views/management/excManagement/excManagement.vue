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
            @click="search"
            circle></el-button>
      </div>
      <el-button type="primary" @click="addDialog">新增异常信息</el-button>
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
            prop="temperature"
            label="体温">
        </el-table-column>
        <el-table-column
            prop="infected"
            label="阳性">
        </el-table-column>
        <el-table-column
            prop="touch"
            label="密接、次密接">
        </el-table-column>
        <el-table-column
            prop="quarantine"
            label="隔离">
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
                @click="deleteHandle(scope.row.studentID)"
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

  <!--  新增异常信息  -->
    <el-dialog
        title="新增异常信息"
        :visible.sync="addVisible">
      <el-form
          ref="addForm"
          :model="addForm">
        <el-form-item :label-width="formLabelWidth" label="学号">
          <el-input style="width: 300px" v-model="addForm.studentID"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="体温">
          <el-input style="width: 300px" v-model="addForm.temperature"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="确诊">
          <el-input style="width: 300px" v-model="addForm.infected"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密接及次密接">
          <el-input style="width: 300px" v-model="addForm.touch"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="隔离">
          <el-input style="width: 300px" v-model="addForm.quarantine"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
    </span>
    </el-dialog>

  <!--  编辑异常信息  -->
    <el-dialog
        title="编辑异常信息"
        :visible.sync="editVisible">
      <el-form
          ref="editForm"
          :model="editForm">
        <el-form-item :label-width="formLabelWidth" label="学号">
          <el-input style="width: 300px" v-model="editForm.studentID"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="体温">
          <el-input style="width: 300px" v-model="editForm.temperature"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="确诊">
          <el-input style="width: 300px" v-model="editForm.infected"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密接及次密接">
          <el-input style="width: 300px" v-model="editForm.touch"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="隔离">
          <el-input style="width: 300px" v-model="editForm.quarantine"></el-input>
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
  name: "excManagement",
  components: {},
  data() {
    return {
      input: '',
      excData:[],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      addVisible: false,
      editVisible: false,
      formLabelWidth: '200px',
      addForm: {
        studentID: '',
        temperature: '',
        infected: '',
        touch: '',
        quarantine: '',
      },
      editForm: {
        studentID: '',
        temperature: '',
        infected: '',
        touch: '',
        quarantine: '',
      }
    }
  },
  created() {
    this.loadPage()
  },
  methods: {
    loadPage(pageNum,pageSize) {
      let url = 'api/abnormal/getAll';
      this.$axios.get(url,{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          id: this.input
        }
      }).then(resp => {
        resp.data.list.get
        this.excData = resp.data.list;
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
        studentID: '',
        temperature: '',
        infected: '',
        touch: '',
        quarantine: '',
      }
    },
    addSubmit(addForm) {
      let url = 'api/abnormal/insertAbnormal'
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
      let url = 'api/abnormal/UpdateById'
      this.$axios.post(url, this.editForm).then(res => {
        this.loadPage()
        this.editVisible = false
      })
    },
    deleteHandle(id) {
      this.$confirm(`确定对studentID：${id}进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(`/api/abnormal/deleteAbnormal`,{
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
