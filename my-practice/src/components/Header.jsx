import React from "react";
import './styles/Header.css'

const Header = function() {
    return (
        <div className="header">
            <div className="header_second">
                <div className="header__logo">
                    <img src="images/logo.png" alt="logo" />
                </div>
                <div className="header__menu">
                    <a href="/">Home</a>
                    <a href="/employees/all">Subdivision</a>
                    <a href="/subdivision/all">Company</a>
                    <a href="/login">Login</a>
                </div>
            </div>
            
        </div>
    )
}

export default Header;