const warning = document.querySelector("#warning");
const contentBtn = document.querySelector("#profile-form");
contentBtn.addEventListener("submit", profileBtnHandler);

let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMjI5Njk3LCJpYXQiOjE2OTIyMjI0OTcsImp0aSI6IjgyOGZkZjQzNTVkMzQxMTdhZTg3YjBhMzg2MjYyZDRkIiwidXNlcl9pZCI6MX0.e76A1dDfDDwINFwGrv5qj-kxqRanklNA_WP2HjUhMzI";
let patchUser = "https://api.servicetori.site/api/accounts/dj-rest-auth/user";

let profile_img;



document.querySelector('.cameraBtn').addEventListener('click', () => {
  document.querySelector('#cameraInput').click();
});

function loadImage(event) {
const logo = document.querySelector('#logo');
profile_img = URL.createObjectURL(event.target.files[0]);
logo.src = profile_img;
logo.onload = () => {
    URL.revokeObjectURL(logo.src);
};
console.log(profile_img);
}

function profileBtnHandler(e){
    e.preventDefault();
    const nickname = e.target.inputName.value;
    const introduce = e.target.inputIntro.value;
    const formData = new FormData()
    
    
    if(cameraInput.files[0]){
      formData.append('profile_image', cameraInput.files[0]);
    }

    formData.append('nickname',nickname)
    formData.append('introduce',introduce)

    if(nickname === "" || introduce === ""){
      return;
    }

    axios
    .patch(
      patchUser,
        formData,
        {
           headers: {Authorization: token,'content-type': 'multipart/form-data',},
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
