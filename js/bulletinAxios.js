const title = document.getElementById('title');
const date = document.getElementById('date');
const userName = document.getElementById('userName');
const text = document.getElementById('text');
const like = document.getElementById('likeIcon');
const count = document.getElementById('count');

let token = "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMTM5MDEzLCJpYXQiOjE2OTIxMzE4MTMsImp0aSI6IjU1YjBlZjUwYWU5ZTRkZWJiYzU3YmE5NjFjNzFjNjFhIiwidXNlcl9pZCI6MX0.wnKEFP_QLawdiptDirneutZgHtadg1-OxMGizPbJCD0";
let getPostId = "https://servicetori.site/api/posts/posts/4/"

axios
    .get(getPostId,
    {
        headers: {Authorization: token}
    },
    )
    .then(function (response){
        //성공 시
        console.log(response);

        let logo = "../img/logo30.svg";
        let time = response.data.created_at.split('-');
        let time1 = time[0]+"."+time[1]+"."+time[2];
        let redate = time1.split('T')[0];
        let id = response.data.writer;
        let titleText = response.data.title;
        let contentText = response.data.content;
        
        document.getElementById('logo').src= logo;
        title.innerHTML = titleText;
        date.innerHTML = redate;
        userName.innerHTML = id;
        text.innerHTML = contentText;
    })
    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
    })
    .finally(function(){
     //항상 실행되는 함수
    });

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
}