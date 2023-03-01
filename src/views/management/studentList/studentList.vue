<template>
  <div class="studentList">
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
      <el-button type="primary" @click="addDialog">新增学生信息</el-button>
    </div>
    <div class="table">
      <el-table
          :data="studentList"
          border
          max-height="390"
          style="width: 100%;height: calc(100vh - 265px)">
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="studentID"
            label="学号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="classID"
            label="班级编号">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄">
        </el-table-column>
        <el-table-column
            prop="province"
            label="省">
        </el-table-column>
        <el-table-column
            prop="city"
            label="市">
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
      <pagination/>
    </div>

    <!--  添加学生信息  -->
    <el-dialog
        :title="formTitle"
        :visible.sync="addVisible">
      <el-form
          ref="addForm"
          :model="addForm">
        <el-form-item :label-width="formLabelWidth" label="姓名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="学号">
          <el-input v-model="addForm.studentID"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="班级号">
          <el-input v-model="addForm.classID"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="年龄">
          <el-input v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="省">
          <el-input v-model="addForm.province"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="市">
          <el-input v-model="addForm.city"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination.vue";

export default {
  name: "studentList",
  components: {Pagination},
  data() {
    return {
      input: '',
      studentList: [],
      addVisible: false,
      editVisible: false,
      formLabelWidth: '120px',
      formTitle: '新增学生信息',
      addForm: {
        name: '',
        studentID: '',
        classID: '',
        age:'',
        province: '',
        city: '',
      },
    }
  },
  methods: {
    getStudentList() {
      this.$axios.get('/api/student/findAll')
          .then(resp => {
            this.studentList = resp.data
          })
    },
    search() {

    },
    addDialog() {
      this.formTitle = '新增学生信息'
      this.addVisible = true
      this.addForm = {
        name: '',
        studentID: '',
        classID: '',
        age:'',
        province: '',
        city: '',
      }
    },
    addSubmit(addForm) {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          const url = this.addForm.studentID? '/api/student/update' : '/api/student/save'
          this.$axios.post(url, this.addForm).then(res => {
            this.getStudentList()
            this.addVisible = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    
    update(row) {
      this.formTitle = '编辑学生信息'
      this.addVisible = true
      this.addForm = row

    },
    deleteHandle(id) {
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`/api/student/${id}`)
            .then(({data}) => {
            })
        })
    },
  },
  created() {
    this.getStudentList()
  }
}
</script>

<style scoped>
.studentList {
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
