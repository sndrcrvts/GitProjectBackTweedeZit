var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const config = require('./config');
const cors = require('cors');
const DBService = require("./data/connectDBService.js");
var port = config.PORT;
var mongoose = require("mongoose");
var path = require('path');


let io = require("socket.io").listen(4000);
require('./sockets')(io);

DBService(config.MONGODBURL,require('mongoose') );

const authentication = require("./routes/authentication");
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.options('*', cors())

app.use('/auth', authentication);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.get("/", (req, res) => {
    res.sendfile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});