
let infDate
let inf = document.querySelector('.information')
let btn = document.querySelector('.btn')
btn.addEventListener('click', inputData)
function inputData() {
   let cityName = inf.value
   x(cityName)
}
function x(cityName) {
   console.log(cityName)
   let check = (cityName) ? cityName : 'Balti'
   let api = `https://api.openweathermap.org/data/2.5/weather?q=${check}&appid=9706ab3f74254ee3cf08d8bfbda45626`
   let myRequest = new XMLHttpRequest()
   myRequest.open('GET', api)
   console.log(myRequest)
   myRequest.responseType = 'json'
   myRequest.onload = () => {
      let block = document.querySelector('.weather__block')
      let wetter = myRequest.response
      let city = wetter.name
      let iconImage = wetter.weather[0].icon
      let descriptionImage = wetter.weather[0].main
      let descriptionWeather = wetter.weather[0].description
      let temperice = Math.floor(wetter.main.temp - 273.15)
      let tempericeMin = Math.floor(wetter.main.temp_max - 273.15)
      let tempericeMax = Math.floor(wetter.main.temp_min - 273.15)
      let visibility = wetter.visibility
      let humidity = wetter.main.humidity
      let pressure = wetter.main.pressure
      let wind = wetter.wind.speed
      let direct = wetter.wind.deg
      let compass = (direct == 0) ? 'N' :
         (direct == 90) ? 'E' :
            (direct == 180) ? 'S' :
               (direct == 270) ? 'W' :
                  (direct > 0 || direct < 90) ? 'NE' :
                     (direct > 90 || direct < 180) ? 'SE' :
                        (direct > 180 || direct < 270) ? 'SW' :
                           (direct > 270 || direct <= 359) ? 'NW' :
                              '';
      let weatherHtml = `
      <p>${city}</p>
      <img src="./img/${iconImage}.png" alt="${descriptionImage}">
      <p>${descriptionWeather}</p>
      <p>${temperice}°C</p>
      <p>min/max: ${tempericeMax}/${tempericeMin}°C</p>
      <p>visibility on the road, ft: ${visibility}</p>
      <p>humidity: ${humidity}%</p>
      <p>pressure, inHg: ${pressure}</p>
      <p>wind speed: ${wind}mph</p>
      <p>direction: ${compass}</p>
      `
      block.innerHTML = weatherHtml
   }
   myRequest.send()
}
x()