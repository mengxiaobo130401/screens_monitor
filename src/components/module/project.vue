<template>
  <div class="project">
    <div class="project-title">项目支持</div>
    <div class="project-body">
      <div class="project-body-intro">
        <div class="project-body-intro_bg">
          <span class="project-intro">
            <span class="project-intro-title">
              <img src="../../assets/img/project_star.png">
              亮点项目
            </span>
            <span class="project-intro-body">
              <span class="project-intro-body_spot">{{monitor[type].link.starProNum}}</span>
              <span>个</span>
            </span>
          </span>
          <span class="project-intro">
            <span class="project-intro-title">
              已上云项目
            </span>
            <span class="project-intro-body">
              <span class="project-intro-body_num">{{monitor[type].link.upCloud}}</span>
              <span>个</span>
            </span>
          </span>
          <span class="project-intro">
            <span class="project-intro-title">
              <img src="../../assets/img/project_circle.png">
              普通项目
            </span>
            <span class="project-intro-body">
              <span class="project-intro-body_pro">{{monitor[type].link.proNum}}</span>
              <span>个</span>
            </span>
          </span>
          <span class="project-intro">
            <span class="project-intro-title">
              未上云项目
            </span>
            <span class="project-intro-body">
              <span class="project-intro-body_num">{{monitor[type].link.notCloud}}</span>
              <span>个</span>
            </span>
          </span>
        </div>
      </div>
      <div class="project-body-link">
        <span v-for="(list, index) in monitor[type].link.list" :key="index" class="project-body-link-piece">
          <span v-if="list.type == 'star'" class="project-body-link-piece_star">
            <img src="../../assets/img/project_icon_star.png">
            <a :href="list.href" target="_blank">{{ list.name }} <span v-if="list.cloud">({{list.cloud}})</span></a>
          </span>
          <span class="project-body-link-piece_pro" v-else>
            <img src="../../assets/img/project_icon_circle.png">
             <a :href="list.href" target="_blank">{{ list.name }} <span v-if="list.cloud">({{list.cloud}})</span></a>
          </span>
        </span>
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
  .project {
    height: 100%;
    padding: 100px 60px 0;
    &-title {
     position: absolute;
     font-size: 36px;
     color: #fbfbf9;
     left: 45.5%;
     top: 2%;
   }
    &-body {
      width: 100%;
      height: 85%;
      display: flex;
      &-intro {
        width: 674px;
        height: 590px;
        margin: 50px 0 0 40px;
        background: #0f3355;
        &_bg {
          width: 638px;
          height: 554px;
          background: rgba(36, 85, 133, 0.42);
          margin: 18px;
          border-radius: 8px;
          .project-intro {
            display: inline-block;
            width: 49%;
            height: 50%;
            font-size: 33px;
            text-align: center;
            vertical-align: middle;
            &-title {
              margin-top: 30%;
              display: block;
              font-size: 42px;
              img {
                vertical-align: sub;
              }
            }
            &-body {
              &_num {
                font-size: 68px;
                color: #52f7f8;
              }
              &_spot {
                font-size: 68px;
                color: #f8ff2e;
              }
              &_pro {
                font-size: 68px;
                color: #39ce90;
              }
            }
          }
        }
      }
      &-link {
        width: 100%;
        height: 590px;
        margin: 50px 40px 0 ;
        &-piece {
          overflow: hidden;
          display: inline-block;
          width: 30%;
          height: 127px;
          font-size: 42px;
          margin: 1.5%;
          line-height: 127px;
          background: -webkit-linear-gradient(rgba(19, 45, 78, 0.6), rgba(19, 45, 78, 0.01), rgba(19, 45, 78, 0)); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(rgba(19, 45, 78, 0.6), rgba(19, 45, 78, 0.01), rgba(19, 45, 78, 0)); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(rgba(19, 45, 78, 0.6), rgba(19, 45, 78, 0.01), rgba(19, 45, 78, 0)); /* Firefox 3.6 - 15 */
          background: linear-gradient(rgba(19, 45, 78, 0.6), rgba(19, 45, 78, 0.01), rgba(19, 45, 78, 0)); /* 标准的语法 */
          img {
            margin-left: 62px;
          }
          &_star {
            color: #ffff00;
          }
          &_pro {
            color: #55fdfe;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
        }
      }
    }
  }
</style>
