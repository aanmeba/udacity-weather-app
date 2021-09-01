// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Cors for cross origin allowance
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

let projectData = {};

app.get('/addDate', function(req, res) {
    res.send(projectData);    
});

app.post('/newEntry', function(req, res) {
    projectData = req.body;
    res.send(projectData);
});

// Setup Server
app.listen(process.env.PORT || 8000, function(){
    console.log("Server is running successfully");
});