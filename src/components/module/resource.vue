<template>
  <div class="resource">
    <div class="resource-title">资源概览</div>
    <div class="echarts">
      <div class="echarts-body">
        <div class="echarts-body-style" id="cpu"></div>
        <div class="echarts-body-fonts">
          <span class="echarts-body-fonts_total-cpu">总量：</span>
          <span class="echarts-body-fonts_num-cpu">{{ monitor[type].resource.cpu.total }}GHz</span>
        </div>
      </div>
      <div class="echarts-body">
        <div class="echarts-body-style" id="ram"></div>
        <div class="echarts-body-fonts">
          <span class="echarts-body-fonts_total-ram">总量：</span>
          <span class="echarts-body-fonts_num-ram">{{ monitor[type].resource.ram.total }}GB</span>
        </div>
      </div>
      <div class="echarts-body">
        <div class="echarts-body-style" id="store"></div>
        <div class="echarts-body-fonts">
          <span class="echarts-body-fonts_total-store">总量：</span>
          <span class="echarts-body-fonts_num-store">{{ monitor[type].resource.store.total }}TB</span>
        </div>
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
        store: null,
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
      that.charts.cpu = that.Echarts.init(document.getElementById('cpu'));
      that.charts.ram = that.Echarts.init(document.getElementById('ram'));
      that.charts.store = that.Echarts.init(document.getElementById('store'));
      let int = {
        title: {
          x: 'center',
          y: '45%',
          textStyle: {
            fontSize: '62',
            color: '#fbfbf9'
          },
          subtextStyle: {
            fontSize: '38',
            color: '#fbfbf9',
          },
        },
        tooltip: {
          show: false,
        },
        series: []
      };
      that.charts.cpu.setOption(int);
      that.charts.ram.setOption(int);
      that.charts.store.setOption(int);
      that.getData();
    },
    getData() {
      let that = this;
      that.charts.cpu.setOption({
        title: {
          text: that.monitor[that.type].resource.cpu.percent + "%",
          subtext: 'CPU',
        },
        series: [
          {
            type: 'pie',
            radius: ['55%', '65%'],
            center: ['50%', '50%'],
            data: [
              {
                value: that.monitor[that.type].resource.cpu.use,
                name: '已用',
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 34
                    },
                    formatter: function(param) {
                      return param.name + '\n' + param.value + 'GHz';
                    }
                  }
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    length2: 50,
                    lineStyle: {
                      width: 2
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#fe8b00'
                  }
                }
              },
              {
                value: that.monitor[that.type].resource.cpu.free,
                name: '未用',
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 34
                    },
                    formatter: function(param) {
                      return param.name + '\n' + param.value + 'GHz';
                    }
                  }
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    length2: 50,
                    lineStyle: {
                      width: 2
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ffe6c7'
                  }
                }
              }
            ]
          },
          {
            type: 'pie',
            radius: ['70%', '70%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#fe8b00',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
              }
            },
            data: [
              {
                value: '10',
                name: '',
              },
            ]
          }
        ]
      });
      that.charts.ram.setOption({
        title: {
          text: that.monitor[that.type].resource.ram.percent + "%",
          subtext: '内存',
        },
        series: [
          {
            type: 'pie',
            radius: ['55%', '65%'],
            center: ['50%', '50%'],
            data: [
              {
                value: that.monitor[that.type].resource.ram.use,
                name: '已用',
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 34
                    },
                    formatter: function(param) {
                      return param.name + '\n' + param.value + 'GB';
                    }
                  }
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    length2: 50,
                    lineStyle: {
                      width: 2
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#33d900'
                  }
                }
              },
              {
                value: that.monitor[that.type].resource.ram.free,
                name: '未用',
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 34
                    },
                    formatter: function(param) {
                      return param.name + '\n' + param.value + 'GB';
                    }
                  }
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    length2: 50,
                    lineStyle: {
                      width: 2
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#d7ffcc'
                  }
                }
              }
            ]
          },
          {
            type: 'pie',
            radius: ['70%', '70%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#33d900',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
              }
            },
            data: [
              {
                value: '10',
                name: '',
              },
            ]
          }
        ]
      });
      that.charts.store.setOption({
        title: {
          text: that.monitor[that.type].resource.store.percent + "%",
          subtext: '存储',
        },
        series: [
          {
            type: 'pie',
            radius: ['55%', '65%'],
            center: ['50%', '50%'],
            data: [
              {
                value: that.monitor[that.type].resource.store.use,
                name: '已用',
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 34
                    },
                    formatter: function(param) {
                      return param.name + '\n' + param.value + 'TB';
                    }
                  }
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    length2: 50,
                    lineStyle: {
                      width: 2
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#007efe'
                  }
                }
              },
              {
                value: that.monitor[that.type].resource.store.free,
                name: '未用',
                label: {
                  normal: {
                    textStyle: {
                      fontSize: 34
                    },
                    formatter: function(param) {
                      return param.name + '\n' + param.value + 'TB';
                    }
                  }
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    length2: 50,
                    lineStyle: {
                      width: 2
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#c8daff'
                  }
                }
              }
            ]
          },
          {
            type: 'pie',
            radius: ['70%', '70%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#007efe',
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
              }
            },
            data: [
              {
                value: '10',
                name: '',
              },
            ]
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
  .resource {
    height: 100%;
    padding: 80px 80px 0;
    &-title {
      position: absolute;
      font-size: 36px;
      color: #fbfbf9;
      left: 45.5%;
      top: 2%;
    }
    .echarts {
      padding-top: 40px;
      width: 100%;
      height: 85%;
      &-body {
        display: inline-block;
        width: 33%;
        height: 100%;
        text-align: center;
        &-style {
          width: 100%;
          height: 80%;
        }
        &-fonts {
          font-size: 38px;
          &_total-cpu {
            color: #ffe6c7;
          }
          &_num-cpu {
            color: #fe8b00;
          }
          &_total-ram {
            color: #d7ffcc;
          }
          &_num-ram {
            color: #32d900;
          }
          &_total-store {
            color: #c8daff;
          }
          &_num-store {
            color: #007efe;
          }
        }
      }
    }
  }
</style>
