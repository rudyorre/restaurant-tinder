import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link } from "react-router-dom";
import test from '../images/app_logo.png'

var user={
    email: "test@gmail.com",
    password: "password",
    image: '../images/app_logo.png'

};

function Profile() {
    return (
        <div style ={{display: 'flex', justifyContent:'center'}}>
            <Card style={{ width: '25rem'}}>
                <Card.Body>
                    <Card.Title style={{align: 'center'}}>User's Scramble! Profile</Card.Title>
                    <Card.Img variant="top" src={test}/>

                        <Card.Text>
                            Email: {user.email}
                            <br/>
                            Password: {user.password}
                        </Card.Text>
                    <Link to="/filter"><Button variant="primary">Liked and Disliked Restaurants</Button></Link>
                    <Link to="/filter"><Button variant="primary">User's Created Filters</Button></Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;