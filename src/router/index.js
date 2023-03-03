import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import management from "@/views/management/management.vue";
import studentList from "@/views/management/studentList/studentList.vue";
import classList from "@/views/management/class/classList.vue";
import excManagement from "@/views/management/excManagement/excManagement.vue";
import xxdb from "@/views/management/xxdb/xxdb.vue";
import sjfx from "@/views/management/sjfx/sjfx.vue";
import cxsj from "@/views/management/cxsj/cxsj.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/management/',
    name: 'management',
    component: management,
    children: [
      {
        path: 'student',
        name: 'Student',
        component: studentList
      },
      {
        path: 'class',
        name: 'Class',
        component: classList
      },
      {
        path: 'excManagement',
        name: 'excManagement',
        component: excManagement
      },
      {
        path: 'xxdb',
        name: 'xxdb',
        component: xxdb
      },
      {
        path: 'sjfx',
        name: 'sjfx',
        component: sjfx
      },
      {
        path: 'cxsj',
        name: 'cxsj',
        component: cxsj
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
