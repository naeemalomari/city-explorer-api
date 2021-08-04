"use strict";

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const server = express();
const locData = require("./weather.json");
const PORT = 3001;
server.use(cors());

//My Root Route : http://localhost:3001/

server.get("/", (req, res) => {
  res.send("this is my root route");
});
// http://localhost:3001/test
server.get("/test", (request, response) => {
  let str = "hello from the server side ";
  response.send(str);
});

// http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
server.get("/weather", (req, res) => {
  // console.log(weatherData);
  const lat = req.query.lat;
  const lon = req.query.lon;
  const city_name = req.query.searchQuery.toLocaleLowerCase();
console.log(city_name,lon,lat);


  let result = locData.find(item => item.lat == lat && item.lon == lon && item.city_name.toLocaleLowerCase() == city_name ? item : "" );
    result  ? res.send(forCastObject(result)) : res.status(404).send("PAGE NOT FOUND FIND YOUR ERROR");
    console.log(result);
  console.log(lat);

});

const forCastObject = (weatherObj) => {
  const forCastList = [];
  weatherObj.data.map( item => {
    const description = `low of ${item.low_temp} , high of ${item.high_temp} and ${item.weather.description}`;
    const date = item.datetime;
    forCastList.push(new ForCast(date, description));

  });
  return forCastList;
};
 

class ForCast{
    constructor(date = '', description = '') {
      this.date=date;
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
  