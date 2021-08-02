'use strict';


const express =require('express');
const server =express();
const locData=require('./weather.json');
const PORT =3001;

//My Root Route : http://localhost:3001/
class serve extends express {
constructor(props){
super(props);
this.state={
date:'',
description:'',
}

}}

server.get('/',(req,res) => {
    res.send('this is my root route')
})
// http://localhost:3001/test
server.get('/test',(request,response) => {
    let str = 'hello from the server side '
    response.send(str);
})

// http://localhost:3001/weather (/weather === route)
server.get('/Weather',(req,res) => {
    // console.log(weatherData);
    let locWeather = locData.map(item => {
        return item.city_name;
    });
    if(locWeather =='Amman' || locWeather =='Seatle' || locWeather =='Paris'){
    res.status(200).send(locWeather);
    }else{
        res.status(404).send('not found');
    }
});

//http://localhost:3001/lat (/lat ===route)
server.get('/lat',(req,res) => {
    let latitude=locData.find(item => {
        return item.lat;
    });
    res.send(latitude);
}) ;


// //http://localhost:3001/lon (/lon === route )
// server.get('/lon',(req,res) => {
// let longitudinal=locData.find(item => {
// return item.lon;
// });
// res.send(longitudinal);
// });
//////////////////////////////////////////////////////////
server.get('*',(req,res)=> {
    res.status(404).send('not found page at all please check the route')
} )

server.listen(PORT,()=> { 
    console.log(`I am listening to  PORT = ${PORT}`);
    // console.log(require);
});

