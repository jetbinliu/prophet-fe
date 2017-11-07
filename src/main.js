// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
//import message from 'iview/src/components/message'

Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


window.toast = function (msg, type = 'warning') {
  console.log(message);
  var handler = message.warning;
  if (type == 'error') {
      handler = message.error;
  } else if (type == 'success') {
      handler = message.success;
  }
  handler(msg);
}
