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
  // DEBUG: Check that queries exist
  console.log("--------");
  console.log(req.query.term);
  console.log(req.query.location);
  console.log(req.query.latitude);
  console.log(req.query.longitude);
  console.log(req.query.radius);
  console.log(req.query.categories);
  console.log(req.query.price);
  console.log("--------");

  // Create search object
  let searchObj = {
    term: req.query.term,
    radius: parseInt(req.query.radius),
    categories: req.query.categories,
    price: parseInt(req.query.price),
    limit: 50,
  }

  // Set location or lat/long params
  if (req.query.location) {
    searchObj.location = req.query.location;
  } else {
    searchObj.latitude = parseInt(req.query.latitude);
    searchObj.longitude = parseInt(req.query.longitude);
  }

  // Extract parameters from req for search
  client.search(searchObj).then(response => {
    // Parse out relevant yelp restaurant data to be displayed in card
    res.send(response.jsonBody.businesses.map(x => ({
      key: x.alias,
      title: x.name,
      image: x.image_url,
      link: x.url,
      phone: x.display_phone,
      stars: x.rating,
      reviews: x.review_count,
      categories: x.categories.map(c => c.title),
      address: x.location.display_address[0] + ", " + x.location.display_address[1],
      price: x.price,
      transactions: x.transactions.map(t => t.split('_').join(' ')),
    })));
  }).catch(e => {
    console.log(e);
  });
});

// GET route for custom search of restauarants list
// Hey Karl, I stole your '/restaurants' endpoint code -Rudy
app.get('/restaurants/image', (req, res) => {
  // DEBUG: Check that queries exist
  console.log("--------");
  console.log(req.query.term);
  console.log(req.query.location);
  console.log(req.query.latitude);
  console.log(req.query.longitude);
  console.log(req.query.radius);
  console.log(req.query.categories);
  console.log(req.query.price);
  console.log("--------");

  // Create search object
  let searchObj = {
    term: req.query.term,
    radius: parseInt(req.query.radius),
    categories: req.query.categories,
    price: parseInt(req.query.price),
    limit: 50,
  }

  // Set location or lat/long params
  if (req.query.location) {
    searchObj.location = req.query.location;
  } else {
    searchObj.latitude = parseInt(req.query.latitude);
    searchObj.longitude = parseInt(req.query.longitude);
  }

  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
  }

  // Extract parameters from req for search
  client.search(searchObj).then(response => {
    // Parse out relevant yelp restaurant data to be displayed in card
    let businesses = response.jsonBody.businesses;
    shuffleArray(businesses);
    res.send(businesses[0].image_url);
  }).catch(e => {
    console.log(e);
  });
});

// GET route for details on a single restuarant
app.get('/detail', (req, res) => {
  // Extract restaurant from req to get more detail
  client.business(req.query.alias).then(response => {
    const obj = response.jsonBody;
    let ans = {};

    // Send back desired data about restaurant
    ans.key = obj.alias;
    ans.title = obj.name;
    ans.image = obj.image_url;
    ans.link = obj.url;
    ans.phone = obj.display_phone;
    ans.stars = obj.rating;
    ans.reviews = obj.review_count;
    ans.categories = obj.categories.map(c => c.title);
    ans.address = obj.location.display_address[0] + ", " + obj.location.display_address[1],
    ans.price = obj.price;
    ans.transactions = obj.transactions.map(t => t.split('_').join(' ')),

    res.send(JSON.stringify(ans));
  }).catch(e => {
    console.log(e);
  });
})

// POST requests should be implemented to interface with the database

app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

// This displays message that the server running and listening to specified port
//app.listen(port, () => console.log(`Listening on port ${port}`));
