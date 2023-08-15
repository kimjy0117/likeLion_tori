document.addEventListener("DOMContentLoaded", () => {
  // 페이지의 DOM이 완전히 로드되었을 때 실행되는 코드
  const userId = sessionStorage.getItem("foundUserId");
  if (userId) {
    const result = document.querySelector("#emphasize");
    result.innerText = userId;
    // 찾은 값 넘겨주기
  }
});
