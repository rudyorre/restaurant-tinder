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
      username: '',
      restaurants: {},
      showLiked: true,
    };
  }

  handleChange = e => {
    const { value } = e.target;

    this.setState({
      showLiked: value == 'liked' ? true : false,
    });


    let getLiked = function(){
      return axios.get("http://localhost:3001/find/status/" + "karl" + 
      "/" + "left").then(response => {return response.data})
    };

    let Liked = getLiked();
    Liked.then(function(result){
      const arr = [];

      for (let i = 0; i < result.length; i++){
          arr.push(result[i].alias)
      }

      var Likes = arr.toString();
      console.log(Likes);
      return Likes;

    }).then(Likes => {
      this.setState({
      Liked: Likes,
      })
    }).then(
      console.log(this.state.Liked)
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
              //checked={this.state.showLiked=true}
              onChange={this.handleChange}
              defaultChecked
            />
            Liked
          </label>
          <label>
            <input
              type="radio"
              name="restaurantlist"
              value="disliked"
              //checked={this.state.showLiked=false}
              onChange={this.handleChange}
            />
            Disliked
          </label>
        </div>

        <hr />
        
        <div>
          <br />
          <ImageList sx={{ width: 800, height: 550 }}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={<span>by: {item.author}</span>}
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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];

export default LikedDisliked;