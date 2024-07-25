import React, { useState } from 'react'
import Header from './components/Header'

import heroBanner from "./assets/hero-banner.png"
import featuresImg1 from "./assets/features-img-1.avif"
import featuresImg2 from "./assets/features-img-2.png"
import blogBanner1 from "./assets/blog-banner-1.png"
import blogBanner2 from "./assets/blog-banner-2.png"
import blogBanner3 from "./assets/blog-banner-3.png"
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'


function Landing({user, setUser}) {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <div>
            <Header />
            <main>
                <article>
                    {/* - HERO*/}
                    <section className="hero" id="hero">
                        <div className="container">
                            <div className="hero-content">
                                <h1 className="h1 hero-title">Welcome to CloudLab</h1>
                                <p className="hero-text">
                                    Revolutionize your workspace with CloudLab’s versatile and powerful virtual environments.
                                </p>
                                <p className="form-text">
                                    <span>🚀</span> Explore seamless and efficient solutions tailored to boost your productivity.
                                </p>
                                <form action="" className="hero-form">
                                    <button type="submit" className="btn btn-primary">
                                        Get Started
                                    </button>
                                </form>
                            </div>
                            <figure className="hero-banner">
                                <img src={heroBanner} alt="Hero" />
                            </figure>
                        </div>
                    </section>


                    {/* - ABOUT*/}
                    <section className="products">
                        <div className="container">
                            <div className="about-content">
                                <div className="about-icon">
                                    <ion-icon name="cube" />
                                </div>
                                <h2 className="h2 about-title">Why Choose Us ?</h2>
                                <p className="about-text">
                                    demo video
                                </p>
                                <button className="btn btn-outline">Learn More</button>
                            </div>
                        </div>
                    </section>

                    {/* - FEATURES*/}
                    <section className="features" id="features">
                        <div className="container">
                            <h2 className="h2 section-title">Amazing Features</h2>
                            <p className="section-text">
                                Discover the distinct advantages of CloudLab, designed to provide seamless and innovative cloud workspace solutions.
                            </p>
                            <div className="features-wrapper">
                                <figure className="features-banner">
                                    <img
                                        src={featuresImg1}
                                        style={{ transform: 'scaleX(-1)' }}
                                        alt="illustration art"
                                    />
                                </figure>
                                <div className="features-content">
                                    <p className="features-content-subtitle">
                                        <ion-icon name="sparkles" />
                                        <span>POWERFUL TOOLS</span>
                                    </p>
                                    <h3 className="features-content-title">
                                        Build a <strong>collaborative environment</strong> with our suite of <strong>integrated tools</strong>
                                    </h3>
                                    <p className="features-content-text">
                                        Experience unparalleled efficiency and ease with CloudLab’s comprehensive features tailored for modern workflows.
                                    </p>
                                    <ul className="features-list">
                                        <li className="features-list-item">
                                            <ion-icon name="layers-outline" />
                                            <p>Streamlined user interface for enhanced productivity.</p>
                                        </li>
                                        <li className="features-list-item">
                                            <ion-icon name="megaphone-outline" />
                                            <p>Robust security measures to protect your data.</p>
                                        </li>
                                    </ul>
                                    <div className="btn-group">
                                        <button className="btn btn-primary">Learn More</button>
                                        <button className="btn btn-secondary">Get Started</button>
                                    </div>
                                </div>
                            </div>
                            <div className="features-wrapper">
                                <figure className="features-banner">
                                    <img
                                        src={featuresImg2}
                                        alt="illustration art"
                                    />
                                </figure>
                                <div className="features-content">
                                    <p className="features-content-subtitle">
                                        <ion-icon name="sparkles" />
                                        <span>POWERFUL TOOLS</span>
                                    </p>
                                    <h3 className="features-content-title">
                                        Focus on your <strong>core tasks</strong> while we handle the <strong>complexities</strong>
                                    </h3>
                                    <p className="features-content-text">
                                        Let CloudLab take care of the technical details, so you can stay focused on what truly matters.
                                    </p>
                                    <ul className="features-list">
                                        <li className="features-list-item">
                                            <ion-icon name="rocket-outline" />
                                            <p>High-performance cloud infrastructure for all your needs.</p>
                                        </li>
                                        <li className="features-list-item">
                                            <ion-icon name="wifi-outline" />
                                            <p>Seamless connectivity and real-time collaboration.</p>
                                        </li>
                                    </ul>
                                    <div className="btn-group">
                                        <button className="btn btn-primary">Learn More</button>
                                        <button className="btn btn-secondary">Get Started</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* - BLOG*/}
                    <section className="blog" id="blog">
                        <div className="container">
                            <h2 className="h2 section-title">Most Popular Workspaces</h2>
                            <p className="section-text">
                                Explore the range of virtual environments CloudLab offers, designed to meet diverse needs and enhance productivity.
                            </p>
                            <ul className="blog-list">
                                <li>
                                    <div className="blog-card">
                                        <figure className="blog-banner">
                                            <img
                                                src={blogBanner1}
                                                alt="Ubuntu Workspace"
                                            />
                                        </figure>
                                        <h3 className="blog-title">Ubuntu Workspace</h3>
                                        <p className="blog-text">
                                            Experience the power and flexibility of the Ubuntu operating system in a virtual environment, perfect for developers and tech enthusiasts.
                                        </p>
                                        <span className="blog-link-btn">
                                            <span>Learn More</span>
                                            <ion-icon name="chevron-forward-outline" />
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className="blog-card">
                                        <figure className="blog-banner">
                                            <img
                                                src={blogBanner2}
                                                alt="OnlyOffice Suite"
                                            />
                                        </figure>
                                        <h3 className="blog-title">OnlyOffice Suite</h3>
                                        <p className="blog-text">
                                            Access a comprehensive office suite for document management, editing, and collaboration, making remote work seamless and efficient.
                                        </p>
                                        <span className="blog-link-btn">
                                            <span>Learn More</span>
                                            <ion-icon name="chevron-forward-outline" />
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className="blog-card">
                                        <figure className="blog-banner">
                                            <img
                                                src={blogBanner3}
                                                alt="Windows Workspace"
                                            />
                                        </figure>
                                        <h3 className="blog-title">Windows Workspace</h3>
                                        <p className="blog-text">
                                            Utilize the familiar Windows operating system in your virtual workspace, ideal for business and everyday tasks.
                                        </p>
                                        <span className="blog-link-btn">
                                            <span>Learn More</span>
                                            <ion-icon name="chevron-forward-outline" />
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>



                    {/* - CONTACT*/}

                    <section className="contact" id="contact">
                        <div className="container">
                            <div className="contact-wrapper">
                                <div>
                                    <h2 className="h2 section-title">Get Started By Registering</h2>
                                    <p className="section-text">
                                        Join CloudLab today and unlock the full potential of our cloud-based
                                        workspace solutions. Whether you're looking to streamline your workflow,
                                        collaborate with your team, or access powerful desktop environments from
                                        anywhere, CloudLab has you covered.
                                        <br />
                                        If you already have an account <span style={{ fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', display: 'inline' }} onClick={() => setShowLogin(!showLogin)}>Sign In Here.</span>
                                    </p>
                                </div>

                                {showLogin ?
                                    <Login user={user} setUser={setUser} /> :
                                    <Register />
                                }

                            </div>

                        </div>
                    </section>
                </article>
            </main>
            <Footer />
        </div>
    )
}

export default Landing