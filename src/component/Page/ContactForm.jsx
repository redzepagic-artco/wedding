import React from 'react'

const ContactForm = () => {
    return (
        <section className="position-relative">
            <div className="container">
                <div className="mb-5 text-center">
                    <div className="d-flex align-items-center justify-content-center normal font__size--24 text__24-1024 text-capitalize color__brown mb-3">
                        <img src="./../images/Vector 2.png" alt="" />
                        <span className="mx-3">CONTACT US</span>
                        <img src="./../images/Vector 1.png" alt="" />
                    </div>
                    <h2 className="medium font__size--48 text__48-1024 text__48-md text__48-sm play">Let's do this!</h2>
                </div>

                <div className="row">

                    <div className="col-lg-5 order-lg-1 order-12 my-auto">
                        <div className="wrapper__contact-detail mx-auto ml-lg-0">
                            <div className="text-center">
                                <div className="mb-5">
                                    <p className="normal font__size--14 text__14-1024 play">Don’t like forms?</p>
                                    <h3 className="medium font__size--20 text__20-1024 play color__brown">Customer@Company.com</h3>
                                </div>
                                <div>
                                    <p className="normal font__size--14 text__14-1024 play">Social Media</p>
                                    <div className="sosmed">
                                        <a href="#!"><img src="./../images/sl (1).png" alt="" /></a>
                                        <a href="#!"><img src="./../images/sl (2).png" alt="" /></a>
                                        <a href="#!"><img src="./../images/sl (3).png" alt="" /></a>
                                        <a href="#!"><img src="./../images/sl (4).png" alt="" /></a>
                                        <a href="#!"><img src="./../images/sl (5).png" alt="" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 order-1 order-lg-12 mb-4 my-lg-auto">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className='form-control play font__size--14 normal wrapper__field-input' placeholder='First Name' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className='form-control play font__size--14 normal wrapper__field-input' placeholder='Last Name' />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="text" className='form-control play font__size--14 normal wrapper__field-input' placeholder='Email' />
                        </div>

                        <div className="form-group">
                            <input type="text" className='form-control play font__size--14 normal wrapper__field-input' placeholder='Phone Number*' />
                        </div>

                        <div className="form-group">
                            <input type="text" className='form-control play font__size--14 normal wrapper__field-input' placeholder='Preferred date (DD/MM/YYYY) ' />
                        </div>

                        <button className="medium font__size--16 btn btn__darkgreen color__white shadow rounded__50 mt-4">Set Planning</button>
                    </div>
                </div>

            </div>
        </section>

    )
}

export default ContactForm