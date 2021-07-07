'use strict';
const axios=require('axios');

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
};

module.exports=getMovie
