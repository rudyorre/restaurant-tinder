import React from 'react'
//import ImageList from '@mui/material/ImageList'
//import ImageListItem from '@mui/material/ImageListItem'
//import ImageListItemBar from '@mui/material/ImageListItemBar'
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
          showLiked: value=='liked'? true : false,
        });
      };

    render() {
        return (
            <div style ={{
                display: 'flex', 
                justifyContent:'center',
                height:'100vh'
            }}>
                <h1>My Restaurants</h1>
                <br />
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
        )
    }
}

export default LikedDisliked;