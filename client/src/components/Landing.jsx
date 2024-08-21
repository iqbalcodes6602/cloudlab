import React, { useState } from 'react'
import Header from './Header'

import heroBanner from "../assets/hero-banner.png"
import featuresImg1 from "../assets/features-img-1.avif"
import featuresImg2 from "../assets/features-img-2.png"
import blogBanner1 from "../assets/blog-banner-1.png"
import blogBanner2 from "../assets/blog-banner-2.png"
import blogBanner3 from "../assets/blog-banner-3.png"
import Footer from './Footer'
import Register from './Register'
import Login from './Login'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog"

import {
    Tabs,
    TabsContent,
} from "./ui/tabs"

import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'

function Landing({ user, setUser, userDetails, setUserDetails }) {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <div>
            <Header user={user} setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin} userDetails={userDetails} setUserDetails={setUserDetails}  />
            <main>
                <article>
                    {/* - HERO*/}
                    <section className="hero" id="hero">
                        <div className="container">
                            <div className="hero-content">
                                <h1 className="h1 hero-title">Welcome to CloudLab </h1>
                                <p className="hero-text">
                                    Revolutionize your workspace with CloudLab’s versatile and powerful virtual environments.
                                </p>
                                <p className="form-text">
                                    <span>🚀</span> Explore seamless and efficient solutions tailored to boost your productivity.
                                </p>
                                <form action="" className="hero-form">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="btn btn-primary">
                                                Get Started
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] pt-10">
                                            <Tabs defaultValue="signin" className="w-[375px]">
                                                <TabsList className="grid w-full grid-cols-2">
                                                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                                                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="signin">
                                                    <Login user={user} setUser={setUser} />
                                                </TabsContent>
                                                <TabsContent value="signup">
                                                    <Register />
                                                </TabsContent>
                                            </Tabs>
                                        </DialogContent>
                                    </Dialog>
                                </form>
                            </div>
                            <figure className="hero-banner">
                                <img src={heroBanner} alt="Hero" />
                            </figure>
                        </div>
                    </section>


                    {/* - ABOUT*/}
                    <section className="products" id='products'>
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
                                                src={'https://blenderartists.org/uploads/default/original/4X/d/6/3/d6376346ec38ed339bf5a10411348f255793804b.jpg'}
                                                alt="Windows Workspace"
                                            />
                                        </figure>
                                        <h3 className="blog-title">Blender</h3>
                                        <p className="blog-text">
                                            Discover the limitless possibilities of 3D creation with Blender, a powerful open-source software for modeling, animation, and more.
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


                </article>
            </main>
            <Footer />
        </div>
    )
}

export default Landing