import React from 'react';
import axios from 'axios';

import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom";

// TODO: randomizer button to randomize list of filters

class FilterList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filters: [],
        }
    }

    componentDidMount() {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        axios.get("http://localhost:3001/find/Filters/" + document.cookie)
        .then((response) => response.data)
        // .then(filterList => shuffleArray(filterList))
        .then(filterList => {
            this.setState({ filters: filterList });
        });
    }

<<<<<<< HEAD
=======
    handleSubmit(filter) {
        console.log("FUNCTION")
        console.log(filter)
    }

>>>>>>> 4f503a7bcc141ddf393cbeb3b05183e26c3b4158
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
                style={{ position: 'relative', width: '30rem', marginBottom: '25px'  }}
            >
            <Card.Header as="h5">Featured</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ));


        
        /*
        name: '',
        location: '',
        term: '',
        categories: '',
        price: '1',
        latitude: '',
        longitude: '',
        radius: '8046.72',
        */

        const capitalize = ([first, ...rest]) => {
            return first.toUpperCase() + rest.join('');
        };

        const getTitle = (filter) => {
            if (filter.name) return filter.name;
            if (filter.categories.length > 0) {
                return filter.categories.map(e => capitalize(e)).join(', ');
            }
            return 'Unnamed';
        };

        const handleSubmit = (filter) => {
            this.props.setFilterValue(filter);
            // redirect
        }

        return (
            <center>
                <Row xs={1} md={3} className="g-4" style={{ margin: '10px' }}>
                    {filters.map((filter, idx) => (
                        <Col>
                        <Card style={{ position: 'relative', margin: '0px'}}>
                            <Card.Img
                                variant="top"
                                src="https://s3-media2.fl.yelpcdn.com/bphoto/axO_FH4VwDYcPQOuabFi6g/o.jpg"
                                style={{
                                    width: '100%',
                                    height: '15vw',
                                    objectFit: 'cover',
                                }}
                            />
                            <Card.Body>
                                <Card.Title>{getTitle(filter)}</Card.Title>
                                <Card.Text>
                                    {filter.categories ? 'true' : 'false'}
                                    name: '',<br/>
                                    location: '',
                                    term: '',
                                    categories: '',
                                    price: '1',
                                    latitude: '',
                                    longitude: '',
                                    radius: '8046.72',
                                </Card.Text>
<<<<<<< HEAD
                                <Button variant="primary" onClick={() => this.props.setFilterValue(filter)}>Find food</Button>
=======
                                <Link to="/rest_card" variant="primary" onClick={() => handleSubmit(filter)}>Find food</Link>
>>>>>>> 4f503a7bcc141ddf393cbeb3b05183e26c3b4158
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                </Row>
            </center>);
    }
}

export default FilterList;