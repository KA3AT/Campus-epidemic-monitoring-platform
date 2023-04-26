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
            prop="sex"
            label="性别">
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
            prop="dorm"
            label="宿舍">
        </el-table-column>
        <el-table-column
            prop="attend"
            label="在校">
        </el-table-column>
        <el-table-column
            prop="vaccinum"
            label="疫苗接种">
        </el-table-column>
        <el-table-column
            prop="nuclein"
            label="核酸检测">
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
          :page-sizes="[25, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <!--  添加学生信息  -->
    <el-dialog
        title="新增学生信息"
        :visible.sync="addVisible">
      <el-form
          ref="addForm"
          :rules="rules"
          label-position="right"
          :label-width="formLabelWidth"
          :model="addForm">
        <el-form-item prop="name" label="姓名">
          <el-input class="form-input" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="studentID" label="学号">
          <el-input class="form-input" v-model="addForm.studentID"></el-input>
        </el-form-item>
        <el-form-item prop="classID" label="班级号">
          <el-input class="form-input" v-model="addForm.classID"></el-input>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-input class="form-input" v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group class="form-input" v-model="addForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区" prop="country">
          <el-cascader
              size="large"
              class="form-input"
              :options="options"
              placeholder="请选择地区"
              v-model="selectedOptions"
              @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item prop="dorm" label="宿舍">
          <el-input class="form-input" v-model="addForm.dorm"></el-input>
        </el-form-item>
        <el-form-item label="在校" prop="attend">
          <el-radio-group class="form-input" v-model="addForm.attend">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="疫苗接种" prop="vaccinum">
          <el-radio-group class="form-input" v-model="addForm.vaccinum">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="核酸检测" prop="nuclein">
          <el-radio-group class="form-input" v-model="addForm.nuclein">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeForm('addForm')">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
    </span>
    </el-dialog>

    <!--  编辑学生信息  -->
    <el-dialog
        title="编辑学生信息"
        :visible.sync="editVisible">
      <el-form
          ref="editForm"
          :rules="rules"
          label-position="right"
          :label-width="formLabelWidth"
          :model="editForm">
        <el-form-item prop="name" label="姓名">
          <el-input class="form-input" v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="studentID" label="学号">
          <el-input class="form-input" v-model="editForm.studentID"></el-input>
        </el-form-item>
        <el-form-item prop="classID" label="班级号">
          <el-input class="form-input" v-model="editForm.classID"></el-input>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-input class="form-input" v-model="editForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group class="form-input" v-model="editForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区">
          <el-cascader
              size="large"
              class="form-input"
              :options="options"
              placeholder="请选择地区"
              ref="cascaderEdit"
              v-model="editForm.selectedOptions"
              @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="省">
          <el-input class="form-input" v-model="editForm.province"></el-input>
        </el-form-item>
        <el-form-item label="市">
          <el-input class="form-input" v-model="editForm.city"></el-input>
        </el-form-item>
        <el-form-item prop="dorm" label="宿舍">
          <el-input class="form-input" v-model="editForm.dorm"></el-input>
        </el-form-item>
        <el-form-item label="在校" prop="attend">
          <el-radio-group class="form-input" v-model="editForm.attend">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="疫苗接种" prop="vaccinum">
          <el-radio-group class="form-input" v-model="editForm.vaccinum">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="核酸检测" prop="nuclein">
          <el-radio-group class="form-input" v-model="editForm.nuclein">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeForm('editForm')">取 消</el-button>
    <el-button type="primary" @click="editSubmit">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { provinceAndCityData, CodeToText, TextToCode } from "element-china-area-data/dist/app";

export default {
  name: "studentList",
  components: {},
  data() {
    return {
      input: '',
      studentList: [],
      pageNum: 1,
      pageSize: 50,
      total: 0,
      addVisible: false,
      editVisible: false,
      formLabelWidth: '200px',
      options: provinceAndCityData,
      selectedOptions: [],
      addForm: {
        name: '',
        studentID: '',
        classID: '',
        age: '',
        sex: '',
        province: '',
        city: '',
        dorm: '',
        attend: '',
        vaccinum: '',
        nuclein: '',
      },
      editForm: {
        selectedOptions: [],
        name: '',
        studentID: '',
        classID: '',
        age: '',
        sex: '',
        province: '',
        city: '',
        dorm: '',
        attend: '',
        vaccinum: '',
        nuclein: '',
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        studentID: [{required: true, message: '请输入学号', trigger: 'blur'},],
        classID: [{required: true, message: '请输入班级号', trigger: 'blur'},],
        age: [{ required: true, message: '年龄不能为空'},],
        sex: [{required: true, message: '请选择性别', trigger: 'change'}],
        selectedOptions: [{ required: true, message: '请选择省市', trigger: 'change' }],
        dorm: [{ required: true, message: '宿舍号不能为空'},],
        attend: [{required: true, message: '请选择是否在校', trigger: 'change'}],
        vaccinum: [{required: true, message: '请选择是否接种疫苗', trigger: 'change'}],
        nuclein: [{required: true, message: '请选择是否核酸检测', trigger: 'change'}],
      },
    }
  },
  created() {
    this.getStudentList()
  },
  methods: {
    getStudentList(pageNum, pageSize) {
      let url = 'api/student/findAll';
      this.$axios.get(url, {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.input
        }
      }).then(resp => {
        resp.data.list.get
        this.studentList = resp.data.list;
        this.total = resp.data.total;
        console.log(resp.data);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStudentList(this.pageNum, this.pageSize);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getStudentList(this.pageNum, this.pageSize);
      console.log(`当前页: ${val}`);
    },
    search() {
      this.getStudentList()
    },
    addDialog() {
      this.addVisible = true
      this.addForm = {
        name: '',
        studentID: '',
        classID: '',
        age: '',
        sex: '',
        province: '',
        city: '',
        country: '',
        dorm: '',
      }
      this.$refs.addForm.resetFields();

    },
    addSubmit(addForm) {
      const url = '/api/student/save'
      this.$axios.post(url, this.addForm).then(res => {
        this.getStudentList()
        this.addVisible = false
      })
    },
    update(row) {
      this.editVisible = true
      this.editForm = row
      let provinceCode = TextToCode[this.editForm.province]
      let cityCode = TextToCode[this.editForm.city]
      this.editForm.selectedOptions = [provinceCode,cityCode]
      this.$refs.editForm.resetFields();
    },
    editSubmit(editForm) {
      let url = 'api/student/update'
      this.$axios.post(url, this.editForm).then(res => {
        this.getStudentList()
        this.editVisible = false
      })
    },
    deleteHandle(id) {
      this.$confirm(`确定对studentID：${id}进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(`/api/student/deleteBystudentID`, {
          params: {
            id: id
          }
        }).then(({data}) => {
          this.getStudentList()
        })
      })
    },
    closeForm(formName) {
      this.addVisible = false
      this.editVisible = false
      this.$refs[formName].resetFields();
    },
    //省市区级联选择器选择后更新用户前端
    handleChange (value) {
      this.addForm.province = ''
      this.addForm.city = ''
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (i === 0) { this.addForm.province = CodeToText[this.selectedOptions[i]] }
        if (i === 1) { this.addForm.city = CodeToText[this.selectedOptions[i]] }
      }
    },
  },
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

.form-input {
  width: 300px;
  margin-right: 200px;
}
</style>
