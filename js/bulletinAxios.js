const title = document.getElementById('title');
const date = document.getElementById('date');
const userName = document.getElementById('userName');
const text = document.getElementById('text');
const like = document.getElementById('likeIcon');
const count = document.getElementById('count');

const searchParams = new URLSearchParams(location.search);
let id = searchParams.get('id')

let token = "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMjI2MDU2LCJpYXQiOjE2OTIyMTg4NTYsImp0aSI6IjA3YmZkYTI1MWFkMDRkZjM4YTJlMzFlYTU4MWYyMGI1IiwidXNlcl9pZCI6MX0.2HuTZOYLzRsEuYqSqDnSoljolsnR8v2SlCmq1BgzVnM";
let getPost = "https://api.servicetori.site/api/posts/posts/";
let postLike = `https://api.servicetori.site/api/posts/posts/${id}/like/`;

axios
    .get(getPost,
    )
    .then(function (response){
        //성공 시
        console.log(response);
        postHandler(response, id);
        commentBtnHandler(id);
    })
    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
    })
    .finally(function(){
     //항상 실행되는 함수
    });

    function postHandler(response, id){
        id = response.data.length - id;
        let logo = "../img/logo30.svg";
        let time = response.data[id].created_at.split('-');
        let time1 = time[0]+"."+time[1]+"."+time[2];
        let redate = time1.split('T')[0];
        let nickname = response.data[id].writer;
        let titleText = response.data[id].title;
        let contentText = response.data[id].content;
        let newText;

        if(titleText.indexOf("http://3.36.100.188") !== -1 ){
            newText = titleText.split('http://3.36.100.188');
            titleText = newText[0]+"https://api.servicetori.site"+newText[1];
        }
        
        document.getElementById('logo').src= logo;
        title.innerHTML = titleText;
        date.innerHTML = redate;
        userName.innerHTML = nickname;
        text.innerHTML = contentText;
    }

    function commentBtnHandler(id){
        let chatIcon = document.getElementById('chatA');
        chatIcon.href = `./comment.html?id=${id}`;
    }

let blikeIcon = "../img/heart.png";
let likeIcon = "../img/blueheart.png";
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
            "id": id,
        },
        {
            headers: {
             "Authorization": token,
           },
        })
        .then((response) => {
            // 성공
            console.log(response);    
        })

        .catch((error) => {
            // 실패
            console.error(error);
            alert("로그인 후 시도해주세요.");
            warning.style.visibility = hidden;
    });

}
