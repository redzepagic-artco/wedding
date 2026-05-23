import React from 'react'
import Slider from 'react-slick';
import { useRef } from 'react';
import { Fragment } from 'react';

const SliderMemories = () => {
    const data = [
        {
            img: "./../images/tes (2).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
        {
            img: "./../images/tes (3).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
        {
            img: "./../images/tes (1).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
        {
            img: "./../images/tes (2).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
        {
            img: "./../images/tes (3).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
        {
            img: "./../images/tes (1).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
        {
            img: "./../images/tes (2).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
        {
            img: "./../images/tes (3).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
        {
            img: "./../images/tes (1).jpg",
            date: "8.12.2021",
            name: "Maddie & Gabe",
            link: "#!"
        },
    ]

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        // adaptiveHeight: true,
        focusOnSelect: true,
        // responsive: [
        //     {
        //         breakpoint: 430,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //         }
        //     },
        // ]
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
            <div className="wrapper__slider-wrap">
                <Slider ref={slider1} {...settings} className="wrapper__slider-memories">
                    {
                        data.map((obj) => {
                            return <div className="items">
                                <div className="wrapper__card-memori position-relative">
                                    <img src={obj.img} alt="" />
                                    <div className="bg"></div>
                                    <div className="desc text-center">
                                        <p className='normal font__size--16 text__16-1024 color__white mb-1'>{obj.date}</p>
                                        <h4 className='medium font__size--32 text__32-1024 color__white play mb-3'>{obj.name}</h4>
                                        <a href={obj.link}><img src="./../images/listas.png" className='mx-auto' alt="" /></a>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </Slider>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-4">
                <img src="./../images/ar (2).png" onClick={previous} className='pointer' alt="" />
                <img src="./../images/ar (1).png" onClick={next} className='pointer' alt="" />
            </div>
        </Fragment>
    )
}

export default SliderMemories