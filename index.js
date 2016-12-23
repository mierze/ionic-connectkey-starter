//simple express server
var express = require('express'),
    app = express();

app.use(express.static('www'));

app.listen(4444, function() {
    console.log('4444');
});
