<template>
  <div :class="`chart-card ${customClass ? customClass : ''}`">
    <div v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div v-else class="chart-item-title">{{ title }}</div>
    <div :class="`chart-item-container ${innerClass ? innerClass : ''}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "chartCart",
  props: {
    title: String,
    innerClass: String,
    customClass: String,
  }
}
</script>

<style scoped>
.chart-item-title {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 15px 15px 15px 15px;
  text-align: left;
}
</style>
