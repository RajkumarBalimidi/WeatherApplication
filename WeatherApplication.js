alert("Please Click on Allow Your Location in Settings")
var getId = (id)=>{
    return document.getElementById(id);
}
var body = getId('body');
var container = getId('container');
var fromDate = getId('fromDate');
var toDate = getId('toDate');
var maxTemperature = getId('maxTemp');
var minTemperature = getId('minTemp');
var continentName = getId('continentName');
var countryName = getId('countryName');
var cityName = getId('cityName');
var locationName = getId('locationName');
var day = getId('day');
var night = getId('night');
var dayPara = getId('dayPara');
var nightPara = getId('nightPara');
var dayimg = getId('dayimg');
var nightimg = getId('nightimg');

window.addEventListener('load',()=>{
  var lat, long;
  navigator.geolocation.getCurrentPosition((position)=>{
      lat = position['coords']['latitude']
      long = position['coords']['longitude']
    //  console.log(lat, long)
      var country, parentCity, locationKey, location, timeZone, maxTemp
      var apiKey = 'nN6aMYu7FpwIk1cnkG2IKAhLZRPpfZnN'
      var geopositionUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}`
    //  console.log(geopositionUrl)
      axios.get(geopositionUrl).
      then((response)=>{
          console.log(response)
          continent = response.data.Region.LocalizedName;
          country = response.data.Country.LocalizedName;
          city = response.data.SupplementalAdminAreas[0].EnglishName;
          locationKey = response.data.Key;
          location = response.data.LocalizedName;
          expirytimeZone = response.headers.expires;
          
          continentName.innerHTML = continent;
          countryName.innerHTML = country;
          cityName.innerHTML = city;
          locationName.innerHTML = location;
          toDate.innerHTML = expirytimeZone;

 //         console.log(country+" "+parentCityName+" "+locationKey+" "+locationName+" "+timeZone +" "+ maxTemp)
          getWeatherdata(apiKey, locationKey)
        })
    })
})

function getWeatherdata(apiKey, locationKey){
    var wearherUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}`
    //  console.log(wearherUrl)
    axios.get(wearherUrl).then((response)=>{
//        console.log(response)
        console.log("Date : "+response.data.DailyForecasts[0].Date +"\nDay : "+ response.data.DailyForecasts[0].Day.IconPhrase +"\nNight : "+ response.data.DailyForecasts[0].Night.IconPhrase)
        let maxTemp = response.data.DailyForecasts[0].Temperature.Maximum.Value;  
        let minTemp = response.data.DailyForecasts[0].Temperature.Minimum.Value;

        function celcius(Fahrenheit){
            let Celcius = (Fahrenheit - 32) / 1.8
            return Celcius;
        }

        fromDate.innerHTML = response.data.DailyForecasts[0].Date;
        maxTemperature.innerHTML = celcius(maxTemp).toFixed(2);
        minTemperature.innerHTML = celcius(minTemp).toFixed(2);
        let Day = response.data.DailyForecasts[0].Day.IconPhrase;
        let Night = response.data.DailyForecasts[0].Night.IconPhrase;
        day.innerHTML = Day;
        night.innerHTML = Night;

        if(Day == 'Partly cloudy' || Day == 'Intermittent clouds' || Night == 'Intermittent clouds' || Night == 'Partly cloudy')
        {
            dayimg.src = 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/10/12/21/CLOUDSbyafpgetty.jpg';
            nightimg.src = 'https://wallpapercave.com/wp/wp9316291.jpg';
            dayPara.innerHTML = 'Today the weather is cloudy. There may be a chance to fall Rain. So, bring umbrella with you. It will help you to protect the cold, fever.';
            dayPara.style.color = "green";
            nightPara.innerHTML = 'Today the weather is cloudy. There may be a chance to fall Rain. So, bring umbrella with you. It will help you to protect the cold, fever.';
            nightPara.style.color = "green";
        }
        else
        {
            dayPara.innerHTML = 'Today the weather is sunny. There is no issues to do your works. Please better to wear the Cap. It will help you to protect if sun is too hot.';
            dayPara.style.color = "blue";
            nightPara.innerHTML = 'Today the weather is not cloudy. There is no issues to do your works (or) You can sleep well.';
            nightPara.style.color = "blue";
        }
     

        
    })
}

// WeatherApplication-5.js

// Get the elements for the dark and light mode buttons
const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');

// Function to enable dark mode
darkButton.addEventListener('click', () => {
    body.style.color = 'white';
    body.style.backgroundColor = 'black';
});

// Function to enable light mode
lightButton.addEventListener('click', () => {
  body.style.color = 'black';
  body.style.backgroundColor = 'white';
});

