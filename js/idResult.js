document.addEventListener("DOMContentLoaded", () => {
  // 페이지의 DOM이 완전히 로드되었을 때 실행되는 코드
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    const result = document.querySelector("#emphasize");
    result.innerText = userId;
    // 찾은 값 표시하고 다시 정보 삭제
    sessionStorage.removeItem(userId);
  }
});
