const searchBtnEl = document.getElementById("btn-search");
const inputEl = document.getElementById("input-city");
const apikey = "7c076ebdc9171cc941023949cd3161e3";

searchBtnEl.addEventListener("click", function () {
    console.log("weatherfor" + inputEl.value);

    getGeoLocation(inputEl.value)
});

function getGeoLocation(cityname) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${apikey}`;
    fetch(geoUrl)
    .then(res => res.json())
    .then(geoData => {
        console.log("data",geoData);
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&units=imperial&exclude=minutely,hourly&appid=${apikey}`;
        fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const daily = data.daily;
            document.getElementById("city-name").innerText = cityname + " " + moment.unix(daily[0].dt).format('MM/DD/YY');
            document.getElementById("span-temp").innerText = data.current.temp + "F";
            document.getElementById("span-wind").innerText = data.current.wind_speed + "MPH";
            document.getElementById("span-hum").innerText = data.current.humidity + "%";
            document.getElementById("span-uv").innerText = data.current.uvi;
            document.getElementById("img-icon").src = `https://openweathermap.org/img/w/${data?.current?.weather[0]?.icon}.png`;
            //uviColor(data);
            fiveDayForecast(data);

        });

    })
    .catch(err => console.error(err));
}


function fiveDayForecast(data) {
    for (i = 0; i <=4; i++) {
        const daily = data.daily;
        console.log(daily);
        const forecastEl = document.getElementById("forecast-section");
        const divEl = document.createElement("div");
        divEl.setAttribute("id", i);
        divEl.setAttribute("class", "card");
        const dataEl = document.createElement("p");
        dataEl.innerText = moment.unix(daily[i].dt).format('MM/DD/YY');
        const image = document.createElement('img')
        const iconPic = data.daily[i].weather[0].icon;
        image.src = "https://openweathermap.org/img/w/" + iconPic + ".png";
        const tempEl = document.createElement("p");
        tempEl.innerText = "temp:" + daily[i].temp.day + "F";
        const windEl = document.createElement("p");
        windEl.innerText = "Wind:" + daily[i].wind_speed + "MPH:";
        const humidityEl = document.createElement("p");
        humidityEl.innerText = "Humidity:" + daily[i].humidity + "%";
        divEl.appendChild(dataEl);
        divEl.appendChild(image);
        divEl.appendChild(tempEl);
        divEl.appendChild(windEl);
        divEl.appendChild(humidityEl);
        forecastEl.appendChild(divEl);
    
    }
}