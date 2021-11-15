import React from 'react';
import TinderCard from 'react-tinder-card'
import ReactStars from "react-rating-stars-component";
import './rest_card.css';
import like from '../images/like.png';
import dislike from '../images/dislike.png';
import yelp from '../images/yelp.png';

const i = React.createRef();

const swipe = async (dir) => {
  await i.current.swipe(dir); // Swipe the card!
  // const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
  // if (cardsLeft.length) {
  //   const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
  //   const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
  //   alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
  //   childRefs[index].current.swipe(dir) // Swipe the card!
  // }
}

const onSwipe = (direction) => {
  console.log('You swiped: ' + direction);
  document.getElementById("card-container").style.visibility = 'hidden';
}

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen');
}

function Tag(props) {
  return (
    <div style={{
          backgroundColor: '#b4d7ea',
          width: 'auto',
          display: 'inline',
          padding: '5px',
          marginRight: '5px',
          borderRadius: '5px'}}>
      {props.name}
    </div>
  );
}

function RestaurantCard() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}
        >
          <TinderCard ref={i} flickOnSwipe={true} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} style={{height: '400px', width: '900px'}}>
            <div id="card-container" className="wrapper card" style={{height: '400px', width: '900px', padding: '50px', backgroundColor: 'white', borderRadius: '10px'}}>
              <div className="row">
                <div className="column">
                  <h2 className="card-title">Northern Cafe</h2>
                  <div className="row" style={{verticalAlign: 'middle', textAlign: 'center'}}>
                    <ReactStars
                      count={5}
                      value={4}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <div style={{margin: "5px"}}>•</div>
                    <div style={{margin: "5px"}}>498</div>
                    <div style={{margin: "5px"}}>•</div>
                    <div style={{margin: "5px"}}>$$</div>
                  </div>
                  <h4><span style={{color: "#04cc6b"}}>Open</span> until 3:00pm</h4>
                  <h4>1064 Gayley Ave Los Angeles, CA 90024</h4>
                  <h4>(310) 208-8830</h4>
                  <div className="row">
                    <Tag name="Chinese"></Tag>
                    <Tag name="Tapas/Small Plates"></Tag>
                  </div>
                  <a href="https://www.yelp.com/biz/northern-cafe-los-angeles" style={{marginTop: "30px"}}>
                      <img style={{border: 'none', height: '50px'}} alt="yelp link" src={yelp}></img>
                  </a>
                </div>
                <div className="column">
                  <img style={{borderRadius: '10px', width: '600px'}} src="https://s3-media0.fl.yelpcdn.com/bphoto/5GGr0jiMIBtyHOULblHo2w/o.jpg" alt="food"></img>
                  <div className="row wrapper">
                    <img className="likeDislike" src={like} alt="like" onClick={() => swipe('right')}></img>
                    <img className="likeDislike" src={dislike} alt="dislike" onClick={() => swipe('left')}></img>
                  </div>
                </div>
              </div>
            </div>
          </TinderCard>
        </div>
    );
};

export default RestaurantCard;