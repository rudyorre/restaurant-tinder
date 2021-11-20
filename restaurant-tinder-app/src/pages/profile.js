import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import {Link } from "react-router-dom";
import chirp from '../images/avatar_Chirp.png'
import cowlick from '../images/avatar_Cowlick.png'
import shell from '../images/avatar_Shell.png'
import sleep from '../images/avatar_Sleep.png'
import wiggle from '../images/avatar_Wiggle.png'
import './profile.css'

var user={
    email: "test@gmail.com",
    password: "password",
    image: '../images/app_logo.png'

};

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            avatar: chirp,
        };

    }

    handleAvatar = (value) => {
        this.setState({
            avatar: value,
        });
    }


    render(){
        return(
            <div style ={{display: 'flex', justifyContent:'center'}}>
            <Card style={{ width: '25rem'}}>
                <Card.Body>
                    <Card.Title className='title'><h1>Scramble! Profile</h1></Card.Title>
                    <Card.Img variant="top" src={this.state.avatar}/>
                    <br/>
                    <br/>
                    <section>
                        <h4>Avatar Selection</h4>
                        <ToggleButtonGroup  type="radio" name="options" defaultValue={1}>
                            <ToggleButton variant="outline-warning" id="chirp" value={1} onClick={() => this.handleAvatar(chirp)}> 1 Chirp</ToggleButton>
                            <ToggleButton variant="outline-warning" id="wiggle" value={2} onClick={() => this.handleAvatar(wiggle)}> 2 Wiggle</ToggleButton>
                            <ToggleButton variant="outline-warning" id="sleep" value={3} onClick={() => this.handleAvatar(sleep)}> 3 Sleep</ToggleButton>
                            <ToggleButton variant="outline-warning" id="cowlick" value={4} onClick={() => this.handleAvatar(cowlick)}> 4 Cowlick</ToggleButton>
                            <ToggleButton variant="outline-warning" id="shell" value={5} onClick={() => this.handleAvatar(shell)}> 5 Shell</ToggleButton>
                        </ToggleButtonGroup>
                    </section>
                    <br/>

                        <Card.Text>
                            Email: {user.email}
                            <br/>
                            Password: {user.password}
                        </Card.Text>
                        
                    <ButtonGroup>
                        <Link to="/filter"><Button variant="outline-warning">Liked/Disliked Restaurants</Button></Link>
                        <Link to="/filter"><Button variant="outline-warning">User Filter Profiles</Button></Link>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </div>

        );

    }
}


export default Profile;