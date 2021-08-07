'use strict';


const axios=require('axios')



function moviesHandler(req, res) {
    const city_name = req.query.city_name;
  
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=f8c02b501277f3b5d63116ef7f655b65&query=${city_name} `;
  
    axios
      .get(URL)
      .then(finalResult => {
        let moviesArray = finalResult.data.results.map(element => new Movies(element))  
      //   console.log(finalResult);
        res.send(moviesArray);
      })
      .catch((err) => {
        res.send(err);
     });}




class Movies {
    constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date) {
      this.title = title.title;
      this.overview = title.overview;
      this.vote_average = title.vote_average;
      this.vote_count = title.vote_count;
      this.poster_path = title.poster_path;
      this.popularity = title.popularity;
      this.release_date = title.release_date;
    }
  }

  module.exports = moviesHandler;