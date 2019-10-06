import React from 'react'
import './Header.css'

import { userIcon } from '../assets/images'

const Header = ({ title }) => {
    return (
        <>
            <div className="background">
                <div className="space" />
                <p className="text">{title}</p>
                <img src={userIcon} className="userIcon" />
            </div>
            <div className="marginBottom"/>
        </>
    )
}

export default Header