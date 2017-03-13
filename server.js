var express = require('express'),
bodyParser = require('body-parser');

var app = express();
var db = require('./models');

var controllers = require('./controllers');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
    res.sendFile('views/index.html', {
        root: __dirname
    });
});

app.get('/api', controllers.api.index);

app.get('/api/albums', controllers.album.index);

app.post('/api/albums', controllers.album.create);

app.get('/api/albums/:id', controllers.album.show);

app.delete('/api/albums/:id', controllers.album.destroy);

app.put('/api/albums/:id', controllers.album.update);

//songs posting
app.post('/api/albums/:album_id/songs', controllers.song.create);





app.listen(3000, function() {
    console.log('Tunely app listening at http://localhost:3000/');
});
