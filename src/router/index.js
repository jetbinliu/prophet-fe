import Vue from 'vue'
import Router from 'vue-router'
import hive_query from '@/module/hive_query/index'
import Home from '@/module/home/index'
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
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/role',
      name: 'Role',
      component: Role
    }
  ]
})
