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
getfromSessionStorage();

// lets do switching 
// once you click on any one tab , means selected event will be active 

function switchTab(newTab) {
    if(newTab!= oldTab) {
        oldTab.classList.remove("current-Tab");
        oldTab=newTab;
        oldTab.classList.add("current-Tab");

        if(!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            // means now user is on search weather tab now you want to switch into your weather tab so you remove the active from search and add it into your
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active"); // info screen should also be invisible 
            //  so user is on your weather tab so we need to show the user's weather by default so for that we use 
            getfromSessionStorage(); 
        }
    } 
    
    
}
grantAccessContainer.classList.remove("active");
// below func is to check whether cordinates are already present in session storage 
function getfromSessionStorage() {
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

// let find coordinate of user 
async function fetchUserWeatherInfo(coordinates) {
    const {lat,lon}=coordinates; //Object destructuring
    // make grant container invisible 
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");
    
    // API call 
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const data=await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        // now we got the coordinates bet we need to render it on front end 
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo) {
    // firstly we have to fetch the  elements 
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

     // lets fit the data into UI elements 
    // here we pasted API call on browser by entering sample values then converted into JSON objects via online formatter and then that objects properties are mapped with cosnt in JS file
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

// this is for usertab - user's weather
userTab.addEventListener("click", ()=> {
    // when you want to fetch the data of user 
    switchTab(userTab);
    console.log("usertab called");
});

// this is for search weather
searchTab.addEventListener("click", ()=> {
    switchTab(searchTab);
    console.log("searchtab called");
});


console.log("hi");

// lets write fucntion for grant access 
const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("location support is not available");
    }
}

function showPosition(Position) {
    const userCoordinates = {
        lat: Position.coords.latitude,
        lon: Position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const searchInput= document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let cityName=searchInput.value;

    if(cityName === ""){
        return;
    } else {
        fetchSearchWeatherInfo(cityName);
    }

})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response= await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        );
        const data=await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data); 
        
    } catch (error) {
        console.log("this is seems might be an error while fetching coordinates Try again");
        const loadingError=loadingScreen.querySelector("p");
        loadingError.innerText= "please try again";
    }

};
