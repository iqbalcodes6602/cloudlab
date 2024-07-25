import React from 'react'
import logo from "../assets/logo.svg"

function Header() {
    return (
        <div>
            <header className="header" data-header="">
                <div className="container">
                    <span className="logo" style={{width:'25%'}}>
                        <img src={logo} alt="Landio logo" style={{width:'50%'}} />
                    </span>
                    <button className="menu-toggle-btn" data-nav-toggle-btn="">
                        <ion-icon name="menu-outline" />
                    </button>
                    <nav className="navbar">
                        <ul className="navbar-list">
                            <li>
                                <a href="#hero" className="navbar-link">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#features" className="navbar-link">
                                    Features
                                </a>
                            </li>
                            <li>
                                <span className="navbar-link">
                                    Pricing
                                </span>
                            </li>
                            <li>
                                <a href="#blog" className="navbar-link">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="navbar-link">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                        <div className="header-actions">
                            <span className="header-action-link">
                                Log in
                            </span>
                            <span className="header-action-link">
                                Register
                            </span>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header