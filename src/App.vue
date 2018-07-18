<template>
  <div id="app" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="header">
      <div class="header-switch header-left">
        <div class="header-switch-title">
          <img src="./assets/img/title-left.png" alt="">
        </div>
        <div>
          <button class="header-switch-button" :class="{'header-switch-active-button': list[0].type == type}"
                  @click="switch_centre(list[0])">{{ list[0].name }}
          </button>
        </div>
      </div>
      <div class="header-title">鹰潭云中心数据监控平台</div>
      <div class="header-switch">
        <div class="header-switch-title">
          <img src="./assets/img/title_right.png" alt="">
        </div>
        <div>
          <button class="header-switch-button" :class="{'header-switch-active-button': list[1].type == type}"
                  @click="switch_centre(list[1])">{{ list[1].name }}
          </button>
        </div>
      </div>
    </div>
    <div class="content">
      <!--<transition name="slide-left">-->
      <router-view v-transition :type="type" :monitor="monitor"/>
      <!--</transition>-->
    </div>
  </div>
</template>

<script>
  import global from './global'
  export default {
    name: 'App',
    data () {
      return {
        type: 'vcenter1',
        list: [
          {name: '1',type: '1'},
          {name: '2',type: '2'}
        ],
        monitor: {
          vcenter1: {
            resource: {
              cpu: {
                use: 0,
                free: 0,
                total: 0,
                percent: 0,
              },
              ram: {
                use: 0,
                free: 0,
                total: 0,
                percent: 0,
              },
              store: {
                use: 0,
                free: 0,
                total: 0,
                percent: 0,
              }
            },
            department: {
              manage: [
                {
                  name: '1'
                },
                {
                  name: '2'
                },
                {
                  name: '3'
                },
                {
                  name: '4'
                }
              ],
              outer: [
                {
                  name: '1'
                },
                {
                  name: '2'
                },
                {
                  name: '3'
                },
                {
                  name: '4'
                }
              ],
              ins: {},
              cpu: {},
              ram: {},
              cpu_warning_line: 0,
              memory_warning_line: 0,
            },
            colony: {
              num: '',
              host: '',
              department: '',
              list: [],
              detail: {}
            },
            link: {
              proNum: 0,
              upCloud: 0,
              notCloud: 0,
              starProNum: 0,
              list: []
            },
            department_resource: {
              name: [],
              ins: [],
              cpu: {},
              ram: {}
            },
            task: [],
            database: [],
            use_ratio: [
              {name: '1', project: 'admin', cpu: 20, ram: 18, tatol: 19},
              {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
              {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
              {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
              {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
              {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
            ]
          },
          vcenter2: {
            resource: {
              cpu: {
                use: 0,
                free: 0,
                total: 0,
                percent: 0,
              },
              ram: {
                use: 0,
                free: 0,
                total: 0,
                percent: 0,
              },
              store: {
                use: 0,
                free: 0,
                total: 0,
                percent: 0,
              }
            },
            department: {
              manage: [
                {
                  name: '1'
                },
                {
                  name: '2'
                },
                {
                  name: '3'
                },
                {
                  name: '4'
                }
              ],
              outer: [
                {
                  name: '1'
                },
                {
                  name: '2'
                },
                {
                  name: '3'
                },
                {
                  name: '4'
                }
              ],
              ins: {},
              cpu: {},
              ram: {},
              cpu_warning_line: 0,
              memory_warning_line: 0,
            },
            colony: {
              num: '',
              host: '',
              department: '',
              list: [],
              detail: {}
            },
            link: {
              proNum: 0,
              upCloud: 0,
              notCloud: 0,
              starProNum: 0,
              list: []
            },
            department_resource: {
              name: [],
              ins: [],
              cpu: {},
              ram: {}
            },
            task: [
              {
                name: '1',
                time: '1',
                describe: '1',
              }
            ],
            use_ratio: []
          },
          int: null,
          init: null,
          mun: 1,
          name: '',
        },
        index: 0,
        task: 0,
        loading: true,
      }
    },
    methods: {
      switch_centre(list){
        this.type = list.type;
        this.monitor.name = list.name;
        this.monitor.mun++;
      },

      getList() {
        let that = this;
        that.Axios.get('/api/get_vcenter_list').then(function (res) {
          let data = res.data;
          if (data.status == 1) {
            that.list = [];
            data.list.forEach(ele => {
             that.list.push({
               name: ele.name,
               type: ele.vcenter_num
             });
             that.monitor[ele.vcenter_num] = {
               resource: {
                 cpu: {
                   use: 0,
                   free: 0,
                   total: 0,
                   percent: 0,
                 },
                 ram: {
                   use: 0,
                   free: 0,
                   total: 0,
                   percent: 0,
                 },
                 store: {
                   use: 0,
                   free: 0,
                   total: 0,
                   percent: 0,
                 }
               },
               department: {
                 manage: [
                   {
                     name: '1'
                   },
                   {
                     name: '2'
                   },
                   {
                     name: '3'
                   },
                   {
                     name: '4'
                   }
                 ],
                 outer: [
                   {
                     name: '1'
                   },
                   {
                     name: '2'
                   },
                   {
                     name: '3'
                   },
                   {
                     name: '4'
                   }
                 ],
                 ins: {},
                 cpu: {},
                 ram: {},
                 cpu_warning_line: 0,
                 memory_warning_line: 0,
               },
               colony: {
                 num: '',
                 host: '',
                 department: '',
                 list: [],
                 detail: {}
               },
               link: {
                 proNum: 0,
                 upCloud: 0,
                 notCloud: 0,
                 starProNum: 0,
                 list: []
               },
               department_resource: {
                 name: [],
                 ins: [],
                 cpu: {},
                 ram: {}
               },
               task: [],
               database: [],
               use_ratio: [
                 {name: '1', project: 'admin', cpu: 20, ram: 18, tatol: 19},
                 {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
                 {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
                 {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
                 {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
                 {name: '2', project: 'admin', cpu: 25, ram: 30, tatol: 27.5},
               ],
               start_time: global.task.start_time
             }
            });
            that.type = that.list[0].type;
            that.monitor.name = that.list[0].name;
            that.getData('overview');
            that.getTask(that.type)
          }
        }).catch(function (err) {
        })
      },
      getData(type) {
        let that = this;
        switch (type) {
          case "overview":
            that.getResource(that.list[that.index].type);
            break;
          case 'task':
            that.getTask(that.list[that.task].type)
        }

      },
      getResource(type) {
        let that = this;
        that.Axios.get('/api/resource_overview', {
          params: {
            vcenter_num: type
          }
        }).then(function (res) {
          let data = res.data;
          if (data.status == 1) {
            let cpu = {
                use: data.cpu.use,
                free: data.cpu.free,
                total: data.cpu.total,
                percent: data.cpu.usage_percent,
              },
              ram = {
                use: data.memory.use,
                free: data.memory.free,
                total: data.memory.total,
                percent: data.memory.usage_percent,
              },
              store = {
                use: data.store.use,
                free: data.store.free,
                total: data.store.total,
                percent: data.store.usage_percent,
              };
            that.monitor[type].resource = {
              cpu: cpu,
              ram: ram,
              store: store,
            };
          }
        }).catch(function (err) {
          console.log(err);
        });
        that.getColony(type);
      },
      getColony(type) {
        let that = this;
        that.Axios.get('/api/hierarchies', {
          params: {
            vcenter_num: type
          }
        }).then(function (res) {
          let data = res.data;
          if (data.status == 1) {
            that.monitor[type].colony = {
              num: data.center.count_cluster,
              host: data.center.count_host,
              department: data.center.count_resource_pool,
              list: data.center.cluster,
              detail: data.center.cluster[0].host[0]
            };
          }
        }).catch(function (err) {
          console.log(err);
        });
        that.getDepartment(type)
      },
      getDepartment(type) {
        let that = this;
        that.Axios.get('/api/department', {
          params: {
            vcenter_num: type
          }
        }).then(function (res) {
          let data = res.data;
          if (data.status == 1) {
            let cpuFree = that.monitor[that.type].resource.cpu.total - data.data.add_cpu,
              ramFree = that.monitor[that.type].resource.ram.total * 1024 - data.data.add_memory;
            let departmentCpu = [{name: '未用', value: cpuFree}],
              departmentRam = [{name: '未用', value: ramFree}],
              manage = [],
              outer = [],
              ins = [],
              cpu = [],
              ram = [],
              name = [],
              cpu_total = [],
              ram_total = [],
              cpu_percent = [],
              ram_percent = [];
            data.data.list.forEach(ele => {
              switch (ele.cluster_name) {
                case '政务外网管理区':
                  manage.push({name: ele.name});
                  break;
                case '政务外网区':
                  outer.push({name: ele.name});
                  break;
              }
              ins.push({
                name: ele.name,
                value: ele.count_vm,
              });
              name.push(ele.name);
              cpu.push({
                name: ele.name,
                value: ele.cpu_use,
              });
              cpu_total.push({
                name: ele.name,
                value: ele.cpu_total,
              });
              cpu_percent.push({
                name: ele.name,
                value: ele.cpu_usage_percent,
                symbol: 'path://M276.22,46.5H200a64.5,64.5,0,0,0-123.87,0H0v36H76.17A64.5,64.5,0,0,0,200,82.5h76.17Z',
              });
              ram.push({
                name: ele.name,
                value: ele.memory_use,
              });
              ram_total.push({
                name: ele.name,
                value: ele.memory_total,
              });
              ram_percent.push({
                name: ele.name,
                value: ele.memory_usage_percent,
                symbol: 'path://M276.22,46.5H200a64.5,64.5,0,0,0-123.87,0H0v36H76.17A64.5,64.5,0,0,0,200,82.5h76.17Z',
              });
            });
            departmentCpu = departmentCpu.concat(cpu);
            departmentRam = departmentRam.concat(ram);
            that.monitor[type].department.manage = manage;
            that.monitor[type].department.outer = outer;
            that.monitor[type].department.ins = ins;
            that.monitor[type].department.cpu = departmentCpu;
            that.monitor[type].department.ram = departmentRam;
            that.monitor[type].department_resource.ins = ins;
            that.monitor[type].department_resource.name = name;
            that.monitor[type].department_resource.cpu = {
              use: cpu,
              total: cpu_total,
              percent: cpu_percent,
              warning: data.data.cpu_warning_line,
            };
            that.monitor[type].department_resource.ram = {
              use: ram,
              total: ram_total,
              percent: ram_percent,
              warning: data.data.memory_warning_line,
            };
          }
        }).catch(function (err) {
          console.log(err);
        });
        that.getDatabase(type);
      },
      getDatabase(type) {
        let that = this;
        that.Axios.get('/api/get_database_storage', {
          params: {
            vcenter_num: type
          }
        }).then(function (res) {
          let data = res.data;
          if (data.status == 1) {
            if (data.list.length > 0) {
              that.monitor[type].database = data.list;
            }
          }
        }).catch(function (err) {
          console.log(err);
        });
        that.getProject(type);
      },
      getProject(type) {
        let that = this;
        that.Axios.get('/api/get_application_links', {
          params: {
            vcenter_num: type
          }
        }).then(function (res) {
          let data = res.data;
          if (data.status == 1) {
            let list = [], starList = [], normalList = [];
            data.data.star_list.forEach(ele => {
              starList.push({
                name: ele.name,
                href: ele.link,
                type: 'star',
                cloud: ele.on_cloud,
              })
            });
            data.data.normal_list.forEach(ele => {
              normalList.push({
                name: ele.name,
                href: ele.link,
                type: 'normal',
                cloud: ele.on_cloud,
              })
            });
            list = starList.concat(normalList);
            that.monitor[type].link = {
              proNum: data.data.count_total - data.data.count_star,
              upCloud: data.data.count_on_cloud,
              notCloud: data.data.count_not_cloud,
              starProNum: data.data.count_star,
              list: list
            };
          }
        }).catch(function (err) {
          console.log(err);
        });
        that.getUseRatio(type)
      },
      getUseRatio(type) {
        let that = this;
        that.Axios.get('/api/vm_free_sort', {
          params: {
            vcenter_num: type
          }
        }).then(function (res) {
          let data = res.data;
          if (data.status == 1) {
            let list = [];
            if (data.list.length > 0) {
              data.list.forEach(ele => {
                list.push({
                  average_usage_percent: ele.average_usage_percent,
                  cpu_total: ele.cpu_total,
                  cpu_usage_percent: ele.cpu_usage_percent,
                  cpu_use: ele.cpu_use,
                  memory_total: ele.memory_total,
                  memory_usage_percent: ele.memory_usage_percent,
                  memory_use: ele.memory_use,
                  name: ele.name,
                  resource_pool_name: ele.resource_pool_name,
                  percent: 'CPU:' + ele.cpu_usage_percent + '% / 内存:' + ele.memory_usage_percent + '%'
                })
              })
              that.monitor[type].use_ratio = list;
            }
          }
          that.index += 1;
          if (that.index >= that.list.length) {
            that.index = 0;
            that.monitor.int = setTimeout(function () {
              that.getData('overview');
            }, global.time.overviewTime)
          } else {
            that.getData('overview');
          }
          that.monitor.mun++;
          that.loading = false;
        }).catch(function (err) {
          console.log(err);
        });
      },
      getTask(type) {
        let that = this;
        let time = Date.parse(new Date()) / 1000;
        that.Axios.get('/api/get_events', {
          params: {
            vcenter_num: type,
            begin_time: that.monitor[type].start_time,
            end_time: time,
          }
        }).then(function (res) {
          that.monitor[type].start_time = time;
          let data = res.data;
          if (data.status == 1) {
            if (that.monitor[type].task.length > 0) {
              let list = data.list.concat(that.monitor[type].task);
              let task = [];
              if (list.length > 100) {
                for (let i = 0; i < list.length; i++) {
                  if (i < 101) {
                    task.push(list[i])
                  }
                }
              } else {
                task = list;
              }
              that.monitor[type].task = task;
            } else {
              that.monitor[type].task = data.list;
            }
          }
          that.task += 1;
          if (that.task >= that.list.length) {
            that.task = 0;
            that.monitor.init = setTimeout(function () {
              that.getData('task');
            }, global.time.taskTime)
          } else {
            that.getData('task');
          }
        }).catch(function (err) {
          console.log(err);
        });
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style lang="scss">
  html, body, ul, li {
    padding: 0;
    margin: 0;
  }

  html, body {
    width: 3840px;
    height: 1080px;
    #app {
      font-family: Microsoft YaHei, 'Avenir', Helvetica, Arial, sans-serif;
      width: 100%;
      height: 100%;
      background: url('assets/img/bg.png') no-repeat;
      z-index: -100;
      color: #fbfbf9;
      .header {
        width: 100%;
        display: flex;
        &-switch {
          flex: 1.5;
          &-title {
            margin: 35px 0 8px;
          }
          &-button {
            background: url("assets/img/button.png") no-repeat;
            width: 200px;
            height: 66px;
            border: none;
            color: inherit;
            font-size: 26px;
            margin: 0 24.5%;
            outline: none;
          }
          &-active-button {
            background: url("assets/img/button_active.png") no-repeat;
          }
        }
        &-left {
          text-align: right;
        }
        &-title {
          flex: 1;
          text-align: center;
          font-size: 52px;
          font-weight: 700;
          font-stretch: normal;
          letter-spacing: 8px;
          background: -webkit-linear-gradient(#6fddfe, #d2ebff); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(#6fddfe, #d2ebff); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(#6fddfe, #d2ebff); /* Firefox 3.6 - 15 */
          background: linear-gradient(#6fddfe, #d2ebff); /* 标准的语法 */
          -webkit-background-clip: text;
          color: transparent;
          margin: 25px 0;
        }
      }
    }
  }

  ul, li {
    list-style: none;
  }

  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    background-color: #000d23;
    border: solid 1px #676767;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    background-color: #000d23;
    border-radius: 8px;
    border: solid 1px #676767;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    width: 14px;
    background-color: #73fcfb;
    border-radius: 7px;
  }

  /*定义右下角汇合处的样式*/
  ::-webkit-scrollbar-corner {
    background-color: #000d23;
  }

  /*页面切换动效*/
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all .3s;
    position: absolute;
    width: 100%;
    left: 0;
  }

  .slide-left-enter {
    transform: translateX(100%);
  }

  .slide-left-leave-active {
    transform: translateX(-100%);
  }

  //提示信息

  .el-tooltip__popper.is-light,
  .el-tooltip__popper.is-dark {
    background: #002d5a;
    border: 1px solid #007efe;
    color: #fbfbf9;
    .tooltip-font {
      color: #6ef1f1;
    }
    &[x-placement^="left"] {
      .popper__arrow {
        border-left-color: #007efe;
        &:after {
          border-left-color: #002d5a;
        }
      }
    }
    &[x-placement^="top"] {
      .popper__arrow {
        border-top-color: #007efe;
        &:after {
          border-top-color: #002d5a;
        }
      }
    }
    &[x-placement^="right"] {
      .popper__arrow {
        border-right-color: #cccccc;
        &:after {
          border-right-color: #fff;
        }
      }
    }
    &[x-placement^="bottom"] {
      .popper__arrow {
        border-bottom-color: #cccccc;
        &:after {
          border-bottom-color: #fff;
        }
      }
    }
  }

  //任务表格
  .task-body-table {
    &::before {
      height: 0;
    }
    .el-table__header-wrapper {
      .el-table__header {
        .has-gutter > tr {
          color: #2acfd5;
          background: #0e1d35;
          th {
            background: #0e1d35;
            border: none;
            .cell {
              height: 94px;
              line-height: 94px;
              font-weight: normal;
            }
          }
        }
      }

    }
    .el-table__body-wrapper {
      .el-table__body {
        .el-table__row {
          &:nth-child(odd) {
            td {
              background: #14243c;
            }
          }
          td {
            background: #0e1d35;
            border: none;
            .cell {
              color: #73fcb4;
              height: 94px;
              line-height: 94px;
              font-weight: normal;
            }
          }
        }
      }
    }
    .el-table__empty-block {
      background: #0e1d35;
      .el-table__empty-text {
        color: #73fcb4;
      }
    }
  }

  .use_ratio-table {
    &::before {
      height: 0;
    }
    .el-table__header-wrapper {
      .el-table__header {
        .has-gutter > tr {
          color: #2acfd5;
          background: #0e1d35;
          th {
            background: #0e1d35;
            border: none;
            font-size: 28px;
            .cell {
              height: 32px;
              line-height: 32px;
              font-weight: normal;
            }
          }
        }
      }

    }
    .el-table__body-wrapper {
      .el-table__body {
        .el-table__row {
          &:nth-child(odd) {
            td {
              background: #14243c;
            }
          }
          td {
            background: #0e1d35;
            border: none;
            font-size: 26px;
            .cell {
              color: #73fcb4;
              height: 32px;
              line-height: 32px;
              font-weight: normal;
            }
          }
        }
      }
    }
    .el-table__empty-block {
      background: #0e1d35;
      .el-table__empty-text {
        color: #73fcb4;
      }
    }
  }

  .overview-task-body_boder-table {
    &::before {
      height: 0;
    }
    .el-table__header-wrapper {
      .el-table__header {
        .has-gutter > tr {
          color: #2acfd5;
          background: #0e1d35;
          th {
            background: #0e1d35;
            border: none;
            .cell {
              height: 20px;
              line-height: 20px;
              font-weight: normal;
            }
          }
        }
      }
    }
    .el-table__body-wrapper {
      .el-table__body {
        .el-table__row {
          &:nth-child(odd) {
            td {
              background: #14243c;
            }
          }
          td {
            background: #0e1d35;
            border: none;
            .cell {
              color: #73fcb4;
              height: 20px;
              line-height: 20px;
              font-weight: normal;
            }
          }
        }
      }
    }
    .el-table__empty-block {
      background: #0e1d35;
      .el-table__empty-text {
        color: #73fcb4;
      }
    }
  }
</style>
