import React from 'react'

function Footer() {
    return (
        <div>
            <footer>
                <div className="footer-top">
                    <div className="container">
                        <div className="footer-brand">
                            <span className="logo">
                                <h3 className="h1 hero-title" style={{ fontSize: '2rem', marginBottom: '0', color:'#fff' }}>CloudLab</h3>
                            </span>
                            <p className="footer-text">
                                CloudLab provides a powerful cloud-based workspace solution for
                                businesses and individuals, featuring secure and efficient access to
                                a variety of desktop environments and applications.
                            </p>
                            <ul className="social-list">
                                <li>
                                    <span className="social-link">
                                        <ion-icon name="logo-facebook" />
                                    </span>
                                </li>
                                <li>
                                    <span className="social-link">
                                        <ion-icon name="logo-twitter" />
                                    </span>
                                </li>
                                <li>
                                    <span className="social-link">
                                        <ion-icon name="logo-instagram" />
                                    </span>
                                </li>
                                <li>
                                    <span className="social-link">
                                        <ion-icon name="logo-linkedin" />
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-link-box">
                            <ul className="footer-list">
                                <li>
                                    <p className="footer-item-title">ABOUT US</p>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Works
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Strategy
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Releases
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Press
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Mission
                                    </span>
                                </li>
                            </ul>
                            <ul className="footer-list">
                                <li>
                                    <p className="footer-item-title">CUSTOMERS</p>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Tranding
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Popular
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Customers
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Features
                                    </span>
                                </li>
                            </ul>
                            <ul className="footer-list">
                                <li>
                                    <p className="footer-item-title">SUPPORT</p>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Developers
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Support
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Customer Service
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Get Started
                                    </span>
                                </li>
                                <li>
                                    <span className="footer-link">
                                        Guide
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <p className="copyright">
                            © 2024 <span style={{ display: 'inline' }}>CloudLab</span>. All Right Reserved
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer