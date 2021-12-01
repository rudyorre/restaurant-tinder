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
      restaurants: [],
      textInput: '',
    };
  }

  onChangeHandler = e => {
    this.setState({
      textInput: e.target.value,
    })
  }

  handleChange = e => {
    const { value } = e.target;

    // functions that retrieve liked and disliked restaurants from backend
    let getLiked = function(){
      return axios.get("http://localhost:3001/find/status/" + document.cookie + 
      "/" + "right").then(response => {return response.data})
    };

    let getDisliked = function(){
      return axios.get("http://localhost:3001/find/status/" + document.cookie + 
      "/" + "left").then(response => {return response.data})
    };

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
    }

    let results = value=='liked' ? getLiked() : getDisliked();
    const arr = [];

    // push data from each retrieved restaurant into array
    results.then(function(result) {
      for (let i = 0; i < result.length; i++) {
          let restAttributes = {
            alias: result[i].alias,
            name: result[i].name,
            img: result[i].image,
            address: result[i].address,
            order: result[i].order,
            status: result[i].status,
          }
          arr.push(restAttributes);
      }
      shuffleArray(arr);
      return arr;

    }).then(arr => {
      this.setState({
        restaurants: arr,
      })
    }).then(
      console.log(this.state.restaurants)
    );
  };

  // initially check "Liked" restaurants option
  componentDidMount() {
    var liked = document.getElementById('likedCheck');
    liked.click();
  }

  render() {
    const handleIndRestaurant = (list) => {
      this.props.setIndRestaurant(list);
    }

    document.body.scrollTop = document.documentElement.scrollTop = 0;

    let restaurantList = this.state.restaurants
      .filter(d => this.state.textInput === '' || d.name.toLowerCase().includes(this.state.textInput.toLowerCase()));

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
            <span>Filter search: </span>
            <input
              type="text"
              name="filter"
              value={this.state.textInput}
              onChange={this.onChangeHandler}
            />
          </label>
          <label style={{marginLeft: '30px'}}>
            <input
              id="likedCheck"
              type="radio"
              name="restaurantlist"
              value="liked"
              onClick={this.handleChange}
            />
            <span className="likeDislikeLabel">Liked</span>
          </label>
          <label style={{marginLeft: '20px'}}>
            <input
              id="dislikedCheck"
              type="radio"
              name="restaurantlist"
              value="disliked"
              onClick={this.handleChange}
            />
            <span className="likeDislikeLabel">Disliked</span>
          </label>
        </div>
        
        <div style={{marginLeft: '4.5%'}}>
          <br />
          <ImageList cols={3} sx={{ width: '1300px' }}>
            {restaurantList?.map((restaurant) => (
              <ImageListItem key={restaurant.img} style={{marginBottom: '40px'}}>
                <Link to="/notes_card" variant="primary" onClick={() => handleIndRestaurant([restaurant.alias, restaurant.order, restaurant.status])} style={{width: '360px'}}>
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