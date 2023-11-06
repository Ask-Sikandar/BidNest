const http = require('http');
let server = http.createServer(function(request,response){
    let body = 'hello world';
    response.writeHead(200, {
        'Content-length':body.length,
        'Content-type':'text/plain'
    });
    response.end(body);

});
const PORT = process.env.PORT || 8080
server.listen(PORT);