const topBtn1 = document.getElementById('topBtn1');
const topBtn2 = document.getElementById('topBtn2');

$(document).ready(function(){
    topBtn1.style.color = "#2E3134";
    topBtn2.style.color = "#2E313480";

   $("#topBtn1").click(function(){
    topBtn1.style.color = "#2E3134";
    topBtn2.style.color = "#2E313480";
   });

   $("#topBtn2").click(function(){
    topBtn1.style.color = "#2E313480";
    topBtn2.style.color = "#2E3134";
   });
});

