var db = require('../models');

function create (req,res){
  var id = req.params.album_id;
  db.Album.findOne({_id:id}, function(err,album){
    if(err){
      console.log("finding album error"+ err);
    }
    var song = {
      name: req.body.songName,
      trackNumber: req.body.trackNumber
    };
    album.songs.push(song);
    album.save(function(err,album){
      if(err){
        console.log("saving song error" +err);
      }
      console.log("saved " + album);
      res.json(song);
    });
  });
};


module.exports = {
  create:create,
};
