import $ from 'jquery';


function showNotification(obj) {
   let notifiContent = document.querySelector("#notification");
   let bobHTMLBuilder = "";

   bobHTMLBuilder += `<p>${obj.firstName} ${obj.lastName} plaatste een nieuwe opmerking in: ${obj.ecoplan}</p>`;

   notifiContent.innerHTML += bobHTMLBuilder;
}



export default {
    showNotification
}