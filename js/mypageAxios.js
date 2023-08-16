const userName = document.getElementById('userName');
const userIntro = document.getElementById('userIntro');

let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMjI1NjY1LCJpYXQiOjE2OTIyMTg0NjUsImp0aSI6IjExNWI2MTZiZjc3YzQwNjQ5NjJiYWQwMDE1ZTgwMTA4IiwidXNlcl9pZCI6MX0.B7j3uumLiWg-3VEF9y8oolGWxRDJBdNtazZqbRWq2AM";
let getUser = "https://api.servicetori.site/api/accounts/dj-rest-auth/user";
let get1Post = "https://api.servicetori.site/api/posts/posts/?mypage=posts";
let get2Post = "https://api.servicetori.site/api/posts/posts/?mypage=comments";
let get3Post = "https://api.servicetori.site/api/posts/posts/?mypage=likes";

const rectangle1 = document.querySelector('.rectangle1');
const rectangle2 = document.querySelector('.rectangle2');
const rectangle3 = document.querySelector('.rectangle3');

// 유저 정보
axios
    .get(getUser,    
        {
            headers: {"Authorization": token,},
         }
    )
    .then(function (response){

        // let logo = response.data.profile_image;
        let logo = "../img/logo80.svg";
        let nickname = response.data.nickname;
        let introduce = response.data.introduce;
        
        document.getElementById('logo').src = logo;
        userName.innerHTML = nickname;
        userIntro.innerHTML = introduce;
    })
    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
    })

// 작상한 글 정보
axios
    .get(get1Post,
        {
            headers: {"Authorization": token,},
         }
    )
    .then(function (response){
        //성공 시
        alert("성공1");
        console.log(response);
    
        let postLength = response.data.length;

        if (postLength>0){
            createBulletin1(postLength, response.data);
        }

        else{
            emptyDataHandler1();
        }
    })
    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
    })

// 댓글단 글 정보
axios
    .get(get2Post,
        {
            headers: {"Authorization": token,},
         }
    )
    .then(function (response){
        //성공 시
        alert("성공2");
        console.log(response);
        
        let postLength = response.data.length;

        if (postLength>0){
            createBulletin2(postLength, response.data);
        }

        else{
            emptyDataHandler2();
        }
    })

    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
    })

// 좋아요한 글 정보
axios
    .get(get3Post,
        {
            headers: {"Authorization": token,},
        }
    )
    .then(function (response){
        //성공 시
        alert("성공3");
        console.log(response);
        
        let postLength = response.data.length;

        if (postLength>0){
            createBulletin3(postLength, response.data);
        }

        else{
            emptyDataHandler3();
        }
    })
    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
    })

//내가 쓴 글
function createBulletin1(length, data){
    for (let i=0; i<length; i++){
        if(data[i].images.length>0){
            const div = document.createElement('div');
            const divIntro = document.createElement('div');
            const divtitle = document.createElement('div');
            const divuser = document.createElement('div');
            const img = document.createElement('img');
            const userImg = document.createElement('img');
            const titlespan = document.createElement('span');
            const userspan = document.createElement('span');
            const aTag = document.createElement('a');

            div.id = 'bulletinPost';
            divIntro.id = 'divIntro';
            divtitle.id = 'divtitle';
            divuser.id = 'divuser';
            aTag.id = 'aTag';

            aTag.href=`./bulletin.html?id=${data[i].id}`;

            titlespan.innerHTML = data[i].title;
            titlespan.style.fontSize = "20px";
            titlespan.style.fontWeight = "700";
            titlespan.style.color = "white";

            userspan.innerHTML = data[i].writer;
            userspan.style.color = "white";
            userspan.style.fontSize = "11px";
            userspan.style.fontWeight = "600";
            userspan.style.marginLeft = "5px";

            userImg.src = "../img/logo20.svg";
            
            img.src = "https://api.servicetori.site" + data[i].images[0].image;
            img.style.width = "165px";
            img.style.height = "198px";
            img.style.borderRadius = "20px";
                        
            divtitle.appendChild(titlespan);
            divuser.appendChild(userImg);
            divuser.appendChild(userspan);

            divIntro.appendChild(divtitle);
            divIntro.appendChild(divuser);

            div.appendChild(img);
            div.appendChild(divIntro);

            aTag.appendChild(div);

            rectangle1.appendChild(aTag);
        }

        else {
             if(data[i].title.length < 8){
                const div = document.createElement('div');
                const divTitle = document.createElement('div');
                const divContent = document.createElement('div');
                const divUser = document.createElement('div');
                const titleSpan = document.createElement('span');
                const textSpan = document.createElement('span');
                const userSpan = document.createElement('span');
                const userImg = document.createElement('img');
                const aTag = document.createElement('a');

                let text;

                if(data[i].content.length > 50){
                    text = data[i].content.substr(0, 50);
                }

                else{
                    text = data[i].content;
                }

                div.id = `bulletinPost`;
                divTitle.id = 'divTitle';
                divContent.id = 'divContent';
                divUser.id = 'divUser';
                aTag.id = 'aTag';

                aTag.href=`./bulletin.html?id=${data[i].id}`;
                
                titleSpan.innerHTML = data[i].title;
                titleSpan.style.fontSize = "20px";
                titleSpan.style.fontWeight = "700";

                textSpan.innerHTML = text;
                textSpan.style.fontSize = "13px";
                textSpan.style.fontweight = "400";

                userImg.src = "../img/logo20.svg";

                userSpan.innerHTML = data[i].writer;
                userSpan.style.fontSize = "11px";
                userSpan.style.fontWeight = "600";
                userSpan.style.marginLeft = "5px";

                div.style.color = "black";
            
                divTitle.appendChild(titleSpan);
                divContent.appendChild(textSpan);
                divUser.appendChild(userImg);
                divUser.appendChild(userSpan);
                
                div.appendChild(divTitle);
                div.appendChild(divContent);
                div.appendChild(divUser);

                aTag.appendChild(div);

                rectangle1.appendChild(aTag);
             }

             else{
                const div = document.createElement('div');
                const divTitle1 = document.createElement('div');
                const divUser = document.createElement('div');
                const titleSpan = document.createElement('span');
                const userSpan = document.createElement('span');
                const userImg = document.createElement('img');
                const aTag = document.createElement('a');

                div.id = `bulletinPost`;
                divTitle1.id = 'divTitle1';
                divUser.id = 'divUser';
                aTag.id = 'aTag';

                aTag.href=`./bulletin.html?id=${data[i].id}`;
                
                titleSpan.innerHTML = data[i].title;
                titleSpan.style.fontSize = "20px";
                titleSpan.style.fontWeight = "700";

                userImg.src = "../img/logo20.svg";

                userSpan.innerHTML = data[i].writer;
                userSpan.style.fontSize = "11px";
                userSpan.style.fontWeight = "600";
                userSpan.style.marginLeft = "5px";
            
                divTitle1.appendChild(titleSpan);
                divUser.appendChild(userImg);
                divUser.appendChild(userSpan);
                
                div.appendChild(divTitle1);
                div.appendChild(divUser);

                aTag.appendChild(div);

                rectangle1.appendChild(aTag);
            }
        }
    }
}    

// 댓글단 글
function createBulletin2(length, data){
    for (let i=0; i<length; i++){
        if(data[i].images.length>0){
            const div = document.createElement('div');
            const divIntro = document.createElement('div');
            const divtitle = document.createElement('div');
            const divuser = document.createElement('div');
            const img = document.createElement('img');
            const userImg = document.createElement('img');
            const titlespan = document.createElement('span');
            const userspan = document.createElement('span');
            const aTag = document.createElement('a');

            div.id = 'bulletinPost';
            divIntro.id = 'divIntro';
            divtitle.id = 'divtitle';
            divuser.id = 'divuser';
            aTag.id = 'aTag';

            aTag.href=`./bulletin.html?id=${data[i].id}`;

            titlespan.innerHTML = data[i].title;
            titlespan.style.fontSize = "20px";
            titlespan.style.fontWeight = "700";
            titlespan.style.color = "white";

            userspan.innerHTML = data[i].writer;
            userspan.style.color = "white";
            userspan.style.fontSize = "11px";
            userspan.style.fontWeight = "600";
            userspan.style.marginLeft = "5px";

            userImg.src = "../img/logo20.svg";
            
            img.src = "https://api.servicetori.site" + data[i].images[0].image;
            img.style.width = "165px";
            img.style.height = "198px";
            img.style.borderRadius = "20px";
            
            divtitle.appendChild(titlespan);
            divuser.appendChild(userImg);
            divuser.appendChild(userspan);

            divIntro.appendChild(divtitle);
            divIntro.appendChild(divuser);

            div.appendChild(img);
            div.appendChild(divIntro);

            aTag.appendChild(div);

            rectangle2.appendChild(aTag);
        }

        else {
             if(data[i].title.length < 8){
                const div = document.createElement('div');
                const divTitle = document.createElement('div');
                const divContent = document.createElement('div');
                const divUser = document.createElement('div');
                const titleSpan = document.createElement('span');
                const textSpan = document.createElement('span');
                const userSpan = document.createElement('span');
                const userImg = document.createElement('img');
                const aTag = document.createElement('a');
                let text;

                if(data[i].content.length > 50){
                    text = data[i].content.substr(0, 50);
                }

                else{
                    text = data[i].content;
                }

                div.id = `bulletinPost`;
                divTitle.id = 'divTitle';
                divContent.id = 'divContent';
                divUser.id = 'divUser';
                aTag.id = 'aTag';
                
                aTag.href=`./bulletin.html?id=${data[i].id}`;

                titleSpan.innerHTML = data[i].title;
                titleSpan.style.fontSize = "20px";
                titleSpan.style.fontWeight = "700";

                textSpan.innerHTML = text;
                textSpan.style.fontSize = "13px";
                textSpan.style.fontweight = "400";

                userImg.src = "../img/logo20.svg";

                userSpan.innerHTML = data[i].writer;
                userSpan.style.fontSize = "11px";
                userSpan.style.fontWeight = "600";
                userSpan.style.marginLeft = "5px";
            
                divTitle.appendChild(titleSpan);
                divContent.appendChild(textSpan);
                divUser.appendChild(userImg);
                divUser.appendChild(userSpan);
                
                div.appendChild(divTitle);
                div.appendChild(divContent);
                div.appendChild(divUser);

                aTag.appendChild(div);

                rectangle2.appendChild(aTag);
             }

             else{
                const div = document.createElement('div');
                const divTitle1 = document.createElement('div');
                const divUser = document.createElement('div');
                const titleSpan = document.createElement('span');
                const userSpan = document.createElement('span');
                const userImg = document.createElement('img');
                const aTag = document.createElement('a');

                div.id = `bulletinPost`;
                divTitle1.id = 'divTitle1';
                divUser.id = 'divUser';
                aTag.id = 'aTag';
                
                aTag.href=`./bulletin.html?id=${data[i].id}`;

                titleSpan.innerHTML = data[i].title;
                titleSpan.style.fontSize = "20px";
                titleSpan.style.fontWeight = "700";

                userImg.src = "../img/logo20.svg";

                userSpan.innerHTML = data[i].writer;
                userSpan.style.fontSize = "11px";
                userSpan.style.fontWeight = "600";
                userSpan.style.marginLeft = "5px";
            
                divTitle1.appendChild(titleSpan);
                divUser.appendChild(userImg);
                divUser.appendChild(userSpan);
                
                div.appendChild(divTitle1);
                div.appendChild(divUser);

                aTag.appendChild(div);

                rectangle2.appendChild(aTag);
            }
        }
    }
}    

// 좋아요한 글
function createBulletin3(length, data){
    for (let i=0; i<length; i++){
        if(data[i].images.length>0){
            const div = document.createElement('div');
            const divIntro = document.createElement('div');
            const divtitle = document.createElement('div');
            const divuser = document.createElement('div');
            const img = document.createElement('img');
            const userImg = document.createElement('img');
            const titlespan = document.createElement('span');
            const userspan = document.createElement('span');
            const aTag = document.createElement('a');

            div.id = 'bulletinPost';
            divIntro.id = 'divIntro';
            divtitle.id = 'divtitle';
            divuser.id = 'divuser';
            aTag.id = 'aTag';

            aTag.href=`./bulletin.html?id=${data[i].id}`;

            titlespan.innerHTML = data[i].title;
            titlespan.style.fontSize = "20px";
            titlespan.style.fontWeight = "700";
            titlespan.style.color = "white";

            userspan.innerHTML = data[i].writer;
            userspan.style.color = "white";
            userspan.style.fontSize = "11px";
            userspan.style.fontWeight = "600";
            userspan.style.marginLeft = "5px";

            userImg.src = "../img/logo20.svg";
            
            img.src = "https://api.servicetori.site" + data[i].images[0].image;
            img.style.width = "165px";
            img.style.height = "198px";
            img.style.borderRadius = "20px";
            
            divtitle.appendChild(titlespan);
            divuser.appendChild(userImg);
            divuser.appendChild(userspan);

            divIntro.appendChild(divtitle);
            divIntro.appendChild(divuser);

            div.appendChild(img);
            div.appendChild(divIntro);
            
            aTag.appendChild(div);

            rectangle3.appendChild(aTag);
        }

        else {
             if(data[i].title.length < 8){
                const div = document.createElement('div');
                const divTitle = document.createElement('div');
                const divContent = document.createElement('div');
                const divUser = document.createElement('div');
                const titleSpan = document.createElement('span');
                const textSpan = document.createElement('span');
                const userSpan = document.createElement('span');
                const userImg = document.createElement('img');
                const aTag = document.createElement('a');
                let text;

                if(data[i].content.length > 50){
                    text = data[i].content.substr(0, 50);
                }

                else{
                    text = data[i].content;
                }

                div.id = `bulletinPost`;
                divTitle.id = 'divTitle';
                divContent.id = 'divContent';
                divUser.id = 'divUser';
                aTag.id = 'aTag';

                aTag.href=`./bulletin.html?id=${data[i].id}`;
                
                titleSpan.innerHTML = data[i].title;
                titleSpan.style.fontSize = "20px";
                titleSpan.style.fontWeight = "700";

                textSpan.innerHTML = text;
                textSpan.style.fontSize = "13px";
                textSpan.style.fontweight = "400";

                userImg.src = "../img/logo20.svg";

                userSpan.innerHTML = data[i].writer;
                userSpan.style.fontSize = "11px";
                userSpan.style.fontWeight = "600";
                userSpan.style.marginLeft = "5px";
            
                divTitle.appendChild(titleSpan);
                divContent.appendChild(textSpan);
                divUser.appendChild(userImg);
                divUser.appendChild(userSpan);
                
                div.appendChild(divTitle);
                div.appendChild(divContent);
                div.appendChild(divUser);

                aTag.appendChild(div);

                rectangle3.appendChild(aTag);
             }

             else{
                const div = document.createElement('div');
                const divTitle1 = document.createElement('div');
                const divUser = document.createElement('div');
                const titleSpan = document.createElement('span');
                const userSpan = document.createElement('span');
                const userImg = document.createElement('img');
                const aTag = document.createElement('a');

                div.id = `bulletinPost`;
                divTitle1.id = 'divTitle1';
                divUser.id = 'divUser';
                aTag.id = 'aTag';

                aTag.href=`./bulletin.html?id=${data[i].id}`;
                
                titleSpan.innerHTML = data[i].title;
                titleSpan.style.fontSize = "20px";
                titleSpan.style.fontWeight = "700";

                userImg.src = "../img/logo20.svg";

                userSpan.innerHTML = data[i].writer;
                userSpan.style.fontSize = "11px";
                userSpan.style.fontWeight = "600";
                userSpan.style.marginLeft = "5px";
            
                divTitle1.appendChild(titleSpan);
                divUser.appendChild(userImg);
                divUser.appendChild(userSpan);
                
                div.appendChild(divTitle1);
                div.appendChild(divUser);

                aTag.appendChild(div);

                rectangle3.appendChild(aTag);
            }
        }
    }
}    

// 작성한 글 data가 비었을 경우
function emptyDataHandler1(){
    const span = document.createElement('span');

    span.innerHTML = "해당하는 글이 존재하지 않습니다.";
    span.style.fontSize = "20px";
    span.style.fontWeight = "700";
    span.style.fontColor = "#00000080";
    span.style.marginLeft = "14px";  
    
    rectangle1.appendChild(span);
}

// 댓글단 글 data가 비었을 경우
function emptyDataHandler2(){
    const span = document.createElement('span');

    span.innerHTML = "해당하는 글이 존재하지 않습니다.";
    span.style.fontSize = "20px";
    span.style.fontWeight = "700";
    span.style.fontColor = "#00000080";
    span.style.marginLeft = "14px";  
    
    rectangle2.appendChild(span);
}

// 좋아요한 글 data가 비었을 경우
function emptyDataHandler3(){
    const span = document.createElement('span');

    span.innerHTML = "해당하는 글이 존재하지 않습니다.";
    span.style.fontSize = "20px";
    span.style.fontWeight = "700";
    span.style.fontColor = "#00000080";
    span.style.marginLeft = "14px";  
    
    rectangle3.appendChild(span);
}