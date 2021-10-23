import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Menu } from '../assets/svg/menu_black_24dp.svg'
import { toggleDark } from '../actions/WeatherActions'
import { useDispatch, useSelector } from 'react-redux'
import DNToggle from './Toggles/DNToggle'
import { SearchBar } from './SearchBar'


export function AppHeader() {
    const [mobile, setIsMobile] = useState(false)
    const dispatch = useDispatch()
    const {  isMobile } = useSelector(state => state.weatherModule)

    const changeMobile = () => {
        setIsMobile(prev => prev = !prev)
    }




    const onToggle = () => {
        dispatch(toggleDark())
    }
    return (
        <header className="app-header">
            <nav className="main-nav ">
                {!mobile && <div className="left-nav">
                    <Link to='/'><span>Home</span></Link>
                    <Link to='/favorites'><span>Favorites</span></Link>
                </div>}
                {mobile && <div onClick={changeMobile} className="mobile-nav">
                    <Link to='/'><span>Home</span></Link>
                    <Link to='/favorites'><span>Favorites</span></Link>
                </div>}
                {mobile && <div className="background-menu" onClick={changeMobile}></div>}

                <Menu onClick={changeMobile} className="menu-btn fill-dark" />
                {isMobile &&<SearchBar />}
                <div className="right-nav flex">
                    <DNToggle />
                    <div className="cf-container flex column">
                    </div>
                    {/* <Link to='/'> <img src="imgs/logo.png" alt="" /></Link> */}
                </div>
            </nav>
        </header>
    )
}
