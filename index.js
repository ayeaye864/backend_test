const Datastore = require ("nedb");
const express = require("express");
const app = express();
app.listen(3000, () => console.log("listening at port: 3000"));
app.use(express.static("public"));
app.use(express.json({limit:"20mb"}));

const db = new Datastore("database.db");
db.loadDatabase();
db.insert({name: "Ana", subject: "biology", longitude: "53.45", latitude:"-2.2"});
db.insert({name: "Jerry", subject: "english", longitude: "53.45", latitude:"-2.33"});
db.insert({name: "Emily", subject: "mathematics", longitude: "53.40", latitude:"-2.35"});
db.insert({name: "Rosco", subject: "engineering", longitude: "53.52", latitude:"-2.32"});
db.insert({name: "Bob", subject: "fashion design", longitude: "53.50", latitude:"-2.08"});

// POST method route
app.post('/api', (request, response) => {
    const myArray = [];
    myArray.push(request.body.lat, request.body.lon);
    console.log(myArray);

    const data = request.body;
    myArray.push(data);
    console.log(data);

    console.log(request.body);//logs to terminal, put in html file if want to see in browser
    response.json({
        status: "success",
        latitude:request.body.lat,
        longitude:request.body.lon,
    });

    
  });//takes 2 argiuments, api enpdoint name+vaiables to receive and send request 