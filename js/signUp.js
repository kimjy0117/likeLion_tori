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
  pwCheck.innerText = "*입력된 값이 올바른 양식이 아닙니다.";
  pwCheck.style.color = "#E70000";
}
function pwDefault() {
  pwCheck.style.visibility = "";
  pwCheck.innerText = "*영문, 숫자, 특수기호 조합 9~15자리";
  pwCheck.style.color = "#2E3134";
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
// form 내부 안 input 지정하여 axios 처리
const getVerifyNum = document.querySelector("#getVerifyNum");
getVerifyNum.addEventListener("click", (event) => {
  event.preventDefault();
  const phone_number = document.querySelector("#phone_number").value;
  axios
    .post(
      "https://api.servicetori.site/api/accounts/smsauth/send",
      {
        phone_number: phone_number,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      // 성공

      alert("인증번호를 발송하였습니다.");
    })
    .catch((error) => {
      // 실패
      console.error(error);
    });
});

const resend = document.querySelector("#resend");
resend.addEventListener("click", (event) => {
  event.preventDefault();
  const phone_number = document.querySelector("#phone_number").value;
  axios
    .post(
      "https://api.servicetori.site/api/accounts/smsauth/send",
      {
        phone_number: phone_number,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      // 성공

      alert("인증번호를 발송하였습니다.");
    })
    .catch((error) => {
      // 실패
      console.error(error);
    });
});

const checkVerifyNum = document.querySelector("#checkVerifyNum");
checkVerifyNum.addEventListener("click", (event) => {
  event.preventDefault();
  const phone_number = document.querySelector("#phone_number").value;
  const auth_number = document.querySelector("#auth_number").value;
  axios
    .post(
      "https://api.servicetori.site/api/accounts/smsauth/confirm",
      {
        phone_number: phone_number,
        auth_number: auth_number,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      // 성공

      alert("인증에 성공하였습니다.");
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("인증에 실패하였습니다.");
    });
});

const form = document.querySelector("#signUp_form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nickname = document.querySelector("#nickname").value;
  const username = document.querySelector("#username").value;
  const password1 = document.querySelector("#password1").value;
  const password2 = document.querySelector("#password2").value;
  const email = document.querySelector("#email").value;
  const introduce = document.querySelector("#introduce").value;
  const auth_answer = document.querySelector("#auth_answer").value;
  const profile_img = document.querySelector("#auth_answer").value;
  const phone_number = document.querySelector("#phone_number").value;

  axios
    .post(
      "https://api.servicetori.site/api/accounts/dj-rest-auth/registration",
      {
        username: username,
        nickname: nickname,
        password1: password1,
        password2: password2,
        email: email,
        introduce: introduce,
        auth_answer: auth_answer,
        profile_img: profile_img,
        phone_number: phone_number,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      // 성공

      window.location.href = "./login.html";
      alert("회원가입에 성공하였습니다.");
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("회원가입에 실패하였습니다.");
    });
});
