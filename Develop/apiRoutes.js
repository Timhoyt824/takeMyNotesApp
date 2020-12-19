const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

module.exports = function(app) {
  //GET Requests

  app.get('/api/notes', function (req, res) {
    fs.readFile("db/db.json", "utf8", function(error,data) {
      if (error) throw error;
      res.json(JSON.parse(data));
    });
    
  });

  //POST Requests

    app.post("/api/notes", function(req, res) {
    var note = req.body;
    note.id = uuidv4();
      fs.readFile("db/db.json", "utf8", function(error,data) {
        var data = JSON.parse(data);
        data.push(note);
        fs.writeFile("db/db.json", JSON.stringify(data), function(error){
          if (error) throw error;
           console.log("Note Added!");
        })
      });
      res.json(note);

    });

  //Deletes Notes 
    app.delete("/api/notes/:id", function(req, res) {
      fs.readFile("db/db.json", "utf8", function(error, data) {
        let noteId = req.params.id;
        let noteData = JSON.parse(data);
        noteData = noteData.filter(function(note) {
            if (noteId != note.id) {
              return true;
            } else {
              return false;
            };
        }); 
        fs.writeFile("db/db.json", JSON.stringify(noteData), function(error){
          if (error) throw error;
          res.end(console.log("Note Deleted!"));
        })
      });

    });

};