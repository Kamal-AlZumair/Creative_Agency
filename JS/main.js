//check lcoal storage
let mainColors = localStorage.getItem("color_option");
if(mainColors !== null){
  document.documentElement.style.setProperty('--main-color',localStorage.getItem("color_option"));
  
  document.querySelectorAll(".color-list li").forEach(element => {
  element.classList.remove("active");

  if (element.dataset.color === mainColors) {
    element.classList.add("active");
  }
});

}

// random backgroun option
let backgroundOption = true;
//variable to control the interval
let backgroundInterval;

//check if there is local storage random background
let backgroundLocalItem = localStorage.getItem("background-option");
//check if random backgroun local storage is not empty
if (backgroundLocalItem !== null) {

  if(backgroundLocalItem === 'true'){
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  //remove active class from all 
  document.querySelectorAll(".random-background span").forEach(element =>{
    element.classList.remove("active");
  });

  if(backgroundLocalItem === 'true'){
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");

  }
}

//toggle spin on icon
document.querySelector(".toggle-setting i").onclick = function () {
  //toggle class fa-spin
  this.classList.toggle("fa-spin");
  //toggle class open
  document.querySelector(".setting-box").classList.toggle("open");
}

//switch colors
const colorsli = document.querySelectorAll(".colors-list li");
colorsli.forEach(li => {
  li.addEventListener("click",(e)=>{
    //set color on root
    document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
    //set color on local storage
    localStorage.setItem("color_option",e.target.dataset.color);
    //remove active class
    handelActive(e);
    
  })
})

//switch background
const randomBackEl = document.querySelectorAll(".random-background span ");
randomBackEl.forEach(span => {
  span.addEventListener("click",(e)=>{
    
    //remove active class
    handelActive(e);

    if(e.target.dataset.background === 'yes'){
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option",true);
    } else {
      backgroundOption = false;
      localStorage.setItem("background-option",false);
      clearInterval(backgroundInterval);
    }
  });
})


//select landing page element
let landingPage = document.querySelector(".landing-page");
//get array of imgs
let imgsArray = ["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg"];

// function randomize imgs
function randomizeImgs() {
  if(backgroundOption === true){

    backgroundInterval = setInterval(() => {
      //get random number
    let randomNumber = Math.floor(Math.random() * imgsArray.length);
    //change background 
    landingPage.style.backgroundImage = 'url('+imgsArray[randomNumber]+')';
    }, 5000);
  }
}
randomizeImgs();

//select skills 
let ourSkills = document.querySelector(".skills");
window.onscroll = function(){
  //skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  //skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  
  //window height
  let windowHeight = this.innerHeight;
  

  //window scroll top
  let windowScrollTop = this.pageYOffset;

  if(windowScrollTop < (skillsOffsetTop + skillsOuterHeight - windowHeight)){
    
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress; 
    });
  }
};

//create popup with the image
let ourGallary = document.querySelectorAll(".gallery img");

ourGallary.forEach(img =>{

  img.addEventListener('click',(e)=>{
    // create overlay element
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popup-overlay";
    // append overlay to the body
    document.body.appendChild(overlay);
    // create the popup box
    let popupBox = document.createElement("div");
    // add class to the popup box
    popupBox.className = "popup-box";
    // add alternate text
    if (img.alt !== null) {
      //create heading
      let imgHeading = document.createElement("h3");
      //create text for heading
      let imgText = document.createTextNode(img.alt);
      //append the text to the heading
      imgHeading.appendChild(imgText);
      // append the heading to popup box
      popupBox.appendChild(imgHeading);
    }
    // create the image
    let popupImage = document.createElement("img");
    // set image source
    popupImage.src = img.src;
    // add image to popup box
    popupBox.appendChild(popupImage);
    // append the popup box to the body
    document.body.appendChild(popupBox);
    // create the close span
    let closeButton = document.createElement("span");
    // create the close button text
    let closeButtonText = document.createTextNode("X");
    // append text to the close button
    closeButton.appendChild(closeButtonText);
    // add class to close button
    closeButton.className = "close-button";
    // add close to popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click",(e)=>{
  if(e.target.className == "close-button"){
    // remove the current popup
    e.target.parentNode.remove();
    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");


function scrollToSomeWhere(elements){
  elements.forEach(ele =>{
    ele.addEventListener("click",(e)=>{
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

//handel active stats
function handelActive(ev){
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  //add active on selected color
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");
if(bulletLocalItem !== null){
  bulletsSpan.forEach(span =>{
    span.classList.remove("active");
  });
  if(bulletLocalItem === 'block'){
    bulletsContainer.style.display = 'block';
    document.querySelector(".bullets-option .yes").classList.add("active");
  }else{
    bulletsContainer.style.display = 'none';
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach(span =>{
  span.addEventListener("click",(e)=>{
    if(span.dataset.display === 'show'){
      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullets-option", 'block');
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets-option", 'none');
    }
    handelActive(e);
  });
});

//reset button 
document.querySelector(".reset-options").onclick = function(){
  
  localStorage.removeItem("color_option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");

  //reload window
  window.location.reload();
};

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){
  //stop propagation
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
}

// click anywhere outside menu and toggle button
document.addEventListener("click",(e)=>{
  if(e.target !== toggleBtn && e.target !== tLinks){
    if(tLinks.classList.contains("open")){
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

//stop propagation on menu
tLinks.onclick = function(e){
  e.stopPropagation();
}