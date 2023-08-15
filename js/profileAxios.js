const warning = document.querySelector("#warning");
const contentBtn = document.querySelector("#profile-form");
contentBtn.addEventListener("submit", profileBtnHandler);

function profileBtnHandler(e){
    e.preventDefault();
    const nickname = e.target.inputName.value;
    const introduce = e.target.inputIntro.value;

    if(nickname === "" || introduce === ""){
      return;
    }

    axios
    .patch(
      "http://3.36.100.188/api/accounts/dj-rest-auth/user",
      {
        "nickname": nickname,
        "introduce": introduce,
      },
        {
           headers: {Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMDM4MTEzLCJpYXQiOjE2OTIwMzA5MTMsImp0aSI6IjU4ZGM1MTY1OGMyODRkMGY5Y2YwYWY1YzIyY2U4ZjM4IiwidXNlcl9pZCI6MX0.WOox7-ELcbqJp1voIZz-LUzPGCSHrp_hR0CbmKUFur4",},
        }
    )
    .then((response) => {
      // 성공
      console.log(response);
      alert("프로필이 변경되었습니다.");
      e.target.reset();
      // window.location.href = "./bulletin.html";      
     })

    .catch((error) => {
      // 실패
      console.error(error);
      alert("프로필 변경이 실패하였습니다.");
      warning.style.visibility = hidden;
    });
  }

