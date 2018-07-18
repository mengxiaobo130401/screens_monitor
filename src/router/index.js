import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import overview from '@/components/overview'
import department_resource from '@/components/module/department_resource'
import resource from '@/components/module/resource'
import database from '@/components/module/database'
import department from '@/components/module/department'
import use_ratio from '@/components/module/use_ratio'
import project from '@/components/module/project'
import task from '@/components/module/task'
import colony from '@/components/module/colony'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: overview
    },
    {
      path: 'module',
      component: home,
      children: [
        { path: '/department_resource', component: department_resource },
        { path: '/resource', component: resource },
        { path: '/database', component: database },
        { path: '/department', component: department },
        { path: '/use_ratio', component: use_ratio },
        { path: '/project', component: project },
        { path: '/task', component: task },
        { path: '/colony', component: colony },
      ]
    }
  ]
})
