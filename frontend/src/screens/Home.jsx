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
            showCamera: false,
            dataUri: ''
        }
    }

    toggleCamera() {
        this.setState((prevState) => {
            return {
                showCamera: !prevState.showCamera,
                photoTaken: false
            }
        })
    }

    renderCamera() {
        const { showCamera, photoTaken, dataUri} = this.state

        if (!photoTaken) {
            return (
                <Camera style={{
                    zIndex: 2
                }} onTakePhoto = {(dataUri) => { 
                    this.onTakePhoto(dataUri)
                }} />
            )
        }
        return (
            <>
                <img src={dataUri} style={{ width: '100vw' }} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{ 
                        height: '60px',
                        width: '60vw',
                        margin: 0,
                        marginTop: '3vh',
                        borderRadius: '10px',
                        backgroundColor: '#2D3540'
                    }} onClick={() => this.toggleCamera()}>
                        <p style={{
                            flex: 1,
                            fontFamily: 'SF-Pro-Display',
                            fontSize: '20px',
                            color: '#fff',
                            textAlign: 'center'
                        }}>Click to go back</p>
                    </div>
                </div>
                <div style={{ marginTop: '50px' }} />
                <p>Date / Time: {new Date().toLocaleString()}</p>
                <p>Comments:</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{ 
                        height: '60px',
                        width: '60vw',
                        margin: 0,
                        marginTop: '3vh',
                        borderRadius: '10px',
                        backgroundColor: '#2D3540'
                    }} onClick={() => {
                        this.toggleCamera()
                        this.setState({
                            title: 'Select a folder'
                        })
                    }}>
                        <p style={{
                            flex: 1,
                            fontFamily: 'SF-Pro-Display',
                            fontSize: '20px',
                            color: '#fff',
                            textAlign: 'center'
                        }}>Confirm</p>
                    </div>
                </div>
            </>
        )
    }

    onTakePhoto = (dataUri) => {
        // Do stuff with the dataUri photo...
        console.log('takePhoto');
        console.log(dataUri)

        this.setState({ 
            photoTaken: true,
            dataUri,
        })
    }

    render() {
        const { title, showCamera, photoTaken, dataUri } = this.state
        
        return (
            <>
                {showCamera && this.renderCamera()}
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