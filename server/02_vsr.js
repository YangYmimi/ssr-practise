// 创建 Vue 实例
const Vue = require('vue');

// 创建渲染器实例
const renderer = require('vue-server-renderer').createRenderer();

// 创建服务器实例
const express = require('express');
const server = express();

// 集成服务器
server.get('/', (req, res) => {
  const app = new Vue({
    data: {
      reqUrl: req.url
    },
    template: '<div>Hello, Vue Server Render, 当前访问 {{ reqUrl }}</div>'
  });

  // 用渲染器渲染 Vue 实例
  renderer.renderToString(app).then((html) => {
    // 将渲染的html发送给express服务器即可
    res.send(html);
  }).catch((error) => {
    console.log(error);
  });
});

server.listen(9090, () => {
  console.log('Server running.');
});





