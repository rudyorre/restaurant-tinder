import React from 'react';
import axios from 'axios';

import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class FilterList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filters: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/find/Filters/rudyorre")
        .then((response) => response.data)
        .then(filterList => {
            this.setState({ filters: filterList });
        });
    }

    render() {
        console.log(this.state.filters.length);
        let string_list = "";
        for (let i = 0; i < this.state.filters.length; i++) {
            string_list += JSON.stringify(this.state.filters[i]);
        }

        const filters = this.state.filters;

        const moves = filters.map((filter, index) => {
            return (
              <li key={index}>
                <button>{filter.term}</button>
              </li>
            );
          });

        const filter_cards = filters.map((filter, index) => {
            return (
                <li key={index}>
                    
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
        return (
            <center>
                {stuff}
            </center>);
    }
}

export default FilterList;