const title = document.getElementById('title');
const date = document.getElementById('date');
const userName = document.getElementById('userName');
const text = document.getElementById('text');
const like = document.getElementById('likeIcon');
const count = document.getElementById('count');

const searchParams = new URLSearchParams(location.search);
let postId = searchParams.get('postId');
//let postNum = searchParams.get('postNum');
let postNum;
let likesOrLatest = searchParams.get('likesOrLatest');

let sessionData = sessionStorage.getItem("access");
let token = "Bearer "+ sessionData;
let getPost = `https://api.servicetori.site/api/posts/posts/`;
let getUser = "https://api.servicetori.site/api/accounts/dj-rest-auth/user";
let deletePost = `https://api.servicetori.site/api/posts/posts/${postId}/`;
let postLike = `https://api.servicetori.site/api/posts/posts/${postId}/like/`;

if(likesOrLatest == 0){
    getPost = "https://api.servicetori.site/api/posts/posts/?order=";
}
else{
    getPost = "https://api.servicetori.site/api/posts/posts/?order=popular";
}

// 포스트 정보 가져오기
axios
    .get(getPost,
    )
    .then(function (response){
        //성공 시
        for(let i=0; i<response.data.length; i++){
            if(postId == response.data[i].id){
                postNum = i;
            }
        }

        let postWriter = response.data[postNum].writer.nickname;
        postHandler(response, postNum);
        commentBtnHandler(postId);
        getUserDataHandler(postWriter);
    })
    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
    })
    .finally(function(){
     //항상 실행되는 함수
    });


    // 포스트 보여지는 함수
    function postHandler(response, postId){
        let logo = "../img/logo30.svg";

        if (response.data[postId].writer.profile_image != null){
            logo = "https://api.servicetori.site" + response.data[postId].writer.profile_image;
        }

        let time = response.data[postId].created_at.split('-');
        let time1 = time[0]+"."+time[1]+"."+time[2];
        let redate = time1.split('T')[0];
        let nickname = response.data[postId].writer.nickname;
        let titleText = response.data[postId].title;
        let contentText = response.data[postId].content;
        
        document.getElementById('logo').src= logo;
        document.getElementById('logo').style.width = "30px";
        document.getElementById('logo').style.height = "30px";
        document.getElementById('logo').style.borderRadius = "50%";
        document.getElementById('logo').style.backgroundColor = "transparent";

        title.innerHTML = titleText;
        date.innerHTML = redate;
        userName.innerHTML = nickname;
        text.innerHTML = contentText;
    }

    function commentBtnHandler(id){
        let chatIcon = document.getElementById('chatA');
        chatIcon.href = `./comment.html?postId=${id}&postNum=${postNum}`;
    }


function getUserDataHandler(postWriter){
    // 유저 정보 가져오기
    axios
    .get(getUser,
        {
            headers: {Authorization: token,},
         }
    )
    .then(function (response){
        //성공 시
        hideLoginBtn();

        console.log('userData');
        console.log(response);

        console.log('사용자 동일 여부');
        console.log(response.data.nickname);
        console.log(postWriter);
        
        if(response.data.nickname === postWriter){
            createPatchDelBtn();
        }
    })
    .catch(function (error){
        showLoginBtn();
        //에러 시
        console.log(error);
    })
};

    function createPatchDelBtn(){
        let btnArea = document.querySelector(".btnArea");

        const divPaDel = document.createElement('div');
        const patchATag = document.createElement('a');
        const deleteBtn = document.createElement('button');
        const patchSpan = document.createElement('span');
        const deleteSpan = document.createElement('span');
        const sepSpan = document.createElement('span');

        divPaDel.id = 'divPaDel';
        patchATag.id = 'patchATag';
        deleteBtn.id = 'deleteBtn';

        patchATag.href = `./postPatch.html?postId=${postId}`;
        patchATag.style.textDecoratio = "none";

        patchSpan.innerHTML = "수정";
        patchSpan.style.fontSize = "20px";
        patchSpan.style.fontWeight = "600";
        patchSpan.style.color = "#2E3134B2";     

        sepSpan.innerHTML = "  /  ";
        sepSpan.style.fontSize = "20px";
        sepSpan.style.fontWeight = "600";
        sepSpan.style.color = "#2E3134B2";   

        deleteSpan.innerHTML = "삭제";
        deleteSpan.style.fontSize = "20px";
        deleteSpan.style.fontWeight = "600";
        deleteSpan.style.color = "#2E3134B2";
        
        patchATag.appendChild(patchSpan);
        deleteBtn.appendChild(deleteSpan);

        divPaDel.appendChild(patchATag);
        divPaDel.appendChild(sepSpan);
        divPaDel.appendChild(deleteBtn);

        btnArea.appendChild(divPaDel);

        deleteBtn.onclick = function(){
            deleteBtnHandler();
        }

        function deleteBtnHandler(){
            axios
                .delete(
                    deletePost,
                    {
                        "id": postId,
                    },
                    {
                        headers: {
                        "Authorization": token,
                    },
                    })
                    .then((response) => {
                        // 성공
                        alert("게시물이 삭제되었습니다.");  
                        window.location.href = "./index.html";
                    })
    
                    .catch((error) => {
                        // 실패
                        console.error(error);
                        alert("실패하였습니다.");
                        warning.style.visibility = hidden;
                }
            )
        };
    };




    // 좋아요 버튼 이벤트
let blikeIcon = "../img/heart.png";
let likeIcon = "../img/blueheart.svg";
let likeCount= 0;

function likeEvent(){

    if (likeCount == 0){
        like.src = likeIcon;
        likeCount += 1;
    }

    else{
        like.src = blikeIcon
        likeCount -= 1;
    }
    
    axios
    .post(
        postLike,
        {
            "id": postId,
        },
        {
            headers: {
             "Authorization": token,
           },
        })
        .then((response) => {
            // 성공
        })

        .catch((error) => {
            // 실패
            console.error(error);
            alert("로그인 후 시도해주세요.");
            warning.style.visibility = hidden;
    });
};

function hideLoginBtn(){
    $(document).ready(function(){
        $("#login").hide();
    });
}

function showLoginBtn(){
    $(document).ready(function(){
        $("#login").show();
    });
}