// document.addEventListener("DOMContentLoaded", () => {
//   // 페이지의 DOM이 완전히 로드되었을 때 실행되는 코드
//   //  -> 페이지 로드 전 uid, 토큰 값 가져오기
//   const uid = sessionStorage.getItem("uid");
//   const token = sessionStorage.getItem("token");
//   if (userId) {
//     const result = document.querySelector("#emphasize");
//     result.innerText = userId;
//     // 찾은 값 넘겨주기
//   }
// });

const uid = sessionStorage.getItem("uid");
const token = sessionStorage.getItem("token");

// 비밀번호 정규식 체크
var regex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,15}$/;
// 비밀번호 일치 여부 판별 (inner.html)
const pwCheck = document.querySelector("#pwCheckExp");

function pwPass() {
  pwCheck.innerText = "*비밀번호가 일치합니다.";
  pwCheck.style.color = "#03A400";
}
function pwFail() {
  pwCheck.innerText = "*비밀번호가 일치하지 않습니다.";
  pwCheck.style.color = "#E70000";
}
function pwRexFail() {
  pwCheck.innerText = "*두 비밀번호 모두 올바른 양식이 아닙니다.";
  pwCheck.style.color = "#E70000";
}
function pwDefault() {
  pwCheck.innerText = "*영문, 숫자, 특수기호 조합 9~15자리";
  pwCheck.style.color = "#2E3134";
}

function passwordCheck() {
  // 향 후, 조건에 맞는 값이 들어왔을 때만 버튼 활성화 시키는 쪽으로 수정.
  // -> boolean 으로 정규식 세 값이 따로 설정된 변수에 T가 되면 버튼 활성화
  const password1 = document.querySelector("#password1").value;
  const password2 = document.querySelector("#password2").value;
  if (password1.length === 0 && password2.length == 0) pwDefault();
  else if (regex.test(password1) == true && regex.test(password2) == true) {
    if (password1.value === password2.value) {
      pwPass();
    } else pwFail();
  } else pwRexFail();
}

const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const password1 = document.querySelector("#password1").value;
  const password2 = document.querySelector("#password2").value;

  axios
    .post(
      "https://api.servicetori.site/api/accounts/dj-rest-auth/password/reset/confirm",
      {
        new_password1: password1,
        new_password2: password2,
        uid: uid,
        token: token,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      // 성공
      console.log(response); // test
      alert("비밀번호가 변경되었습니다.");
      window.location.href = "./login.html";
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("비밀번호 변경에 실패하였습니다.");
    });
});
