import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index'
import { createStore } from './store/index'

Vue.config.productionTip = false

export function createApp (context) {
  // 利用工厂函数创建 router 实例
  const router = createRouter()
  // 利用共产函数创建 store 实例
  const store = createStore()

  // 创建 vue 实例
  const app = new Vue({
    router,
    store,
    context, // 传递参数
    render: h => h(App)
  })

  return { app, router, store }
}
