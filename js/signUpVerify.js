const form = document.querySelector("#verify");
// form1 : 핸드폰 번호 입력
const form2 = document.querySelector("#verifyNum");
// form2 : 받은 인증번호 입력
const explain = document.querySelector(".explain");
// 회원가입에 오신 것을 환영합니다 -> 받은 인증번호를 입력해주세요 (p)
const getNum = document.querySelector("#getVerifyNum");
// form1 : 인증번호 받기 버튼
const phoneNumCheck = document.querySelector("#phoneNumCheck");
// 핸드폰 번호 올바르지 않으면 유효성 검사에서 해당 p 출력

function areaAdd() {
  // form2 를 생성하기 위한 동적인 함수.
  form2.style.visibility = "visible";
  explain.innerHTML =
    '<p style="display:inline-block;padding-left:19px;">문자로 전송된 인증번호를 입력해주세요.</p>';
  alert("인증번호를 발송하였습니다.");
}

// 첫번째 form : 핸드폰 번호 입력
form.addEventListener("submit", (event) => {
  event.preventDefault();
  var regex = /^01([0|1|6|7|8|9])?\d{3,4}?\d{4}$/;
  const phoneNumber = document.getElementById("phoneNumber").value;
  if (regex.test(phoneNumber) == true) {
    axios
      .post(
        "https://api.servicetori.site/api/accounts/smsauth/send",
        {
          phone_number: phoneNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // 성공
        phoneNumCheck.style.visibility = "hidden";
        areaAdd();
      })
      .catch((error) => {
        // 실패
        console.error(error);
      });
  } else {
    phoneNumCheck.style.visibility = "visible";
  }
});

form2.addEventListener("submit", (event) => {
  event.preventDefault();
  const verifyNumber = document.querySelector("#verifyNumber").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  axios
    .post(
      "https://api.servicetori.site/api/accounts/smsauth/confirm",
      {
        phone_number: phoneNumber,
        auth_number: verifyNumber,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      // 성공

      alert("인증에 성공하였습니다.");
      window.location.href = "./signUp.html";
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("인증에 실패하였습니다.");
    });
});
