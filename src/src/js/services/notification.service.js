import $ from 'jquery';
import io from 'socket.io-client';
import NotificationHelper from '../helpers/showNotification';

let socket = io.connect("http://localhost:4000");

function connectSocket() {
    let token = JSON.parse(localStorage.getItem("CurrentUser"))['token'];

    socket.on("connected", function() {
        console.log("socket.io connected");
    });

    socket.emit("login", token);

    socket.on("commentNotification", function (data) {
        NotificationHelper.showNotification(data);
    });

    socket.on("disconnect", function () {
        console.log ("client disconnected")
    })
}

function sendNotification(newCommentData) {
    socket.emit("commentAdded", newCommentData);
}



export default {
    connectSocket,
    sendNotification
}