import React, { useState, useRef, useMemo } from 'react';
import TinderCard from 'react-tinder-card'
import ReactStars from "react-rating-stars-component";
import './rest_card.css';
import axios from "axios";
import like from '../images/like.png';
import dislike from '../images/dislike.png';
import yelp from '../images/yelp.png';
import gudetama from '../images/gudetama.png';
import eggLoad from '../images/egg_load.gif'
import eggQuestion from '../images/egg_question.gif'
import eggEmpty from '../images/egg_empty.gif'

function Category(props) {
  return (
    <div className="category">
      {props.name}
    </div>
  );
}

function Transaction(props) {
  return (
    <div className="transaction">
      {props.name}
    </div>
  );
}

function LoadCard() {
  return (
    <div id="load">
      <img className="eggLoad" src={eggLoad} alt="loading..." />
    </div>
  );
}

function ErrorCard() {
  return (
    <div id="error" className="column">
      <a href="http://localhost:3000/filter" className="bgLink">
        <img className="eggQuestion" src={eggQuestion} alt="error..." />
      </a>
      <h3 className="errorLabel">you need to set a filter profile</h3>
    </div>
  );
}

function EmptyCard() {
  return (
    <div id="empty" className="column" style={{display: 'none'}}>
      <a href="http://localhost:3000/filter" className="bgLink">
        <img className="eggQuestion" src={eggEmpty} alt="error..." />
      </a>
      <h3 className="errorLabel" style={{marginTop: '5px'}}>this filter profile has no results</h3>
    </div>
  );
}

function BackgroundCard() {
  return (
    <div id="bgcard" style={{display: 'none'}}>
      <a href="http://localhost:3000/filter" className="bgLink">
        <img src={gudetama} className="bgImage" alt="filter link"></img>
      </a>
      <h3 className="bgLabel">well, you're really quite picky...</h3>
    </div>
  );
}

function RestaurantCard(props) {
    // Set indices for restaurants
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(currentIndex);
    const childRefs = useMemo(
      () =>
        Array(50)
          .fill(0)
          .map((i) => React.createRef()),
      []
    );

    // Set restaurants list
    const [restaurants, setRestaurants] = useState([]);

    // Make fetch to api to populate restaraunts list
    React.useEffect(() => {
      const filter = props.filterValue;
      // Disable error card if restaurant filter profile is NOT available
      if (filter == 'default') {
        document.getElementById('error').style.display = "flex";
        document.getElementById('load').style.display = "none";
      // Call api endpoint with parameters
      } else {
        axios.get("http://localhost:3001/restaurants", {
          params: {
            term: filter.term,
            categories: filter.categories,
            location: filter.location,
            latitude: filter.latitude,
            longitude: filter.longitude,
            price: filter.price,
            radius: filter.radius
          }}
        ).then((response) => {
          let restList = response.data;
          restList = restList.sort(() => Math.random() - 0.5)

          setRestaurants(restList);
          setCurrentIndex(restList.length-1);
          document.getElementById('load').style.display = "none";
          document.getElementById('cardContainer').style.justifyContent = "start";

          if (restList.length == 0) {
            document.getElementById('empty').style.display = "flex";
          }
        });
      }
    }, []);

    // Update next index to current
    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }

    // Decrease current index, hide card, store into DB
    const swiped = (direction, restaurant, index) => {
      // console.log("currentIndex: " + index);
      // console.log("restaurant: " + restaurant);
      // console.log("direction: " + direction);

      let obj = {
        username: document.cookie, //'karl'
        alias: restaurant.key,
        status: direction,
        name: restaurant.title,
        address: restaurant.address,
        image: restaurant.image,
        order: "Write your restaurant order here!"
      };
      
      // Store restaurant object into database
      axios
        .post("http://localhost:3001/update/", obj)
        .then((res) => console.log(res.data));

      // Display final background card
      if (index == 0) {
        document.getElementById('bgcard').style.display = 'block';
        document.getElementById('cardContainer').style.justifyContent = 'center';
      }

      // Make current card disappear
      document.getElementById("container-" + index).style.visibility = 'hidden';
      updateCurrentIndex(index - 1);
    }

    // Swipe card a certain direction
    const swipe = async (restaurant, dir) => {
      // Make final background card appear on last card
      if (currentIndex == 0) {
        document.getElementById('bgcard').style.display = 'block';
      }

      // If there are still cards, then swipe
      if (childRefs && currentIndex <= restaurants.length) {
        childRefs[currentIndex].current.swipe(dir); // Swipe the card!
        console.log('You swiped: ' + dir);
      }
    }
    
    // Handler for when card leaves screen
    const onCardLeftScreen = (myIdentifier) => {
      console.log(myIdentifier + ' left the screen');
    }

    return (
        <div className="restCardContainer">
          <div id='cardContainer'> 
            <LoadCard />
            <ErrorCard />
            <EmptyCard />
            <BackgroundCard id="bgcard" />

            {restaurants.map((restaurant, index) => (
              <TinderCard key={index} ref={childRefs[index]} flickOnSwipe={true} onSwipe={(dir) => swiped(dir, restaurant, index)} onCardLeftScreen={() => onCardLeftScreen(index)} style={{width: '1000px', height: '550px'}}>
                <div id={"container-" + index} className="wrapper card rest_card">
                  <div className="row">
                    <div className="column">
                      <h2 className="card-title">{restaurant.title}</h2>
                      <div className="row basicInfo">
                        <div className="column" style={{visibility: index !== currentIndex ? 'hidden' : 'visible'}}>
                          <ReactStars
                            count={5}
                            value={restaurant.stars}
                            edit={false}
                            size={24}
                            isHalf={true}
                            activeColor="#ffd700"
                            style={{marginRight: '0'}}
                          />
                        </div>
                        <div className="column">
                          <div className="row" style={{marginLeft: '-80px'}}>
                            <span className="reviewPrice">???</span>
                            <span className="reviewPrice">{restaurant.reviews}</span>
                            <span className="reviewPrice">???</span>
                            <span className="reviewPrice">{restaurant.price}</span>
                          </div>
                        </div>
                      </div>
                      <h5 className="subHeader">{restaurant.address}</h5>
                      <h5 className="subHeader">{restaurant.phone}</h5>
                      <div className="row subHeader">
                        {!restaurant.transactions ? '' : restaurant.transactions.map((transaction, index) => (
                          <Transaction key={index} name={transaction.split('_')}></Transaction>
                        ))}
                      </div>
                      <div className="row">
                        {!restaurant.categories ? '' : restaurant.categories.map((category, index) => (
                          <Category key={index} name={category}></Category>
                        ))}
                      </div>

                      <a href={restaurant.link} className="yelpLink">
                          <img className="yelpLogo" alt="yelp link" src={yelp}></img>
                      </a>
                    </div>
                    <div className="column">
                      <img className="restImage" src={restaurant.image} alt="food"></img>
                      <div className="row wrapper">
                        <img className="likeDislike" src={dislike} alt="dislike" onClick={() => swipe(restaurant.key, 'left')}></img>
                        <img className="likeDislike" src={like} alt="like" onClick={() => swipe(restaurant.key, 'right')}></img>
                      </div>
                    </div>
                  </div>
                </div>
              </TinderCard>
            ))}
          </div>
        </div>
    );
};

export default RestaurantCard;