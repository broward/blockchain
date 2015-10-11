var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var pg = require('pg');

app.get('/', function(req, res) {
    //res.write('block chain example on ' + process.env.DATABASE_URL);

    var client = new pg.Client(process.env.DATABASE_URL);
    client.connect();
    // res.write('getting postgres schema...');

    var query = client.query("SELECT table_name FROM information_schema.tables where table_schema = 'public';");
    query.on("row", function(row, result) {
        result.addRow(row);
    });
    query.on("end", function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows, null, 3));
        client.end();
    });

});

var server = app.listen(port, function() {
    var host = server.address().address;

    console.log('Example app listening at http://%s:%s', host, port);
});
