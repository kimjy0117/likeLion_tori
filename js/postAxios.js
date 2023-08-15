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
    alert(input)
    axios
    .post(
      "http://3.36.100.188/api/posts/posts/",
      {
        "title": titleInput,
        "content": input,
        "images": images,
        "category": category,
      },
        {
           headers: {
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMDk1MjQxLCJpYXQiOjE2OTIwODgwNDEsImp0aSI6ImIzZTQ0ODBmZWM0YjQxMDRiODg1YTAyMTZlNmFmYmY2IiwidXNlcl9pZCI6MX0.SGXk-M-dnoODH27XqtsKPysf-g3vAQqfyKunMpdMpYE",
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

