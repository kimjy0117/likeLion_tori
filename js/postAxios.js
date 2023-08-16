const input = document.querySelector("#editor");
const titleInput = document.querySelector("#title");
const warning = document.querySelector("#warning");
const contentBtn1 = document.querySelector("#t1Btn");
const contentBtn2 = document.querySelector("#t2Btn");
const contentBtn3 = document.querySelector("#t3Btn");
const contentBtn4 = document.querySelector("#t4Btn");

contentBtn1.addEventListener("click",type1);
contentBtn2.addEventListener("click", type2);
contentBtn3.addEventListener("click", type3);
contentBtn4.addEventListener("click", type4);
document.querySelector("#content-form").addEventListener("submit", contentBtnHandler);

// let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMjE3OTE1LCJpYXQiOjE2OTIyMTA3MTUsImp0aSI6ImY5NDY0YjM4NjFiZTQyMTFhYmI0MGExYjc0YTBiZGM3IiwidXNlcl9pZCI6MX0.vUKdj24XIIOZDZz9xFZt8biLD1gZs2tMgtFrqdLttpQ";
let postPost = "https://api.servicetori.site/api/posts/posts/";
let category = "";

function type1(){
  category = "1";
}

function type2(){
  category = "2";
}

function type3(){
  category = "3";
}

function type4(){
  category = "4";
}

function contentBtnHandler(e){
    e.preventDefault();
    const input = editor.getData();
    const titleInput = e.target.title.value;
    const images = getImages(editor)
    if(input === "" || titleInput === ""){
      return;
    }
    alert(input);
    axios
    .post(
      postPost,
      {
        "title": titleInput,
        "content": input,
        "images": uploadImagesId,
        "category": category,
      },
      {
        withCredentials: true,
      },
      {
        headers: {
         "Content-Type": "application/json"
       },
      }
      )
    .then((response) => {
      // 성공
      console.log(response);
      alert("게시 성공하였습니다.");
      // e.target.reset();
      // window.location.href = "./bulletin.html";      
     })

    .catch((error) => {
      // 실패
      console.error(error);
      alert("게시 실패하였습니다.");
      warning.style.visibility = hidden;
    });
  }