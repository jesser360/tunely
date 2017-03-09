var express = require('express'),
bodyParser = require('body-parser');

var app = express();
var db = require('./models');

var controllers = require('./controllers');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))

app.get('/api', controllers.api.index);

app.get('/api/albums', controllers.album.index);

app.post('/api/albums', controllers.album.create);

app.get('/api/albums/:id', controllers.album.show);







app.listen(3000, function() {
    console.log('Book app listening at http://localhost:3000/');
});
