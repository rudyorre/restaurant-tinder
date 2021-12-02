import React from 'react';
import axios from 'axios';

import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom";
import { dividerClasses } from '@mui/material';

// TODO: randomizer button to randomize list of filters

class FilterList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filters: [],
            image_urls: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/find/Filters/" + document.cookie)
        .then((response) => response.data)
        // .then(filterList => shuffleArray(filterList))
        .then(filterList => {
            this.setState({ filters: filterList });
            for (let i = 0; i < this.state.filters.length; i++) {
                console.log(i);
                // default image_url
                let filter = this.state.filters[i];
                axios.get("http://localhost:3001/restaurants/image", {
                    params: {
                        term: filter.term,
                        categories: filter.categories,
                        location: filter.location,
                        latitude: filter.latitude,
                        longitude: filter.longitude,
                        price: filter.price,
                        radius: filter.radius
                    }})
                .then((response) => {
                    //let restList = response.data;
                    // restList = restList.sort(() => Math.random() - 0.5)
                    console.log(response.data);
                    let urls = this.state.image_urls;
                    urls[i] = response.data;
                    this.setState({ image_urls: urls} );
                });
            }
        });
    }
    
    handleSubmit(filter) {
        console.log("FUNCTION")
        console.log(filter)
    }

    render() {
        let string_list = "";
        for (let i = 0; i < this.state.filters.length; i++) {
            string_list += JSON.stringify(this.state.filters[i]);
        }

        let filters = this.state.filters;

        const moves = filters.map((filter, index) => {
            return (
              <li key={index}>
                <button>{filter.term}</button>
              </li>
            );
          });

        const stuff = [
            'Primary',
            'Secondary',
            'Success',
            'Danger',
            'Warning',
            'Info',
            'Light',
            'Dark',
            ].map((variant, idx) => (
            <Card
                key={idx}
                style={{ position: 'relative', width: '30rem', marginBottom: '25px' }}
            >
            <Card.Header as="h3">Featured</Card.Header>
            <Card.Body>
              <Card.Title style={{marginTop: '-10px'}}>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ));

        const capitalize = ([first, ...rest]) => {
            return first.toUpperCase() + rest.join('');
        };

        function strCapitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        const getTitle = (filter) => {
            if (filter.name) return filter.name;
            if (filter.categories.length > 0) {
                return filter.categories.map(e => capitalize(e)).join(', ');
            }
            return 'Unnamed';
        };

        const getBody = (filter) => {
            let location;
            let foodType;
            let price = {
                '1': '$',
                '2': '$$',
                '3': '$$$',
                '4': '$$$$',
            }[filter.price]

            if (filter.location) {
                location = filter.location.split(' ').map(strCapitalize).join(' ');
            } else if (filter.longitude && filter.latitude) {
                location = filter.latitude + ' ' + filter.longitude;
            } else {
                location = "No location";
            }

            
            /*
            .category {
                background-color: #b5f1f5;
                width: auto;
                padding: 10px;
                margin-left: 10px;
                margin-right: 5px;
                margin-bottom: 10px;
                border-radius: 20px;
            }*/




            return <>{location}<br/>
            {filter.term ? filter.term : 'none'}<br/>
            {price}<br/>
            {!filter.categories ? '' : filter.categories.map(e => capitalize(e)).join(', ')}<br/>
            {/*{!filter.categories ? '' : filter.categories.map((category, index) => (
                <div
                    style={{
                        backgroundColor: '#b5f1f5',
                        padding: '10px',
                        marginLeft: '1px',
                        marginRight: '5px',
                        marginBottom: '10px',
                        borderRadius: '20px',
                    }}
                    key={index}
                    name={category}>Cate
                </div>

             ))}*/}<br/>
            </>;

        };
        
        const getImage = (idx) => {
            console.log(idx + ' ' + this.state.image_urls[idx]);
            if (this.state.image_urls[idx]) {
                return this.state.image_urls[idx];
            } else {
                return "https://backend.grindcitymedia.com/wp-content/uploads/2020/03/no-image-availabe.png";
            }
        }

        return (
            <center>
                <Row xs={1} md={3} className="g-4" style={{ margin: '10px' }}>
                    {filters.map((filter, idx) => (
                        <Col>
                        <Card style={{ position: 'relative', margin: '0px', borderRadius: '30px'}}>
                            <Card.Img
                                variant="top"
                                src={getImage(idx)}
                                style={{
                                    width: '100%',
                                    height: '15vw',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '30px',
                                    borderTopRightRadius: '30px'
                                }}
                            />
                            <Card.Body style={{backgroundColor: "rgb(255 255 253)", borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px'}}>
                                <Card.Title style={{fontWeight: 'bold', marginTop: '10px', fontSize: '30px'}}>{getTitle(filter)}</Card.Title>
                                <Card.Text style={{fontSize: '20px'}}>
                                    {getBody(filter)}
                                </Card.Text>
                                {/*<Link to="/rest_card" variant="primary" onClick={this.props.setFilterValue(filter)}>Find food</Link>*/}
                                <Link class="linkButton" to="/rest_card" variant="primary" onClick={this.props.setFilterValue(filter)}>Find food</Link>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                </Row>
            </center>);
    }
}

export default FilterList;