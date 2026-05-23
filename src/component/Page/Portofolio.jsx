import React from 'react'
import { NavLink } from 'react-router-dom'

const Portofolio = () => {
    return (
        <section>
            <div className="container">
                <div className="text-center mb-5">
                    <div className="d-flex align-items-center justify-content-center normal font__size--24 text__24-1024 text-capitalize color__brown mb-3">
                        <img src="./../images/Vector 2.png" alt="" />
                        <span className="mx-3">PORTFOLIO</span>
                        <img src="./../images/Vector 1.png" alt="" />
                    </div>
                    <h2 className="medium font__size--56 text__50-1024 text__50-sm text__50-xs play">Our Client Wedding Memories</h2>
                </div>

                <div className="row mb-5">
                    <div className="col-6 col-md-4 order-1 mb-4">
                        <NavLink to="/portofolio/detail" className="wrapper__sevice-card portofolio">
                            <img src="./../images/gr (5).png" alt="" />
                            <div className="bg"></div>
                            <div className="desc text-center">
                                <h5 className="medium font__size--32 text__32-1024 play color__white">Maddie & Gabe</h5>
                                <p className="d-normal font__size--16 text__16-1024 color__white text-uppercase">NEW YORK</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-6 col-md-4 order-2 mb-4">
                        <NavLink to="/portofolio/detail" className="wrapper__sevice-card portofolio">
                            <img src="./../images/gr (1).png" alt="" />
                            <div className="bg"></div>
                            <div className="desc text-center">
                                <h5 className="medium font__size--32 text__32-1024 play color__white">Ruben & Carla</h5>
                                <p className="d-normal font__size--16 text__16-1024 color__white text-uppercase">BALI</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-6 col-md-4 mb-4 order-4 order-md-3">
                        <NavLink to="/portofolio/detail" className="wrapper__sevice-card portofolio">
                            <img src="./../images/gr (2).png" alt="" />
                            <div className="bg"></div>
                            <div className="desc text-center">
                                <h5 className="medium font__size--32 text__32-1024 play color__white">Phillip & Maria</h5>
                                <p className="d-normal font__size--16 text__16-1024 color__white text-uppercase">rome</p>
                            </div>
                        </NavLink>
                    </div>

                    <div className="col-md-8 mb-4 order-3 order-md-4 ">
                        <NavLink to="/portofolio/detail" className="wrapper__sevice-card portofolio">
                            <img src="./../images/gr (3).png" alt="" />
                            <div className="bg"></div>
                            <div className="desc text-center">
                                <h5 className="medium font__size--32 text__32-1024 play color__white">Maddie & Gabe</h5>
                                <p className="d-normal font__size--16 text__16-1024 color__white text-uppercase">NEW YORK</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-6 col-md-4 mb-4 order-5">
                        <NavLink to="/portofolio/detail" className="wrapper__sevice-card portofolio">
                            <img src="./../images/gr (4).png" alt="" />
                            <div className="bg"></div>
                            <div className="desc text-center">
                                <h5 className="medium font__size--32 text__32-1024 play color__white">Ruben & Carla</h5>
                                <p className="d-normal font__size--16 text__16-1024 color__white text-uppercase">BALI</p>
                            </div>
                        </NavLink>
                    </div>
                </div>

                <div className="text-center">
                    <NavLink to="/portofolio" className="medium font__size--14 text__14-1024 btn btn__outlined--darkgreen color__darkgreen shadow text-capitalize rounded__50 h__white no__opacity pointer" >See More Portfolio</NavLink>
                </div>

            </div>
        </section>
    )
}

export default Portofolio