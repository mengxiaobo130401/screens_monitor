<template>
  <div class="overview">
    <div class="overview-up">
      <div class="overview-resource">
        <div class="overview-title">
          <i class="overview-title-bar"></i><span>资源概览({{ monitor.name }})</span><i class="overview-title-icon"
                                                                                    @click="jump('resource')"></i><i
          class="overview-resource-dashed"></i>
        </div>
        <div class="overview-resource-body">
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
      <div class="overview-project">
        <div class="overview-title">
          <i class="overview-title-bar"></i><span>项目支持({{ monitor.name }})</span><i class="overview-title-icon"
                                                                                    @click="jump('project')"></i><i
          class="overview-project-dashed"></i>
        </div>
        <div class="overview-project-body">
          <div class="overview-project-body_intro">
            <div class="overview-project-body_intro-bg">
              <span class="project-intro">
                <span class="project-intro-title">
                  <img src="../assets/img/overview_project_star.png">
                  亮点项目
                </span>
                <span class="project-intro-body">
                  <span class="project-intro-body_spot">{{monitor[type].link.starProNum}}</span>
                  <span>个</span>
                </span>
              </span>
              <span class="project-intro">
                <span class="project-intro-title">
                  <img src="../assets/img/overview_project_circle.png">
                  普通项目
                </span>
                <span class="project-intro-body">
                  <span class="project-intro-body_pro">{{monitor[type].link.proNum}}</span>
                  <span>个</span>
                </span>
              </span>
            </div>
          </div>
          <div class="overview-project-body_content">
            <div class="project-body-link">
              <span v-for="(list, index) in monitor[type].link.list" :key="index" class="project-body-link-piece">
                <span v-if="list.type == 'star'" class="project-body-link-piece_star">
                  <a :href="list.href" target="_blank"><img src="../assets/img/overview_project_star.png">{{ list.name
                    }}</a>
                </span>
                <span class="project-body-link-piece_pro" v-else>
                   <a :href="list.href" target="_blank"><img
                     src="../assets/img/overview_project_circle.png">{{ list.name }}</a>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="overview-department">
        <div class="overview-title">
          <i class="overview-title-bar"></i><span>各部门资源占比({{ monitor.name }})</span><i class="overview-title-icon"
                                                                                       @click="jump('department')"></i><i
          class="overview-use_ratio-dashed"></i>
        </div>
        <div class="overview-department-body">
          <div class="overview-department-body_legend">
            <span><i class="used"></i>各部门已用</span> <span><i class="free"></i>各部门未用</span>
          </div>
          <div class="overview-department-body_echarts">
            <div id="department_instance" class="echarts-style"></div>
            <div id="department_cpu" class="echarts-style"></div>
            <div id="department_ram" class="echarts-style"></div>
          </div>
        </div>
      </div>
      <div class="overview-task">
        <div class="overview-title">
          <i class="overview-title-bar"></i><span>任务与事件({{ monitor.name }})</span><i class="overview-title-icon"
                                                                                     @click="jump('task')"></i><i
          class="overview-task-dashed"></i>
        </div>
        <div class="overview-task-body">
          <div class="overview-task-body_boder">
              <el-table class="overview-task-body_boder-table" :data="monitor[type].task" max-height="210">
                <el-table-column
                  prop="user_name"
                  label="用户"
                  show-overflow-tooltip
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  label="时间"
                  show-overflow-tooltip
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="description"
                  show-overflow-tooltip
                  label="描述">
                </el-table-column>
              </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="overview-down">
      <div class="overview-colony">
        <div class="overview-title">
          <i class="overview-title-bar"></i><span>集群及部门划分({{ monitor.name }})</span><i class="overview-title-icon"
                                                                                       @click="jump('colony')"></i><i
          class="overview-resource-dashed"></i>
        </div>
        <div class="overview-colony-body">
          <div class="overview-colony-body_content">
            <div class="overview-colony-body_content-concrete" v-for="(list, index) in monitor[type].colony.list"
                 :key="index">
              <div class="overview-colony-body_content-concrete-title">
                <img src="../assets/img/overview_colony_icon_colony.png" alt="">
                <span>集群:{{ list.name }}</span>
              </div>
              <div class="overview-colony-body_content-concrete-body">
                <span class="overview-colony-body_content-concrete-body-span"
                      v-for="(colony, inx) in list.resource_pool" :key="inx">
                  <img src="../assets/img/overview_colony_icon_department.png" alt="">
                  <span class="overview-colony-body_content-concrete-body-span_department">{{ colony.name }}</span>
                </span>

                <span class="overview-colony-body_content-concrete-body-span" v-for="(host, ind) in list.host"
                    :key="ind" @click="hostDeatil(host)">
                <img src="../assets/img/overview_colony_icon_host.png" alt="">
                <span class="overview-colony-body_content-concrete-body-span_host">{{ host.name }}</span>
              </span>
              </div>
            </div>
          </div>
          <div class="overview-colony-body_intro">
            <div class="overview-colony-body_intro-detail">
              <div class="overview-colony-body_intro-detail-title">
                物理机详情
              </div>
              <div class="overview-colony-body_intro-detail-content">
                <span class="detail-content-left">
                  <span class="detail-content-left-name">CPU使用量：</span>
                  <span>{{ monitor[type].colony.detail.cpu_use }}</span>
                </span>
                <span class="detail-content-right">
                  <span class="detail-content-right-name">内存使用量：</span>
                  <span>{{ monitor[type].colony.detail.memory_use }}</span>
                </span>
                <span class="detail-content-left">
                  <span class="detail-content-left-name">CPU容量：</span>
                  <span>{{ monitor[type].colony.detail.cpu_total }}</span>
                </span>
                <span class="detail-content-right">
                  <span class="detail-content-right-name">内存容量：</span>
                  <span>{{ monitor[type].colony.detail.memory_total }}</span>
                </span>
                <span class="detail-content-left">
                  <span class="detail-content-left-name">制造商：</span>
                  <span>{{ monitor[type].colony.detail.vendor }}</span>
                </span>
                <span class="detail-content-right">
                  <span class="detail-content-right-name">CPU内核：</span>
                  <span>{{ monitor[type].colony.detail.cpu_core }}</span>
                </span>
              </div>
            </div>
            <div class="overview-colony-body_intro-total">
              <div class="overview-colony-body_intro-total-host">
                <img src="../assets/img/overview_colony_host.png" alt="">
                <div class="overview-colony-body_intro-total-host-name">物理机</div>
                <div class="overview-colony-body_intro-total-host-text">
                  {{ monitor[type].colony.host }}
                  <span>个</span>
                </div>
              </div>
              <div class="overview-colony-body_intro-total-department">
                <img src="../assets/img/overview_colony_department.png" alt="">
                <div class="overview-colony-body_intro-total-department-name">部门</div>
                <div class="overview-colony-body_intro-total-department-text">
                  {{ monitor[type].colony.department }}
                  <span>个</span></div>
              </div>
              <div class="overview-colony-body_intro-total-colony">
                <img src="../assets/img/overview_colony_colony.png" alt="">
                <div class="overview-colony-body_intro-total-colony-name">集群</div>
                <div class="overview-colony-body_intro-total-colony-text">
                  {{ monitor[type].colony.num }}
                  <span>个</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overview-department_resource">
        <div class="overview-title">
          <i class="overview-title-bar"></i><span>各部门资源使用情况({{ monitor.name }})</span><i class="overview-title-icon"
                                                                                         @click="jump('department_resource')"></i><i
          class="overview-resource-dashed"></i>
        </div>
        <div class="overview-department_resource-body">
          <div class="overview-department_resource-body_echarts">
            <div class="echarts-title">虚拟机台数</div>
            <div class="echarts-style" id="department_resource_instance"></div>
          </div>
          <div class="overview-department_resource-body_echarts">
            <div class="echarts-title">CPU情况</div>
            <div class="echarts-style" id="department_resource_cpu"></div>
          </div>
          <div class="overview-department_resource-body_echarts">
            <div class="echarts-title">内存情况</div>
            <div class="echarts-style" id="department_resource_ram"></div>
          </div>
        </div>
      </div>
      <div class="overview-database">
        <div class="overview-title">
          <i class="overview-title-bar"></i><span>各项目数据库资源用量({{ monitor.name }})</span><i class="overview-title-icon"
                                                                                          @click="jump('database')"></i><i
          class="overview-database-dashed"></i>
        </div>
        <div class="overview-database-body" id="use">

        </div>
      </div>
      <div class="overview-use_ratio">
        <div class="overview-title">
          <i class="overview-title-bar"></i><span>虚拟机利用率空闲TOP5({{ monitor.name }})</span><i class="overview-title-icon"
                                                                                            @click="jump('use_ratio')"></i><i
          class="overview-use_ratio-dashed"></i>
        </div>
        <div class="overview-use_ratio-body">
          <div class="overview-use_ratio-body-legend">
            <span><i class="cpu"></i>CPU</span>
            <span><i class="ram"></i>内存</span>
          </div>
          <div class="overview-use_ratio-body-top5">
            <div class="progress" v-for="(ele, index) in monitor[type].use_ratio" :key="index" v-if="index < 5">
              <div class="progress-body">
                <el-tooltip placement="top" class="use_ratio-tooltip">
                  <div slot="content">CPU:<span
                    class="tooltip-font">{{ele.cpu_use}}/{{ele.cpu_total}}GHZ({{ ele.cpu_usage_percent}}%)</span><br/>内存:<span
                    class="tooltip-font">{{ele.memory_use}}/{{ ele.memory_total
                    }}GB({{ele.memory_usage_percent}}%)</span></div>
                  <div class="progress-body-content">
                    <div class="progress-body-content-title">{{ index + 1 }}、{{ ele.name }}({{ ele.resource_pool_name }})</div>
                    <div class="progress-body-content-bar">
                      <div class="progress-body-content-bar_cpu"
                           :style="{width: ele.cpu_usage_percent + '%', 'z-index': 100 - ele.cpu_usage_percent}"></div>
                      <div class="progress-body-content-bar_ram"
                           :style="{width: ele.memory_usage_percent + '%', 'z-index': 100 - ele.memory_usage_percent}"></div>
                    </div>
                  </div>
                </el-tooltip>
                <div class="progress-body-text">{{ ele.average_usage_percent }} %</div>
              </div>
            </div>
          </div>
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
          department_instance: null,
          department_cpu: null,
          department_ram: null,
          department_resource_instance: null,
          department_resource_cpu: null,
          department_resource_ram: null,
          use: null
        }
      }
    },
    props: ['monitor', 'type'],
    methods: {
      getCharts() {
        let that = this;
        //resource
        that.charts.cpu = that.Echarts.init(document.getElementById('cpu'));
        that.charts.ram = that.Echarts.init(document.getElementById('ram'));
        that.charts.store = that.Echarts.init(document.getElementById('store'));
        let int = {
          title: {
            x: 'center',
            y: '45%',
            textStyle: {
              fontSize: '30',
              color: '#fbfbf9'
            },
            subtextStyle: {
              fontSize: '18',
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

        //department
        that.charts.department_instance = that.Echarts.init(document.getElementById('department_instance'));
        that.charts.department_cpu = that.Echarts.init(document.getElementById('department_cpu'));
        that.charts.department_ram = that.Echarts.init(document.getElementById('department_ram'));
        let department_int = {
          title: {
            x: 'center',
            y: '40%',
            subtextStyle: {
              fontSize: '20',
              color: '#fbfbf9',
            },
          },
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 15
            },
            formatter: "{b} <br/>{a}: {c} ({d}%)"
          },
          color: ['#9f9f9f', '#fe00b9', '#007dfe', '#fe8b00', '#9373fc', '#73fcfa', '#58ff24', '#3b7dcb', '#da4ae0', '#dbe04a', '#8faeea', '＃ff6600', '#0092c2', '#f2ff21', '#66c363', '#e74747', '#1d9e9c', '＃3f9e00', '#7f12be', '#a84f14', '#acc500', '#0a2787', '#ff8585', '＃4fcfff'],
          series: []
        };
        that.charts.department_instance.setOption(department_int);
        that.charts.department_cpu.setOption(department_int);
        that.charts.department_ram.setOption(department_int);

        //department_resource
        that.charts.department_resource_instance = that.Echarts.init(document.getElementById('department_resource_instance'));
        that.charts.department_resource_cpu = that.Echarts.init(document.getElementById('department_resource_cpu'));
        that.charts.department_resource_ram = that.Echarts.init(document.getElementById('department_resource_ram'));
        let department_resource_ints = {
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
            right: 40,
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
                rotate: 40,
                textStyle: {
                  color: '#fbfbf9',
                  fontSize: 12
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
                fontSize: 12
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fbfbf9',
                  fontSize: 12
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
                  fontSize: 12
                }
              }
            }
          ],
          series: []
        };
        that.charts.department_resource_instance.setOption({
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
              rotate: 40,
              textStyle: {
                color: '#fbfbf9',
                fontSize: 12
              }
            }
          },
          yAxis: [
            {
              type: 'value',
              nameTextStyle: {
                color: '#fbfbf9',
                fontSize: 12
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fbfbf9',
                  fontSize: 12
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
        that.charts.department_resource_cpu.setOption(department_resource_ints);
        that.charts.department_resource_ram.setOption(department_resource_ints);

        //database
        that.charts.use = that.Echarts.init(document.getElementById('use'));
        that.charts.use.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}MB ({d}%)"
          },
          series: []
        });


        that.getData();
      },
      getData() {
        let that = this;
        //resource
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
                        fontSize: 24
                      },
                      formatter: function (param) {
                        return param.name + '\n' + param.value + 'GHz';
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      smooth: true,
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
                        fontSize: 24
                      },
                      formatter: function (param) {
                        return param.name + '\n' + param.value + 'GHz';
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      smooth: true,
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
                        fontSize: 24
                      },
                      formatter: function (param) {
                        return param.name + '\n' + param.value + 'GB';
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      smooth: true,
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
                        fontSize: 24
                      },
                      formatter: function (param) {
                        return param.name + '\n' + param.value + 'GB';
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      smooth: true,
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
                        fontSize: 24
                      },
                      formatter: function (param) {
                        return param.name + '\n' + param.value + 'TB';
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      smooth: true,
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
                        fontSize: 24
                      },
                      formatter: function (param) {
                        return param.name + '\n' + param.value + 'TB';
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      smooth: true,
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
        });

        //department
        that.charts.department_instance.setOption({
          title: {
            subtext: '虚拟机占比',
          },
          color: ['#fe00b9', '#007dfe', '#fe8b00', '#9373fc', '#73fcfa', '#58ff24', '#3b7dcb', '#da4ae0', '#dbe04a', '#8faeea', '＃ff6600', '#0092c2', '#f2ff21', '#66c363', '#e74747', '#1d9e9c', '＃3f9e00', '#7f12be', '#a84f14', '#acc500', '#0a2787', '#ff8585', '＃4fcfff'],
          series: [
            {
              name: '虚拟机占比',
              type: 'pie',
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
        that.charts.department_cpu.setOption({
          title: {
            subtext: 'CPU占比',
          },
          series: [
            {
              name: 'CPU占比',
              type: 'pie',
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
        that.charts.department_ram.setOption({
          title: {
            subtext: '内存占比',
          },
          series: [
            {
              name: '内存占比',
              type: 'pie',
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

        //department_resource
        that.charts.department_resource_instance.setOption({
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
              barMaxWidth: 11,
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
        that.charts.department_resource_cpu.setOption({
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
              name: '总量',
              barGap: '-100%',
              barMaxWidth: 11,
              itemStyle: {
                color: '#389bf6'
              },
              type: 'bar',
              data: that.monitor[that.type].department_resource.cpu.total
            },
            {
              name: '已消耗',
              barGap: '-100%',
              barMaxWidth: 11,
              itemStyle: {
                color: '#72c1b8'
              },
              type: 'bar',
              data: that.monitor[that.type].department_resource.cpu.use
            },
            {
              name: '利用率',
              type: 'line',
              yAxisIndex: 1,
              data: that.monitor[that.type].department_resource.cpu.percent,
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
        that.charts.department_resource_ram.setOption({
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
              name: '总量',
              barGap: '-100%',
              barMaxWidth: 11,
              itemStyle: {
                color: '#389bf6'
              },
              type: 'bar',
              data: that.monitor[that.type].department_resource.ram.total
            },
            {
              name: '已消耗',
              barGap: '-100%',
              barMaxWidth: 11,
              itemStyle: {
                color: '#72c1b8'
              },
              type: 'bar',
              data: that.monitor[that.type].department_resource.ram.use
            },
            {
              name: '利用率',
              type: 'line',
              yAxisIndex: 1,
              data: that.monitor[that.type].department_resource.ram.percent,
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
        });

        //database
        that.charts.use.setOption({
          series: [
            {
              name: '面积模式',
              type: 'pie',
              radius: '60%',
              center: ['40%', '55%'],
              roseType: 'area',
              label: {
                fontSize: '16',
                formatter: function (value) {
                  let res = value.name;
                  if (res.length > 10) {
                    res = res.substring(0, 9) + "..";
                  }
                  return res;
                }
              },
              data: that.monitor[that.type].database
            }
          ]
        });
      },
      hostDeatil(obj) {
        this.monitor[this.type].colony.detail = obj;
      },
      jump(type) {
        this.$router.push({path: '/' + type})
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
  .overview {
    margin: 20px 40px 40px;
    height: 100%;
    &-title {
      font-size: 24px;
      &-bar {
        display: inline-block;
        width: 3px;
        height: 18px;
        background: #55fdfe;
        margin-right: 20px;
      }
      &-icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin: 0 16px;
        cursor: pointer;
        background: url("../assets/img/overvie_zoom.png");
      }
    }
    &-up {
      height: 395px;
      display: flex;
    }
    &-resource {
      width: 1290px;
      &-dashed {
        display: inline-block;
        width: 547px;
        height: 7px;
        background: url("../assets/img/overview_resource_dashed.png");
      }
      &-body {
        width: 100%;
        height: 80%;
        .echarts-body {
          display: inline-block;
          width: 33%;
          height: 100%;
          text-align: center;
          &-style {
            width: 100%;
            height: 90%;
          }
          &-fonts {
            font-size: 18px;
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
    &-project {
      width: 791px;
      &-body {
        display: flex;
        padding-top: 70px;
        &_intro {
          width: 151px;
          height: 249px;
          background: #0f3355;
          &-bg {
            margin: 9px;
            width: 133px;
            height: 231px;
            background-color: rgba(36, 85, 133, 0.68);
            border-radius: 8px;
            .project-intro {
              display: inline-block;
              width: 100%;
              height: 50%;
              font-size: 14px;
              text-align: center;
              vertical-align: middle;
              &-title {
                margin-top: 30%;
                display: block;
                font-size: 18px;
              }
              &-body {
                &_spot {
                  font-size: 28px;
                  color: #f8ff2e;
                }
                &_pro {
                  font-size: 28px;
                  color: #39ce90;
                }
              }
            }
          }
        }
        &_content {
          flex: 1;
          margin-left: 27px;
          width: 547px;
          height: 258px;
          background: url("../assets/img/overview_project_border.png") no-repeat;
          .project-body-link {
            width: 480px;
            height: 185px;
            margin: 24px 0 0 44px;
            &-piece {
              display: inline-block;
              width: 30%;
              height: 41px;
              font-size: 14px;
              margin: 0 13px 9px 0;
              line-height: 41px;
              background: -webkit-linear-gradient(rgba(19, 45, 78, 0.6), rgba(19, 45, 78, 0.01), rgba(19, 45, 78, 0)); /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(rgba(19, 45, 78, 0.6), rgba(19, 45, 78, 0.01), rgba(19, 45, 78, 0)); /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(rgba(19, 45, 78, 0.6), rgba(19, 45, 78, 0.01), rgba(19, 45, 78, 0)); /* Firefox 3.6 - 15 */
              background: linear-gradient(rgba(19, 45, 78, 0.6), rgba(19, 45, 78, 0.01), rgba(19, 45, 78, 0)); /* 标准的语法 */
              &_star {
                color: #ffff00;
              }
              &_pro {
                color: #55fdfe;
              }
              a {
                text-decoration: none;
                color: inherit;
                img {
                  position: relative;
                  top: 1px;
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
      &-dashed {
        display: inline-block;
        width: 379px;
        height: 7px;
        background: url("../assets/img/overview_project_dashed.png");
      }
    }
    &-department {
      width: 897px;
      &-body {
        padding-top: 70px;
        &_legend {
          font-size: 14px;
          > span > i {
            width: 64px;
            height: 12px;
            display: inline-block;
            vertical-align: middle;
            margin: 0 10px 0 20px;
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
        &_echarts {
          display: flex;
          width: 100%;
          height: 249px;
          .echarts-style {
            flex: 1;
          }
        }
      }
    }
    &-task {
      width: 779px;
      &-dashed {
        display: inline-block;
        width: 409px;
        height: 7px;
        background: url("../assets/img/overview_task_dashed.png") no-repeat;
      }
      &-body {
        padding-top: 50px;
        &_table {
          padding-top: 20px;
          width: 781px;
          height: 264px;
          background: url("../assets/img/overview_task_border.png") no-repeat;
          .task-table {
            width: 751px;
          }
        }
      }
    }
    &-colony {
      width: 998px;
      height: 100%;
      &-body {
        display: flex;
        width: 100%;
        height: 90%;
        margin-top: 20px;
        &_content {
          width: 526px;
          height: 100%;
          &-concrete {
            width: 100%;
            height: 210px;
            background-color: rgba(12, 40, 71, 0.65);
            border-radius: 4px;
            margin-bottom: 16px;
            &-title {
              text-align: center;
              padding-top: 15px;
              img {
                display: inline-block;
                vertical-align: bottom;
              }
              span {
                display: inline-block;
              }
            }
            &-body {
              overflow: auto;
              font-size: 14px;
              height: 170px;
              &-span {
                display: inline-block;
                width: 24%;
                padding: 10px 0;
                text-align: center;
                img {
                  display: block;
                  margin: 5px auto;
                }
                &_department {
                  color: #f2f425;
                }
                &_host {
                  color: #4ad3e6;
                }
              }
            }
          }
        }
        &_intro {
          flex: 1;
          margin-left: 35px;
          &-detail {
            width: 378px;
            border: solid 1px #72d5fc;
            border-radius: 11px 11px 0 0;
            border-top: none;
            &-title {
              width: 100%;
              height: 53px;
              background: #2086ac;
              border-radius: 11px 11px 0 0;
              font-size: 22px;
              text-align: center;
              line-height: 53px;
            }
            &-content {
              height: 119px;
              font-size: 12px;
              color: #73fcb4;
              .detail-content-left {
                display: inline-block;
                width: 40%;
                margin: 10px 0 10px 12px;
                &-name {
                  display: inline-block;
                  width: 56%;
                  color: #fbfbf9;
                }
              }
              .detail-content-right {
                display: inline-block;
                width: 55%;
                &-name {
                  display: inline-block;
                  width: 42%;
                  color: #fbfbf9;
                }
              }
            }
          }
          &-total {
            width: 378px;
            height: 266px;
            background: url("../assets/img/overview_colony_circle.png") no-repeat -27px -45px;
            position: relative;
            font-size: 14px;
            text-align: center;
            &-host {
              position: absolute;
              top: 11%;
              left: 7.5%;
              width: 150px;
              &-name {
                margin: 12px 0;
              }
              &-text {
                font-size: 28px;
                span {
                  font-size: 12px;
                }
              }
            }
            &-department {
              position: absolute;
              top: 21%;
              left: 58%;
              width: 120px;
              &-name {
                margin: 8px 0;
              }
              &-text {
                font-size: 28px;
                span {
                  font-size: 12px;
                }
              }
            }
            &-colony {
              position: absolute;
              top: 66%;
              left: 39.5%;
              width: 90px;
              &-text {
                font-size: 22px;
                span {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
    &-department_resource {
      width: 1419px;
      &-body {
        margin-top: 50px;
        display: flex;
        width: 100%;
        height: 83%;
        &_echarts {
          flex: 1;
          text-align: center;
          .echarts-title {
            display: inline-block;
            width: 190px;
            height: 45px;
            line-height: 45px;
            background: url('../assets/img/overview_department_resource_title.png') no-repeat;
            font-size: 18px;
            color: #4ad3e6;
            margin-bottom: 20px;
          }
          .echarts-style {
            height: 80%;
          }
        }
        .echarts-style {
          width: 100%;
        }
      }
    }
    &-database {
      width: 781px;
      &-dashed {
        display: inline-block;
        width: 247px;
        height: 7px;
        background: url("../assets/img/overview_database_dashed.png");
      }
      &-body {
        width: 100%;
        height: 90%;
      }
    }
    &-use_ratio {
      width: 558px;
      &-dashed {
        display: inline-block;
        width: 73px;
        height: 7px;
        background: url("../assets/img/overview_use_ratio_dashed.png");
      }
      &-body {
        margin-top: 50px;
        &-legend {
          text-align: right;
          font-size: 16px;
          margin-right: 10%;
          span {
            margin-right: 20px;
          }
          i {
            display: inline-block;
            width: 22px;
            height: 13px;
            border-radius: 4px;
            margin-right: 10px;
          }
          .cpu {
            background: #abe67a;
          }
          .ram {
            background: #389bf6;
          }
        }
        &-top5 {
          .progress {
            &-title {
              color: #73fcfb;
              font-size: 18px;
            }
            &-body {
              display: flex;
              margin-bottom: 35px;
              &-content {
                flex: 1;
                position: relative;
                &-title {
                  color: #73fcfb;
                  margin-bottom: 9px;
                }
                &-bar {
                  background: #cee8ff;
                  border-radius: 2px;
                  height: 15px;
                  position: relative;
                  &_cpu {
                    position: absolute;
                    height: 100%;
                    background: #abe67a;
                    border-radius: 2px;
                  }
                  &_ram {
                    position: absolute;
                    height: 100%;
                    background: #389bf6;
                    border-radius: 2px;
                  }
                }
              }
              &-text {
                width: 130px;
                text-align: right;
                color: #73fcfb;
                font-size: 30px;
              }
            }
          }
        }
      }
    }
    &-down {
      height: 490px;
      display: flex;
    }
  }
</style>
