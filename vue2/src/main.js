import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;

Vue.use(VueRouter)
Vue.use(VueResource)

const First = { template: '<div><h1>我是第一个子页面</h1></div>' }
import secondComp from './component/secondComp.vue'

//创建一个路由器实例
//配置路由规则
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path:'/first',
            component: First
        },{
            path: '/second',
            component: secondComp
        }
    ]
})

const app = new Vue({
  router : router,
  render : h => h(App)
}).$mount('#app')
