const title = document.getElementById('title');
const text = document.getElementById('text');
const user = document.getElementById('user');
const like = document.getElementById('likeIcon');
const count = document.getElementById('count');

axios
    .get("https://servicetori.site/api/posts/posts/32/",
    {
        headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxOTg0MDU3LCJpYXQiOjE2OTE5NzY4NTcsImp0aSI6ImE0NTUwZWU3NGViODQyZTM5OWEzYTE1MjFiZmI5N2Y3IiwidXNlcl9pZCI6MX0.UJBEQYxjpweEEhdx4j8pWTeU7xWM0TwwcPf2du0HmeQ"}
    },
    )
    .then(function (response){
        //성공 시
        alert("성공");
        
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