import React, { useState, useRef, useMemo } from 'react';
import TinderCard from 'react-tinder-card'
import ReactStars from "react-rating-stars-component";
import './rest_card.css';
import axios from "axios";
import like from '../images/like.png';
import dislike from '../images/dislike.png';
import yelp from '../images/yelp.png';

const db = [
  {
    title: 'Northern Cafe',
    stars: 4,
    reviews: 498,
    price: '$$',
    is_open: true,
    address: '1064 Gayley Ave Los Angeles, CA 90024',
    phone: '(310) 208-8830',
    categories: ['Chinese', 'Tapas/Small Plates'],
    transactions: ['pickup', 'delivery'],
    link: 'https://www.yelp.com/biz/northern-cafe-los-angeles',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/5GGr0jiMIBtyHOULblHo2w/o.jpg'
  },
  {
    title: 'Gogobop - Korean Rice Bar',
    stars: 4.5,
    reviews: 38,
    price: '$$',
    is_open: true,
    address: '1059 Broxton Ave Los Angeles, CA 90024',
    phone: '(310) 208-0820',
    categories: ['Korean', 'Mexican'],
    transactions: ['pickup', 'delivery'],
    link: 'https://www.yelp.com/biz/gogobop-korean-rice-bar-los-angeles-2',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/C0CjAYCun2sBU4KlJVwmiA/l.jpg'
  },
  {
    title: 'KazuNori | The Original Hand Roll Bar',
    stars: 4.5,
    reviews: 38,
    price: '$$',
    is_open: true,
    address: '1110 Gayley Ave Los Angeles, CA 90024',
    phone: '(310) 935-3974',
    categories: ['Sushi Bars'],
    transactions: ['pickup', 'delivery'],
    link: 'https://www.yelp.com/biz/kazunori-the-original-hand-roll-bar-los-angeles-2?osq=Restaurants',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/vbkyHJtiYqsj3jRblMGa0g/l.jpg'
  },
  {
    title: 'Gushi',
    stars: 4,
    reviews: 1161,
    price: '$$',
    is_open: true,
    address: '978 Gayley Ave Los Angeles, CA 90024',
    phone: '(310) 208-4038',
    categories: ['Korean'],
    transactions: ['pickup', 'delivery'],
    link: 'https://www.yelp.com/biz/gushi-los-angeles?osq=Restaurants',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/9Us4pT_4hDZ-GV8xtRU1SA/l.jpg'
  },
  {
    title: 'The Study at Hedrick',
    stars: 3.5,
    reviews: 23,
    price: '$$',
    is_open: true,
    address: '250 De Neve Dr Los Angeles, CA 90024',
    phone: '',
    categories: ['Salad', 'Pizza', 'Sandwiches'],
    transactions: ['pickup', 'delivery'],
    link: 'https://www.yelp.com/biz/the-study-at-hedrick-los-angeles-2?osq=Restaurants',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/8QbfFHR1vCXn7YR6yic2LA/l.jpg'
  },
]

let cnt = 0;

function Category(props) {
  return (
    <div style={{
          backgroundColor: '#b5f1f5',
          width: 'auto',
          padding: '5px',
          marginLeft: '10px',
          marginRight: '5px',
          borderRadius: '5px'}}>
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
          borderRadius: '5px'}}>
      {props.name}
    </div>
  );
}

function RestaurantCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(currentIndex);
    const childRefs = useMemo(
      () =>
        Array(50)
          .fill(0)
          .map((i) => React.createRef()),
      []
    );

    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }

    // Decrease current index
    const swiped = (direction, nameToDelete, index) => {
      document.getElementById("container-" + index).style.visibility = 'hidden';
      updateCurrentIndex(index - 1)
      index += 1
      // document.getElementById("container-" + index).style.display = 'block';
    }

    const swipe = async (dir) => {
      console.log("currentIndex: " + currentIndex);
      if (currentIndex <= restaurants.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        console.log('You swiped: ' + dir);
      }
    }
    
    // const onSwipe = (direction) => {
    //   console.log('You swiped: ' + direction);
    //   document.getElementById("card-container").style.visibility = 'hidden';
    // }
    
    const onCardLeftScreen = (myIdentifier) => {
      console.log(myIdentifier + ' left the screen');
    }
    
    const [restaurants, setRestaurants] = useState([]);

    React.useEffect(() => {
      axios.get("http://localhost:3001/restaurants").then((response) => {
        console.log(response.data);
        setRestaurants(response.data.reverse());
        console.log("restLen: " + restaurants.length)
        setCurrentIndex(response.data.length-1);
      });
    }, []);

    // if (cnt == 0) {
    //   fetch("http://localhost:3001/restaurants")
    //     .then((res) => res.json())
    //     .then((json) => {
    //         setList([json.reverse()]);
    //         console.log(restaurants.length)
    //         console.log(restaurants)
    //         console.log(json)
    //         setCurrentIndex(restaurants.length-1);

    //         cnt += 1;
    //         console.log(currentIndex);
    //         console.log(currentIndexRef);
    //   })
    // }

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
                      <div className="column" style={{visibility: !index || index != currentIndex ? 'hidden' : 'visible'}}>
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
                    {/* <h5 style={{marginBottom: '20px'}}><span style={{color: restaurant.is_open ? "#04cc6b" : "#FF0000", fontWeight: 'bold'}}>{restaurant.is_open ? 'Open' : 'Closed'}</span></h5> */}
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