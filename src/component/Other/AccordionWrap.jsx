import React from 'react'
import { useState } from 'react'

const AccordionWrap = (props) => {
    const [toogle, setToogle] = useState(false)
    return (
        <div className={"wrapper__accordion-wrap " + (toogle ? "active" : '')}>
            <div className="head pointer" onClick={() => setToogle(!toogle)}>
                <h4 className='mb-0 medium font__size--32 text__32-1024 play'>{props.data.title}</h4>
                <div className="arrow position-relative ml-3">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="body">
                <p className='mb-0 light font__size--24 text__24-1024 color__gray-1'>{props.data.desc}</p>
            </div>
        </div>
    )
}

export default AccordionWrap