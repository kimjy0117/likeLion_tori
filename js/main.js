const title = document.getElementById('title');
const user = document.getElementById('user');
const like = document.getElementById('likeIcon');
const count = document.getElementById('count');

let text = "토마토 첫 수확!";
let id = "농부좋아";
let logo = "../img/logo30.svg";
let blikeIcon = "../img/heart25.png";
let likeIcon = "../img/blueheart25.png";
let likeCount= 0;

setTimeout(update, 0);

function update(){
    title.innerHTML = text;
    user.innerHTML = id;
    document.getElementById('logo').src= logo;
}

function likeEvent(){
    if (likeCount == 0){
        like.src = likeIcon;
        likeCount += 1;
        count.innerHTML = likeCount;
    }

    else{
        like.src = blikeIcon
        likeCount -= 1;
        count.innerHTML = likeCount;
    }
}