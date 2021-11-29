import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ReactStars from "react-rating-stars-component";
import './rest_card.css';
import axios from "axios";
import yelp from '../images/yelp.png';
import eggQuestion from '../images/egg_question.gif'
import eggLike from '../images/egg_like.gif'
import eggDislike from '../images/egg_dislike.gif'

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
    // Liked restaurant entity to be displayed
    const restAlias = props.indRestaurantValue[0];
    const restOrder = props.indRestaurantValue[1];
    const restStatus = props.indRestaurantValue[2];

    // Set restaurants list
    const [restaurant, setRestaurant] = useState("default");

    // Make fetch to api to get individual restaurant data
    React.useEffect(() => {
        if (props.indRestaurantValue == 'restaurant') {
            document.getElementById('noRestaurant').style.display = 'flex';
        } else {
            // Call api endpoint with parameters
            axios.get("http://localhost:3001/detail", {
                params: {
                    alias: restAlias
                }}
            ).then((response) => {
                let restObj = response.data;
                console.log(response.data)
                setRestaurant(restObj);

                // RIGHT: order notes, LEFT: sad egg gif
                if (restStatus == 'left') {
                    document.getElementById("yelpId").style.marginLeft = '-10px';
                    document.getElementById("yelpRow").style.flexDirection = 'row-reverse';
                    document.getElementById("likeImage").style.display = 'none';
                    document.getElementById("like").style.display = 'none';
                    document.getElementById("dislike").style.display = 'flex';
                }
            });
        }
    }, []);

    // Handle change in restaurant order to store in db
    const handleChange = (event) => {
        console.log(restaurant.address)
        let obj = {
            username: document.cookie,
            alias: restaurant.key,
            name: restaurant.title,
            address: restaurant.address,
            image: restaurant.image,
            status: restStatus,
            order: event.target.value
        };
          
        // Store restaurant object with order into database
        axios
            .post("http://localhost:3001/update/", obj)
            .then((res) => console.log(res.data));
    };

    if (restaurant != "default") {
        return (
            <div className="restCardContainer">
                <div id='cardContainer'> 
                    <div className="wrapper card rest_card" style={{height: '600px'}}>
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
                                <div id="like" className="row orderField">
                                    <TextField
                                        onChange={handleChange}
                                        id="filled-multiline-static"
                                        label="Notes"
                                        multiline
                                        rows={3}
                                        defaultValue={restOrder}
                                        variant="filled"
                                        inputProps={{ 'maxlength': '200' }}
                                    />
                                </div>
                                <div id="dislike" className="column" style={{display: 'none'}} >
                                        <img src={eggDislike} style={{width: '170px', marginTop: '-20px'}}></img>
                                </div>
                            </div>
                            <div className="column">
                                <img className="restImage" src={restaurant.image} alt="food"></img>
                                <div id="yelpRow" className="row" style={{flexDirection: 'row'}}>
                                    <img id="likeImage" src={eggLike} style={{width: '200px', marginTop: '-45px', marginLeft: '20px'}}></img>
                                    <a href={restaurant.link} className="yelpLink">
                                        <img id="yelpId" className="yelpLogo" alt="yelp link" src={yelp} style={{marginLeft: '130px', marginTop: '-5px'}}></img>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id="noRestaurant" className="restCardContainer" style={{display: 'none'}}>
                <div id='column'> 
                    <a href="http://localhost:3000/profile_restaurants" className="bgLink">
                        <img className="eggQuestion" src={eggQuestion} alt="error..." style={{margin: 'auto'}} />
                    </a>
                    <h3 className="errorLabel">you don't have a restaurant</h3>
                </div>
            </div>
        );
    }
};

export default NotesCard;