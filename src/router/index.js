import Vue from 'vue'
import Router from 'vue-router'
import hive_query from '@/module/hive_query/index'
import login from '@/module/login/index'
import all_secret_tables from '@/module/all_secret_tables/index'
import my_hive_tables from '@/module/my_hive_tables/index'

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
      path: '/all_secret_tables',
      name: 'all_secret_tables',
      component: all_secret_tables
    },
	{
      path: '/my_hive_tables',
      name: 'my_hive_tables',
      component: my_hive_tables
    },
  ]
})
