import React from 'react'
//import ImageList from '@mui/material/ImageList'
//import ImageListItem from '@mui/material/ImageListItem'
//import ImageListItemBar from '@mui/material/ImageListItemBar'
import axios from 'axios'

class LikedDisliked extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            restaurants: {},
        };
    }

    render() {
        return (
            <div style ={{display: 'flex', justifyContent:'center'}}>
                <h1>Liked Restaurants</h1>
            </div>
        )
    }
}

export default LikedDisliked;