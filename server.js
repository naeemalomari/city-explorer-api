"use strict";

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const server = express();
const axios = require("axios");
const locData = require("./weather.json");
const PORT = 3001;
server.use(cors());

//My Root Route : http://localhost:3001/

server.get("/", (req, res) => {
  res.send("this is my root route");
});
//localhost:3001/test
http: server.get("/test", (request, response) => {
  let str = "hello from the server side ";
  response.send(str);
});

// http://localhost:3001/movies?city=Amman
server.get("/movies", getDataHandler);

async function getDataHandler(req, res) {
  const city_name = req.query.city_name;

  const URLMovies = `https://api.themoviedb.org/3/search/movie?api_key=f8c02b501277f3b5d63116ef7f655b65&query=${city_name} `;

  axios
    .get(URLMovies)
    .then((result) => {
      let moviesArray = result.data.results;
      res.send(moviesObjAll(moviesArray));
    })
    .catch((err) => {
      res.send(err);
    });
}

const moviesObjAll = (moviesObj) => {
  const objMovies = [];
  moviesObj.map((element) => {
    const title = element.title;
    const overview = element.overview;
    const vote_average = element.vote_average;
    const vote_count = element.vote_count;
    const poster_path = element.poster_path;
    const popularity = element.popularity;
    const release_date = element.release_date;
    objMovies.push(
      new Movies(
        title,
        overview,
        vote_average,
        vote_count,
        poster_path,
        popularity,
        release_date
      )
    );
  });
  return objMovies;
};
class Movies {
    constructor (title, overview,vote_average,vote_count, poster_path,popularity,release_date){
this.title = title
this.overview = overview;
this.vote_average = vote_average;
this.vote_count = vote_count;
this.poster_path = poster_path;
this.popularity = popularity;
this.release_date= release_date;
    }
}
// class Weather {
//     constructor(item) {
//         this.description=item.weather.description;
//         this.date=item.datetime;
//     }
// }

// http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
server.get("/weather", (req, res) => {
  // console.log(weatherData);
  const lat = req.query.lat;
  const lon = req.query.lon;
  const city_name = req.query.searchQuery.toLocaleLowerCase();
  console.log(city_name, lon, lat);

  let result = locData.find((item) =>
    item.lat == lat &&
    item.lon == lon &&
    item.city_name.toLocaleLowerCase() == city_name
      ? item
      : ""
  );
  result
    ? res.send(forCastObject(result))
    : res.status(404).send("PAGE NOT FOUND FIND YOUR ERROR");
  console.log(result);
  console.log(lat);
});

const forCastObject = (weatherObj) => {
  const forCastList = [];
  weatherObj.data.map((item) => {
    const description = `low of ${item.low_temp} , high of ${item.high_temp} and ${item.weather.description}`;
    const date = item.datetime;
    forCastList.push(new ForCast(date, description));
  });
  return forCastList;
};

class ForCast {
  constructor(date = "", description = "") {
    this.date = date;
    this.description = description;
  }
}

server.listen(PORT, () => {
  console.log(`I am listening to  PORT = ${PORT}`);
  // console.log(require);
});

server.get("*", (req, res) => {
  res.status(404).send("not found page at all please check the route");
});
