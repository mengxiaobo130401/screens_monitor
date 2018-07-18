<template>
  <div class="colony">
    <div class="colony-title">集群及部门划分</div>
    <div class="colony-body">
      <div class="colony-body-total">
        <div class="colony-body-total_host">
          <img src="../../assets/img/colony_host.png" alt="">
          <div class="colony-body-total_host-name">物理机</div>
          <div class="colony-body-total_host-text">
            {{ monitor[type].colony.host }}
            <span>个</span>
          </div>
        </div>
        <div class="colony-body-total_department">
          <img src="../../assets/img/colony_department.png" alt="">
          <div class="colony-body-total_department-name">部门</div>
          <div  class="colony-body-total_department-text">
            {{ monitor[type].colony.department }}
            <span>个</span></div>
        </div>
        <div class="colony-body-total_colony">
          <img src="../../assets/img/colony_colony.png" alt="">
          <div class="colony-body-total_colony-name">集群</div>
          <div  class="colony-body-total_colony-text">
            {{ monitor[type].colony.num }}
            <span>个</span>
          </div>
        </div>
      </div>
      <div class="colony-body-content">
        <div class="colony-body-content_concrete" v-for="(list, index) in monitor[type].colony.list" :key="index">
          <div class="colony-body-content_concrete-title">
            <img src="../../assets/img/colony_icon_colony.png" alt="">
            <span>{{ list.name }}</span>
          </div>
          <div class="colony-body-content_concrete-body">
              <span class="colony-body-content_concrete-body-span" v-for="(colony, inx) in list.resource_pool" :key="inx">
                <img src="../../assets/img/colony_icon_department.png" alt="">
                <span class="colony-body-content_concrete-body-span_department">{{ colony.name }}</span>
              </span>
              <span class="colony-body-content_concrete-body-span" v-for="(host, ind) in list.host" :key="ind" @click="hostDeatil(host)">
                <img src="../../assets/img/colony_icon_host.png" alt="">
                <span class="colony-body-content_concrete-body-span_host">{{ host.name }}</span>
              </span>
          </div>
        </div>
      </div>
      <div class="colony-body-detail">
        <div class="colony-body-detail_title">
        物理机详情
      </div>
        <div class="colony-body-detail_content">
          <div>
            <h4 class="colony-body-detail_content-title">资源</h4>
            <div class="colony-body-detail_content-body"><span class="colony-body-detail_content-body_title">CPU容量：</span><span class="colony-body-detail_content-body_text">{{ monitor[type].colony.detail.cpu_total }}</span></div>
            <div class="colony-body-detail_content-body"><span class="colony-body-detail_content-body_title">CPU使用量：</span><span class="colony-body-detail_content-body_text">{{ monitor[type].colony.detail.cpu_use }}</span></div>
            <div class="colony-body-detail_content-body"><span class="colony-body-detail_content-body_title">内存容量：</span><span class="colony-body-detail_content-body_text">{{ monitor[type].colony.detail.memory_total }}</span></div>
            <div class="colony-body-detail_content-body"><span class="colony-body-detail_content-body_title">内存使用量：</span><span class="colony-body-detail_content-body_text">{{ monitor[type].colony.detail.memory_use }}</span></div>
          </div>
          <div>
            <h4 class="colony-body-detail_content-title">常规</h4>
            <div class="colony-body-detail_content-body"><span class="colony-body-detail_content-body_titles">制造商：</span><span class="colony-body-detail_content-body_text">{{ monitor[type].colony.detail.vendor }}</span></div>
            <div class="colony-body-detail_content-body"><span class="colony-body-detail_content-body_titles">型号：</span><span class="colony-body-detail_content-body_text">{{ monitor[type].colony.detail.model }}</span></div>
            <div class="colony-body-detail_content-body"><span class="colony-body-detail_content-body_titles">CPU内核：</span><span class="colony-body-detail_content-body_text">{{ monitor[type].colony.detail.cpu_core }}</span></div>
            <div class="colony-body-detail_content-body"><span class="colony-body-detail_content-body_titles">处理器类型：</span><span class="colony-body-detail_content-body_text">{{ monitor[type].colony.detail.cpu_description }}</span></div>
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
  props: ['monitor', 'type'],
  methods: {
    hostDeatil(obj) {
      this.monitor[this.type].colony.detail = obj;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .colony {
    height: 100%;
    padding: 100px 60px 0;
    &-title {
      position: absolute;
      font-size: 36px;
      color: #fbfbf9;
      left: 44%;
      top: 2%;
    }
    &-body {
      width: 100%;
      height: 85%;
      display: flex;
      &-total {
        flex: 2.5;
        background: url("../../assets/img/colony_circle.png");
        position: relative;
        text-align: center;
        font-size: 32px;
        &_host {
          position: absolute;
          top: 25%;
          left: 20%;
          width: 200px;
          &-name {
            margin: 19px 0;
          }
          &-text {
            font-size: 62px;
            span {
              font-size: 36px;
            }
          }
        }
        &_department {
          position: absolute;
          top: 31%;
          left: 61.5%;
          width: 200px;
          &-name {
            margin: 16px 0;
          }
          &-text {
            font-size: 62px;
            span {
              font-size: 36px;
            }
          }
        }
        &_colony {
          position: absolute;
          top: 68%;
          left: 41.5%;
          width: 200px;
          &-text {
            font-size: 50px;
            span {
              font-size: 28px;
            }
          }
        }
      }
      &-content {
        flex: 4;
        margin: 0 10px;
        overflow: auto;
        &_concrete {
          width: 100%;
          height: 340px;
          background-color: rgba(12, 40, 71, 0.65);
          border-radius: 4px;
          margin-bottom: 16px;
          display: flex;
          &-title {
            width: 155px;
            text-align: center;
            vertical-align: middle;
            img {
              display: block;
              margin: 56px auto 0;
            }
            span {
              display: inline-block;
              width: 24px;
              margin: 0 auto;
              font-size: 20px;
              word-wrap: break-word
            }
          }
          &-body {
            flex: 1;
            overflow: auto;
            &-span {
              display: inline-block;
              width: 19.5%;
              padding: 10px 0;
              font-size: 26px;
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
      &-detail {
        width: 385px;
        margin: 10px 0 0 50px;
        &_title {
          background: #2086ac;
          border-radius: 11px 11px 0 0;
          font-size: 30px;
          padding: 10px 0;
          text-align: center;
        }
        &_content {
          background: #060e21;
          border: solid 1px #72d5fc;
          padding-left: 40px;
          font-size: 18px;
          &-title {
            font-size: 24px;
            font-weight: normal;
            color: #4ad3e6;
          }
          &-body {
            margin-bottom: 30px;
            display: flex;
            &_title {
              display: inline-block;
              width: 120px;
            }
            &_titles {
              display: inline-block;
              width: 110px;
            }
            &_text {
              display: inline-block;
              width: 65%;
              color: #73fcb4;
            }
          }
        }
      }
    }
  }
</style>
