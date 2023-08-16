const title = document.getElementById('title');
const date = document.getElementById('date');
const userName = document.getElementById('userName');
const text = document.getElementById('text');
const like = document.getElementById('likeIcon');
const count = document.getElementById('count');

let id = 2;
function changeId(value){
    id = value;
    console.log(id);
}

let token = "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMTk1Njk3LCJpYXQiOjE2OTIxODg0OTcsImp0aSI6IjM5ZTBkOTY0NDA2YTQ0NWVhZTExNTU0M2NiMzhhN2EwIiwidXNlcl9pZCI6MX0.-IOnb2L0leNShOiDQl6uP5hjdUJDT_NU4eT7juYaI-g";
let getPost = "https://api.servicetori.site/api/posts/posts/";
let postLike = `https://api.servicetori.site/api/posts/posts/${id}/like/`;

axios
    .get(getPost,
    )
    .then(function (response){
        //성공 시
        console.log(response);
        postHandler(response, id);       
    })
    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
        console.log(id);
    })
    .finally(function(){
     //항상 실행되는 함수
    });

    function postHandler(response, id){
        let logo = "../img/logo30.svg";
        let time = response.data[id].created_at.split('-');
        let time1 = time[0]+"."+time[1]+"."+time[2];
        let redate = time1.split('T')[0];
        let nickname = response.data[id].writer;
        let titleText = response.data[id].title;
        let contentText = response.data[id].content;
        
        document.getElementById('logo').src= logo;
        title.innerHTML = titleText;
        date.innerHTML = redate;
        userName.innerHTML = nickname;
        text.innerHTML = contentText;
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
            alert("좋아요를 눌렀습니다.");    
        })

        .catch((error) => {
            // 실패
            console.error(error);
            alert("좋아요 실패하였습니다.");
            warning.style.visibility = hidden;
    });

}
