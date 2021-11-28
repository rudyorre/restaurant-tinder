import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {Link} from "react-router-dom";

import chirp from '../images/avatar_Chirp.png'
import cowlick from '../images/avatar_Cowlick.png'
import shell from '../images/avatar_Shell.png'
import sleep from '../images/avatar_Sleep.png'
import wiggle from '../images/avatar_Wiggle.png'

import './profile.css'
import axios from 'axios'


//Username in document.cookie

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: document.cookie,
            avatar: 1,
            image: "",
            email: "",
        };
    }

    componentDidMount() {
        let choices =[chirp, wiggle, sleep, cowlick, shell]

        axios
          .get("http://localhost:3001/find/User/" + this.state.username)
          .then((response) => {
            this.setState({
                avatar: response.data[0].avatar,
                image: choices[response.data[0].avatar -1],
                email: response.data[0].username,
            });
          })
          .catch(function (error) {
                console.log(error);
          });
      }

    handleAvatar = (value) => {
        //Setting the new state of the image and updating the user's preferences
        let newAvatar;

        switch(value){
            case 1: 
                this.setState({avatar: 1}, () => axios.post("http://localhost:3001/update/UserInfo/:username", this.state));
                newAvatar = chirp;
                break;

            case 2: 
                this.setState({avatar: 2}, () => axios.post("http://localhost:3001/update/UserInfo/:username", this.state));
                newAvatar = wiggle;
                break;

            case 3: 
                this.setState({avatar: 3}, () => axios.post("http://localhost:3001/update/UserInfo/:username", this.state));
                newAvatar = sleep;
                break;

            case 4: 
                this.setState({avatar: 4}, () => axios.post("http://localhost:3001/update/UserInfo/:username", this.state));
                newAvatar = cowlick;
                break;

            case 5: 
                this.setState({avatar: 5}, () => axios.post("http://localhost:3001/update/UserInfo/:username", this.state));
                newAvatar = shell;
                break;
        }

        this.setState({image: newAvatar})
        return;
    }

    logoutCookie(){
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        console.log(document.cookie)
    } 


    render(){
        return(
            <div style ={{display: 'flex', justifyContent:'center'}}>
            <Card style={{ width: '25rem'}}>
                <Card.Body>
                    <Card.Title className='title'><h1> Scramble! Profile</h1><p>Username: {this.state.email}</p></Card.Title>
                    <Card.Img variant="top" src={this.state.image}/>
                    <br/>
                    <br/>
                    <section>
                        <h3>Avatar Selection</h3>
                        <ButtonGroup  type="radio" name="options" defaultValue={1}>
                            <Button className ="image-button" id="chirp" value={1} onClick={() => this.handleAvatar(1)}> 1 Chirp</Button>
                            <Button className ="image-button"id="wiggle" value={2} onClick={() => this.handleAvatar(2)}> 2 Wiggle</Button>
                            <Button className ="image-button" id="sleep" value={3} onClick={() => this.handleAvatar(3)}> 3 Sleep</Button>
                            <Button className ="image-button" id="cowlick" value={4} onClick={() => this.handleAvatar(4)}> 4 Cowlick</Button>
                            <Button className ="image-button" id="shell" value={5} onClick={() => this.handleAvatar(5)}> 5 Shell</Button>
                        </ButtonGroup>
                    </section>
                    <hr/>
                        
                    <ButtonGroup>
                        <Link to="/filter"><Button className="image-button">Liked/Disliked Restaurants</Button></Link>
                        <Link to="/filter"><Button className="image-button">User Filter Profiles</Button></Link>
                    </ButtonGroup>
                    <Link to="/login"><Button variant = "link" onClick={()=> this.logoutCookie()}>Sign Out</Button></Link>
                </Card.Body>
            </Card>
        </div>

        );

    }
}


export default Profile;