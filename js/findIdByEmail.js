const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  axios
    .post(
      "http://3.36.100.188/api/accounts/finduser/send",
      {
        email: email,
      },
      {
        withCredentials: true,
      }
    )

    .then((response) => {
      // 성공
      console.log(response); // test
      alert("이메일이 전송되었습니다.");
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("사용자 인증에 실패하였습니다.");
    });
});
