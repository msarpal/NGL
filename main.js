var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/parse', require('./src/Parser/Htmlparser'));

app.listen(port);

var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
process.title='NLG';
var server = app.listen(port, function () {
    console.log('Server is running on :  ' + port);
});
