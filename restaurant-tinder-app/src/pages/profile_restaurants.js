import React from 'react'
import axios from 'axios'

class LikedDisliked extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            restaurants: {},
        }
    }
}