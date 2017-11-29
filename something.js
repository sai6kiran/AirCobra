var pg = require('pg');
var constring = 'postgres://YourUserName:YourPassword@localhost:5432/YourDatabase';

var client = new pg.Client(conString);
client.connect();


var x = 1000;

while(x > 0) {
    client.query("INSERT INTO table(a,b,c,d) value('a','b','c','d')");
    client.query("INSERT INTO table(a,b,c,d) value($1, $2)", ['a', 'b']);
    x = x - 1;
}

var query = client.query("SELECT * FROM table");

query.on('row',function(row) {
    console.log(row);
});

query.on('end', function() {
    client.end();
});


client.query({
    name: 'insert table',
    text: 'INSERT INTO table(a, b ,c) values($1, $2, $3)',
    values: ['a','b','c']
});
