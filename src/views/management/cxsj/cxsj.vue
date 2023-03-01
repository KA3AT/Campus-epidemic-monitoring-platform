<template>
  <div id="cxsj">
    <div
      ref="cxsj"
      class="cxsj"
      style="width: 70%; height: 100%"/>
    <div class="major">
      <dv-scroll-board :config="majorData" style="width: 100%; height: 100%"/>
    </div>
  </div>
</template>

<script>
let chart = null
export default {
  name: "cxsj",
  data() {
    return {
      departmentData: {
        department: ['成龙影视学院', '时尚设计学院', '环境设计学院' ,'公共艺术学院', '商学院', '信息工程学院', '亚心护理学院'],
        value: [600, 300, 233, 456, 116, 248, 97]
      },
      majorData: {
        header: ['专业', '人数'],
        data: [
          ['影视摄影与制作', 20],
          ['表演', 40],
          ['戏剧影视美术设计', 30],
          ['表演(服饰表演与推广)', 70],
          ['产品设计(珠宝首饰设计)', 43],
          ['风景园林', 30],
          ['环境设计', 20],
          ['园林', 88],
          ['软件工程', 60],
          ['计算机科学与技术', 40],
          ['数字媒体技术', 33],
        ],
        columnWidth: [230],
      }
    }
  },
  methods: {
    initChart() {
      if (null != chart && undefined != chart) {
        chart.dispose()
      }
      chart = this.$echarts.init(this.$refs.cxsj)
      this.setOptions()
    },
    setOptions() {
      let option = {
        title: {
          text: '出行数据'
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
          data: this.departmentData.department
        },
        series: [
          {
            type: 'bar',
            data: this.departmentData.value
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
#cxsj {
  width: 100%;
  height: 100%;
  display: flex;
}

.major {
  width: 30%;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #34363e;
}
</style>
