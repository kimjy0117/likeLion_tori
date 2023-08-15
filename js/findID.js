const form = document.querySelector("#verify");
// form1 : 핸드폰 번호 입력
const form2 = document.querySelector("#verifyNum");
// form2 : 받은 인증번호 입력
const additionalArea = document.querySelector(".anotherWay");
// 추가적인 영역 (이메일로 넘어가기)
const getNum = document.querySelector("#btn1");
// form1 : 인증번호 받기 버튼
const phoneNumCheck = document.querySelector("#btn2");
// 핸드폰 번호 올바르지 않으면 유효성 검사에서 해당 p 출력
const innerExplain = document.querySelector("#innerExplain");
const line = document.querySelector("#line");

function areaAdd() {
  // form2 를 생성하기 위한 동적인 함수.
  form2.style.visibility = "visible";
  phoneNumCheck.style.visibility = "visible";
  alert("인증번호를 발송하였습니다.");
  innerExplain.innerText = "문자로 전송된 인증번호를 입력해주세요.";
}

function removeArea() {
  additionalArea.style.visibility = "hidden";
  line.style.visibility = "hidden";
}

// 첫번째 form : 핸드폰 번호 입력
form.addEventListener("submit", (event) => {
  event.preventDefault();
  var regex = /^01([0|1|6|7|8|9])?\d{3,4}?\d{4}$/;
  const phoneNumber = document.getElementById("phoneNumber").value;

  if (regex.test(phoneNumber) == true) {
    axios
      .post(
        "http://3.36.100.188/api/accounts/smsauth/send",
        {
          phone_number: phoneNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // 성공
        console.log(response); // test
        phoneNumCheck.style.visibility = "hidden";
        areaAdd();
        removeArea();
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
  const phoneNumber = document.getElementById("phoneNumber").value;
  const verifyNumber = document.getElementById("verifyNumber").value;

  axios
    .post(
      "http://3.36.100.188/api/accounts/smsauth/confirm",
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
      console.log(response); // test
      alert("인증에 성공하였습니다.");
      axios
        .post(
          "http://3.36.100.188/api/accounts/finduser",
          {
            phone_number: phoneNumber,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // 성공
          console.log(response); // test
          const userId = response.data.username;
          sessionStorage.setItem("foundUserId", userId);
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
