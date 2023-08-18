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

// 비밀번호 일치 여부 판별 (inner.html)
const pwCheck = document.querySelector("#pwCheckExp");

function pwPass() {
  pwCheck.innerText = "*비밀번호가 일치합니다.";
  pwCheck.style.color = "#03A400";
  pwCheck.style.visibility = "visible";
}
function pwFail() {
  pwCheck.innerText = "*비밀번호가 일치하지 않습니다.";
  pwCheck.style.color = "#E70000";
  pwCheck.style.visibility = "visible";
}
function pwRexFail() {
  pwCheck.innerText = "*입력된 값이 올바른 양식이 아닙니다.";
  pwCheck.style.color = "#E70000";
  pwCheck.style.visibility = "visible";
}
function pwDefault() {
  pwCheck.style.visibility = "hidden";
}

function passwordCheck() {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,15}$/;
  // 조건에 맞는 값이 들어왔을 때만 버튼 활성화 시키는 쪽으로 수정.
  // 입력한 두 패스워드 일치 여부 / 유효성 판별
  const password1 = document.querySelector("#password1").value;
  const password2 = document.querySelector("#password2").value;

  if (password1.length === 0 && password2.length === 0) {
    pwDefault();
  } else {
    if (regex.test(password1) === false || regex.test(password2) === false) {
      pwRexFail();
    } else {
      if (password1 != password2) {
        pwFail();
      }
      if (password1 == password2) pwPass();
    }
  }
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

      alert("비밀번호가 변경되었습니다.");
      window.location.href = "./login.html";
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("비밀번호 변경에 실패하였습니다.");
    });
});
