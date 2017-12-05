import Vue from 'vue'
import Router from 'vue-router'
import hive_query from '@/module/hive_query/index'
import login from '@/module/login/index'
import Role from '@/module/role/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: hive_query
    },
    {
      path: '/hive_query',
      name: 'hive_query',
      component: hive_query
    },
    {
      path: '/role',
      name: 'Role',
      component: Role
    }
  ]
})
