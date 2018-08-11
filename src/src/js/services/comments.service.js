import $ from 'jquery';
import NotificationService from './notification.service';

const newCommentUrl = "https://obscure-reaches-45273.herokuapp.com:3000/comments/addNew";
const loadCommentUrl = "https://obscure-reaches-45273.herokuapp.com:3000/comments/byNameAdressNumber";
const socketUrl = "https://obscure-reaches-45273.herokuapp.com:4000";

function loadComments(ecoplan, straat, nummer) {

    let huidigEcoplan = {
        "name": ecoplan,
        "street": straat,
        "number": nummer
    }
    let token = JSON.parse(localStorage.getItem("CurrentUser"))['token'];

    $.ajax({
        type: "POST",
        url: loadCommentUrl,
        contentType: "application/json",
        data: JSON.stringify(huidigEcoplan),
        headers: {
            'x-access-token': token
        },
        success: function (data) {
            showCommentsScreen(data, huidigEcoplan);

        },
        error: function (err) {
            console.error(err);
        }
    });
}

function showCommentsScreen(commentsList, huidigEcoplan) {
    $('#commentaren').show();

    let bobHTMLBuilder = "";

    if (commentsList.length > 0) {

        let l = commentsList.length;
        if (commentsList[0].nummer === undefined) {
            commentsList[0].nummer = "";
        }

        for (let i = 0; i < l; i++) {
            let o = commentsList[i];

            bobHTMLBuilder += `<div class="comment-item"> `;
            bobHTMLBuilder += `<h4>${o.firstName} ${o.lastName}</h4>`;
            bobHTMLBuilder += `<a>${o.time}</a>`;
            bobHTMLBuilder += `<p>${o.comment} </p>`;
            bobHTMLBuilder += `</div>`;
        }
    }

    //nieuwe reactie toevoegen
    bobHTMLBuilder += `<div id="new_comment">`;
    bobHTMLBuilder += `<textarea id="add_comment_text" rows="4" cols="100" placeholder="Typ hier uw commentaar"></textarea>`;
    bobHTMLBuilder += `<button id="add_comment">Reageer!</button>`;
    bobHTMLBuilder += `</div>`;

    document.getElementById("commentaren").innerHTML = bobHTMLBuilder;
    document.getElementById("add_comment").addEventListener("click", function () {
        createComment(huidigEcoplan)
    });


    $(window).click(function () {
        document.getElementById("commentaren").style.display = "none";
    });

    $('#new_comment').click(function (event) {
        event.stopPropagation();
    });
    $('.comment-item').click(function (event) {
        event.stopPropagation();
    });
}

function createComment(huidigEcoplan) {
    let CurrentUser = JSON.parse(localStorage.getItem("CurrentUser"));
    let token = CurrentUser['token'];

    let newCommentData = {
        "comment": document.getElementById("add_comment_text").value,
        "ecoplan": huidigEcoplan.name,
        "firstName": CurrentUser['User']['firstName'],
        "lastName": CurrentUser['User']['lastName'],
        "straat": huidigEcoplan.street,
        "nummer": huidigEcoplan.number
    }

    $.ajax({
        type: "POST",
        url: newCommentUrl,
        contentType: "application/json",
        data: JSON.stringify(newCommentData),
        headers: {
            'x-access-token': token
        },
        success: function (data) {
            console.log(data);
            NotificationService.sendNotification(newCommentData);
            loadComments(huidigEcoplan.name, huidigEcoplan.street, huidigEcoplan.number);

        },
        error: function (err) {
            console.error(err);
        }
    });
}

export default {
    loadComments
}