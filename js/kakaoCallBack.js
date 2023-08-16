/* 
1. 카카오에서 보낸 인가코드를 get으로 받고 
2. 받아서 백엔드에 post 요청을 보내고 
3. reponse로 access token 을 받음 
*/

window.addEventListener("load", () => {
  let code = new URL(window.location.href).searchParams.get("code");
  axios
    .post(
      "https://api.servicetori.site/api/accounts/social/kakao/login/finish",
      {
        code: code,
      },
      {
        withCredentials: true,
      }
    )

    .then((response) => {
      console.log(response);
      alert("소셜 로그인에 성공하였습니다.");
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error(error);
      alert("소셜 로그인에 실패하였습니다.");
      window.location.href = "./login.html";
    });
});