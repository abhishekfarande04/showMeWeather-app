const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

let currentTab=userTab;
const API_KEY="718e08911c62ec5fb690f2e1373e956e";
currentTab.classList.add("current-Tab"); 

// lets do switching 
// once you click on any one tab , means selected event will be active 

function switchTab(clickedTab) {
    if(clickedTab!= currentTab) {
        currentTab.classList.remove("current-Tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-Tab");
    }

    else {
        // means 
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        //
    }
}


// this is for usertab - user's weather
userTab.addEventListener("click", ()=> {
    switchTab(userTab);
});

// this is for search weather
searchTab.addEventListener("click", ()=> {
    switchTab(searchTab);
});

 
console.log("hi");




