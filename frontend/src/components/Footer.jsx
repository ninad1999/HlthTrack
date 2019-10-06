import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Footer.css'

import { 
    addFolder,
    camera,
    divider
} from '../assets/images'

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { screen, toggleCamera } = this.props

        return (
            <>
            <div className="footer-background">
                <img src={addFolder} style={{ flex: 1 }} />
                <img src={divider} style={{ flex: 0 }} />
                <img src={camera} style={{ flex: 1 }} onClick={toggleCamera()} />
            </div>
            </>
        )
    }
}

export default Footer