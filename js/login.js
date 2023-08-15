const form_login = document.querySelector("#form-login");
const warning = document.querySelector(".pwCheck");

function warningText() {
  warning.style.visibility = "visible";
}
form_login.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  axios
    .post(
      "https://servicetori.site/api/accounts/dj-rest-auth/login",
      {
        username: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      // 성공
      console.log(response); // test
      alert("로그인에 성공하였습니다.");
      // window.location.href = "./index.html";
    })
    .catch((error) => {
      // 실패
      console.error(error);

      // warning.style.visibility = visible;
      alert("로그인에 실패하였습니다.");
      warningText();
    });
});
