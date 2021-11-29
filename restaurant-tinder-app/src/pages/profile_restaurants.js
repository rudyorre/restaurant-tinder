import React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import './profile_restaurants.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import { FaThemeisle } from 'react-icons/fa';


class LikedDisliked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLiked: null,
      restaurants: [],
    };
  }

  handleChange = e => {
    const { value } = e.target;

    this.setState({
      showLiked: value == 'liked' ? true : false,
    });

    let getLiked = function(){
      return axios.get("http://localhost:3001/find/status/" + document.cookie + 
      "/" + "right").then(response => {return response.data})
    };

    let getDisliked = function(){
      return axios.get("http://localhost:3001/find/status/" + document.cookie + 
      "/" + "left").then(response => {return response.data})
    };

    const arr = [];
    let results = this.state.showLiked ? getLiked() : getDisliked();

    results.then(function(result) {
      for (let i = 0; i < result.length; i++) {
          let restAttributes = {
            name: result[i].name,
            img: result[i].image,
            address: result[i].address,
          }
          arr.push(restAttributes);
      }
      return arr;

    }).then(arr => {
      this.setState({
        restaurants: arr,
      })
    }).then(
      console.log(this.state.restaurants)
    );
  };

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        marginTop: '10px'
      }}>
        <br />
        <h1 style={{display: 'inline'}}>My Restaurants</h1>
        <div style={{marginRight: '50px'}}>
          <label>
            <input
              type="radio"
              name="restaurantlist"
              value="liked"
              onChange={this.handleChange}
            />
            <span className="likeDislikeLabel">Liked</span>
          </label>
          <label style={{marginLeft: '20px'}}>
            <input
              type="radio"
              name="restaurantlist"
              value="disliked"
              onChange={this.handleChange}
            />
            <span className="likeDislikeLabel">Disliked</span>
          </label>
        </div>
        
        <div>
          <br />
          <ImageList cols={3} sx={{ width: '1300px', height: '1000px' }}>
            {this.state.restaurants?.map((restaurant) => (
              <ImageListItem key={restaurant.img} style={{marginBottom: '20px'}}>
                <Link to="/notes_card" variant="primary" onClick={() => {console.log("hello")}} style={{width: '360px'}}>
                  <img
                    src={`${restaurant.img}?w=248&h=100&fit=crop&auto=format`}
                    srcSet={`${restaurant.img}?w=248&h=100&fit=crop&auto=format&dpr=2 2x`}
                    alt={restaurant.name}
                    loading="lazy"
                    className="imageRest"
                  />
                </Link>
                <ImageListItemBar
                  title={<span style={{fontWeight: 'bold'}}>{restaurant.name}</span>}
                  subtitle={<span>{restaurant.address}</span>}
                  position=""
                  className="imageLabel"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    )
  }
}

export default LikedDisliked;