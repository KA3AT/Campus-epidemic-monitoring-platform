<template>
  <div id="xxdb">
    <div
        ref="xxdb"
        class="xxdb"
        style="width: 70%; height: 100%"/>
    <div class="rank">
      <dv-scroll-ranking-board :config="rankData" style="width: 100%; height: 100%"/>
    </div>
  </div>
</template>

<script>
let chart = null
export default {
  name: "xxdb",
  data() {
    return {
      xxbdData: {
        class: ['软件工程1901', '软件工程1902', '软件工程1903', '计算机科学与技术1901', '计算机科学与技术1902', '计算机科学与技术1903', '数字媒体技术1901', '数字媒体技术1902'],
        ViolationVal: [10, 5, 4, 6, 1, 4, 2, 5]
      },
      rankData: {
        data: [
          {name: "软件工程1901", value: 10},
          {name: "软件工程1902", value: 5},
          {name: "软件工程1903", value: 4},
          {name: "计算机科学与技术1901", value: 6},
          {name: "计算机科学与技术1902", value: 1},
          {name: "计算机科学与技术1903", value: 4},
          {name: "数字媒体技术1901", value: 2},
          {name: "数字媒体技术1902", value: 5},
        ],
      }
    }
  },
  methods: {
    initChart() {
      if (null != chart && undefined != chart) {
        chart.dispose()
      }
      chart = this.$echarts.init(this.$refs.xxdb)
      this.setOptions()
    },
    setOptions() {
      let option = {
        title: {
          text: '班级违纪信息'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.xxbdData.class
        },
        series: [
          {
            type: 'bar',
            data: this.xxbdData.ViolationVal
          }
        ]
      };
      chart.setOption(option)
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        if (oldValue != newValue) {
          this.setOptions()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  }
}
</script>

<style scoped>
#xxdb {
  width: 100%;
  height: 100%;
  display: flex;
}

.rank {
  width: 30%;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #34363e;
}
</style>
