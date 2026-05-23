import React from 'react'
import { NavLink } from 'react-router-dom'
import Circle from '../../container/homepage/svg/Circle'

const About = () => {
    return (
        <section>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="medium font__size--56 text__50-1024 text__50-sm text__50-xs play">About Company</h2>

                    <div className="d-flex align-items-center justify-content-center normal font__size--24 text__24-1024 text-capitalize color__brown">
                        <img src="./../images/Vector 2.png" alt="" />
                        <span className="mx-2 mx-sm-3">our Company</span>
                        <img src="./../images/Vector 1.png" alt="" />
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-5 mb-4 mb-lg-0 text-center text-lg-left">
                        <div className="position-relative d-inline-block">
                            <img src="./../images/Rectangle 2382.png" alt="" />
                            <div className="images__orname-1">
                                <Circle />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2 className="medium font__size--40 text__40-1024 text__40-md text__40-mm play mb-3">We are a team of passionate and experienced wedding planners</h2>
                        <p className="normal font__size--18 mb-5">Our team of wedding planners is passionate about creating unforgettable wedding experiences. We understand that every wedding is unique, and we work closely with our clients to ensure that their vision becomes a reality. Our approach is personal, friendly, and professional, and we strive to make the planning process as stress-free as possible.</p>

                        <NavLink
                            to="/book-now" className="medium font__size--14 text__14-1024 btn btn__outlined--black color__black shadow text-capitalize rounded__50 h__white no__opacity pointer" >Book Now</NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About