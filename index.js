// подключаем нужные пакеты
// http из node, и httpProxy, который мы только что скачали
var http = require('http');
var httpProxy = require('http-proxy');
// создаем 2 прокси объекта для каждого бекенда (как вариант)
var proxyBemServer = httpProxy.createProxyServer({target: 'http://localhost:5001'});
var proxyBackend = httpProxy.createProxyServer({target: 'http://https://md9.ru'});

// создаем наш веб сервер
var webServer = http.createServer(function(req, res) {
  // запросы к апи отправляем на бекенд
  if (req.url.indexOf('/api/') === 0) {
    proxyBackend.web(req, res);
  // иначе — к бем серверу
  } else {
    proxyBemServer.web(req, res);
  }
});
// и ждем соединений на порту 8080
webServer.listen(5000);