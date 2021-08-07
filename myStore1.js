'use strict';
const axios=require('axios')


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

module.exports=getDataHandler;