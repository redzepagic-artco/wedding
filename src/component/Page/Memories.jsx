import React from 'react'
import SliderMemories from '../Slider/SliderMemories'

const Memories = () => {
    return (
        <section>
            <div className="container">
                <div className="mb-5 text-center">
                    <div className="d-flex align-items-center justify-content-center normal font__size--24 text__24-1024 text-capitalize color__brown mb-3">
                        <img src="./../images/Vector 2.png" alt="" />
                        <span className="mx-3">MEMORIES</span>
                        <img src="./../images/Vector 1.png" alt="" />
                    </div>
                    <h2 className="medium font__size--48 text__48-1024 text__48-md text__48-sm text__48-xx play">From candid moments to <br /> stunning</h2>
                </div>

                <SliderMemories />

            </div>
        </section>
    )
}

export default Memories