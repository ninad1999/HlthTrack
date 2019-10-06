import React from 'react'
import './Footer.css'

import { 
    addFolder,
    camera,
    divider
} from '../assets/images'

const Footer = ({ screen }) => {
    return (
        <div className="footer-background">
            <img src={addFolder} style={{ flex: 1 }} onClick={() => {
                console.log('add folder')
            }} />
            <img src={divider} style={{ flex: 0 }} />
            <img src={camera} style={{ flex: 1 }} onClick={() => {
                console.log('camera')
            }} />
        </div>
    )
}

export default Footer