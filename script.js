const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

let oldTab=userTab;
const API_KEY="718e08911c62ec5fb690f2e1373e956e";
oldTab.classList.add("current-Tab"); 

// lets do switching 
// once you click on any one tab , means selected event will be active 

function switchTab(newTab) {
    if(newTab!= oldTab) {
        oldTab.classList.remove("current-Tab");
        oldTab=newTab;
        oldTab.classList.add("current-Tab");s

        if(!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
    } 
    else {
        // means now user is on search weather tab now you want to switch into your weather tab so you remove the active from search and add it into your
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active"); // info screen should also be invisible 
        getfromSessionStorage(); 
        //
    }
}

function getfromSessionStorage() {
    const localCoordinates=sessionStorage.
}


// this is for usertab - user's weather
userTab.addEventListener("click", ()=> {
    // when you want to fetch the data of user 
    switchTab(userTab);
});

// this is for search weather
searchTab.addEventListener("click", ()=> {
    switchTab(searchTab);
});

 
console.log("hi");




