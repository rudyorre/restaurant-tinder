'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

require('dotenv').config();
const yelp = require('yelp-fusion');
const key = process.env.REACT_APP_API_KEY;
const client = yelp.client(key);


// Middleware runs everytime
app.use((req, res, next) => {
  console.log("got request", req.url);
  next();
});

app.use(cors({
  'allowedHeaders': ['Content-Type'],
  'origin': '*',
  'preflightContinue': true
}));

// GET route for root
app.get('/', (req, res) => {
  res.send('Welcome to our Yelp API')
})

// GET route for list of restauarant categories
app.get('/categories', (req, res) => {
  client.allCategories().then(response => {
    let restaurants = response.jsonBody.categories.filter(function(item) {
      return item.parent_aliases.includes('restaurants');         
    });
    let aliases = restaurants.map(x => x.alias);
    res.send(aliases);
  }).catch(e => {
    console.log(e);
  });
});

// GET route for custom search of restauarants list
app.get('/restaurants', (req, res) => {
  // **Extract parameters from req for search**
  client.search({
    term: 'coffee',
    location: 'los angeles, ca',
    radius: 20000,
    categories: 'cafes',
    price: 2,
    open_at: 1636138800,
    limit: 50,
  }).then(response => {
    res.send(response.jsonBody);
    //res.send(response.jsonBody.businesses.map(x => x.alias));
  }).catch(e => {
    console.log(e);
  });
});

// GET route for details on a single restuarant
app.get('/detail', (req, res) => {
  // **Extract restaurant from req to get more detail**
  client.business('gary-danko-san-francisco').then(response => {
    const obj = response.jsonBody;
    let ans = {};

    // Send back desired data about restaurant
    ans.alias = obj.alias;
    ans.name = obj.name;
    ans.image_url = obj.image_url;
    ans.url = obj.url;
    ans.display_phone = obj.display_phone;
    ans.rating = obj.rating;
    ans.review_count = obj.review_count;
    ans.categories = obj.categories;
    ans.location = obj.location.display_address;
    ans.price = obj.price;
    ans.hours = obj.hours;

    res.send(JSON.stringify(ans));
  }).catch(e => {
    console.log(e);
  });
})

// POST requests should be implemented to interface with the database

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));