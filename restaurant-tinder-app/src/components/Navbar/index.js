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

const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                Logo
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/" activestyle='true'>
                    Home
                </NavLink>
                <NavLink to="/about" activestyle='true'>
                    About
                </NavLink>
                <NavLink to="/contact" activestyle='true'>
                    Contact
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