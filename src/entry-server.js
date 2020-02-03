import { createApp } from './app'

export default (context) => {
  // 因为可能是异步路由钩子函数或组件，所以需要返回 Promise
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)

    // 设置服务端 router 的位置
    router.push(context.url)

    // 监测路由 ready 事件
    router.onReady(() => {
      // 返回匹配的组件数组（数组的定义/构造类，而非数组实例）
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态会被自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state

        // resolve 应用程序实例，以便可以渲染
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}