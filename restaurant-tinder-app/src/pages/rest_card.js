import React, { useState, useRef, useMemo } from 'react';
import TinderCard from 'react-tinder-card'
import ReactStars from "react-rating-stars-component";
import './rest_card.css';
import axios from "axios";
import like from '../images/like.png';
import dislike from '../images/dislike.png';
import yelp from '../images/yelp.png';

function Category(props) {
  return (
    <div style={{
          backgroundColor: '#b5f1f5',
          width: 'auto',
          padding: '5px',
          marginLeft: '10px',
          marginRight: '5px',
          borderRadius: '10px'}}>
      {props.name}
    </div>
  );
}

function Transaction(props) {
  return (
    <div style={{
          backgroundColor: '#c7f5b5',
          width: 'auto',
          padding: '5px',
          marginLeft: '10px',
          marginRight: '5px',
          borderRadius: '10px'}}>
      {props.name}
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

    // Decrease current index and hide card
    const swiped = (direction, nameToDelete, index) => {
      document.getElementById("container-" + index).style.visibility = 'hidden';
      updateCurrentIndex(index - 1)
    }

    // Swipe card a certain direction
    const swipe = async (dir) => {
      console.log("currentIndex: " + currentIndex);
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
          <div className='cardContainer' style={{position: 'flex', contentAlign: 'center', width: '1000px', height: '520px'}}> 
          {restaurants.map((restaurant, index) => (
            <TinderCard ref={childRefs[index]} flickOnSwipe={true} onSwipe={(dir) => swiped(dir, restaurant.title, index)} onCardLeftScreen={() => onCardLeftScreen('fooBar')} style={{width: '1000px', height: '520px'}}>
              <div id={"container-" + index} className="wrapper card" style={{height: '520px', width: '1000px', padding: '50px', backgroundColor: 'white', borderRadius: '10px'}}>
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
                        <Transaction name={transaction}></Transaction>
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
                    <img style={{borderRadius: '20px', height: '370px', width: '470px', marginTop: '50px', objectFit: 'cover'}} src={restaurant.image} alt="food"></img>
                    <div className="row wrapper">
                      <img className="likeDislike" src={dislike} alt="dislike" onClick={() => swipe('left')}></img>
                      <img className="likeDislike" src={like} alt="like" onClick={() => swipe('right')}></img>
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