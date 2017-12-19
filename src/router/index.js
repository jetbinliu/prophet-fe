import Vue from 'vue'
import Router from 'vue-router'
import personal_config from '@/module/personal_config/index'
import hive_query from '@/module/hive_query/index'
import login from '@/module/login/index'
import all_secret_tables from '@/module/all_secret_tables/index'
import config_secret_tables from '@/module/config_secret_tables/index'
import user_secret_privs from '@/module/user_secret_privs/index'
import user_config from '@/module/user_config/index'

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
      path: '/config_secret_tables',
      name: 'config_secret_tables',
      component: config_secret_tables
    },
	{
      path: '/user_secret_privs',
      name: 'user_secret_privs',
      component: user_secret_privs
    },
	{
      path: '/user_config',
      name: 'user_config',
      component: user_config
    },
	{
      path: '/personal_config',
      name: 'personal_config',
      component: personal_config
    },
  ]
})
