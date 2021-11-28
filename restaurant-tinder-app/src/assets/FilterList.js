import React from 'react';
import axios from 'axios';

import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: randomizer button to randomize list of filters

class FilterList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filters: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/find/Filters/" + document.cookie)
        .then((response) => response.data)
        .then(filterList => {
            this.setState({ filters: filterList });
        });
        this.randomizeFilters();
    }

    randomizeFilters() {
        // Fisher-Yates Algorithm
        // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        let filters = this.state.filters;
        shuffleArray(filters);
        this.setState({
            filters: filters,
        });
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
        category: '',
        price: '1',
        latitude: '',
        longitude: '',
        distance: '8046.72',
        */

        const capitalize = ([first, ...rest]) => {
            return first.toUpperCase() + rest.join('');
        };

        const getTitle = (filter) => {
            if (filter.name) return filter.name;
            if (filter.category.length > 0) {
                return filter.category.map(e => capitalize(e)).join(', ');
            }
            return 'Unnamed';
        };

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
                                    {filter.category ? 'true' : 'false'}
                                    name: '',<br/>
                                    location: '',
                                    term: '',
                                    category: '',
                                    price: '1',
                                    latitude: '',
                                    longitude: '',
                                    distance: '8046.72',
                                </Card.Text>
                                <Button variant="primary" onClick={this.randomizeFilters}>Find food</Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                </Row>
            </center>);
    }
}

export default FilterList;