const http = require('http');

const server = http.createServer((req, res) => {
  const {header, url, method} = req;
  console.log(method);
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
