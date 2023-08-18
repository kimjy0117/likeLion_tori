const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const auth_answer = document.querySelector("#auth_answer").value;

  axios
    .post(
      "https://api.servicetori.site/api/accounts/dj-rest-auth/password/reset",
      {
        username: username,
        email: email,
        auth_answer: auth_answer,
      },
      {
        withCredentials: true,
      }
    )

    .then((response) => {
      // 성공

      alert("인증에 성공하였습니다.");
      const uid = response.data.uid;
      const token = response.data.token;
      sessionStorage.setItem("uid", uid);
      sessionStorage.setItem("token", token);
      window.location.href = "./pwReset.html";
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("사용자 인증에 실패하였습니다.");
    });
});
