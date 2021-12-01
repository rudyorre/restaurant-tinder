import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './filter.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import SelectSearch from 'react-select-search';
import '../assets/search.css';
import Fuse from 'fuse.js';

import FilterList from '../assets/FilterList.js';

import Overlay from "react-overlay-component";

import { usePosition } from 'use-position';

import axios from 'axios'

const SliderWithTooltip = createSliderWithTooltip(Slider);

function percentFormatter(v) {
    return `${v*0.25} miles`;
}

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            term: '',
            categories: '',
            price: '1',
            latitude: '',
            longitude: '',
            radius: '8046.72',
            username: document.cookie,
            time: '',
            isOpen: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
    }



    componentDidMount() {
        // nothing for now
    }

    handleCoordinates() {
        // get location of user
        const success = position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.setState({
              latitude: latitude,
              longitude: longitude
            });
        };

        // error handling
        const error = () => {
            console.log("Unable to retrieve your location");
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }

    handleChange(event) {
        let key = event.target.name;
        // this.setState({key: event.target.value});
        this.setState({
            [key]: event.target.value
        });
        return;
    }

    handleSlider = (value) => {
        let miles = value * 0.25;
        let meters = miles * 1609.34;
        this.setState({
            radius: meters
        });
    }

    handlecategories = (value) => {
        this.setState({
            categories: value
        })
    }

    handleSubmit(event) {

        var jstring = JSON.stringify(this.state);
        this.setState({
            username: document.cookie
        })
        axios.post("http://localhost:3001/record/Filter/",this.state)
        const filter = {
            name: this.state.name,
            location: this.state.location,
            term: this.state.term,
            categories: this.state.categories,
            price: this.state.price,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            radius: this.state.radius,
            username: this.state.username,
        }
        console.log('handleSubmit: ' + filter);
        this.props.setFilterValue(filter);
        // event.preventDefault();
    }

    setOverlay(value) {
        this.setState({isOpen: value});
    }

    render() {
        // const [isOpen, setOverlay] = useState(false);
        // categories dropdown variables
        const options = getCategories();
        let categoriesValue = this.state.categories;

        const closeOverlay = () => this.setOverlay(false);

        const configs = {
            animate: true,
            clickDismiss: true,
            escapeDismiss: true,
            focusOutline: false,
        };

        const CreateFilterProfile = <Button
            className="filterButton"
            style={{ margin: '20px 40% 0 40%', width: '20%', color: '#313133', fontWeight: 'bold', borderRadius: '30px', padding: '5px 5px' }}
            onClick={() => {
                this.setOverlay(true);
            }}
        >
            <span style={{fontSize: '20px', fontWeight: '600'}}>Create Filter Profile</span>
        </Button>

        return (
            <div style={{ marginLeft: '5%', marginRight: '5%', marginBottom: '20px' }}>
                <div>
                    <h1 className="alignment" style={{marginTop: '30px', marginBottom: '20px'}}>Find Your Food!</h1>
                    <p style={{fontSize: '20px', marginBottom: '0'}} className="alignment_i">Pick a filter profile to start finding restaurants of any style!</p>
                    {/* <p style={{fontSize: '20px'}} className = "alignment">To create a custom filter profile and start swiping, click below:</p> */}
                </div>
                <span style={{marginTop: '50px'}}>
                {CreateFilterProfile}
                </span>

                <Overlay
                    configs={configs}
                    isOpen={this.state.isOpen}
                    closeOverlay={closeOverlay}
                    {...this.props}
                        style={{
                        borderRadius: 3,
                        ...this.props.style,
                        }}
                >
                    <div
                    >
                    <h2>Filters</h2>
                    <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div class="container-fluid">
                            <div class="row" id="fs_app">
                                <section class="col-12" id="fs_price_body">
                                    <span class="heading">
                                        Name
                                    </span>
                                    <div class="row">
                                        <label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter Custom Name"
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                    </div>
                                </section>

                                <section class="col-12" id="fs_price_body">
                                        <span class="heading">
                                            Location
                                        </span>
                                    <div class="row">
                                        <div class="col-5">
                                            <label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    placeholder="Enter Location"
                                                    onChange={this.handleChange}
                                                />
                                            </label>
                                        </div>
                                        <div class="col-2">
                                            <div style={{margin: 'auto',  width: '50%'}}>
                                                OR
                                            </div>
                                        </div>
                                        <div class={this.state.latitude == '' ? "col-5" : "col-5 active"}>
                                            <button
                                                    class="btn"
                                                    type="button"
                                                    name="coordinate"
                                                    value="1"
                                                    style={{
                                                        marginTop: '0px',
                                                        marginBottom: '0px',
                                                    }}
                                                    onClick={this.handleCoordinates}
                                            >Use Your Location</button>
                                        </div>
                                    </div>
                                </section>

                                <section class="col-12">
                                    <div>
                                        <span class="heading">
                                            Term
                                        </span>
                                        <div class="row">
                                            <label>
                                                <input
                                                    type="text"
                                                    name="term"
                                                    placeholder="Enter Search Term"
                                                    onChange={this.handleChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </section>

                                <section class="col-12">
                                    <div>
                                        <span class="heading">
                                            categories
                                        </span>
                                        <div class="row">
                                            <SelectSearch
                                                options={options}
                                                multiple="true"
                                                search
                                                printOptions="on-focus"
                                                filterOptions={fuzzySearch}
                                                placeholder="Select your categories"
                                                value={categoriesValue}
                                                onChange={value => this.handlecategories(value)}
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section class="col-12" id="fs_price_body">
                                    <div>
                                        <span class="heading">
                                            By Price
                                        </span>
                                        <div class="row">
                                            <div class={this.state.price == '1' ? "col-3 active" : "col-3"}>
                                                <button
                                                    class="btn"
                                                    type="button"
                                                    name="price"
                                                    value="1"
                                                    onClick={this.handleChange}
                                                >$</button>
                                            </div>
                                            <div class={this.state.price == '2' ? "col-3 active" : "col-3"}>
                                                <button
                                                    class="btn"
                                                    type="button"
                                                    name="price"
                                                    value="2"
                                                    onClick={this.handleChange}
                                                >$$</button>
                                            </div>
                                            <div class={this.state.price == '3' ? "col-3 active" : "col-3"}>
                                                <button
                                                    class="btn"
                                                    type="button"
                                                    name="price"
                                                    value="3"
                                                    onClick={this.handleChange}
                                                >$$$</button>
                                            </div>
                                            <div class={this.state.price == '4' ? "col-3 active" : "col-3"}>
                                                <button
                                                    class="btn"
                                                    type="button"
                                                    name="price"
                                                    value="4"
                                                    onClick={this.handleChange}
                                                >$$$$</button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section class="col-12" id="fs_radius_body">
                                    <span class="heading">
                                        By radius
                                    </span>
                                    <div>
                                        <ul>
                                            <li>0 miles</li>
                                            <li>25 miles</li>
                                        </ul>
                                    </div>
                                    <SliderWithTooltip
                                        tipFormatter={percentFormatter}
                                        tipProps={{ overlayClassName: 'foo' }}
                                        defaultValue='20'
                                        trackStyle={{ backgroundColor: '#FE4501' }}
                                        handleStyle={{
                                            borderColor: '#FE4501'
                                        }}
                                        railStyle={{ backgroundColor: '#FE4501' }}
                                        dotStyle={{ 
                                            backgroundColor: '#FE4501',
                                            borderColor: '#FE4501'
                                        }}
                                        marks={{
                                            0:'0',
                                            20:'5',
                                            40:'10',
                                            60:'15',
                                            80:'20',
                                            100:'25',
                                        }}
                                        onChange={this.handleSlider}
                                    />
                                    <br/>
                                </section>
                            </div>
                        </div>

                        {<Link to="/rest_card" variant="primary" onClick={this.handleSubmit}>Find food</Link>}
                        {/*<input type="submit" value="Submit" />*/}
                    </form>
                </div>
                </div>
                    </div>
                    </Overlay>

            
                    <FilterList setFilterValue={this.props.setFilterValue}/>
                    <br/>
                    {CreateFilterProfile}
            </div>
        );
    }
}

function fuzzySearch(options) {
    const fuse = new Fuse(options, {
        keys: ['name', 'groupName', 'items.name'],
        threshold: 0.3,
    });

    return (value) => {
        if (!value.length) {
            return options;
        }

        return fuse.search(value);
    };
}

function getCategories() {
    // this could be a failsafe in-case the API can't return the categories for whatever reason
    // will also move this to it's own JSON
    let cat_list = [
        "afghani",
        "african",
        "andalusian",
        "arabian",
        "argentine",
        "armenian",
        "asianfusion",
        "asturian",
        "australian",
        "austrian",
        "baguettes",
        "bangladeshi",
        "basque",
        "bavarian",
        "bbq",
        "beergarden",
        "beerhall",
        "beisl",
        "belgian",
        "bistros",
        "blacksea",
        "brasseries",
        "brazilian",
        "breakfast_brunch",
        "british",
        "buffets",
        "bulgarian",
        "burgers",
        "burmese",
        "cafes",
        "cafeteria",
        "cajun",
        "cambodian",
        "canteen",
        "caribbean",
        "catalan",
        "chech",
        "cheesesteaks",
        "chicken_wings",
        "chickenshop",
        "chilean",
        "chinese",
        "comfortfood",
        "corsican",
        "creperies",
        "cuban",
        "currysausage",
        "cypriot",
        "czech",
        "czechslovakian",
        "danish",
        "delis",
        "diners",
        "dinnertheater",
        "dumplings",
        "eastern_european",
        "eltern_cafes",
        "eritrean",
        "ethiopian",
        "filipino",
        "fischbroetchen",
        "fishnchips",
        "flatbread",
        "fondue",
        "food_court",
        "foodstands",
        "freiduria",
        "french",
        "galician",
        "gamemeat",
        "gastropubs",
        "georgian",
        "german",
        "giblets",
        "gluten_free",
        "greek",
        "guamanian",
        "halal",
        "hawaiian",
        "heuriger",
        "himalayan",
        "hkcafe",
        "honduran",
        "hotdog",
        "hotdogs",
        "hotpot",
        "hungarian",
        "iberian",
        "indonesian",
        "indpak",
        "international",
        "irish",
        "island_pub",
        "israeli",
        "italian",
        "japanese",
        "jewish",
        "kebab",
        "kopitiam",
        "korean",
        "kosher",
        "kurdish",
        "laos",
        "laotian",
        "latin",
        "lyonnais",
        "malaysian",
        "meatballs",
        "mediterranean",
        "mexican",
        "mideastern",
        "milkbars",
        "modern_australian",
        "modern_european",
        "mongolian",
        "moroccan",
        "newamerican",
        "newcanadian",
        "newmexican",
        "newzealand",
        "nicaraguan",
        "nightfood",
        "nikkei",
        "noodles",
        "norcinerie",
        "norwegian",
        "opensandwiches",
        "oriental",
        "pakistani",
        "panasian",
        "parma",
        "persian",
        "peruvian",
        "pfcomercial",
        "pita",
        "pizza",
        "polish",
        "polynesian",
        "popuprestaurants",
        "portuguese",
        "potatoes",
        "poutineries",
        "pubfood",
        "raw_food",
        "riceshop",
        "romanian",
        "rotisserie_chicken",
        "rumanian",
        "russian",
        "salad",
        "sandwiches",
        "scandinavian",
        "schnitzel",
        "scottish",
        "seafood",
        "serbocroatian",
        "signature_cuisine",
        "singaporean",
        "slovakian",
        "somali",
        "soulfood",
        "soup",
        "southern",
        "spanish",
        "srilankan",
        "steak",
        "sud_ouest",
        "supperclubs",
        "sushi",
        "swabian",
        "swedish",
        "swissfood",
        "syrian",
        "tabernas",
        "taiwanese",
        "tapas",
        "tapasmallplates",
        "tavolacalda",
        "tex-mex",
        "thai",
        "tradamerican",
        "traditional_swedish",
        "trattorie",
        "turkish",
        "ukrainian",
        "uzbek",
        "vegan",
        "vegetarian",
        "venison",
        "vietnamese",
        "waffles",
        "wok",
        "wraps",
        "yugoslav"
      ];

    let options = []
    for (let i = 0; i < cat_list.length; i++) {
        options.push({
            name: cat_list[i],
            value: cat_list[i]
        });
    }
    return options;
}

export default Filter;