import React, { Component } from 'react'
import './FolderView.css'

import { 
    bills,
    dental,
    eyeCare,
    immunizations,
    medicalTests,
    prescriptions,
    radiology,
    travel,
    untitled
} from '../assets/images'

class FolderView extends Component {
    constructor(props) {
        super(props)
    }

    _returnFolderSrc = (folderName) => {
        switch (folderName) {
            case 'Bills':
                return bills
            case 'Dental':
                return dental
            case 'Eye Care':
                return eyeCare
            case 'Immunizations':
                return immunizations
            case 'Medical Tests':
                return medicalTests
            case 'Prescriptions':
                return prescriptions
            case 'Radiology':
                return radiology
            case 'Travel':
                return travel
            default:
                return untitled
        }
    }

    render() {
        const { folderName } = this.props

        return (
            <div>
                <img className="folder" src={this._returnFolderSrc(folderName)} />
                <p className="folderName">{folderName}</p>
            </div>
        )
    }
}

export default FolderView