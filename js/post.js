const styleArea = document.getElementById('styleArea');
const bottomArea = document.getElementById('bottomArea');

const type1Btn = document.getElementById('type1Btn');
const type2Btn = document.getElementById('type2Btn');
const type3Btn = document.getElementById('type3Btn');
const type4Btn = document.getElementById('type4Btn');

const t1Btn = document.getElementById('t1Btn');
const t2Btn = document.getElementById('t2Btn');
const t3Btn = document.getElementById('t3Btn');
const t4Btn = document.getElementById('t4Btn');

$(document).ready(function(){
    let hide=0;
    
    // 글 스타일 설정 버튼
    $(".styleArea").hide();
    
  
    $("#styleBtn").click(function () {
        if(hide == 0){
            $(".styleArea").show();
            
            hide = 1;
        }    

        else if(hide == 1){
            $(".styleArea").hide();
            
            hide = 0;
        }  
    });

    // 게시글 종류 선택 버튼
    let target = $(".selectTypeArea");
    target.hide();
    
    $(".submitBtn").click(function () {
        target.show();
        target.addClass("emphasized")
    });

    // 게시글 선택 창 닫기
    $(document).mouseup(function (e){
        if(target.has(e.target).length==0) {
            // e.target ( 클릭한 대상의 길이가 0 이라면)
            target.hide();
            target.removeClass('emphasized');
        } 
    });

    // 버튼 클릭 시 색 변경
    $("#type1Btn").click(function () {
        t1Btn.style.color = "white";
        t2Btn.style.color = "black";
        t3Btn.style.color = "black";
        t4Btn.style.color = "black";
        
        type1Btn.style.backgroundColor = "#50BB4E"
        type2Btn.style.backgroundColor = "white"
        type3Btn.style.backgroundColor = "white"
        type4Btn.style.backgroundColor = "white"        
    });

    $("#type2Btn").click(function () {
        t1Btn.style.color = "black";
        t2Btn.style.color = "white";
        t3Btn.style.color = "black";
        t4Btn.style.color = "black";
        
        type1Btn.style.backgroundColor = "white"
        type2Btn.style.backgroundColor = "#50BB4E"
        type3Btn.style.backgroundColor = "white"
        type4Btn.style.backgroundColor = "white"        
    });

    $("#type3Btn").click(function () {
        t1Btn.style.color = "black";
        t2Btn.style.color = "black";
        t3Btn.style.color = "white";
        t4Btn.style.color = "black";
        
        type1Btn.style.backgroundColor = "white"
        type2Btn.style.backgroundColor = "white"
        type3Btn.style.backgroundColor = "#50BB4E"
        type4Btn.style.backgroundColor = "white"        
    });

    $("#type4Btn").click(function () {
        t1Btn.style.color = "black";
        t2Btn.style.color = "black";
        t3Btn.style.color = "black";
        t4Btn.style.color = "white";
        
        type1Btn.style.backgroundColor = "white"
        type2Btn.style.backgroundColor = "white"
        type3Btn.style.backgroundColor = "white"
        type4Btn.style.backgroundColor = "#50BB4E"        
    });
});
