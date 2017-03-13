var db = require('../models');
// GET /api/albums
function index(req, res) {
  db.Album.find(function(err,albums){
    if(err){
      console.log(err);
    }
    res.json(albums);
  });
};
// GET /api/albums/:albumId
function show(req,res) {
  var id = req.params.id;
  db.Album.findById({_id:id}, function(err,foundAlbum){
    if(err){
      console.log(err);
    }
    res.json(foundAlbum);
  });
};

// POST /api/albums
function create(req, res) {
  var newAlbum = {
    artistName:req.body.artistName,
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    genres: req.body.genres
  }
  db.Album.create(newAlbum, function(err, newAlbum){
    if(err){
      console.log(err);
    }
    console.log("new album made");
    res.json(newAlbum);
  });
}

function update(req, res) {
  var id = req.params.id;
  db.Album.findOne({_id:id}, function(err,found){
    found.artistName =req.body.artistName,
    found.name = req.body.name,
    found.releaseDate = req.body.releaseDate,
    found.genres = req.body.genres
    found.save(function(err,dbFound){
      if(err){
        console.log(err);
      }
      console.log('updated' + dbFound);
      res.json(dbFound);
    });
  });
};

// DELETE /api/albums/:albumId
function destroy(req, res) {
  var id = req.params.id;
  db.Album.findOneAndRemove({_id:id}, function(err,deleted){
    if(err){
      console.log(err);
    }
    res.json(deleted);
  });
};

// PUT or PATCH /api/albums/:albumId

module.exports = {
  index:index,
  create:create,
  show:show,
  destroy:destroy,
  update:update,
};
