<template>
  <div>
    <e-charts class="chart" :option="option" />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      data: this.getRandomData(),
    };
  },
  computed: {
    option() {
      return {
        xAxis: {
          type: "category",
          data: this.data.map((item) => item.time),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.data.map((item) => item.value),
            type: "line",
          },
        ],
      };
    },
  },
  methods:{
    getRandomData() {
      return [
        { time: "2018-01-01", value: Math.random()*100 },
        { time: "2018-01-01", value: Math.random()*100 },
        { time: "2018-01-01", value: Math.random()*100 },
        { time: "2018-01-01", value: Math.random()*100 },
      ]
    }
  },
  created() {
    setInterval(()=>{
      this.data=this.getRandomData();
    },1000)
  }
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
