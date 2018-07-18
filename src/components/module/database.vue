<template>
  <div class="database">
    <div class="database-title">各项目数据库资源用量</div>
    <div class="database-body">
      <div id="use" class="echarts-style"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      charts: {
        use: null,
      },
      vuegConfig: {
        disable:false
      }
    }
  },
  props: ['monitor', 'type'],
  methods: {
    getCharts() {
      let that = this;
      that.charts.use = that.Echarts.init(document.getElementById('use'));
      that.charts.use.setOption({
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}MB ({d}%)"
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          itemGap: 20,
          right: '10%',
          top: 20,
          bottom: 20,
          itemWidth: 67,
          itemHeight: 25,
          pageTextStyle : {
            color: '#fbfbf9'
          },
          textStyle: {
            color: '#fbfbf9',
            fontSize: '32',
          }
        },
        series: []
      });

      that.getData();
    },
    getData() {
      let that = this;
      that.charts.use.setOption({
        series: [
          {
            name:'面积模式',
            type:'pie',
            radius : '80%',
            center : ['35%', '50%'],
            roseType : 'area',
            label: {
              fontSize: '32'
            },
            data: that.monitor[that.type].database
          }
        ]
      });
    },

  },
  mounted() {
    this.getCharts()
  },
  watch: {
    'monitor.mun': function () {
      this.getData();
    }
  }
}
</script>

<style scoped lang="scss">
  .database {
    height: 100%;
    padding: 100px 80px 0;
    &-title {
      position: absolute;
      font-size: 36px;
      color: #fbfbf9;
      left: 42.5%;
      top: 2%;
    }
    &-body {
      width: 100%;
      height: 80%;
      .echarts-style {
        height: 100%;
      }
    }
  }
</style>
