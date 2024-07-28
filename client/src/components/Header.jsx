import React from 'react'
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "./ui/tabs"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Login from './Login'
import Register from './Register'

function Header({ user, setUser, showLogin, setShowLogin }) {
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
                                <a href="#products" className="navbar-link">
                                    How It Works
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
                        </ul>
                        <div className="header-actions">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Log In / Register</Button>
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
                        </div>
                    </nav>
                </div>
            </header>

        </div>
    )
}

export default Header