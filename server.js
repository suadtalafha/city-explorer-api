'use strict';

const express = require('express');
require('dotenv').config();

const axios=require('axios');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT;

server.use(cors());


const weatherArr = require('./data/weather.json');
const { request, response } = require('express');

server.get('/test', (req, res) => {
    res.status(200).send('my string')
})
//  localhost:3001/weatherinfo?cityName=Seattle
// lab 7
// try {
//     server.get('/weatherinfo', (request, response) => {
//         let targetCity = weatherArr.find(city => {
//             if (request.query.cityName === city.city_name) { return city }
//         });
//         console.log(targetCity)

//         const cityOb = targetCity.data.map(value => {
//             return new City(value.valid_date, value.weatherArr.description)
//         });
//         console.log(cityOb)
//         response.status(200).send(cityOb)
//     })
// } catch {
//     response.status(404).send('Error')
// }



// class City {
//     constructor(data, description) {
//         this.data = data;
//         this.description = description;
//     }
// }

server.get('/weather', getWeather);

// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

function getWeather(req, res) {
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
// https://api.themoviedb.org/3/search/movie?api_key={API_Key}&query={cityName}

server.get('/moveis', getMovie)
function getMovie(request, respons) {
    const cQuery = request.query.cityName;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cQuery}`

    axios.get(url)
       
        .then(moveiData => {
            respons.status(200).send(moveiData.data.results.map(val => {
                return new Movei(val)
            }))
        }).catch(error=>{
            res.status(500).send(error)
        })

}

class Movei{
    constructor(val){
    this.title=val.title;
    this.overview=val.overview;
    this.average_votes=val.average_votes;
    this.total_votes=val.total_votes;
    this.popularity=val.popularity;
    this.image_url=`https://image.tmdb.org/t/p/w500/${val.poster_path}`
    this.released_on=val.released_on;
    }
}



server.get('*', (req, res) => {
    res.status(404).send('NOT FOUND')
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})