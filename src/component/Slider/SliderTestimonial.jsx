import React from 'react'
import Slider from 'react-slick';
import { useRef } from 'react';
import { Fragment } from 'react';

const SliderTestimonial = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const slider1 = useRef(null);

    const previous = () => {
        slider1.current.slickNext();
    };

    const next = () => {
        slider1.current.slickPrev();
    };
    return (
        <Fragment>
            <div className="position-relative wrapper__padding-wrap">

                <Slider ref={slider1} {...settings} className="wrapper__slider-testimonial">
                    <div className="items">
                        <div className="text-center">
                            <img src="./../images/asa.png" className='mb-4 mx-auto' alt="" />
                            <p className='normal font__size--24 text__24-1024 play lh__5 mb-3'>Our special day on 26th Sept 2021 was just amazing in every way! From start to finish the day was full of love, laughter and special memories created all day. The team were amazing, food delicious, venue beautifully decorated, nothing too much trouble. Citation is second to none and thank you to you all for making our day special - wish we could do it all again!</p>
                            <h5 className='semi-bold font__size--20 text__20-1024 play'>Maddie & Gabe</h5>
                        </div>
                    </div>
                    <div className="items">
                        <div className="text-center">
                            <img src="./../images/asa.png" className='mb-4 mx-auto' alt="" />
                            <p className='normal font__size--24 text__24-1024 play lh__5 mb-3'>Our special day on 26th Sept 2021 was just amazing in every way! From start to finish the day was full of love, laughter and special memories created all day. The team were amazing, food delicious, venue beautifully decorated, nothing too much trouble. Citation is second to none and thank you to you all for making our day special - wish we could do it all again!</p>
                            <h5 className='semi-bold font__size--20 text__20-1024 play'>Maddie & Gabe</h5>
                        </div>
                    </div>
                    <div className="items">
                        <div className="text-center">
                            <img src="./../images/asa.png" className='mb-4 mx-auto' alt="" />
                            <p className='normal font__size--24 text__24-1024 play lh__5 mb-3'>Our special day on 26th Sept 2021 was just amazing in every way! From start to finish the day was full of love, laughter and special memories created all day. The team were amazing, food delicious, venue beautifully decorated, nothing too much trouble. Citation is second to none and thank you to you all for making our day special - wish we could do it all again!</p>
                            <h5 className='semi-bold font__size--20 text__20-1024 play'>Maddie & Gabe</h5>
                        </div>
                    </div>
                    <div className="items">
                        <div className="text-center">
                            <img src="./../images/asa.png" className='mb-4 mx-auto' alt="" />
                            <p className='normal font__size--24 text__24-1024 play lh__5 mb-3'>Our special day on 26th Sept 2021 was just amazing in every way! From start to finish the day was full of love, laughter and special memories created all day. The team were amazing, food delicious, venue beautifully decorated, nothing too much trouble. Citation is second to none and thank you to you all for making our day special - wish we could do it all again!</p>
                            <h5 className='semi-bold font__size--20 text__20-1024 play'>Maddie & Gabe</h5>
                        </div>
                    </div>
                </Slider>

            </div>
            <div className="d-flex align-items-center justify-content-between mt-4">
                <img src="./../images/ar (2).png" onClick={previous} className='pointer' alt="" />
                <img src="./../images/ar (1).png" onClick={next} className='pointer' alt="" />
            </div>
        </Fragment>
    )
}

export default SliderTestimonial