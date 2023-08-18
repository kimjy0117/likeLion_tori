const form = document.querySelector("#verify");
// form1 : 핸드폰 번호 입력
const form2 = document.querySelector("#verifyNum");
// form2 : 받은 인증번호 입력
const additionalArea = document.querySelector(".anotherWay");
// 추가적인 영역 (이메일로 넘어가기)
const getNum = document.querySelector("#btn1");
// form1 : 인증번호 받기 버튼
const phoneNumCheck = document.querySelector("#phoneNumCheck");
// 핸드폰 번호 올바르지 않으면 유효성 검사에서 해당 p 출력
const innerExplain = document.querySelector("#innerExplain");
const line = document.querySelector("#line");

var regex = /^01([0|1|6|7|8|9])?\d{3,4}?\d{4}$/;

const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");

function phoneNumRex() {
  const phoneNumber = document.querySelector("#phoneNumber").value;
  if (phoneNumber.length === 0) {
    phoneNumCheck.style.visibility = "hidden";
  } else {
    if (regex.test(phoneNumber) == false) {
      phoneNumCheck.style.visibility = "visible";
    } else {
      phoneNumCheck.style.visibility = "hidden";
    }
  }
}
function hoverEffect() {
  btn1.style.backgroundColor = "#50bb4e";
  btn1.style.color = "white";
  btn1.style.border = "none";
}

function hoverOut() {
  btn1.style.backgroundColor = "white";
  btn1.style.border = "1px solid #0000004d";
  btn1.style.color = "#0000004d";
}

function afterGet() {
  btn1.innerText = "인증 문자 다시 받기";
  btn1.style.backgroundColor = "white";
  btn1.style.border = "1px solid #0000004d";
  btn1.style.color = "#0000004d";

  btn1.addEventListener("mouseover", hoverEffect);
  btn1.addEventListener("mouseout", hoverOut);

  btn2.style.backgroundColor = "#50bb4e";
  btn2.style.color = "white";
  btn2.style.border = "none";
}

function removeArea() {
  additionalArea.style.visibility = "hidden";
  line.style.visibility = "hidden";
}

// 첫번째 form : 핸드폰 번호 입력
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const phoneNumber = document.getElementById("phoneNumber").value;

  if (regex.test(phoneNumber) === true) {
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

        removeArea();
        form2.style.visibility = "visible";
        alert("인증번호를 발송하였습니다.");
        innerExplain.innerText = "문자로 전송된 인증번호를 입력해주세요.";
        afterGet();
      })
      .catch((error) => {
        // 실패
        console.error(error);
        alert("인증 문자 전송에 실패하였습니다.");
      });
  } else {
    additionalArea.style.visibility = "visible";
  }
});

form2.addEventListener("submit", (event) => {
  event.preventDefault();
  const phoneNumber = document.getElementById("phoneNumber").value;
  const verifyNumber = document.getElementById("verifyNumber").value;

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
    // send 후 confirm 으로 true 값 변경 -> 성공시 다시 axios 로 finduser 요청.
    .then((response) => {
      // 성공

      alert("인증에 성공하였습니다.");
      axios
        .post(
          "https://api.servicetori.site/api/accounts/finduser",
          {
            phone_number: phoneNumber,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // 성공

          const userId = response.data.username;
          sessionStorage.setItem("userId", userId);
          window.location.href = "./IdResult.html";
        })
        .catch((error) => {
          // 실패
          console.error(error);
        });
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("인증에 실패하였습니다.");
    });
});
