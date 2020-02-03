import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 类似 router 的实例化
// 利用工厂函数进行创建 store 实例
export function createStore () {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      // 初始化
      init (state, count) {
        state.count = count
      },
      add (state) {
        state.count += 1
      }
    },
    actions: {
      // 模拟一个 ajax 请求，也可以使用 express mock 数据进行获取
      initCount ({ commit }) {
        return new Promise((resolve) => {
          setTimeout(() => {
            commit('init', Math.ceil(Math.random() * 100))
            resolve()
          }, 3000)
        })
      },
      add ({ commit }) {
        commit('add')
      }
    }
  })
}
 
