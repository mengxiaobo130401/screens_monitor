<template>
  <div class="department-resource">
    <div class="department-resource-title">各部门资源使用情况</div>
    <div class="department-resource-body">
      <div class="department-resource-body_echarts">
        <div class="echarts-title">虚拟机台数</div>
        <div class="echarts-style" id="instance"></div>
      </div>
      <div class="department-resource-body_echarts">
        <div class="echarts-title">CPU情况</div>
        <div class="echarts-style" id="cpu"></div>
      </div>
      <div class="department-resource-body_echarts">
        <div class="echarts-title">内存情况</div>
        <div class="echarts-style" id="ram"></div>
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
      let ints = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          align: 'left',
          textStyle: {
            color: '#fbfbf9'
          },
          right: 10,
          data: [
            {
              name: '总量'
            },
            {
              name: '已消耗'
            },
            {
              name: '利用率',
              icon: 'path://M276.22,46.5H200a64.5,64.5,0,0,0-123.87,0H0v36H76.17A64.5,64.5,0,0,0,200,82.5h76.17Z'
            }
          ]
        },
        grid: {
          bottom: '10%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              rotate:40,
              textStyle: {
                color: '#fbfbf9',
                fontSize: 22
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            nameTextStyle: {
              color: '#fbfbf9',
              fontSize: 22
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fbfbf9',
                fontSize: 22
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
              }
            }
          },
          {
            type: 'value',
            min: 0,
            max: 100,
            splitLine: {
              show: false
            },
            nameTextStyle: {
              color: '#fbfbf9'
            },
            axisLabel: {
              show: true,
              formatter: '{value} %',
              textStyle: {
                color: '#fbfbf9',
                fontSize: 22
              }
            }
          }
        ],
        series: []
      };
      that.charts.instance.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          align: 'left',
          textStyle: {
            color: '#fbfbf9'
          },
          right: 10
        },
        grid: {
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            show: true,
            rotate:40,
            textStyle: {
              color: '#fbfbf9',
              fontSize: 22
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            nameTextStyle: {
              color: '#fbfbf9',
              fontSize: 22
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fbfbf9',
                fontSize: 22
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
              }
            }
          }
        ],
        series: []
      });
      that.charts.cpu.setOption(ints);
      that.charts.ram.setOption(ints);
      that.getData();
    },
    getData() {
      let that = this;
      that.charts.instance.setOption({
        xAxis: {
          data: that.monitor[that.type].department_resource.name
        },
        yAxis: [{
          type: 'value',
          name: '单位:台',
        }],
        series: [
          {
            name: '数量',
            barMaxWidth: 23,
            type: 'bar',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#369bf6' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#225c2e' // 100% 处的颜色
                }],
              }
            },
            data: that.monitor[that.type].department_resource.ins,
          }
        ]
      });
      that.charts.cpu.setOption({
        xAxis: [
          {
            data: that.monitor[that.type].department_resource.name,
          }
        ],
        yAxis: [
          {
            name: '单位:GHz',
          }
        ],
        series: [
          {
            name:'总量',
            barGap: '-100%',
            barMaxWidth: 23,
            itemStyle: {
              color: '#389bf6'
            },
            type:'bar',
            data:that.monitor[that.type].department_resource.cpu.total
          },
          {
            name:'已消耗',
            barGap: '-100%',
            barMaxWidth: 23,
            itemStyle: {
              color: '#72c1b8'
            },
            type:'bar',
            data:that.monitor[that.type].department_resource.cpu.use
          },
          {
            name:'利用率',
            type:'line',
            yAxisIndex: 1,
            data:that.monitor[that.type].department_resource.cpu.percent,
            itemStyle: {
              color: '#fe6700'
            },
            markLine: {
              silent: true,
              lineStyle: {
                color: "rgba(222,0,255,0.72)"
              },
              label: {
                show: false
              },
              data: [{
                yAxis: that.monitor[that.type].department_resource.cpu.warning,
              }]
            }
          }
        ]
      });
      that.charts.ram.setOption({
        xAxis: [
          {
            data: that.monitor[that.type].department_resource.name,
          }
        ],
        yAxis: [
          {
            name: '单位:GB',
          }
        ],
        series: [
          {
            name:'总量',
            barGap: '-100%',
            barMaxWidth: 23,
            itemStyle: {
              color: '#389bf6'
            },
            type:'bar',
            data:that.monitor[that.type].department_resource.ram.total
          },
          {
            name:'已消耗',
            barGap: '-100%',
            barMaxWidth: 23,
            itemStyle: {
              color: '#72c1b8'
            },
            type:'bar',
            data:that.monitor[that.type].department_resource.ram.use
          },
          {
            name:'利用率',
            type:'line',
            yAxisIndex: 1,
            data:that.monitor[that.type].department_resource.ram.percent,
            itemStyle: {
              color: '#fe6700'
            },
            markLine: {
              silent: true,
              lineStyle: {
                color: "rgba(222,0,255,0.72)"
              },
              label: {
                show: false
              },
              data: [{
                yAxis: that.monitor[that.type].department_resource.ram.warning,
              }]
            }
          }
        ]
      })
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
  .department-resource {
    height: 100%;
    padding: 100px 80px 0;
    &-title {
      position: absolute;
      font-size: 36px;
      color: #fbfbf9;
      left: 43%;
      top: 2%;
    }
    &-body {
      width: 100%;
      height: 80%;
      display: flex;
      &_echarts {
        flex: 1;
        text-align: center;
        .echarts-title {
          display: inline-block;
          width: 311px;
          height: 73px;
          line-height: 73px;
          background: url('../../assets/img/department_resource_title.png') no-repeat;
          font-size: 30px;
          color: #4ad3e6;
          margin-bottom: 20px;
        }
        .echarts-style {
          height: 80%;
        }
      }

    }
  }
</style>
