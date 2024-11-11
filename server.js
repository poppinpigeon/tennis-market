let http = require('http');
let url = require('url');

function start(route, handle){
    function onRequest(request, response){
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;
        
        route(pathname, handle, response, queryData.productId);
    }

    http.createServer(onRequest).listen(8888);
    //localhost:8888
}

//밖에서 start함수를 사용할 수 있게 함(js는 파일 안에서만 함수를 사용하도록 되어있음)
exports.start = start;
