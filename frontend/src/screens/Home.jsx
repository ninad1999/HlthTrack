import React, { Component } from 'react'
import './Home.css'

import { Header, Footer } from '../components'
import { FolderList } from '../containers/'

import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            title: "Jacob's Dashboard",
            showCamera: false
        }
    }

    toggleCamera() {
        this.setState((prevState) => {
            return {
                showCamera: !prevState.showCamera
            }
        })
    }

    onTakePhoto = (dataUri) => {
        // Do stuff with the dataUri photo...
        console.log('takePhoto');
        console.log(dataUri)

        this.toggleCamera()
    }

    render() {
        const { title, showCamera } = this.state
        
        return (
            <>
                {showCamera && (
                    <Camera style={{
                        zIndex: 2
                    }} onTakePhoto = {(dataUri) => { 
                        this.onTakePhoto(dataUri)
                    }} />
                )}
                {!showCamera && (
                    <div id="home">
                        <Header title={title} />
                        <FolderList />
                        <div className="folderList-footerMargin" />
                        <Footer screen="Home" toggleCamera={() => this.toggleCamera.bind(this)} />
                    </div>
                )}
            </>
        )
    }
}

export default Home