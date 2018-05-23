const server = require('./app');
const PORT = process.env.PORT | |8080;

server.listen(PORT, function() {
  console.log('The EXPRESS server is listening on port 8080.');
});