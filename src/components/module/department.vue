<template>
  <div class="department">
    <div class="department-title">各部门资源占比</div>
    <div class="department-body">
      <div class="department-body-intro">
        <div>
          <div class="department-body-intro_title">政务外网管理区：</div>
          <div class="department-body-intro_body">
            <span class="department-body-intro_body-text" v-for="(manage, index) in monitor[type].department.manage">
              <img src="../../assets/img/department_circle.png" alt="">
              {{ manage.name }}
            </span>
          </div>
        </div>
        <div>
          <div class="department-body-intro_title">政务外网区：</div>
          <div class="department-body-intro_body">
            <span class="department-body-intro_body-text" v-for="(outer, index) in monitor[type].department.outer">
              <img src="../../assets/img/department_circle.png" alt="">
              {{ outer.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="department-body-pie">
        <div id="instance" class="echarts-style"></div>
      </div>
      <div class="department-body-pie">
        <div id="cpu" class="echarts-style"></div>
        <div class="echarts-legend"><span><i class="used"></i>各部门已用</span> <span><i class="free"></i>各部门未用</span></div>
      </div>
      <div class="department-body-pie">
        <div id="ram" class="echarts-style"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      charts: {
        cpu: null,
        ram: null,
        instance: null,
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
      that.charts.instance = that.Echarts.init(document.getElementById('instance'));
      that.charts.cpu = that.Echarts.init(document.getElementById('cpu'));
      that.charts.ram = that.Echarts.init(document.getElementById('ram'));
      let int = {
        title: {
          x: 'center',
          y: '44%',
          subtextStyle: {
            fontSize: '38',
            color: '#fbfbf9',
          },
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: 38
          },
          formatter: "{b} <br/>{a}: {c} ({d}%)"
        },
        color: ['#9f9f9f', '#fe00b9', '#007dfe', '#fe8b00', '#9373fc', '#73fcfa', '#58ff24', '#3b7dcb', '#da4ae0', '#dbe04a', '#8faeea', '＃ff6600', '#0092c2', '#f2ff21', '#66c363', '#e74747', '#1d9e9c', '＃3f9e00', '#7f12be', '#a84f14', '#acc500', '#0a2787', '#ff8585', '＃4fcfff'],
        series: []
      };
      that.charts.instance.setOption(int);
      that.charts.cpu.setOption(int);
      that.charts.ram.setOption(int);
      that.getData();
    },
    getData() {
      let that = this;
      that.charts.instance.setOption({
        title: {
          subtext: '虚拟机占比',
        },
        color: ['#fe00b9', '#007dfe', '#fe8b00', '#9373fc', '#73fcfa', '#58ff24', '#3b7dcb', '#da4ae0', '#dbe04a', '#8faeea', '＃ff6600', '#0092c2', '#f2ff21', '#66c363', '#e74747', '#1d9e9c', '＃3f9e00', '#7f12be', '#a84f14', '#acc500', '#0a2787', '#ff8585', '＃4fcfff'],
        series: [
          {
            name:'虚拟机占比',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: that.monitor[that.type].department.ins
          }
        ]
      });
      that.charts.cpu.setOption({
        title: {
          subtext: 'CPU占比',
        },
        series: [
          {
            name:'CPU占比',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: that.monitor[that.type].department.cpu
          }
        ]
      });
      that.charts.ram.setOption({
        title: {
          subtext: '内存占比',
        },
        series: [
          {
            name:'内存占比',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: that.monitor[that.type].department.ram
          }
        ]
      });
    }
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
  .department {
    height: 100%;
    padding: 100px 80px 0;
    &-title {
      position: absolute;
      font-size: 36px;
      color: #fbfbf9;
      left: 44%;
      top: 2%;
    }
    &-body {
      width: 100%;
      height: 80%;
      display: flex;
      &-intro {
        flex: 1;
        padding-top: 50px;
        font-size: 30px;
        &_title {
          font-size: 32px;
        }
        &_body {
          margin-left: 45px;
          margin-bottom: 60px;
          max-height: 300px;
          overflow: auto;
          &-text {
            display: inline-block;
            width: 49.5%;
            padding: 35px 0;
          }
        }
      }
      &-pie {
        flex: 1;
        .echarts-style {
          height: 85%;
        }
        .echarts-legend {
          text-align: center;
          > span > i {
            width: 155px;
            height: 29px;
            display: inline-block;
            vertical-align: middle;
            margin:0 10px 0 20px;
          }
          .used {
            background: -webkit-linear-gradient(90deg, #ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(90deg, #ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(90deg, #ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000); /* Firefox 3.6 - 15 */
            background: linear-gradient(90deg, #ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000); /* 标准的语法 */
          }
          .free {
            background: #9f9f9f;
          }
        }
      }
    }
  }
</style>
