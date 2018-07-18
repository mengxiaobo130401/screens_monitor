<template>
  <div class="use_ratio">
    <div class="use_ratio-title">虚拟机利用率</div>
    <div class="use_ratio-body">
      <div class="use_ratio-body-style">
        <div class="use_ratio-body-style_title">空闲TOP5</div>
        <div class="use_ratio-body-style_body">
          <div class="use_ratio-body-style_body-legend">
            <span><i class="cpu"></i>CPU</span>
            <span><i class="ram"></i>内存</span>
          </div>
          <div class="use_ratio-body-style_body-top5">
            <div class="progress" v-for="(ele, index) in monitor[type].use_ratio" :key="index" v-if="index < 5">
              <div class="progress-body">
                <el-tooltip placement="top" class="use_ratio-tooltip">
                  <div slot="content">CPU: <span class="tooltip-font">{{ele.cpu_use}}/{{ele.cpu_total}}GHZ({{ ele.cpu_usage_percent}}%)</span> <br/>内存: <span class="tooltip-font">{{ele.memory_use}}/{{ ele.memory_total }}GB({{ele.memory_usage_percent}}%)</span></div>
                  <div class="progress-body-content">
                    <div class="progress-body-content-title">{{ index+1 }}、{{ ele.name }}</div>
                    <div class="progress-body-content-bar">
                      <div class="progress-body-content-bar_cpu" :style="{width: ele.cpu_usage_percent + '%', 'z-index': 100 - ele.cpu_usage_percent}"></div>
                      <div class="progress-body-content-bar_ram" :style="{width: ele.memory_usage_percent + '%', 'z-index': 100 - ele.memory_usage_percent}"></div>
                    </div>
                  </div>
                </el-tooltip>
                <div class="progress-body-text">{{ ele.average_usage_percent }} %</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="use_ratio-body-style">
        <div class="use_ratio-body-style_title">虚拟机利用率</div>
        <div class="use_ratio-body-style_body">
          <div class="use_ratio-body-style_body-table">
            <el-table class="use_ratio-table" :data="monitor[type].use_ratio" max-height="450" style="width:90%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="虚拟机名称"
                  show-overflow-tooltip
                  width="450">
                </el-table-column>
                <el-table-column
                  prop="resource_pool_name"
                  label="项目"
                  show-overflow-tooltip
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="percent"
                  show-overflow-tooltip
                  label="利用率%">
                </el-table-column>
              </el-table>
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
      vuegConfig: {
        disable:false
      }
    }
  },
  props: ['monitor', 'type']
}
</script>

<style scoped lang="scss">
  .use_ratio {
    height: 100%;
    padding: 100px 80px 0;
    &-title {
      position: absolute;
      font-size: 36px;
      color: #fbfbf9;
      left: 44.5%;
      top: 2%;
    }
    &-body {
      width: 100%;
      height: 80%;
      display: flex;
      &-style {
        flex: 1;
        text-align: center;
        padding: 10px 30px;
        &_title {
          display: inline-block;
          width: 311px;
          height: 73px;
          line-height: 73px;
          background: url('../../assets/img/department_resource_title.png') no-repeat;
          font-size: 32px;
          color: #4ad3e6;
          margin-bottom: 20px;
        }
        &_body {
          text-align: left;
          padding: 10px 30px;
          &-legend {
            text-align: right;
            font-size: 26px;
            margin-right: 10%;
            span {
              margin-right: 20px;
            }
            i {
              display: inline-block;
              width: 37px;
              height: 22px;
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
                font-size: 28px;
              }
              &-body {
                display: flex;
                margin-bottom: 28px;
                &-content {
                  flex: 1;
                  position: relative;
                  &-title {
                    color: #73fcfb;
                    font-size: 28px;
                    margin-bottom: 10px;
                  }
                  &-bar {
                    background: #cee8ff;
                    border-radius: 2px;
                    height: 26px;
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
                  width: 200px;
                  text-align: right;
                  color: #73fcfb;
                  font-size: 50px;
                }
              }
            }
          }
          &-table {
            width: 1372px;
            height: 516px;
            background: url('../../assets/img/use_ratio_border.png') no-repeat;
            padding-top: 10px;
          }
        }
      }
    }
    &-table {
      width: 100%;
      margin: 30px 50px;
      font-size: 28px;
      max-height: 400px;
      overflow: auto;
      table {
        width: 95%;
      }
      &_list {
        height: 55px;
        line-height: 55px;
      }
      &_bg {
        background: rgba(29, 47, 71, 0.4);
      }
      .table-header {
        color: #2acfd5;
      }
      .table-body {
        font-size: 26px;
        color: #73fcb4;
      }
    }
  }
</style>
