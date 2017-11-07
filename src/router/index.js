import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/module/account/index'
import Home from '@/module/home/index'
import Role from '@/module/role/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
        path: '/role',
        name: 'Role',
        component: Role
      }
  ]
})
