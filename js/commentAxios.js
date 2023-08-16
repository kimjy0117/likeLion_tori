const input = document.querySelector("#content");
const warning = document.querySelector("#warning");
const bottomArea = document.getElementById('bottomArea');
const commentBtn = document.querySelector("#comment-form");
commentBtn.addEventListener("submit", commentBtnHandler);

const searchParams = new URLSearchParams(location.search);
let id = searchParams.get('id')

let token = "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMjA4MjIwLCJpYXQiOjE2OTIyMDEwMjAsImp0aSI6IjM0ZWIzMWJiMDhhZTQ3OGE4N2ExY2M2NGU3N2M2N2IyIiwidXNlcl9pZCI6MX0.5Za6hG8of05H9_RG6H8paBq3pCuGq6PxwHvLAgxAY9I";
let getComment = `https://api.servicetori.site/api/posts/comments/`;
let postComment = "https://api.servicetori.site/api/posts/comments/";

axios
  .get(getComment,{
    params: {
      postId: id
    }
  })
  
  .then((response) => {
    console.log(response);
    let commentLength = response.data.length;
    createComment(commentLength, response.data);
    backBtnHandler(id);
  })
  .catch(function (error){
    //에러 시
    alert("수신에 실패");
    console.log(error);
  })
  .finally(function(){
  //항상 실행되는 함수
  });

function backBtnHandler(id){
  let backBtn = document.getElementById('backBtn');
  backBtn.href = `./bulletin.html?id=${id}`;
}

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
    userSpan.innerHTML = data[i].writer;
    // userSpan.innerHTML = "농부좋아";
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
    .post(postComment,
      {
        "post": id,
        "content": input.value,
      },
        {
          headers: {Authorization: token,},
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
