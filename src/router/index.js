import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 需要给每个请求一个新的 router 实例, 所以这边导出一个工厂函数
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      // 使用异步组件方式
      { name: 'PAGE_HOME', path: '/', component: () => import('../views/home.vue') },
      { name: 'PAGE_ABOUT', path: '/about', component: () => import('../views/about.vue') }
    ]
  })
}