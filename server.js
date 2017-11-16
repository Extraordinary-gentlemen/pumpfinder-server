'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const fetchJson = require('node-fetch-json');
// const pg = require('pg');

// const conString = 'postgres://postgres:1234@localhost:5432/postgres';
// const conString = 'postgres://localhost:5432';
// const client = new pg.Client(conString);

// Application Setup
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Application Middleware
app.use(cors());

// Client Request Endpoints
app.get('/test', (req, res) => res.send('Hey bro, now we\'re talking!'));

// app.get('/api/v1/markers/*', (req, res) => {
//
//   var data = {};
//   fetchJson(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas+stations&location=${req.params[0]}&radius=40&key=AIzaSyCVLpIcUfTWIcJGdIwb6YJKXUIWg6_jxfg`)
//       .then(response => {
//         let arrayOfDistances = [];
//         for(let i = 0; i < response.results.length; i++){
//           fetchJson(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.params[0]}&destinations=${response.results[i].geometry.location.lat},${response.results[i].geometry.location.lng}&key=AIzaSyCVLpIcUfTWIcJGdIwb6YJKXUIWg6_jxfg`).then(response2 => {
//                   arrayOfDistances.push([response2.rows[0].elements[0].distance.text, response2.rows[0].elements[0].duration.text]);
//                   console.log(arrayOfDistances);
//           });
//         }
//             let resultsObjects = response.results.map(function(x){
//
//               return { coords: { lat: x.geometry.location.lat, lng: x.geometry.location.lng}, address: x.formatted_address, name: x.name, distance_time: null, distance_miles: null, price: Math.floor((Math.random() * 50) + 250)/100
//             }
//           });
//
//           console.log(resultsObjects);
//
//
// res.send(resultsObjects);
//
//   });
// });


app.get('/api/v1/markers/*', (req, res) => {

fetchJson(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas+stations&location=${req.params[0]}&radius=40&key=AIzaSyCVLpIcUfTWIcJGdIwb6YJKXUIWg6_jxfg`).then(response => {

        let mapData = response.results.map(data => {

            return {
              coords: { lat: data.geometry.location.lat, lng: data.geometry.location.lng },
              address : data.formatted_address,
              name : data.name,
              fuelCost: Math.floor((Math.random() * 50) + 250)/100,
           }

          });


        let num = 0;
        mapData.forEach((datum) => {

          num++;

        fetchJson(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.params[0]}&destinations=${datum.coords.lat},${datum.coords.lng}&key=AIzaSyCVLpIcUfTWIcJGdIwb6YJKXUIWg6_jxfg`).then(response => {

          datum.distance = response.rows[0].elements[0].distance.text;
          datum.duration = response.rows[0].elements[0].duration.text;
          if(num === mapData.length) console.log(mapData);
        });

        });


});





});

app.get('*', (req, res) => res.redirect(CLIENT_URL));

// UNIX-Socket for connections
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// QUESTION: What is our database schema? We need gas station id, location (lat and long?), and price (reg, mid, prem?)
// Database Setup
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', console.error);



// TODO: JOE! Here are your notes.

// fetchJson('https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas+stations&location=47.6060443,-122.3239966&radius=40&key=AIzaSyA9n7ppgHwnbH3ltGMaGp2WpZcuocmiZdU')
// .then(response => {
//   let empt = JSON.stringify(response.results.map(function(x){ return { lat: x.geometry.location.lat, lng: x.geometry.location.lng, address: x.formatted_address, name: x.name } }))
// });

// sql useful for insertion
// INSERT INTO gasstations (name, address, price)
// VALUES ('arco', '123 fuck street', '23.34');


// ALTER TABLE gasstations
// // ADD lat VARCHAR(20)
// ADD long VARCHAR(20);
//
// ALTER TABLE gasstations
// ADD long VARCHAR(20);
//
//
//
// UPDATE gasstations
// SET lat = '41.12434', long = '51.12345'
// WHERE id=1;

//

// fetchJson('https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas+stations&location=47.6060443,-122.3239966&radius=40&key=AIzaSyA9n7ppgHwnbH3ltGMaGp2WpZcuocmiZdU')
// .then(response => {
//   let empt = response.results.map(function(x){
//         return { lat: x.geometry.location.lat, lng: x.geometry.location.lng }
// })
// console.log(empt);
//
// let moreEmp = empt.map(function(x){
//
//   fetchJson(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=47.6060443,-122.3239966&destinations=${x.lat},${x.lng}&key=AIzaSyB6PFCWQQvDJQhVpPL6PqM3W7ZcywGO1KU`)
//   .then(response => console.log(JSON.stringify(response)));
//
// })
//
// });


// fetchJson('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=47.6060443,-122.3239966&destinations=47.63585519999999,-122.3756461&key=AIzaSyB6PFCWQQvDJQhVpPL6PqM3W7ZcywGO1KU')
// .then(response => console.log(JSON.stringify(response)));


// fetchJson('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=47.6060443,-122.3239966&destinations=47.63585519999999,-122.3756461&key=AIzaSyB6PFCWQQvDJQhVpPL6PqM3W7ZcywGO1KU')
// .then(response => console.log(JSON.stringify(response)));
