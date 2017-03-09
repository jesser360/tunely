var db = require('./models');

var albumsList = [

];
//remove all of them albums
db.Album.remove({}, function(err, albums){
  db.Album.create(albumsList, funtion(err, dbAlbums){
    if(err){
      console.log("create " + err);
    }
    console.log("created "+ albumsList.length+ " albums: " + dbAlbums);
    process.exit();
  });
});
