import React, { Component } from 'react'
import './Home.css'

import { Header } from '../components'
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
            </div>
        )
    }
}

export default Home