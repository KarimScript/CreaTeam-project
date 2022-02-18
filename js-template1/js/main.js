window.onscroll = function(){
  navscroll();
};


function navscroll() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.querySelector(".landing-page .header").style.background="#171817e7";
  }
  else{
    document.querySelector(".landing-page .header").style.background="transparent";
  }
};

let menu = document.querySelector(".landing-page .header .menu");
let menuBtn = document.querySelector(".landing-page .header .menuBtn");
menuBtn.addEventListener("click",()=>{
  menu.classList.toggle("open"); 
});



let link = document.querySelectorAll(".header .menu a");
for (var i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function() {
  document.querySelector(".header .menu .active").classList.remove("active");
  this.classList.add("active");
});
};

function scrollToSection(element){
   element.forEach(ele =>{
     ele.addEventListener("click",(e) =>{
       e.preventDefault();
       document.getElementById(e.target.dataset.section).scrollIntoView({
           behavior: 'smooth'
       });
     });
   });
}
scrollToSection(document.querySelectorAll(".landing-page .header .menu a"));
scrollToSection(document.querySelectorAll(".footer .menu a"));


let landingPage=document.querySelector(".landing-page");
let imgArray=["back1.jpeg","back2.jpeg","back3.jpeg","back4.jpeg"];

let backgroundOption=true;
let backInterval;


function randomize(){
  if(backgroundOption==true){
    backInterval = setInterval(()=>{
      let random=Math.floor(Math.random()*imgArray.length);
      landingPage.style.backgroundImage = 'url(/images/'+imgArray[random]+')';
    
    },5000);
  }
  
}

let backgroundLocalChoice = localStorage.getItem("background-option");
if(backgroundLocalChoice !== null){
  if(backgroundLocalChoice == "true"){
    backgroundOption=true;
    randomize();
  }else{
    backgroundOption = false;
  }
}

document.querySelectorAll(".random-btn span").forEach(el=>{
 el.classList.remove("active");
 if(backgroundLocalChoice == "true"){
   document.querySelector(".on").classList.add("active");
 }else{
   document.querySelector(".off").classList.add("active");
 }
});




let settingBtn=document.querySelector(".settings .toggle-setting");
let settings=document.querySelector(".settings");
settingBtn.addEventListener("click",function(){
  settings.classList.toggle("open");
});

let mainColor = localStorage.getItem("main-color");
if(mainColor !== null){
  document.documentElement.style.setProperty("--main-color",mainColor);
}

const colors=document.querySelectorAll(".colors-list li");
colors.forEach(li => {
  li.addEventListener("click",(e)=>{
   document.documentElement.style.setProperty("--main-color",e.currentTarget.dataset.color);
   localStorage.setItem("main-color",e.currentTarget.dataset.color);
  });
});

//switch Random backgraound On/Off
let randomBtn=document.querySelectorAll(".random-btn span");
randomBtn.forEach(span =>{
 span.addEventListener("click",(e)=>{
   document.querySelector(".random-btn span.active").classList.remove("active");
   e.target.classList.add("active");
   if(e.target.dataset.random == "on"){
     backgroundOption = true;
     randomize();
     localStorage.setItem("background-option",true);
   }else{
     backgroundOption = false;
     clearInterval(backInterval);
     localStorage.setItem("background-option",false);
   }
 });
});


//gallery popup

let gallery = document.querySelectorAll(".about .gallery .imgs img");
gallery.forEach(img =>{
  img.addEventListener("click",(e)=>{
    let overlay = document.createElement("div");
    overlay.className = "popup-div";
    document.body.appendChild(overlay);

    let popupbox = document.createElement("div");
    popupbox.className = "popup-box";

    if(img.alt !== null){
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupbox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupbox.appendChild(popupImage);
    document.body.appendChild(popupbox);
   
    //close button
    let closeBtn=document.createElement("span");
    let closeIcon=document.createTextNode("x");
    closeBtn.appendChild(closeIcon);
    closeBtn.className = ("closeBtn");
    popupbox.appendChild(closeBtn);

  });
});

document.addEventListener("click" , (e)=>{
  if(e.target.className == 'closeBtn'){
    e.target.parentNode.remove();
    document.querySelector(".popup-div").remove();
  }
})


