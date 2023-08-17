// 동적으로 생성될 사이드 바 전체 영역 id = sideDrawer
// 햄버거 버튼 id = sideBarBtn

$(document).ready(function(){
    var target = $("#sideDrawer");

    // 버튼을 클릭하면 사이드바 열리고, emphazied 클래스 추가.
    $(document).on("click", "#sideBarBtn", function (e){
        target.show();
        target.addClass('emphasized');
    });

    // 사이드바 외부를 클릭하면 사이드바 닫힘. 
    $(document).mouseup(function (e){
        if(target.has(e.target).length==0) {
            // e.target ( 클릭한 대상의 길이가 0 이라면)
            target.hide();
            target.removeClass('emphasized');
        } 
    });
});
 
// emphasized 클래스 : 사이드바가 보여질 box-shadow를 사용해서 투명도 조절 (E.G 레이어 팝업) 