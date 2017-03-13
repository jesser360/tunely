/* CLIENT-SIDE JS

/* end of hard-coded data */

$(document).ready(function() {
  console.log('app.js loaded!');

  // make a get request for all albums
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: function handleSuccess(sampleAlbums){
      sampleAlbums.forEach(function(sampleAlbum) {
        renderAlbum(sampleAlbum);
        console.log("get success");
      })
    },
    error: function handleError(err){
      console.log('There has been an error: ', err);
    }
  });


  $('#album-form form').on('submit',function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    console.log(formData + "posting");
     $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: formData,
      success: function postSuccess(data){
        $('#albums').append(data);
        console.log("post succ" + data);
        renderAlbum(data);
      },
      error:function postError(err){
        console.log(err);
      }
   });
  });
  $('#albums').on('click', '.add-song', handleAddSong);
  $('#albums').on('click', '.delete-album', handleDeleteAlbum);
  $('#albums').on('click', '.update-album', handleUpdateAlbum);
  $('#albums').on('click', '.save-album', handleSaveAlbum);
  $('#albums').on('click', '.update-songs', handleUpdateSong);


  $('#deleteAlbum').on('click', function deleteButton(e){
    var id = $('#deleteModal').data('album-id');
    console.log("id is " + id);
    $.ajax({
      method: "DELETE",
      url: '/api/albums/' + id,
      success: handleDeleteSuccess,
      error: handleDeleteError,
    });
  function handleDeleteSuccess(e){
    $('#deleteModal').modal('hide');
    $(this).closest('.album').empty();
    $.get('/api/albums/'+id, function(data){
      //remove current instance of album
      $('[data-album-id=' + id + ']').fadeOut();
         //re-render album
      renderAlbum(data);
        });
        console.log("album deleted");
  }
  function handleDeleteError(e){
    console.log(e + 'error');
  }
  });
  $('#saveSong').on('click', function handleNewSongSubmit(e){
    e.preventDefault();
    var id = $('#songModal').data('album-id');
    var path = '/api/albums/'+ id +'/songs';
    var $modal = $('#songModal');
    var $songName = $modal.find('#songName');
    var $trackNumber = $modal.find('#trackNumber');
    var newSong = {
      songName: $songName.val(),
      trackNumber: $trackNumber.val()
    }
    $.post(path,newSong, function(data){
        console.log("saved alll " + data);
        $songName.val('');
        $trackNumber.val('');
        $modal.modal('hide');

    $.get('/api/albums/'+id, function(data){
      //remove current instance of album
      $('[data-album-id=' + id + ']').remove();
         //re-render album
      renderAlbum(data);
        });
       })
    });
//close document ready
  });


function handleAddSong(e){
  var id = $(this).closest('.album').data('album-id');
  console.log(id);
  $('#songModal').data('album-id', id);
  $('#songModal').modal();
};

function handleAddAlbum(e){
    console.log('add-song clicked!');
    var currentAlbumId = $(this).closest('.album');
    console.log('id',currentAlbumId);
};



function handleDeleteAlbum(e){
  var id = $(this).closest('.album').data('album-id')
  console.log("clicked delete for"+id);
  $('#deleteModal').data('album-id',id);
  $('#deleteModal').modal();
  console.log("modal pop up");
  };

function handleUpdateSong(e){
  $('#editSongsModal').modal();
}

function handleUpdateAlbum(e){
  var $albumRow = $(this).closest('.album');
  var id = $albumRow.data('album-id');
  console.log('editing album', id);

  //show save changes button
  $albumRow.find('.save-album').toggleClass('hidden');
  //hide the update button
  $albumRow.find('.update-album').toggleClass('hidden');

  var albumName = $albumRow.find('span.album-name').text();
  $albumRow.find('span.album-name').html('<input class = "edit-album-name" value ="' + albumName + '"></input>');

  var artistName = $albumRow.find('span.artist-name').text();
  $albumRow.find('span.artist-name').html('<input class = "edit-artist-name" value="' + artistName + '"></input>');

  var releaseDate = $albumRow.find('span.album-releaseDate').text();
  $albumRow.find('span.album-releaseDate').html('<input class = "edit-album-releaseDate" value="' + releaseDate + '"></input>');

  //var songs = $albumRow.find('span.song-names').text();
  //$albumRow.find('span.song-names').html('<input class = "form-control edit-song-names" value="' + songs + '"></input>');

  console.log("updating album with info"+albumName+artistName+releaseDate);
};
function handleSaveAlbum(e){
  console.log("clicked save btn");
  var id = $(this).parents('.album').data('album-id');
  console.log("id: " + id);
  var $albumRow = $('[data-album-id =' + id + ']');
  var name = $albumRow.find('.edit-album-name').val();
  var artistName = $albumRow.find('.edit-artist-name').val();
  var releaseDate = $albumRow.find('.edit-album-releaseDate').val();
  //var songs = $albumRow.find('.edit-song-names').val();
  console.log("this is vars--" + name + artistName+releaseDate);
  console.log("this is album row- " + $albumRow);
  var albumData = {
    name: name,
    artistName: artistName,
    releaseDate: releaseDate
  //  songs: songs
  };
  console.log('PUTing data for album ' + id + ' with this data ' + albumData);

$.ajax({
  method:"PUT",
  url: '/api/albums/'+ id,
  data: albumData,
  success: handleUpdateSuccess,
  error: handleUpdateError,
});

function handleUpdateSuccess(data){
  console.log("updated " + data);
    var albumId = data._id;
    //remove album from page
    $('[data-album-id =' + albumId + ']').remove();
    //create album with updates
    renderAlbum(data);
    //prepends album to top and scrolls to it
    $('[data-album-id='+albumId+']')[0].scrollIntoView();
}
function handleUpdateError(err){
  console.log("error" + e);
}
};

function renderSong(song) {
  //create an html element that displays song info
  return `<span>${song.trackNumber} - ${song.name}</span>`
};
// this function takes in a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album', album);
  //make some sort of readable string out of your songs array
  var songString = album.songs.map(renderSong).join(" ");
  var htmlToAppend = (`
    <div class='row album' data-album-id = ${album._id}>
    <div class="col-md-3 col-xs-12 thumbnail album-art">
    <img src="../images/800x800.png" alt="album image">
    </div>

    <div class="col-md-9 col-xs-12">
    <ul class="list-group">
    <li class="list-group-item">
    <h4 class='inline-header'>Album Name:</h4>
    <span class='album-name'>${album.name}</span>
    </li>

    <li class="list-group-item">
    <h4 class='inline-header'>Artist Name:</h4>
    <span class='artist-name'>${album.artistName}</span>
    </li>

    <li class="list-group-item">
    <h4 class='inline-header'>Released date:</h4>
    <span class='album-releaseDate'>${album.releaseDate}</span>
    </li>

    <li class="list-group-item">
    <h4 class='inline-header'>Song Names:</h4>
    <span class='song-names'>${songString}</span>
    </li>
    </ul>
    </div>
    <div class='panel-footer'>
    <div class='panel-footer'>
    <button id="add" class="btn btn-primary add-song" type="add">
      <span class="label">Add</span>
      <span class="glyphicon glyphicon-plus"></span>
    </button>
    <button id="update" class="btn btn-info update-album" type="update">
      <span class="label">Update Album</span>
      <span class="glyphicon glyphicon-pencil"></span>
    </button>
    <button id="update" class="btn btn-info update-songs" type="update">
      <span class="label">Edit Songs</span>
      <span class="glyphicon glyphicon-pencil"></span>
    </button>
    <button id="save" class="btn btn-info save-album hidden" type="save">
      <span class="label">Save</span>
      <span class="glyphicon glyphicon-ok"></span>
    </button>
    <button id="delete" class="btn btn-danger delete-album" type="delete">
    <span class="label">Delete</span>
    <span class="glyphicon glyphicon-trash"></span>
    </button>
    </div>
    </div>
    </div>

    `);

    $('#albums').prepend(htmlToAppend);
  };
