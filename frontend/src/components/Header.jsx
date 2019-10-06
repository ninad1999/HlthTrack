import React from 'react'
import './Header.css'

import { userIcon } from '../assets/images'

const Header = ({ title }) => {
    return (
        <>
            <div className="header-background">
                <div className="space" />
                <p className="header-text">{title}</p>
                <img src={userIcon} className="userIcon" />
            </div>
            <div className="header-marginBottom"/>
        </>
    )
}

export default Header