import React from "react";
 
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

import app_logo from '../../images/app_logo.png';

const Navbar = (props) => {
    const isLoggedIn = props.isLoggedIn
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
            
            <Bars />

            <NavMenu>
                <NavLink to="/filter" activestyle='true'>
                    Search
                </NavLink>

                <NavLink to="/about" activestyle='true'>
                    About
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