const bullet1Btn = document.getElementById('bullet1Btn');
const bullet2Btn = document.getElementById('bullet2Btn');
const bullet3Btn = document.getElementById('bullet3Btn');

$(document).ready(function(){
    // 초기에는 bullet1로 설정
    $(".container").hide();
    $("#bullet1").show();
    bullet1Btn.style.color = "white";
    bullet1Btn.style.backgroundColor = "#50BB4E"

    // bullet1Btn 클릭 이벤트 처리
    $("#bullet1Btn").click(function () {
        $(".container").hide();
        $("#bullet1").show();
        bullet1Btn.style.color = "white";
        bullet2Btn.style.color = "black";
        bullet3Btn.style.color = "black";
        
        bullet1Btn.style.backgroundColor = "#50BB4E"
        bullet2Btn.style.backgroundColor = "white"
        bullet3Btn.style.backgroundColor = "white"        
    });

    // bullet2Btn 클릭 이벤트 처리
    $("#bullet2Btn").click(function () {
        $(".container").hide();
        $("#bullet2").show();
        bullet1Btn.style.color = "black";
        bullet2Btn.style.color = "white";
        bullet3Btn.style.color = "black";

        bullet1Btn.style.backgroundColor = "white"
        bullet2Btn.style.backgroundColor = "#50BB4E"
        bullet3Btn.style.backgroundColor = "white" 
    });

    // bullet3Btn 클릭 이벤트 처리
    $("#bullet3Btn").click(function () {
        $(".container").hide();
        $("#bullet3").show();
        bullet1Btn.style.color = "black";
        bullet2Btn.style.color = "black";
        bullet3Btn.style.color = "white";
        
        bullet1Btn.style.backgroundColor = "white"
        bullet2Btn.style.backgroundColor = "white"
        bullet3Btn.style.backgroundColor = "#50BB4E"         
    });
});
