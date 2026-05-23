import React from 'react'
import { NavLink } from 'react-router-dom'
import CircleArrow from '../../container/homepage/svg/CircleArrow'

const Contact = () => {
    return (
        <section className='pb-0'>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mb-4 my-md-auto">
                        <div className="d-flex align-items-center normal font__size--24 text__24-1024 text-capitalize color__brown mb-3">
                            <img src="./../images/Vector 2.png" alt="" />
                            <span className="mx-3">Contact Us</span>
                            <img src="./../images/Vector 1.png" alt="" />
                        </div>
                        <h2 className="medium font__size--48 text__48-1024 text__48-md text__48-sm text__48-xx play mb-0">Ready to book a consultation or have a question for us?</h2>
                    </div>
                    <div className="col-md-4 text-md-right my-auto">
                        <NavLink
                            to="/contact" className="d-inline-block">
                            <div className="images__svg-contact">
                                <CircleArrow />
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact