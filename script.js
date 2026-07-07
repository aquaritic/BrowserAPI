const background = document.getElementById("background");
const search = document.getElementById("search");
const fidgetBtn = document.getElementById("fidgetBtn");
const fidgetCount = document.getElementById("fidgetCount");

let count = 0;

fidgetBtn.addEventListener("click", () => {
    count++;
    fidgetCount.innerText = count;

    fidgetBtn.Btn.style.transform = "scale(.85)";
    setTimeout(() => {
        fidgetBtn.style.transform = "scale(1)";
    }, 100);
});

search.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        const query = search.value.trim();
        if(query.length > 0){
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
});

async function getBackground() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=1VdEDgM6P6xdRXNc7HlPj234s1lcVxEJagXDNklA"

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        const fact = result.explanation.split('. ').slice(0, 2).join('. ') + '.';
        document.getElementById("fact").innerText = `Image: ${result.title}: ${fact}`;

        if(result.media_type !== "image"){
            console.log("APOD returned a non-image media type.");
            return null;
        }

        return result.url;

    } catch (error) {
        console.log(error.message);
        return null;
    }
}

async function getWeather(){
    navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords;
        const url = `https://api.open-meteo.com/v1/forecast` + `?latitude=${latitude}&longitude=${longitude}` + `&current=temperature_2m,wind_speed_10m,precipitation_probability` + `&temperature_unit=fahrenheit&wind_speed_unit=mph`;
        const response = await fetch(url);
        const result = await response.json();
        const { temperature_2m, wind_speed_10m, precipitation_probability } = result.current;

        document.getElementById("weather").innerText = `${precipitation_probability}% ${temperature_2m}°F ${wind_speed_10m} MPH`;
    });
}

getWeather();

window.onload = function () {
    getBackground().then(function (imageUrl) {
        if(!imageUrl) return;

        console.log(imageUrl);

        if(background){
            background.style["background-image"] = `url('${imageUrl}')`;
        }
    });
};

setInterval(() => {
    let dateObject = new Date();
    let ms = dateObject.getTime();
    let difference = dateObject.getTimezoneOffset();
    let localMs = ms - (difference * 60 * 1000);
    let dayMs = localMs % (24 * 60 * 60 * 1000);
    let hours = Math.floor(dayMs / (60 * 60 * 1000));
    let minutes = Math.floor((dayMs % (60 * 60 * 1000)) / 60000);
    let seconds = Math.floor((dayMs % (60 * 1000)) / 1000);

    const time = document.getElementById("time");
    time.innerText = `${hours}:${minutes}:${seconds}`;
}, 1000);