import React from 'react'
import './filter.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import SelectSearch from 'react-select-search';
import '../assets/search.css';
import Fuse from 'fuse.js';

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
            location: '',
            term: '',
            category: '',
            price: '1',
            latitude: '',
            longitude: '',
            distance: '8046.72',
            username: '',
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
            distance: meters
        });
    }

    handleCategory = (value) => {
        this.setState({
            category: value
        })
    }

    handleSubmit(event) {
        var jstring = JSON.stringify(this.state);

        console.log(this.state)
        axios
            .post("http://localhost:3001/record/Filter/",this.state)

        alert(jstring);
        event.preventDefault();
    }

    render() {
        // category dropdown variables
        const options = getCategories();
        let categoryValue = this.state.category;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div class="container-fluid">
                        <div class="row" id="fs_app">

                            <section class="col-12" id="fs_header_bar">
                                <div class="row">
                                    {/*<div class="col-2">
                                        <i class="fa fa-chevron-left"></i>
                                    </div>*/}
                                    <div class="col-10" id="fs_page_title">
                                        Filters
                                    </div>
                                </div>
                            </section>

                            <section class="col-12" id="fs_price_body">
                                    <span class="heading">
                                        Location
                                    </span>
                                <div class="row">
                                    <div class="col-6">
                                        <label>
                                            <input
                                                type="text"
                                                name="location"
                                                placeholder="Enter Location"
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div class="col-4 active">
                                        <button
                                                class="btn"
                                                type="button"
                                                name="coordinate"
                                                value="1"
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
                                        Category
                                    </span>
                                    <div class="row">
                                        <SelectSearch
                                            options={options}
                                            multiple="true"
                                            search
                                            printOptions="on-focus"
                                            filterOptions={fuzzySearch}
                                            placeholder="Select your category"
                                            value={categoryValue}
                                            onChange={value => this.handleCategory(value)}
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

                            <section class="col-12" id="fs_distance_body">
                                <span class="heading">
                                    By Distance
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
                            <section class="col-12">
                                <label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter username"
                                        onChange={this.handleChange}
                                    />
                                </label>
                            </section>
                        </div>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
                <br/><br/><br/>
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