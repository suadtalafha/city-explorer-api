'use strict';

const axios=require('axios');


function getNewWeather(req, res) {
    console.log("test")
    const aQuery = req.query.cityName;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${aQuery}&key=${process.env.WEATHER_KEY}`


   
    axios.get(url).then(weatherData => {
        console.log(weatherData)
        res.send(weatherData.data.data.map(value => {
            return new Weather(value)

        }))
     })
        
       .catch(error => {
            res.status(500).send(error)
        })

};
class Weather {
    constructor(value){
        this.description=value.weather.description
        this.date=value.date
    }
}

module.exports=getNewWeather