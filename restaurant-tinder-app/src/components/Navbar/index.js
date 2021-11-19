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

const Navbar = () => {
    return (
        <>
           <Nav>
           <NavLogo to="/">
                    <img 
                        src={app_logo} 
                        alt = "logo"
                        width = "60px"
                        border_radius = "30px"
                        padding = "100px"
                        />{''}
                Scramble!
            </NavLogo>

        

            <Bars />

            <NavMenu>
                <NavLink to="/filter" activestyle='true'>
                    Home
                </NavLink>
                <NavLink to="/about" activestyle='true'>
                    About
                </NavLink>
                <NavLink to="/Profile" activestyle='true'>
                    Profile
                </NavLink>
                <NavLink to="/signin" activestyle='true'>
                    Sign In
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>                
                </NavBtn>
            </NavMenu> 
           </Nav> 
        </>
    );
};
export default Navbar;