<template>
  <div class="management">
    <el-container>
      <el-aside width="250px">
        <div class="logo">
          <img src="../../assets/logo.png">
        </div>
        <el-menu
            :default-active="$route.path"
            :router="true"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <span>基本信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/management/student">学生表</el-menu-item>
              <el-menu-item index="/management/class">班级表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/management/excManagement">异常管理</el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <span>学生离校数据可视化</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/management/xxdb">班级违纪信息对比</el-menu-item>
              <el-menu-item index="/management/sjfx">学生出行时间分析</el-menu-item>
              <el-menu-item index="/management/cxsj">学院、专业出行数据</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="el-header">
          <div class="nav-bar">
            <div class="title">
              <h1>学生数据管理</h1>
            </div>
            <div class="r-button">
              <el-button type="primary" @click="goBack" style="height: 49px">校园疫情监控平台</el-button>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import StudentList from "@/views/management/studentList/studentList.vue";

export default {
  name: "management",
  components: {StudentList},
  data() {
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goBack() {
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>
.management {
  width: 100vw;
  height: 100vh;
  background-color: #EBEEF5;
}

.logo {
  height: 90px;
  width: 249px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #606266;
}

.el-menu-vertical-demo {
  height: calc(100vh - 90px);
}

.el-header {
  height: 90px !important;
  background-color: #ffffff;
}

.nav-bar {
  position: relative;
  margin-bottom: 10px;
}

.title {
  min-width: 350px;
}

.title h1 {
  font-size: 35px;
  color: #000000;
  font-weight: bold;
  padding: 20px;
}

.r-button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.main {
  height: calc(100vh - 170px);
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
}
</style>
