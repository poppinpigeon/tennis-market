let server = require('./server'); //module 불러오기
let router = require('./router');
let requestHandler = require('./requestHandler');

const mysqldb = require('./database/connect/mysql');
mysqldb.connect();

server.start(router.route, requestHandler.handle);