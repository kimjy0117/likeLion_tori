const input = document.querySelector("#content");
const warning = document.querySelector("#warning");
const bottomArea = document.getElementById('bottomArea');
const commentBtn = document.querySelector("#comment-form");

commentBtn.addEventListener("submit", commentBtnHandler);

axios
  .get(
    "https://3.36.100.188/api/posts/comments/",
  )
  .then((response) => {
    let commentLength = response.data.length;
    createComment(commentLength, response.data);

  })
  .catch(function (error){
    //에러 시
    alert("수신에 실패");
    console.log(error);
  })
  .finally(function(){
  //항상 실행되는 함수
  });

function createComment(length, data){
  const commentArea = document.querySelector('.commentArea');

  for(let i=0; i<length; i++){
    const div = document.createElement('div');
    const divTop = document.createElement('div');
    const divUser = document.createElement('div');
    const divDate = document.createElement('div');
    const divContent = document.createElement('div');
    const divBottom = document.createElement('div');
    const userImg = document.createElement('img');
    const userSpan = document.createElement('span');
    const dateSpan = document.createElement('span');
    const contentSpan = document.createElement('span');

    let bedate = data[i].created_at.split('-');
    let time1 = bedate[0]+"."+bedate[1]+"."+bedate[2];
    let date = time1.split('T')[0];
    let time = data[i].created_at.substr(11, 5);
    let dateTime = date + "  " + time;

    div.id = 'div';
    divTop.id = 'divTop';
    divUser.id = 'divUser';
    divDate.id = 'divDate';
    divContent.id = 'divContent';
    
    userImg.src = "../img/logo30.svg";
  
    // 백에서 writer값 수정 되면 수정
    // userSpan.innerHTML = data[i].writer;
    userSpan.innerHTML = "농부좋아";
    userSpan.style.fontSize = "16px";
    userSpan.style.fontWeight = "600";
    userSpan.style.marginLeft = "7px";
  
    dateSpan.innerHTML = dateTime;
    dateSpan.style.fontSize = "11px";
    dateSpan.style.fontWeight = "500";

    contentSpan.innerHTML = data[i].content;
    contentSpan.style.fontSize = "16px";
    contentSpan.style.fontWeight = "500";

    divUser.appendChild(userImg);
    divUser.appendChild(userSpan);

    divDate.appendChild(dateSpan);

    divTop.appendChild(divUser);
    divTop.appendChild(divDate);

    divContent.appendChild(contentSpan);

    div.appendChild(divTop);
    div.appendChild(divContent);
    div.appendChild(divBottom);
    
    commentArea.appendChild(div);
  }
}

function commentBtnHandler(e){
    e.preventDefault();
    const input = e.target.content;

    if(input.value === ""){
      alert("내용을 입력하여 주세요.");
      return;
    }

    axios
    .post(
      "https://servicetori.site/api/posts/comments/",
      {
        "post": 3,
        "content": input.value,
      },
        {
          headers: {Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMDQ3ODIzLCJpYXQiOjE2OTIwNDA2MjMsImp0aSI6IjNlNjEyMjUwNWI2MTRjNGI5N2RhNmY1Njk0OTY1NmY3IiwidXNlcl9pZCI6MX0.obM-GW5FCz6dbviXatdsqajQ5FajdewWzrjsp1bPcfE",},
        }
    )
    .then((response) => {
      e.target.reset();
      window.location.reload(); 
    })

    .catch((error) => {
      // 실패
      console.error(error);
      alert("게시 실패하였습니다.");
      // warning.style.visibility = hidden;
    });
  }
