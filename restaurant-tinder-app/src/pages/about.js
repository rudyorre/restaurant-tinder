import React from "react";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import './about.css'
import chirp from '../images/avatar_Chirp.png'
import cowlick from '../images/avatar_Cowlick.png'
import shell from '../images/avatar_Shell.png'
import sleep from '../images/avatar_Sleep.png'
import wiggle from '../images/avatar_Wiggle.png'


const About = () => {
    return (
        <div>
            <br/>
            <div>
                <h1 className="alignment">About SCRAMBLE!</h1>
                <p className="alignment_i"> We find restaurants according to your preferences, so you don't have to . . . scramble to find a match.</p>
                <br/>
                <p className = "alignment"> A restaurant-matching web application that helps users find restaurants. Scramble! allows users to input their preferred cuisine, location, price, and other preferences, which will be saved as a "filter profile." From this "filter profile," users can either approve or disapprove each restaurant (one at a time) and see more in depth information about each restaurant. Users can also make notes about orders for their approved, or liked, restaurants.

</p>
            </div>
            <br/>

            <hr/>

            <div>
                <span className = "creator">Creators <span className ="creator_sub">(As Birds)</span></span>
            </div>

            <br/>

            <div>
                <CardGroup>
                    <Card>
                        <Card.Img src={cowlick}/>
                        <br/>
                        <Card.Title className="name">Karl Goether</Card.Title>
                    </Card>

                    <Card>
                        <Card.Img src={wiggle}/>
                        <br/>
                        <Card.Title className="name">Timothy Lee</Card.Title>
                    </Card>

                    <Card>
                        <Card.Img src={sleep}/>
                        <br/>
                        <Card.Title className="name">Eric Zhang</Card.Title>
                    </Card>

                    <Card>
                        <Card.Img src={chirp}/>
                        <br/>
                        <Card.Title className="name">Rudy Orre</Card.Title>
                    </Card>

                    <Card>
                        <Card.Img src={shell}/>
                        <br/>
                        <Card.Title className="name">Kelly Yang</Card.Title>
                    </Card>
                    
                </CardGroup>
        </div>
        <br/>
       </div>
    );
};

export default About;