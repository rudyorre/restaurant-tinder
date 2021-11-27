import React from 'react';
import TextField from '@mui/material/TextField';
import ReactStars from "react-rating-stars-component";
import './rest_card.css';
import axios from "axios";
import yelp from '../images/yelp.png';

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

function NotesCard(props) {
    // const restaurant = props.restaurant
    // Liked restaurant entity to be displayed
    const restaurant = {
        "key": "chicken-meets-rice-cupertino",
        "title": "Chicken Meets Rice",
        "image": "https://s3-media3.fl.yelpcdn.com/bphoto/AhtC8YQKSMBP2MBJy9U2JQ/o.jpg",
        "link": "https://www.yelp.com/biz/chicken-meets-rice-cupertino?adjust_creative=_nH0RFg9KjvscPtWP6_Fgg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=_nH0RFg9KjvscPtWP6_Fgg",
        "phone": "(408) 412-7728",
        "stars": 4.5,
        "reviews": 130,
        "categories": [
        "Chicken Shop",
        "Asian Fusion",
        "Chinese"
        ],
        "address": "10445 S De Anza Blvd, Ste 101",
        "price": "$$",
        "transactions": [
        "delivery",
        "pickup"
        ]
    };

    // Handle change in restaurant order to store in db
    const handleChange = (event) => {
        let obj = {
            username: "karl"/*document.cookies*/,
            alias: restaurant.key,
            name: restaurant.title,
            address: restaurant.address,
            order: event.target.value
        };
          
        // Store restaurant object with order into database
        axios
            .post("http://localhost:3001/update/", obj)
            .then((res) => console.log(res.data));
    };

    return (
        <div className="restCardContainer">
            <div id='cardContainer'> 
                <div className="wrapper card rest_card">
                    <div className="row">
                        <div className="column">
                            <h2 className="card-title">{restaurant.title}</h2>
                            <div className="row basicInfo">
                                <div className="column">
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
                                        <span className="reviewPrice">•</span>
                                        <span className="reviewPrice">{restaurant.reviews}</span>
                                        <span className="reviewPrice">•</span>
                                        <span className="reviewPrice">{restaurant.price}</span>
                                    </div>
                                </div>
                            </div>
                            <h5 className="subHeader">{restaurant.address}</h5>
                            <h5 className="subHeader">{restaurant.phone}</h5>
                            <div className="row subHeader">
                                {!restaurant.transactions ? '' : restaurant.transactions.map((transaction) => (
                                    <Transaction name={transaction.split('_')}></Transaction>
                                ))}
                            </div>
                            <div className="row">
                                {!restaurant.categories ? '' : restaurant.categories.map((category) => (
                                    <Category name={category}></Category>
                                ))}
                            </div>
                            <div className="row orderField">
                                <TextField
                                    onChange={handleChange}
                                    id="filled-multiline-static"
                                    label="Notes"
                                    multiline
                                    rows={3}
                                    defaultValue="Write your restaurant order here!"
                                    variant="filled"
                                    inputProps={{ 'maxlength': '200' }}
                                />
                            </div>
                        </div>
                        <div className="column">
                            <img className="restImage" src={restaurant.image} alt="food"></img>
                            <div className="row" style={{flexDirection: 'row-reverse'}}>
                                <a href={restaurant.link} className="yelpLink">
                                    <img className="yelpLogo" alt="yelp link" src={yelp}></img>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesCard;