const userName = document.getElementById('userName');
const userIntro = document.getElementById('userIntro');

// 유저 정보
axios
    .get("https://3.36.100.188/api/accounts/dj-rest-auth/user",
    {
        headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMDk1MjQxLCJpYXQiOjE2OTIwODgwNDEsImp0aSI6ImIzZTQ0ODBmZWM0YjQxMDRiODg1YTAyMTZlNmFmYmY2IiwidXNlcl9pZCI6MX0.SGXk-M-dnoODH27XqtsKPysf-g3vAQqfyKunMpdMpYE"}
    },
    )
    .then(function (response){
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
    .finally(function(){
     //항상 실행되는 함수
    });

// 포스트 정보
axios
    .get("https://3.36.100.188/api/posts/posts/",
    )
    .then(function (response){
        //성공 시
        // alert("성공");

        console.log(response);
        console.log(response.data[2].title.length);
        
        let postLength = response.data.length;

        if (postLength>0){
            createBulletin(postLength, response.data);
        }
        else{
            emptyDataHandler();
        }
    })
    .catch(function (error){
        //에러 시
        alert("실패");
        console.log(error);
    })
    .finally(function(){
     //항상 실행되는 함수
    });


// data에 이미지가 있을 시 사용할 함수
function createBulletin(length, data){
    const rectangle = document.querySelector('.rectangle');

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
            
            div.id = 'bulletinPost';
            divIntro.id = 'divIntro';
            divtitle.id = 'divtitle';
            divuser.id = 'divuser';

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
            
            img.style.width = "165px";
            img.style.height = "198px";
            img.style.borderRadius = "20px";
            img.src = data[i].images;

            divtitle.appendChild(titlespan);
            divuser.appendChild(userImg);
            divuser.appendChild(userspan);

            divIntro.appendChild(divtitle);
            divIntro.appendChild(divuser);

            div.appendChild(img);
            div.appendChild(divIntro);
            rectangle.appendChild(div);
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

                rectangle.appendChild(div);
             }

             else{
                const div = document.createElement('div');
                const divTitle1 = document.createElement('div');
                const divUser = document.createElement('div');
                const titleSpan = document.createElement('span');
                const userSpan = document.createElement('span');
                const userImg = document.createElement('img');

                div.id = `bulletinPost`;
                divTitle1.id = 'divTitle1';
                divUser.id = 'divUser';
                
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

                rectangle.appendChild(div);
            }
        }
    }
}    

// data가 비었을 경우
function emptyDataHandler(){
    const rectangle = document.querySelector('.rectangle');
    const span = document.createElement('span');

    span.innerHTML = "해당하는 글이 존재하지 않습니다.";
    span.style.fontSize = "20px";
    span.style.fontWeight = "700";
    span.style.fontColor = "#00000080";
    span.style.marginLeft = "14px";      
}