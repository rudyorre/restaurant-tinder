import React from "react";
 
import {
    Nav,
    NavLogo,
    NavLink,
    NavMenu,
} from "./NavbarElements";

import app_logo from '../../images/app_logo.png';

const Navbar = (props) => {
    const isLoggedIn = props.isLoggedIn

    if(window.location.pathname === "/login" || window.location.pathname === "/"){
        return null
    }

    if(isLoggedIn){
    return (
        <>
           <Nav sticky="top">
           <NavLogo to="/filter">
                    <img 
                        src={app_logo} 
                        alt = "logo"
                        width = "60px"
                        border_radius = "30px"
                        padding = "100px"
                        />{''}
                SCRAMBLE!
            </NavLogo>
            
            <NavMenu>
                <NavLink to="/about" activestyle='true'>
                    About
                </NavLink>

                <NavLink to="/filter" activestyle='true'>
                    Search
                </NavLink>

                <NavLink to="/profile_restaurants" activestyle='true'>
                    Restaurants
                </NavLink>
                
                <NavLink to="/Profile" activestyle='true'>
                    Profile
                </NavLink>

            </NavMenu> 
           </Nav> 
        </>
    );
    }

    else return null
};
export default Navbar;