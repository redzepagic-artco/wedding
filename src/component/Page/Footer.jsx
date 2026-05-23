import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <section className='pb-3'>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-8">
                        <h2 className='medium font__size--48 text__48-1024 text__48-md text__48-sm text__48-xx play mb-3'>Explore</h2>
                        <div className="row">
                            <div className="col-6 col-lg-4">
                                <ul className="list__footer noraml font__size--16 text__16-1024 text__16-md">
                                    <li>
                                        <NavLink
                                            to="/about" className='color__black'>ABOUT US</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/service" className='color__black'>SERVICES</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/album" className='color__black'>ALBUMS</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/faq" className='color__black'>FAQ</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6 col-lg-4">
                                <ul className="list__footer noraml font__size--16 text__16-1024 text__16-md">
                                    <li>
                                        <NavLink
                                            to="/blog" className='color__black'>BLOG</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/team" className='color__black'>TEAM</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/privacy" className='color__black'>PRIVACY POLICY</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/terms" className='color__black'>TERM OF CONDITIONS</NavLink>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </div>
                    <div className="col-4 text-right">
                        <h2 className='medium font__size--48 text__48-1024 text__48-md text__48-sm text__48-xx play mb-3'>Connect</h2>
                        <ul className="list__footer noraml font__size--16 text__16-1024 text__16-md">
                            <li>
                                <NavLink
                                    to="/contact" className='color__black'>CONTACT US</NavLink>
                            </li>
                            <li>
                                <a href="#!" className='color__black'>INSTAGRAM</a>
                            </li>
                            <li>
                                <a href="#!" className='color__black'>FACEBOOK</a>
                            </li>
                            <li>
                                <a href="#!" className='color__black'>TWITTER</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className='mb-0 text-center normal font__size--14 text__14-1024 color__gray-1'>© 2022 Company Name® Global Inc.</p>
            </div>
        </section>
    )
}

export default Footer