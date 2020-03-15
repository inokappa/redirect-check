const http = require('http');
const server = http.createServer();
let msg;
server.on('request', function(req, res) {
  switch (req.url) {
    case '/yahoo/':
      res.writeHead(301, {
        'Location': 'https://www.yahoo.co.jp/'
      });
      break;
    case '/google/':
      res.writeHead(301, {
        'Location': 'https://www.google.com/'
      });
      break;
    case '/ore/':
      res.writeHead(301, {
        'Location': 'https://oreno.tools/'
      });
      break;
    default:
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Hello world.');
      break;
  }
  res.end();
})
console.log('http server starting...');
server.listen(19190, '0.0.0.0');
console.log('http server started.');
