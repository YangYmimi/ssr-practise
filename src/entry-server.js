import { createApp } from './app'

export default (context) => {
  // 因为可能是异步路由钩子函数或组件，所以需要返回 Promise
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context)

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

      // resolve 应用程序实例，以便可以渲染
      resolve(app)
    }, reject)
  })
}