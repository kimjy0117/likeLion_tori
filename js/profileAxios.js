const warning = document.querySelector("#warning");
const contentBtn = document.querySelector("#profile-form");
contentBtn.addEventListener("submit", profileBtnHandler);

let sessionData = sessionStorage.getItem("access");
let token = "Bearer "+ sessionData;
let patchUser = "https://api.servicetori.site/api/accounts/dj-rest-auth/user";
let deleteUser = "https://api.servicetori.site/api/accounts/dj_rest_auth/user/destroy";

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

      alert("프로필이 변경되었습니다.");
      e.target.reset();
      window.location.href = "./index.html";      
     })

    .catch((error) => {
      // 실패
      console.error(error);
      alert("프로필 변경이 실패하였습니다.");
      warning.style.visibility = hidden;
    });
  }

function userDestroyConfirm(){
  let result = confirm("정말로 회원탈퇴를 하시겠습니까?");
  
  if(result){
    axios
    .delete(
      deleteUser,
        {
            headers: {
            "Authorization": token,
        },
        })
        .then((response) => {
            // 성공
 
            alert("회원탈퇴 성공!");  
            sessionStorage.removeItem("access");
            window.location.href="./index.html"; 
        })

        .catch((error) => {
            // 실패
            console.error(error);
            alert("회원탈퇴 실패!");
            warning.style.visibility = hidden;
      }
    )
  }
}

