import React from "react";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import app_logo from '../images/app_logo.png';
import './about.css'


const About = () => {
    return (
        <div>
            <br/>
            <div>
                <h1>About SCRAMBLE!</h1>
                <p> A React app for finding restaurants according to your preferences, so you don't have to . . . scramble to find a match.</p>
            </div>

            <div>
                <h1>Creators</h1>
            </div>


            <div>
                <CardGroup>
                    <Card>
                        <Card.Img src={app_logo}/>
                        <br/>
                        <Card.Title className="name">Karl</Card.Title>
                    </Card>

                    <Card>
                        <Card.Img src={app_logo}/>
                        <br/>
                        <Card.Title className="name">Tim</Card.Title>
                    </Card>

                    <Card>
                        <Card.Img src={app_logo}/>
                        <br/>
                        <Card.Title className="name">Eric</Card.Title>
                    </Card>

                    <Card>
                        <Card.Img src={app_logo}/>
                        <br/>
                        <Card.Title className="name">Rudy</Card.Title>
                    </Card>

                    <Card>
                        <Card.Img src={app_logo}/>
                        <br/>
                        <Card.Title className="name">Kelly</Card.Title>
                    </Card>
                    
                </CardGroup>
        </div>
       </div>
    );
};

export default About;