import React from 'react'
import './Label.css'
const Label = (props) => {
    return (
        <div>
            <label className="label">{props.label}</label>
        </div>
    )
}

export default Label;
