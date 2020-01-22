import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 类似 router 的实例化
// 利用工厂函数进行创建 store 实例
export function createStore () {
  return new Vuex.Store({
    state: {
      count: 10
    },
    mutations: {
      add (state) {
        state.count += 1;
      }
    },
    actions: {
      add ({ commit }) {
        commit('add');
      }
    }
  })
}
 
