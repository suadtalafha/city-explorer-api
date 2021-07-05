'use strict';

const express =require('express');
require('dotenv').config();

const cors =require('cors');

const server =express();

const PORT=process.env.PORT;

server.use(cors());


const weather=require('./data/weather.json');
const { request, response } = require('express');

server.get('/test',(req,res)=>{
    res.status(200).send('my string')
})
//  localhost:3001/weatherinfo?cityName=Seattle
try{
    server.get('/weatherinfo',(request,response)=>{
        let targetCity=weather.find(city=>{
            if(request.query.cityName ===city.city_name){return city}
        });
         console.log(targetCity)

        const cityOb=targetCity.data.map(value=>{
            return new City(value.valid_date, value.weather.description)
        });
        console.log(cityOb)
        response.status(200).send(cityOb)
    } )
}catch{
    response.status(404).send('Error')
}



class City{
    constructor(data,description){
        this.data=data;
        this.description=description;
    }
}




server.get('*',(req,res)=>{
    res.status(404).send('NOT FOUND')
});

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})