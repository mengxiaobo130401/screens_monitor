<template>
  <div class="home">
    <div class="home-nav">
      <ul>
        <li class="home-nav-bg" v-for="nav in navData" :class="{'home-nav-bg-active': $route.path == nav.path}">
          <router-link :to="{ path: nav.path}">
            <img :src="nav.icon">
            {{ nav.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="home-content">
      <div class="home-content-body">
          <router-view v-transition :type="type" :monitor="monitor"/>
      </div>
      <div class="home-content-return" @click="return_overview">
        <img src="../assets/img/return.png">
        <span>返回总览</span>
      </div>
    </div>

  </div>
</template>

<script>
  import resource from '../assets/img/resource.png';
  import project from '../assets/img/project.png';
  import department from '../assets/img/department.png';
  import task from '../assets/img/task.png';
  import colony from '../assets/img/colony.png';
  import department_resource from '../assets/img/department_resource.png';
  import database from '../assets/img/database.png';
  import use_ratio from '../assets/img/ins.png';
export default {
  data () {
    return {
      navData: [
        {
          name: '资源概览',
          icon: resource,
          path: '/resource'
        },
        {
          name: '项目支持',
          icon: project,
          path: '/project'
        },
        {
          name: '各部门资源占比',
          icon: department,
          path: '/department'
        },
        {
          name: '任务与事件',
          icon: task,
          path: '/task'
        },
        {
          name: '集群及部门划分',
          icon: colony,
          path: '/colony'
        },
        {
          name: '部门资源使用情况',
          icon: department_resource,
          path: '/department_resource'
        },
        {
          name: '数据库资源用量',
          icon: database,
          path: '/database'
        },
        {
          name: '虚拟机利用率',
          icon: use_ratio,
          path: '/use_ratio'
        }
      ],
      vuegConfig: {
        forwardAnim: 'touchPoint',
        duration: '.3',
        disable:false
      }
    }
  },
  props: ['monitor', 'type'],
  methods: {
    return_overview() {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    width: 100%;
    display: flex;
    &-nav {
      width: 181px;
      height: 100%;
      text-align: center;
      &-bg {
        background: url('../assets/img/switch.png') no-repeat;
        width: inherit;
        height: 107px;
        margin-bottom: 10px;
        a {
          display: block;
          height: 80%;
          padding-top: 18px;
          color: inherit;
          padding-right: 20%;
          text-decoration:none;
          img {
            display: block;
            margin: 0 auto;
            margin-bottom: 10px;
          }
        }
      }
      &-bg-active {
        background: url('../assets/img/switch_active.png') no-repeat;
      }
    }
    &-content {
      flex: 1;
      width: 100%;
      height: 100%;
      position: relative;
      &-body {
        width: 3024px;
        height: 842px;
        margin-left: 238px;
        background: url('../assets/img/body_border.png') no-repeat;
      }
      &-return {
        position: absolute;
        color: #6ac5d9;
        bottom: -2%;
        right: 3%;
        font-size: 40px;
        cursor: pointer;
        img  {
          display: inline-block;
          margin-right: 28px;
        }
      }
    }
  }
</style>
