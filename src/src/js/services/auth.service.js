import $ from 'jquery';
import NotificationService from './notification.service';

let loginUrl = "http://localhost:3000/auth/login";
let registerUrl = "http://localhost:3000/auth/register";
let verifyUrl = "http://localhost:3000/auth/verify";

function login(user) {
    $.ajax({
        type: "POST",
        url: loginUrl,
        contentType: "application/json",
        data: user,
        success: function (data) {
            if (data["token"]) {
                saveToLocalStorage(data);
            }
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function register(user) {
    $.ajax({
        type: "POST",
        url: registerUrl,
        contentType: "application/json",
        data: user,
        success: function (data) {
            if (data["token"]) {
                saveToLocalStorage(data);
            }
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function verify(startup) {
    let token = JSON.parse(localStorage.getItem("CurrentUser"))['token'];
    $.ajax({
        type: "GET",
        url: verifyUrl,
        headers: {
            'x-access-token': token
        },
        success: function (data) {
            if (startup) {
                let name = JSON.parse(localStorage.getItem("CurrentUser"))['User']['firstName'];
                setWelcomeText(name)
                //join socket room
                //get notifications van server
                NotificationService.connectSocket();
            }
        },
        error: function (err) {
            console.error(err);
            return false;
        }
    });
}
function saveToLocalStorage(data) {
    localStorage.setItem('CurrentUser', JSON.stringify({
        User: data["user"],
        token: data["token"]
    }));
    setWelcomeText(data["user"]["firstName"]);

  //join socket room
  //get notifications van server
  NotificationService.connectSocket();
}

function setWelcomeText(name) {
    $('#login').hide();
    $('#registreren').hide();
    $('#welkom').show();
    $('#welkom').html("Hallo " + name);
    $('#logout-button').show();
}

function removeWelcomeText() {
    $('#login').show();
    $('#registreren').show();
    $('#welkom').hide();
    $('#logout-button').hide();
}

export default {
    login,
    register,
    verify,
    setWelcomeText,
    removeWelcomeText
}