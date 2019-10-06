import React, { Component } from 'react'
import './Home.css'

import { Header, Footer } from '../components'
import { FolderList } from '../containers/'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            title: "Jacob's Dashboard"
        }
    }

    render() {
        const { title } = this.state
        
        return (
            <div>
                <Header title={title} />
                <FolderList />
                <div className="folderList-footerMargin" />
                <Footer screen="Home" />
            </div>
        )
    }
}

export default Home