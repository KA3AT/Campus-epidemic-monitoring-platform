<template>
  <div class="home">
    <!--  顶部  -->
    <div class="nav-bar">
      <div class="title">
        <h1>校园疫情监控平台</h1>
      </div>
      <div class="r-button">
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
                    <div class="map">
                      <china
                          :area-code.sync="areaCode"
                          :area-level.sync="areaLevel"
                          :area-name.sync="areaName"
                          :map-name-list.sync="mapNameList"
                          :map-code-list.sync="mapCodeList"
                          :area-statistic="areaStatistic"
                      />
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
                  :data="testData"
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

export default {
  name: 'HomeView',
  components: {
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
        dateList: [12.29, 12.28, 12.27, 12.26],
        temperatureList: [400, 300, 200, 100],
      },
      testData: {
        dateList: [12.29, 12.28, 12.27, 12.26],
        testCount: [6700, 6502, 7752, 5625],
        vaccinationCount: [6700, 6502, 7752, 5625],
        studentCount: [8000, 7950, 8145, 6799]
      },
      covidCount: {
        dateList: [12.29, 12.28, 12.27, 12.26],
        diagnosisCount: [100, 200, 200, 59],
        contactCount: [400, 300, 200, 100],
        observationCount: [600, 450, 750, 300]
      }
    }
  },
  methods: {
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
    toManage() {
      this.$router.push('/management/student')
    },
  },
  mounted() {
    this.$refs.rankingChart.initChart()
    this.$refs.testCount.initChart()
    this.$refs.vaccinationCount.initChart()
    this.$refs.covidData.initChart()
  },
  created() {
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
</style>
