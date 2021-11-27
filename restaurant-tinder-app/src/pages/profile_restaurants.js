import React from 'react'
//import ImageList from '@mui/material/ImageList'
//import ImageListItem from '@mui/material/ImageListItem'
//import ImageListItemBar from '@mui/material/ImageListItemBar'
import './profile_restaurants.css'
import axios from 'axios'

class LikedDisliked extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            restaurants: {},
            showLiked: true,
        };
    }

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
                    <input type="radio" name="restaurantlist" value="liked" defaultChecked/>
                    Liked
                </label>
                <label>
                    <input type="radio" name="restaurantlist" value="liked"/>
                    Disliked
                </label>
                
            </div>
        )
    }
}

export default LikedDisliked;