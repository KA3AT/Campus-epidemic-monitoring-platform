<template>
  <div id="sjfx">
    <div
        ref="sjfx"
        class="sjfx"
        style="width: 100%; height: 100%"/>
  </div>
</template>

<script>
let chart = null
export default {
  name: "sjfx",
  data() {
    return {
      sjfxData: {
        time: ['0:00 - 2:00', '2:00 - 4:00', '4:00 - 6:00', '6:00 - 8:00', '8:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00', '22:00-0:00']
      },
      timeData:{
        data: [
          {name: '周一', value: 200},
          {name: '周二', value: 100},
          {name: '周三', value: 250},
          {name: '周四', value: 344},
          {name: '周五', value: 120},
          {name: '周六', value: 230},
          {name: '周日', value: 800},
        ],
        showValue: true
      },
    }
  },
  methods: {
    initChart() {
      if (null != chart && undefined != chart) {
        chart.dispose()
      }
      chart = this.$echarts.init(this.$refs.sjfx)
      this.setOptions()
    },
    setOptions() {
      let option = {
        title: {
          text: '学生出行时间'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['入校', '出校']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sjfxData.time
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '入校',
            type: 'line',
            stack: 'Total',
            data: [0, 0, 0, 0, 0, 0, 2, 0, 2, 1, 0, 0]
          },
          {
            name: '出校',
            type: 'line',
            stack: 'Total',
            data: [0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0]
          },
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
#sjfx {
  width: 100%;
  height: 100%;
  display: flex;
}

.table {
  width: 30%;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #34363e;
}
</style>
