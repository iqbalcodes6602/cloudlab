import React from 'react'

function Header() {
    return (
        <div>
            <header className="header" data-header="">
                <div className="container">
                    <span className="logo">
                        <h3 className="h1 hero-title" style={{ fontSize: '2rem', marginBottom: '0' }}>CloudLab</h3>
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
                                <a href="#blog" className="navbar-link">
                                    Workspaces
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="navbar-link">
                                    Get Started
                                </a>
                            </li>
                        </ul>
                        <div className="header-actions">
                            <a href="#contact" className="header-action-link">
                                Log in
                            </a>
                            <a href="#contact" className="header-action-link">
                                Register
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header