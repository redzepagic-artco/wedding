import React from 'react'
import SliderTestimonial from '../Slider/SliderTestimonial'

const Testimonial = () => {
    return (
        <section>
            <div className="container">
                <div className="wrapper__wrap-tetsimonial">
                    <div className="mb-5 text-center">
                        <div className="d-flex align-items-center justify-content-center normal font__size--24 text__24-1024 text-capitalize color__brown mb-3">
                            <img src="./../images/Vector 2.png" className='images__xx-line' alt="" />
                            <span className="mx-3">TESTIMONIALS</span>
                            <img src="./../images/Vector 1.png" className='images__xx-line' alt="" />
                        </div>
                        <h2 className="medium font__size--48 text__48-1024 text__48-md text__48-sm text__48-xx play">What our guests have to say...</h2>
                    </div>

                    <SliderTestimonial />
                </div>
            </div>
        </section>
    )
}

export default Testimonial