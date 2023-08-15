const input = document.querySelector("#content");
const warning = document.querySelector("#warning");
const bottomArea = document.getElementById('bottomArea');
const commentBtn = document.querySelector("#comment-form");
const list = [];

commentBtn.addEventListener("submit", commentBtnHandler);

function commentBtnHandler(e){
    e.preventDefault();
    const input = e.target.content;

    if(input.value === ""){
      return;
    }

    axios
    .post(
      "http://3.36.100.188/api/posts/comments/",
      {
        "post": 3,
        "content": input.value,
      },
        {
          headers: {Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMDM4MTEzLCJpYXQiOjE2OTIwMzA5MTMsImp0aSI6IjU4ZGM1MTY1OGMyODRkMGY5Y2YwYWY1YzIyY2U4ZjM4IiwidXNlcl9pZCI6MX0.WOox7-ELcbqJp1voIZz-LUzPGCSHrp_hR0CbmKUFur4",},
        }
    )
    .then((response) => {
      // 성공
      console.log(response);
      alert("게시 성공하였습니다.");
      
      e.preventDefault();
      const input = e.target.content;

    // 빈 칸일 경우 알림창 생성
      if(input.value === ""){
        alert("내용을 입력하여 주세요.");
        return;
      }

  //   리스트에 입력값 푸쉬
    const commentObj = new Comment(input.value);
    list.push(commentObj);

  //   댓글 출력
    drawing();
    e.target.reset();
    })

    .catch((error) => {
      // 실패
      console.error(error);
      alert("게시 실패하였습니다.");
      // warning.style.visibility = hidden;
    });
  }


  function Comment(content){
    this.userLogo = "../images/logo30.svg";
    this.userid = "농부좋아";
    this.content = content;
    this.date = "2023.07.24";
    this.time = "15:37";
}

commentBtn.addEventListener("submit", commentBtnHandler);

const commentList = document.querySelector("#commentList");
console.log(commentList);

function createRow(userLogo, userid, date, time, content){
    const div = document.createElement("div");
    const logoDiv = document.createElement("div");
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");

    div.append(logoDiv);
    div.append(ul);
    
    div.setAttribute("class", "comment-row");
    logoDiv.setAttribute("class", "comment-logo");
    ul.setAttribute("class", "comment-row");
    li1.setAttribute("class", "comment-id");
    li2.setAttribute("class", "comment-date");
    li3.setAttribute("class", "comment-time");
    li4.setAttribute("class", "comment-content");

    li1.innerHTML = userid;
    li2.innerHTML = date;
    li3.innerHTML = time;
    li4.innerHTML = content;

    const logoImg = document.createElement("img");
    logoImg.setAttribute("src", userLogo);
    logoImg.setAttribute("alt", "User Logo");
    logoDiv.appendChild(logoImg);

    ul.append(li1);
    ul.append(li2);
    ul.append(li3);
    ul.append(li4);

    return div;
}

function drawing(){
    commentList.innerHTML="";
    for (let i = 0; i<list.length; i++){
        const row = createRow(list[i].userLogo, list[i].userid, list[i].date, list[i].time, list[i].content);
        commentList.append(row);
    }
}