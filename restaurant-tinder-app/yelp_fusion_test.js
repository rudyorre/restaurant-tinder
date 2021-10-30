const yelp = require('yelp-fusion');
const client = yelp.client('API_KEY');

// get businesses
function getBusinesses(term, location) {
  client.search({
    term: term,
    location: location,
  }).then(response => {
    console.log(response.jsonBody.businesses[0].name);
  }).catch(e => {
    console.log(e);
  });
}

// autocomplete
function autocomplete(term) {
  client.autocomplete({
    text: term,
    location: 'los angeles, ca',
  }).then(response => {
    console.log(response.jsonBody.terms[0].text);
  }).catch(e => {
    console.log(e);
  });
}


getBusinesses('northern', 'los angeles, ca');
autocomplete('mcdona');
getBusinesses('southern', 'los angeles, ca');
