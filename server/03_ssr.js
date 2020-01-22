const express = require('express');
const path = require('path');
const fs = require('fs');

// 定义文件路径处理函数
const resolve = (dir) => {
  // 绝对地址 server 文件夹和 path 进行拼接
  // 相对于 server
  return path.resolve(__dirname, dir)
}

// 1. 创建服务器实例
const server = express();

// 2. 静态资源处理
// refs: https://expressjs.com/en/starter/static-files.html
// 主要为了处理 dist/client/ 下打包的静态资源文件
// Sends the specified directory index file. Set to false to disable directory indexing.
server.use(express.static(resolve('../dist/client'), { index: false }));

// 3. 获取createBundleRenderer实例
const { createBundleRenderer } = require('vue-server-renderer');

// 4. 导入服务端 bundle
const serverBundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'));

// 5. 创建渲染器
const template = fs.readFileSync(resolve('../public/index.html'), 'utf-8');
const clientManifest = require(resolve('../dist/client/vue-ssr-client-manifest.json')); // 导入客户端 manifest
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})

// 集成服务器
server.get('*', (req, res) => {
  // 构造上下文
  const context = { url: req.url }

  // 用渲染器渲染 Vue 实例
  renderer.renderToString(context).then((html) => {
    // 将渲染的html发送给express服务器即可
    res.send(html);
  }).catch((error) => {
    res.status(500).send(`Server Error With ${JSON.stringify(error)}`)
  });
});

server.listen(9090, () => {
  console.log('Server running.');
});





