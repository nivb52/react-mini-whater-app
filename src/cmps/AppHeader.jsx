import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as Menu } from '../assets/svg/menu_black_24dp.svg'
import { useSelector } from 'react-redux'
import DNToggle from './Toggles/DNToggle'
import { SearchBar } from './SearchBar'


export function AppHeader() {
    const [mobile, setIsMobile] = useState(false)
    const { isMobile,isHome } = useSelector(state => state.weatherModule)

    const changeMobile = () => {
        setIsMobile(prev => prev = !prev)
    }
    return (
        <header className="app-header">
            <nav className="main-nav ">
                {!mobile && <div className="left-nav">
                    <NavLink activeClassName="underline" to='/' exact={true}><span>Home</span></NavLink>
                    <NavLink activeClassName="underline" to='/favorites'><span>Favorites</span></NavLink>
                </div>}
                {mobile && <div onClick={changeMobile} className="mobile-nav">
                    <img src="imgs/logo.png" alt="" />
                    <Link to='/'><span>Home</span></Link>
                    <Link to='/favorites'><span>Favorites</span></Link>
                </div>}
                {mobile && <div className="background-menu" onClick={changeMobile}></div>}

                <Menu onClick={changeMobile} className="menu-btn fill-dark" />
                {isHome&&isMobile && <SearchBar />}
                <div className="right-nav flex">
                    <DNToggle />
                    <div className="cf-container flex column">
                    </div>
                </div>
            </nav>
        </header>
    )
}
