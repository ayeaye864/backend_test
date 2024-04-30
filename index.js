const Datastore = require ("nedb");
const express = require("express");
const app = express();
app.listen(3000, () => console.log("listening at port: 3000"));
app.use(express.static("public"));
app.use(express.json({limit:"20mb"})); //prevents overloading server

const db = new Datastore("database.db"); //new database
db.loadDatabase();
//insert data into the database
db.insert({name: "Ana", subject: "Biology", longitude: "53.45", latitude:"-2.2"});
db.insert({name: "Jerry", subject: "English", longitude: "53.45", latitude:"-2.33"});
db.insert({name: "Emily", subject: "Mathematics", longitude: "53.40", latitude:"-2.35"});
db.insert({name: "Rosco", subject: "Engineering", longitude: "53.52", latitude:"-2.32"});
db.insert({name: "Bob", subject: "Fashion Design", longitude: "53.50", latitude:"-2.08"});

// POST method route - for user input on homepage
app.post('/api', (request, response) => {
    const myArray = [];
    myArray.push(request.body.name, request.body.subject,request.body.lat, request.body.lon);
    console.log(myArray);
    console.log(request.body);
    const data = request.body;
    db.insert(data);
    myArray.push(data);
    console.log(data);

    console.log(request.body);//logs to terminal, put in html file if want to see in browser
    response.json({
        status: "success",
        name:request.body.name,
        subject: request.body.subject,
        longitude:request.body.lat,
        latitude: request.body.lon,
    });
});//takes 2 arguments, api enpdoint name+vaiables to receive and send request 

app.get('/api', (request, response) => { //get/request data from database
    db.find({}, (err,data)=>{
    if (err){
        response.end(); //stops the code running if somethign goes wrong
        return;
    } else{
        console.log("Done"); //for testing purpose
    }
    response.json(data);
    console.log(data);
    });
});