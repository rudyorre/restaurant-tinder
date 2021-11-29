import React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import './profile_restaurants.css'
import axios from 'axios'
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
        justifyContent: 'center',
        height: '100vh'
      }}>
        <br />
        <div>
          <h1>My Restaurants</h1>
          <label>
            <input
              type="radio"
              name="restaurantlist"
              value="liked"
              onChange={this.handleChange}
            />
            Liked
          </label>
          <label>
            <input
              type="radio"
              name="restaurantlist"
              value="disliked"
              onChange={this.handleChange}
            />
            Disliked
          </label>
        </div>

        <hr />
        
        <div>
          <br />
          <ImageList cols={3} sx={{ width: 750, height: '80%' }}>
            {this.state.restaurants?.map((restaurant) => (
              <ImageListItem key={restaurant.img}>
                <img
                  src={`${restaurant.img}?w=248&h=100&fit=crop&auto=format`}
                  srcSet={`${restaurant.img}?w=248&h=100&fit=crop&auto=format&dpr=2 2x`}
                  alt={restaurant.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={restaurant.name}
                  subtitle={<span>{restaurant.address}</span>}
                  position="below"
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