let sessionData = sessionStorage.getItem("access");
let token = "Bearer " + sessionData;

function createPost(length, data) {
  const container = document.querySelector(".container");
  for (let i = 0; i < length; i++) {
    // 이미지 파일이 있을때
    if (data[i].images.length > 0) {
      const divBox = document.createElement("div");
      const divImg = document.createElement("div");
      const divTitle = document.createElement("div");
      const divBottom = document.createElement("div");
      const divUser = document.createElement("div");
      const divLike = document.createElement("div");
      const titleSpan = document.createElement("span");
      const userSpan = document.createElement("span");
      const likeSpan = document.createElement("span");
      const userImg = document.createElement("img");
      const heartImg = document.createElement("img");
      const img = document.createElement("img");
      const aTag = document.createElement("a");

      let title;

      // 제목이 14자 이상일 경우 13자로 자르기
      if (data[i].title.length > 13) {
        title = data[i].title.substr(0, 13) + "...";
      } else {
        title = data[i].title;
      }

      divBox.id = "divBox";
      divImg.id = "divImg";
      divTitle.id = "divTitle";
      divBottom.id = "divBottom";
      divUser.id = "divUser";
      divLike.id = "divLike";

      aTag.href = `./bulletin.html?postId=${data[i].id}&likesOrLatest=0`;

      titleSpan.innerHTML = title;
      titleSpan.style.fontSize = "25px";
      titleSpan.style.fontWeight = "700";

      userSpan.innerHTML = data[i].writer.nickname;
      userSpan.style.fontSize = "16px";
      userSpan.style.fontWeight = "600";
      userSpan.style.marginLeft = "7px";

      likeSpan.innerHTML = data[i].like_count;
      likeSpan.style.fontSize = "15px";
      likeSpan.style.fontWeight = "500";

      userImg.src = "../img/logo30.svg";
      if(data[i].writer.profile_image != null){
          userImg.src = "https://api.servicetori.site" + data[i].writer.profile_image;
      }
      userImg.style.width = "30px";
      userImg.style.height = "30px";
      userImg.style.borderRadius = "50%";
      userImg.style.backgroundColor = "transparent";

      heartImg.src = "../img/blueheart25.svg";
      divBox.style.color = "black";

      img.src = "https://api.servicetori.site" + data[i].images[0].image;
      img.style.width = "338px";
      img.style.height = "260px";
      img.style.borderTopLeftRadius = "10px";
      img.style.borderTopRightRadius = "10px";

      divImg.appendChild(img);
      divTitle.appendChild(titleSpan);
      divUser.appendChild(userImg);
      divUser.appendChild(userSpan);
      divLike.appendChild(heartImg);
      divLike.appendChild(likeSpan);

      divBottom.appendChild(divUser);
      divBottom.appendChild(divLike);

      divBox.appendChild(divImg);
      divBox.appendChild(divTitle);
      divBox.appendChild(divBottom);

      aTag.appendChild(divBox);

      container.appendChild(aTag);
    }

    // 이미지 파일이 없을때
    else {
      const divBox = document.createElement("div");
      const divTop = document.createElement("div");
      const divContent = document.createElement("div");
      const divBottom = document.createElement("div");
      const divUser = document.createElement("div");
      const divLike = document.createElement("div");
      const titleSpan = document.createElement("span");
      const contentSpan = document.createElement("span");
      const userSpan = document.createElement("span");
      const likeSpan = document.createElement("span");
      const userImg = document.createElement("img");
      const heartImg = document.createElement("img");
      const aTag = document.createElement("a");

      let title;
      let content;

      // 제목이 14자 이상일 경우 13자로 자르기
      if (data[i].title.length > 13) {
        title = data[i].title.substr(0, 13) + "...";
      } else {
        title = data[i].title;
      }

      // 내용이 71자 이상일 경우 70자로 자르기
      if (data[i].content.length > 70) {
        content = data[i].content.substr(0, 70) + "...";
      } else {
        content = data[i].content;
      }

      divBox.id = "divBox";
      divTop.id = "divTop";
      divContent.id = "divContent";
      divBottom.id = "divBottom";
      divUser.id = "divUser";
      divLike.id = "divLike";

      aTag.href = `./bulletin.html?postId=${data[i].id}&likesOrLatest=0`;

      titleSpan.innerHTML = title;
      titleSpan.style.fontSize = "25px";
      titleSpan.style.fontWeight = "700";
      titleSpan.style.marginLeft = "11px";

      contentSpan.innerHTML = content;
      contentSpan.style.fontSize = "15px";
      contentSpan.style.fontWeight = "400";
      contentSpan.style.marginLeft = "11px";

      userSpan.innerHTML = data[i].writer.nickname;
      userSpan.style.fontSize = "16px";
      userSpan.style.fontWeight = "600";
      userSpan.style.marginLeft = "7px";

      likeSpan.innerHTML = data[i].like_count;
      likeSpan.style.fontSize = "15px";
      likeSpan.style.fontWeight = "500";

      userImg.src = "../img/logo30.svg";
            if(data[i].writer.profile_image != null){
                userImg.src = "https://api.servicetori.site" + data[i].writer.profile_image;
            }
            userImg.style.width = "30px";
            userImg.style.height = "30px";
            userImg.style.borderRadius = "50%";
            userImg.style.backgroundColor = "transparent";

      heartImg.src = "../img/blueheart25.svg";
      divBox.style.color = "black";

      divTop.appendChild(titleSpan);
      divContent.appendChild(contentSpan);
      divUser.appendChild(userImg);
      divUser.appendChild(userSpan);
      divLike.appendChild(heartImg);
      divLike.appendChild(likeSpan);

      divBottom.appendChild(divUser);
      divBottom.appendChild(divLike);

      divBox.appendChild(divTop);
      divBox.appendChild(divContent);
      divBox.appendChild(divBottom);

      aTag.appendChild(divBox);

      container.appendChild(aTag);
    }
  }
}
const form = document.querySelector("#searchForm");

const search = document.querySelector("#inputIcon");

search.addEventListener("click", (event) => {
  event.preventDefault();

  const search = document.querySelector("#search").value;

  const params = {
    search: search,
  };

  axios
    .get(
      "https://api.servicetori.site/api/posts/posts",
      {
        params: params,
      },
      {
        withCredentials: true,
        headers: { Authorization: token },
      }
    )
    .then((response) => {

      let data = response.data;
      let postLength = response.data.length;

      if (postLength > 0) {
        createPost(postLength, data);
      }
    })
    .catch((error) => {
      // 실패
      console.error(error);
    });
});

function enterKey(event) {
  event.preventDefault
  const search2 = document.querySelector("#search").value;
  const params = {
    search: search2,
  };

  axios
    .get(
      "https://api.servicetori.site/api/posts/posts",
      {
        params: params,
      },
      {
        withCredentials: true,
        headers: { Authorization: token },
      }
    )
    .then((response) => {

      let data = response.data;
      let postLength = response.data.length;

      if (postLength > 0) {
        createPost(postLength, data);
      }
    })
    .catch((error) => {
      // 실패
      console.error(error);
    });
}