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

// GET route for restauarant categories
app.get('/restaurants', (req, res) => {
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

// GET route for custom search
app.get('/search', (req, res) => {
  client.search({
    term: 'coffee',
    location: 'los angeles, ca',
    radius: 20000,
    categories: 'cafes',
    price: 2,
    open_now: true,
  }).then(response => {
    res.send(response.jsonBody.businesses.map(x => x.alias));
  }).catch(e => {
    console.log(e);
  });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));