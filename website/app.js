/* Global Variables */
const btn = document.querySelector('#generate');

const showTemp = document.querySelector('#temp');
const showDate = document.querySelector('#date');
const showCity = document.querySelector('#entryHolder');
const showType = document.querySelector('#content');
const showImg = document.querySelector('#img');

const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=f729dbd16f76409fceec8db06f49e236";
const unit = "&units=metric";

const today = new Date();
const theDate = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;

// Trigger 'click' event
btn.addEventListener('click', function (e) {
    e.preventDefault();

    const cityName = document.querySelector('#city').value;
    const yourFeeling = document.querySelector('#feelings').value;
    const urlData = baseURL + cityName + apiKey + unit;

    if (cityName && yourFeeling){
    getWeatherData(urlData)
        .then (function(weatherData) {
            const temperature = weatherData.main.temp;
            const mood = yourFeeling;
            const type = weatherData.weather[0].main;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            postData('/newEntry', {
                temp: temperature,
                date: theDate,
                theCity: cityName.toUpperCase(),
                feeling: mood,
                main: type,
                image: imageURL
            });
        })
        .then (
            () => updateUI()
        )
    } else {
        alert('Enter all fields');
    }
});

// Get weather API data
const getWeatherData = async(urlData) => {
    console.log(urlData);

    const response = await fetch(urlData);
    try {
        const weatherData = await response.json();
        return weatherData;
    } catch(error) {
        console.log('error', error);
    }
}

// Post data
const postData = async(url = '', data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Something went wrong!', error);
    }
}

// Update UI
const updateUI = async () => {
    const request = await fetch('/addDate');
    try {
        const showData = await request.json();
        
        showCity.innerHTML = `${showData.theCity}\'s weather`;
        showDate.innerHTML = `Today: ${showData.date}`;
        showTemp.innerHTML = `Temperature: ${showData.temp}°C`;
        showType.innerHTML = `Weather Type: ${showData.main} <br>I\'m feeling ${showData.feeling}`; 
        showImg.innerHTML = `<img src=\"${showData.image}\">`;
    } catch (error) {
        console.log('The UI could not be updated', error);
    }
}

