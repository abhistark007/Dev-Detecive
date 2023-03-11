// API related Stuff
const URL="https://api.github.com/users/";
// UI related Stuff
const currentThemeName=document.querySelector("[currentThemeName]");
const currentThemeIcon=document.querySelector("[currentThemeIcon]");
const themeController=document.querySelector(".dark-light-mode-div");

const searchBar=document.querySelector("#searchBar");
const searchBtn=document.querySelector("[searchBtn]");
const  userImage=document.querySelector("[ userImage]");
const userName=document.querySelector("[userName]");
const userJoinDate=document.querySelector("[userJoinDate]");
const userId=document.querySelector("[userId]");
const userDescription=document.querySelector("[userDescription]");
const userRepoCount=document.querySelector("[userRepoCount]");
const userFollowers=document.querySelector("[userFollowers]");
const userFollowing=document.querySelector("[userFollowing]");
const userLocation=document.querySelector("[userLocation]");
const userTwitter=document.querySelector("[userTwitter]");
const userWebsite=document.querySelector("[userWebsite]");
const userCompany=document.querySelector("[userCompany]");

const noResultsFound=document.querySelector("[noResultsFound]");

const clickRemoveBtn=document.querySelector("[clickRemoveBtn]");

// Date 
const month=["January","Feburary","March","April","May","June","July","August","September","October",
"November","December"
];

// Theme
let currentTheme="light";

const allAnchorTag=document.querySelectorAll("a");
allAnchorTag.forEach((value)=>{
    value.target="_blank";
});



function getUserDetails(username){
    fetch(URL+username)
    .then((response) => response.json())
    .then((data)=>{
        console.log(data);
        if(data.message=="Not Found")throw Error;
        updateCardDisplay(data);
        console.log(data.followers);
    })
    .catch((e)=>{
        noResultsFound.classList.add("active");
        console.log(e.message);
    });

}


function updateCardDisplay(data){
    userImage.src=data.avatar_url;
    let date=data.created_at.split("T").shift().split("-");
    userJoinDate.innerText=`Joined ${date[2]} ${month[date[1]-1]} ${date[0]}`;
    userName.innerText=data.name;
    userId.innerText="@"+data.login;
    userId.href=data.html_url;
    userDescription.innerText=data.bio;
    userRepoCount.innerText=data.public_repos;
    userFollowers.innerText=data.followers;
    userFollowing.innerText=data.following;
    // location
    userLocation.innerText= data.location==null?"Not Available":data.location;
    let b=data.location==null?"Not Available":data.location;
    if(b=="Not Available"){
        userLocation.style.pointerEvents="none";
        userLocation.classList.add("notAvailable");
    }else{
        userLocation.classList.remove("notAvailable");
        userLocation.style.pointerEvents="auto";
        
    }
    // Twitter
    userTwitter.innerText= data.twitter_username==null?"Not Available":data.twitter_username;
    let a=data.twitter_username==null?"Not Available":data.twitter_username;
    if(a=="Not Available"){
        userTwitter.style.pointerEvents="none";
        userTwitter.classList.add("notAvailable");
    }else{
        userTwitter.classList.remove("notAvailable");
        userTwitter.style.pointerEvents="auto";
        userTwitter.href=`https://twitter.com/${a}`;
    }
    // Company
    userCompany.innerText= data.company==null?"Not Available":data.company;
    let c=data.company==null?"Not Available":data.company;
    if(c=="Not Available"){
        userCompany.style.pointerEvents="none";
        userCompany.classList.add("notAvailable");
    }else{
        userCompany.classList.remove("notAvailable");
        userCompany.style.pointerEvents="auto";
    }
    // Website
    userWebsite.innerText= data.blog==""?"Not Available":data.blog;
    let d=data.blog==""?"Not Available":data.blog;
    if(d=="Not Available"){
        userWebsite.style.pointerEvents="none";
        userWebsite.classList.add("notAvailable");
    }else{
        userWebsite.classList.remove("notAvailable");
        userWebsite.style.pointerEvents="auto";
    }
}

searchBar.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        if(searchBar.value!=""){
            getUserDetails(searchBar.value);
        }
    }
});

searchBar.addEventListener("input",()=>{
    noResultsFound.classList.remove("active");
    if(searchBar.value!="")
    clickRemoveBtn.classList.add("active");
    else
    clickRemoveBtn.classList.remove("active");
});

clickRemoveBtn.addEventListener('click',()=>{
    clickRemoveBtn.classList.remove("active");
    searchBar.value="";
    noResultsFound.classList.remove("active");
});


searchBtn.addEventListener("click",()=>{
    if(searchBar.value!=""){
        getUserDetails(searchBar.value);
    }
});



themeController.addEventListener("click",(e)=>{
    darkMode();
    if(currentThemeName.innerText=="LIGHT"){
        currentThemeName.innerText="DARK";
        currentThemeIcon.src="images\\sun-icon.svg";
    }else{
        currentThemeName.innerText="LIGHT";
        currentThemeIcon.src="images\\moon-icon.svg";    
    }
});

function darkMode(){
    let setTheme=document.body;
    setTheme.classList.toggle("dark-mode");
    let theme;

    if(setTheme.classList.contains("dark-mode")){
        theme="DARK";
    }else{
        theme="LIGHT";
    }

    // Save to Local Storage
    localStorage.setItem("PageTheme",JSON.stringify(theme));

}

function initialization(){
    let getTheme=JSON.parse(localStorage.getItem("PageTheme"));
    if(getTheme=="DARK"){
        document.body.classList="dark-mode";
    }
}

initialization();