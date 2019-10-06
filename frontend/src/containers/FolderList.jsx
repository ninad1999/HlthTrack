import React, { Component } from 'react'
import './FolderList.css'

import { FolderView } from '../components'

class FolderList extends Component {
    constructor() {
        super()
        this.state = {
            folders: [
                'Immunizations',
                'Radiology',
                'Bills',
                'Prescriptions',
                'Medical Tests',
                'Travel',
                'Eye Care',
                'Dental',
                'Untitled'
            ]
        }
    }

    render() {
        const { folders } = this.state

        return (
            <div className="layout">
                {folders.map((folder, index) => {
                    return (
                        <div key={index} onClick={() => console.log(`Clicked ${folder}`)}>
                            <FolderView key={index} folderName={folder} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default FolderList