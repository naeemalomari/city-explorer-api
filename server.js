"use strict";


const moviesHandler =require('./myStore');
const getDataHandler=require('./myStore1');

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const server = express();
const axios = require("axios");
const locData = require("./weather.json");
const PORT = process.env.PORT;
server.use(cors());

//My Root Route : http://localhost:3001/

server.get("/", (req, res) => {
  res.send("this is my root route");
});
//localhost:3001/test
 server.get("/test", (request, response) => {
  let str = "hello from the server side ";
  response.send(str);
});

// http://localhost:3001/movies?city=Amman
server.get("/movies", moviesHandler);

function moviesHandler(req, res) {
  const city_name = req.query.city_name;

  const URL = `https://api.themoviedb.org/3/search/movie?api_key=f8c02b501277f3b5d63116ef7f655b65&query=${city_name} `;

  axios
    .get(URL)
    .then(finalResult => {
      let moviesArray = finalResult.data.results.map(element => new myMovie(element))  
    //   console.log(finalResult);
      res.send(moviesArray);
    })
    .catch((err) => {
      res.send(err);
   });}
class myMovie {
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
 
  // http://localhost:3001/weather?lat=31.95&lon=35.91&city_name=Amman
server.get("/weather", getDataHandler);

function getDataHandler(req, res) {
    const city_name = req.query.city_name;
    const lon=req.query.lon;
    const lat=req.query.lat
let allDays=[];

  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_name}&lat=${lat}&lon=${lon},NC&key=ef76d2d5b1dd408aba81b82f3cd5e899 `;
  axios
    .get(URL)
    .then(result => {
        console.log(result,'result')
    let weatherArray=result.data.data.map(element => new Weather (element.weather.description, element.datetime))
        // console.log(result);
        // for(i=0;i<weatherArray.length;i++) {
        //     allDays.push(new Weather (weatherArray[i]).weather.description, weatherArray[i].datetime);
        // }
    console.log(weatherArray);
      res.send(weatherArray);

    })
    .catch((err) => {
      res.send(err);
    });
}

class Weather {
    constructor(
        description,datetime
    ) {

      this.description=description;
      this.datetime=datetime;
    }
  }
// const moviesObjAll = (moviesObj) => {
//   const objMovies = [];

//     objMovies.push(
//       new Movies(
//         title,
//         overview,
//         vote_average,
//         vote_count,
//         poster_path,
//         popularity,
//         release_date
//       )
//     );
//   };
//   return objMovies;

// console.log(moviesObj);
// class Weather {
//     constructor(item) {
//         this.description=item.weather.description;
//         this.date=item.datetime;
//     }
// }
///////////////////////////////////////////////////////////////////

                                // Class7 

// http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
// server.get("/weather", (req, res) => {
//   // console.log(weatherData);
//   const lat = req.query.lat;
//   const lon = req.query.lon;
//   const city_name = req.query.searchQuery.toLocaleLowerCase();
//   console.log(city_name, lon, lat);

//   let result = locData.find((item) =>
//     item.lat == lat &&
//     item.lon == lon &&
//     item.city_name.toLocaleLowerCase() == city_name
//       ? item
//       : ""
//   );
//   result ? res.send(forCastObject(result)) : res.status(404).send("PAGE NOT FOUND FIND YOUR ERROR");
//   console.log(result);
//   console.log(lat);
// });

// const forCastObject = (weatherObj) => {
//   const forCastList = [];
//   weatherObj.data.map((item) => {
//     const description = `low of ${item.low_temp} , high of ${item.high_temp} and ${item.weather.description}`;
//     const date = item.datetime;
//     forCastList.push(new ForCast(date, description));
//   });
//   return forCastList;
// };

// class ForCast {
//   constructor(date = "", description = "") {
//     this.date = date;
//     this.description = description;
//   }
// }

server.listen(PORT, () => {
  console.log(`I am listening to  PORT = ${PORT}`);
  // console.log(require);
});

server.get("*", (req, res) => {
  res.status(404).send("not found page at all please check the route");
});
