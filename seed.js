var db = require('./models');

var albumsList = [{
        artistName: 'Nine Inch Nails',
        name: 'The Downward Spiral',
        releaseDate: '1994, March 8',
        genres: ['industrial', 'industrial metal'],
        songs: []
    },
    {
        artistName: 'Metallica',
        name: 'Metallica',
        releaseDate: '1991, August 12',
        genres: ['heavy metal'],
        songs: []
    },
    {
        artistName: 'The Prodigy',
        name: 'Music for the Jilted Generation',
        releaseDate: '1994, July 4',
        genres: ['electronica', 'breakbeat hardcore', 'rave', 'jungle'],
        songs: []
    },
    {
        artistName: 'Johnny Cash',
        name: 'Unchained',
        releaseDate: '1996, November 5',
        genres: ['country', 'rock'],
        songs: []
    }
]

var sampleSongs = [

    {
        name: 'Swamped',
        trackNumber: 1
    },
    {
        name: "Heaven's a Lie",
        trackNumber: 2
    },
    {
        name: 'Daylight Dancer',
        trackNumber: 3
    },
    {
        name: 'Humane',
        trackNumber: 4
    },
    {
        name: 'Self Deception',
        trackNumber: 5
    },
    {
        name: 'Aeon',
        trackNumber: 6
    },
    {
        name: 'Tight Rope',
        trackNumber: 7
    }
];


albumsList.forEach(function(album) {
    album.songs = sampleSongs;
});


db.Album.remove({}, function(err, albums) {
    db.Album.create(albumsList, function(err, albums) {
        if (err) {
            console.log(err);
        }
        console.log('success created albums' + albums);

        process.exit();
    });
});
