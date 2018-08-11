import $ from 'jquery';
import EcoplanObject from './models/Ecoplan.class';
import AuthService from './services/auth.service';
import CommentsService from './services/comments.service';
import NotificationService from './services/notification.service';

let ecoplanList, searchButton, filter, searchContent, loginForm, registerForm;

$(document).ready(function () {
  $.getJSON('https://datatank.stad.gent/4/milieuennatuur/ecoplan.json', function (data) {
    console.log(data);
    ecoplanList = data;
  })

  searchButton = document.querySelector("#searchButton");
  filter = document.querySelector("#filter");
  searchContent = document.querySelector("#zoekinhoud");
  searchButton.addEventListener("click", showEcoplans);
  document.getElementById("log-button").addEventListener("click", loginUser);
  document.getElementById("reg-button").addEventListener("click", registerUser);
  document.getElementById("logout-button").addEventListener("click", signoutUser);

  if (localStorage.getItem("CurrentUser") != null) {
    AuthService.verify(true);
  }
});

function showEcoplans() {
  let f = filter.value;
  let resultsSearch = searchEcoplan(f);

  let bobHTMLBuilder = "",
    l = resultsSearch.length;

  for (let i = 0; i < l; i++) {
    let o = resultsSearch[i];
    let obj = new EcoplanObject(o.NAAM, o.STRAAT, o.NUMMER, o.POSTCODE, o.BUS, o.GEMEENTE, o.WEBADRES, o.telefoon, o.CATEGORIE, o.opmerkingen);
    let butonValue = obj.naam;
    butonValue = butonValue.replace(/\s+/g, '_');
    butonValue += "/" + obj.straat;
    butonValue += "/" + obj.nummer;

    bobHTMLBuilder += `<div class="ecoplan-item"> `;
    bobHTMLBuilder += `<h4>${obj.naam}</h4>`;
    bobHTMLBuilder += `<p>${obj.straat} ${obj.nummer} ${obj.gemeente}</p>`;
    bobHTMLBuilder += `<a>${obj.categorie}</a>`;
    bobHTMLBuilder += `<br/><button class="button__ecoplanItem" value="${butonValue}">Lees commentaren</button>`;
    bobHTMLBuilder += `</div>`;
  }
  searchContent.innerHTML = bobHTMLBuilder;

  let ecoplanButtons = document.getElementsByClassName("button__ecoplanItem");
  for (let i = 0; i < ecoplanButtons.length; i++) {
    ecoplanButtons[i].addEventListener("click", showComments);
  }
}

function searchEcoplan(toSearch) {
  var results = [];

  for (var i = 0; i < ecoplanList.length; i++) {
    for (let key in ecoplanList[i]) {
      if (ecoplanList[i][key].indexOf(toSearch) != -1) {
        results.push(ecoplanList[i]);
      }
    }
  }
  return results;
}

function loginUser() {
  let u = {
    "email": document.getElementById("log-email").value,
    "password": document.getElementById("log-pass").value
  }
  AuthService.login(JSON.stringify(u));
}

function registerUser() {
  let u = {
    "firstName": document.getElementById("reg-fname").value,
    "lastName": document.getElementById("reg-lname").value,
    "email": document.getElementById("reg-email").value,
    "password": document.getElementById("reg-pass").value
  }
  AuthService.register(JSON.stringify(u));
}

function showComments() {
  let ecoplan = this.value;
  ecoplan = ecoplan.split("/");
  let straat = ecoplan[1];
  let nummer = ecoplan[2];
  ecoplan = ecoplan[0].replace(/_/g, ' ');
  CommentsService.loadComments(ecoplan, straat, nummer);
}

function signoutUser() {
  localStorage.removeItem("CurrentUser");
  AuthService.removeWelcomeText();
}