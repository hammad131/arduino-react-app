const http = require('http');

const app = require('./app')
// Where server will be started
const port = process.env.PORT || 3000;


//create server
const server = http.createServer(app);


//server fucntion executes at port
server.listen(port);