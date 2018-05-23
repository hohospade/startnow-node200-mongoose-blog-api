const server = require('./app');
const port = process.env.PORT || 8080;

server.listen(8080, function() {
  console.log('The EXPRESS server is listening on port 8080.');
});