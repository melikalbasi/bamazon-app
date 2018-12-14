var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "top_songsDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId + "\n")
  askUser();
});

function askUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Find songs by artist", "Find all artists who appear more than once", "Find data within a specific range", "Search for a specific song", "Find artists with a top song and top album in the same year"]
      }
    ]).then(function (response) {
      var choice = response.action;

      switch (choice) {
        case "Find songs by artist":
          findArtist();
          break;
        case "Find all artists who appear more than once":
          multipleArtists();
          break;
        case "Find data within a specific range":
          rangeData();
          break;
        case "Search for a specific song":
          searchSong();
          break;
        case "Find artists with a top song and top album in the same year":
          topSongAlbum();
          break;
      }
    });
}

// find songs by artist
function findArtist() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "artist",
        message: "What artist would you like to search?"
      }
    ]).then(function (response) {
      var artistSearch = response.artist;
      connection.query(
        "SELECT * FROM top5000 WHERE ?",
        {
          artist: artistSearch
        },
        function (err, res) {
          if (err) throw err;

          for (var i = 0; i < res.length; i++) {
            var artistSong = res[i].song;
            console.log("Song: " + artistSong);
          }
          askUser();
        });
    });
};


// find all artists who appear more than once
function multipleArtists() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*)>1";
  connection.query(query,
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].artist);
      }
      askUser();
    })

};


// find data within a specific range
function rangeData() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "year1",
        message: "What year would you like your search to begin?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true
          } else {
            return false
          }
        }
      },
      {
        type: "input",
        name: "year2",
        message: "What year would you like your search to end?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true
          } else {
            return false
          }
        }
      }
    ]).then(function (response) {
      var year1 = response.year1;
      var year2 = response.year2;
      connection.query(
        "SELECT * FROM top5000 WHERE year BETWEEN " + year1 + " AND " + year2,
        function (err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
            console.log(
              "Position: " +
                res[i].position +
                " || Song: " +
                res[i].song +
                " || Artist: " +
                res[i].artist +
                " || Year: " +
                res[i].year
                );
        }
        askUser();
      });

    })
};




// search for a specific song
function searchSong() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "song",
        message: "What song would you like to look for?"
      }
    ]).then(function (answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        if (err) throw err;
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        askUser();
      });
    });
}



// find artists with a top song and top album in the same year
function topSongAlbum() {
  inquirer.prompt([
      {
          type: "input",
          message: "What artist would you like to search for?",
          name: "artist"
      }
  ]).then(function(search) {
      var query = "SELECT top5000.position, top5000.artistName, top5000.songName, top5000Albums.albumName, top5000.year FROM top5000 INNER JOIN top5000Albums ON top5000.year = top5000Albums.year AND top5000.artistName = top5000Albums.artistName WHERE (top5000.artistName = ? AND top5000Albums.artistName = ?)";
      
      connection.query(query, [search.artist, search.artist], function(err, res) {
          if(err) throw err;
          formatData(res);
          searchPrompt();
      })
  })
}

function formatData(dataArray) {
  dataArray.forEach(function (tableObj) {
      console.log("\nPosition: " + tableObj.position + " | Song: " + tableObj.songName + " | Artist: " + tableObj.artistName + " | Year: " + tableObj.year + "\n");
  })
}

