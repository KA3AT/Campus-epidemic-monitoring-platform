<template>
  <div class="home">
    <!--  顶部  -->
    <div class="nav-bar">
      <div class="title">
        <h1>校园疫情监控平台</h1>
      </div>
      <div class="r-button">
        <el-button type="primary" @click="showCity" style="height: 49px">地图切换</el-button>
        <el-button type="primary" @click="toManage" style="height: 49px">学生数据管理</el-button>
      </div>
    </div>
    <!--  内容  -->
    <div class="main-content">
      <el-row>
        <el-col :span="17">
          <!--  中间信息  -->
          <div class="statistics-content">
            <!--  中间左侧  -->
            <div class="main-inner">
              <el-row>
                <el-col :span="8">
                  <chart-cart
                      title="体温异常"
                      :customClass="`chart-item-bottom-sep`">
                    <ranking-chart
                        ref="rankingChart"
                        :data="studentRank"
                        style="width: 100%; height: 380px"/>
                  </chart-cart>
                  <chart-cart title="学校疫情情况"> `
                    <covid-data
                        ref="covidData"
                        :data="covidCount"
                        style="width: 100%;height: 380px"/>
                  </chart-cart>
                </el-col>
                <el-col :span="15">
                  <!--  地图  -->
                  <div class="main-inner-map-wraper">
                    <div class="map" v-show="isMapShow">
<!--                      <china-->
<!--                          :area-code.sync="areaCode"-->
<!--                          :area-level.sync="areaLevel"-->
<!--                          :area-name.sync="areaName"-->
<!--                          :map-name-list.sync="mapNameList"-->
<!--                          :map-code-list.sync="mapCodeList"-->
<!--                          :area-statistic="areaStatistic"-->
<!--                      />-->
                      <china-map
                        ref="dataMap"
                        title=""
                        :list="mapList"
                        style="width: 100%; height: 100%"/>
                    </div>
                      <div class="city" v-show="!isMapShow">
                          <el-table
                              :data="cityList"
                              height="600"
                              border
                              :header-cell-style="{ background: '#3c4651' ,borderColor:'#12121e' }"
                              :cell-style="cellStyle"
                              style="width: 100%">
                              <el-table-column
                                      prop="name"
                                      label="城市">
                              </el-table-column>
                              <el-table-column
                                      prop="value"
                                      label="人数">
                              </el-table-column>
                          </el-table>
                      </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <!--  中间右侧  -->
        <el-col :span="7">
          <div class="main-right">
            <chart-cart title="每日核酸检测情况">
              <test-count
                  ref="testCount"
                  :data="testData"
                  style="width: 100%;height: 380px"/>
            </chart-cart>
            <chart-cart title="疫苗接种情况">
              <vaccination-count
                  ref="vaccinationCount"
                  :data="vaccinumData"
                  style="width: 100%;height: 380px"/>
            </chart-cart>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import RankingChart from "@/views/rankingChart/rankingChart.vue";
import ChartCart from "@/views/chartCart/chartCart.vue";
import TestCount from "@/views/testCount/testCount.vue";
import VaccinationCount from "@/views/vaccinationCount/vaccinationCount.vue";
import CovidData from "@/views/covidData/covidData.vue";
import China from "@/views/chinaMap/china.vue";
import ChinaMap from "@/views/chinaMap/chinaMap.vue";

export default {
  name: 'HomeView',
  components: {
    ChinaMap,
    China,
    CovidData,
    VaccinationCount,
    TestCount,
    ChartCart,
    RankingChart,
  },
  data() {
    return {
      areaCode: '000000000000', // 当前用的areaCode
      areaLevel: 0, // 当前用的areaCode
      areaName: 'china', // 当前用的areaName
      mapNameList: [], // 当前地图上的地区名字
      mapCodeList: [], // 当前地图上的地区Code
      areaStatistic: [], // 测试
      dateRange: [],
      studentRank: {
        dateList: [],
        AbnormalCount: [],
      },
      testData: {
        dateList: [],
        nucleinCount: [],
        attendCount: []
      },
      vaccinumData: {
        dateList: [],
        attendCount:[],
        vaccinumCount: [],
      },
      covidCount: {
        dateList: [],
        ConfirmedCount: [],
        abnormalCount: [],
        knitCount: [],
      },
      map:[],
      mapList: [],
      cityList: [],
      isMapShow: true,
    }
  },
  methods: {
    //获取数据
    getMapData() {
      this.$axios.get('api/student/map').then(res => {
        this.mapList = res.data
      })
    },
    getCityData() {
      this.$axios.get('api/student/city').then(res => {
          this.cityList = res.data
      })
    },
    getTemperatureList() {
      this.$axios.get('api/abnormal/isAbnormal').then(res => {
        this.studentRank = res.data
      })
    },
    getCovidList() {
      this.$axios.get('api/abnormal/situation').then(res => {
        this.covidCount = res.data
      })
    },
    getTestList() {
      this.$axios.get('api/student/test').then(res => {
        this.testData = res.data
      })
    },
    getVaccinumList() {
      this.$axios.get('api/student/isAttendAndIsVaccinum').then(res => {
        this.vaccinumData = res.data
      })
    },
    // 设置areaName
    setAreaName() {
      if (this.areaName === '中央本级') {
        this.areaName = 'china'
      }
    },
    setParam() {
      var obj = {
        areaCode: this.areaCode,
        areaLevel: this.areaLevel,
      }
      if (this.dateRange.length > 0) {
        obj.beginDate = this.dateRange[0]
        obj.endDate = this.dateRange[1]
      }
      return obj
    },
    showCity() {
        if (this.isMapShow == true) {
            this.isMapShow = false
        }else {
            this.isMapShow = true
        }
    },
    toManage() {
      this.$router.push('/management/student')
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
        return "border-color: #12121e!important;"
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.dataMap.initChart()
      this.$refs.rankingChart.initChart()
      this.$refs.testCount.initChart()
      this.$refs.vaccinationCount.initChart()
      this.$refs.covidData.initChart()
    })
  },
  created() {
    this.getMapData()
    this.getCityData()
    this.getTemperatureList()
    this.getCovidList()
    this.getTestList()
    this.getVaccinumList()
    this.setAreaName()
  },
  watch: {
    areaCode: {
      handler(val) {

      },
      deep: true
    }
  },
}
</script>

<style scoped>
.home {
  position: relative;
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
  font-weight: bold;
  padding: 20px;
}

.r-button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.chart-card {
  background: #0f142b;
  border-radius: 10px;
  margin: 20px;
}

.chart-item-bottom-sep {
  margin-bottom: 20px;
}

.main-inner-map-wraper {
  height: 100%;
  margin: 0 20px;
}

.map {
  width: 99%;
  height: 840px;
  padding: 20px 10px 10px 10px;
}

.city {
    display: flex;
    width: 99%;
    height: 840px;
    justify-content: center;
    align-items: center;
    padding: 20px 10px 10px 10px;
}

/deep/  .el-table__empty-block {
    background-color: #3c4651;
}

.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #12121e;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #12121e;
}
</style>
