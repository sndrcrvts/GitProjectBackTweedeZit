const jwt = require("jsonwebtoken");
const config = require('./config');


module.exports = (io) => {
    io.on("connection",(socket)=>{
        socket.on('login',(token)=>{
            jwt.verify(token, config.secret, function(err, decoded) {
                socket.join('loggedin');
            });
        });

        socket.on('commentAdded', function (data) {
            socket.broadcast.to('loggedin').emit('commentNotification', data);
        });
    }); 
}   