import React, { useState, useRef, useMemo } from 'react';
import TinderCard from 'react-tinder-card'
import ReactStars from "react-rating-stars-component";
import './rest_card.css';
import axios from "axios";
import like from '../images/like.png';
import dislike from '../images/dislike.png';
import yelp from '../images/yelp.png';
import gudetama from '../images/gudetama.png';

function Category(props) {
  return (
    <div style={{
          backgroundColor: '#b5f1f5',
          width: 'auto',
          padding: '10px',
          marginLeft: '10px',
          marginRight: '5px',
          borderRadius: '20px'}}>
      {props.name}
    </div>
  );
}

function Transaction(props) {
  return (
    <div style={{
          backgroundColor: '#c7f5b5',
          width: 'auto',
          padding: '10px',
          marginLeft: '10px',
          marginRight: '5px',
          borderRadius: '20px',
          textTransform: 'capitalize'}}>
      {props.name}
    </div>
  );
}

function BackgroundCard() {
  return (
    <div id="bgcard" style={{display: 'none'}}>
      <a href="http://localhost:3000/filter" style={{position: 'absolute', top: '250px', left: '570px'}}>
        <img src={gudetama} style={{position: 'absolute', contentAlign: 'center', width: '300px'}}></img>
      </a>
      <h3 style={{position: 'absolute', contentAlign: 'center', top: '520px', left: '540px'}}>well, you're really quite picky...</h3>
    </div>
  );
}

function RestaurantCard() {
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
      axios.get("http://localhost:3001/restaurants").then((response) => {
        setRestaurants(response.data.reverse());
        setCurrentIndex(response.data.length-1);
      });
    }, []);

    // Set next index to current
    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }

    // Decrease current index, hide card, store into DB
    const swiped = (direction, restaurant, index) => {
      console.log("currentIndex: " + index);
      console.log("restaurant: " + restaurant);
      console.log("direction: " + direction);

      let obj = {
        username: "karl",
        alias: restaurant.key,
        status: direction,
        name: restaurant.title,
        address: restaurant.address
      };
      
      // Store restaurant object into database
      axios
        .post("http://localhost:3001/update/", obj)
        .then((res) => console.log(res.data));

      // Display final background card
      if (index == 1) {
        document.getElementById('bgcard').style.display = 'block';
      }

      // Make current card disappear
      document.getElementById("container-" + index).style.visibility = 'hidden';
      updateCurrentIndex(index - 1);
    }

    // Swipe card a certain direction
    const swipe = async (restaurant, dir) => {
      // console.log("currentIndex: " + currentIndex);
      // console.log("restaurant: " + restaurant);
      // console.log("direction: " + dir);

      if (currentIndex == 1) {
        document.getElementById('bgcard').style.display = 'block';
      }

      if (currentIndex <= restaurants.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        console.log('You swiped: ' + dir);
      }
    }
    
    // Handler for when card leaves screen
    const onCardLeftScreen = (myIdentifier) => {
      console.log(myIdentifier + ' left the screen');
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}
        >
          
          <BackgroundCard id="bgcard"></BackgroundCard>
          <div className='cardContainer' style={{position: 'flex', contentAlign: 'center', width: '1000px', height: '550px'}}> 
          {restaurants.map((restaurant, index) => (
            <TinderCard ref={childRefs[index]} flickOnSwipe={true} onSwipe={(dir) => swiped(dir, restaurant, index)} onCardLeftScreen={() => onCardLeftScreen(index)} style={{width: '1000px', height: '550px'}}>
              <div id={"container-" + index} className="wrapper card" style={{height: '550px', width: '1000px', padding: '50px', backgroundColor: 'white', borderRadius: '10px'}}>
                <div className="row">
                  <div className="column">
                    <h2 className="card-title">{restaurant.title}</h2>
                    <div className="row" style={{verticalAlign: 'middle', textAlign: 'center', marginBottom: '25px'}}>
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
                          <span style={{margin: '5px 7px', padding: '0px', width: 'auto'}}>•</span>
                          <span style={{margin: '5px 7px', padding: '0px', width: 'auto'}}>{restaurant.reviews}</span>
                          <span style={{margin: '5px 7px', padding: '0px', width: 'auto'}}>•</span>
                          <span style={{margin: '5px 7px', padding: '0px', width: 'auto'}}>{restaurant.price}</span>
                        </div>
                      </div>
                    </div>
                    <h5 style={{marginBottom: '20px'}}>{restaurant.address}</h5>
                    <h5 style={{marginBottom: '25px'}}>{restaurant.phone}</h5>
                    <div className="row" style={{marginBottom: '20px'}}>
                      {!restaurant.transactions ? '' : restaurant.transactions.map((transaction, index) => (
                        <Transaction name={transaction.split('_')}></Transaction>
                      ))}
                    </div>
                    <div className="row">
                      {!restaurant.categories ? '' : restaurant.categories.map((category, index) => (
                        <Category name={category}></Category>
                      ))}
                    </div>

                    <a href={restaurant.link} style={{marginTop: "30px", width: '124px'}}>
                        <img style={{border: 'none', height: '50px'}} alt="yelp link" src={yelp}></img>
                    </a>
                  </div>
                  <div className="column">
                    <img style={{borderRadius: '20px', height: '370px', width: '470px', marginTop: '40px', objectFit: 'cover'}} src={restaurant.image} alt="food"></img>
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