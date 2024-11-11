const mysqldb = require('./database/connect/mysql');
const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

function main(response){
    console.log('main');

    mysqldb.query("SELECT * FROM product", function(err, rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(main_view);
    response.end();
}

function favIcon(response){
    console.log('favicon');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('favicon');
    response.end();
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function order(response, productId){
    response.writeHead(200, {'Content-Type': 'text/html'});
    mysqldb.query("INSERT INTO orderlist VALUES ('"+productId+"', '"+new Date().toLocaleDateString()+"');", function(err, rows){
        console.log(rows);
    })

    response.write('order page');
    response.end();
}

function orderlist(response){
    console.log('orderlist');
    response.writeHead(200, {'Content-Type': 'text/html'});
    mysqldb.query("SELECT * FROM orderlist", function(err, rows){
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                        + "<td>" + element.productId + "</td>"
                        + "<td>" + element.date + "</td>"
                        + "</tr>");
        });
        
        response.write("</table>");
        response.end();
    })
}

let handle = {}; //key value pair
handle['/'] = main;
handle['/favicon.ico'] = favIcon;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/*image directory*/
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;


exports.handle = handle;
