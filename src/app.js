import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index'

Vue.config.productionTip = false

export function createApp (context) {
  // 利用工厂函数创建 router 实例
  const router = createRouter()

  // 创建 vue 实例
  const app = new Vue({
    router,
    context, // 传递参数
    render: h => h(App)
  })

  return { app, router }
}
