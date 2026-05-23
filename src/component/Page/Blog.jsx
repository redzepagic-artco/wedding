import React from 'react'
import { NavLink } from 'react-router-dom'
import CardBlog from '../Other/CardBlog'

const Blog = (props) => {
    const blogData = [
        {
            img: "./../images/blg (1).png",
            title: "How Our Wedding Planners Bring Your Vision to Life",
            date: "March 14, 2023",
            link: "#!"
        },
        {
            img: "./../images/blg (2).png",
            title: "The Importance of Personalization in Wedding Planning",
            date: "March 14, 2023",
            link: "#!"
        },
        {
            img: "./../images/blg (3).png",
            title: "Cost-Saving Tips from Our Wedding Planners",
            date: "March 14, 2023",
            link: "#!"
        },
    ]
    return (
        <section>
            <div className="container">
                <div className="mb-5 text-center">
                    <div className="d-flex align-items-center justify-content-center normal font__size--24 text__24-1024 text-capitalize color__brown mb-3">
                        <img src="./../images/Vector 2.png" alt="" />
                        <span className="mx-3">BLOG</span>
                        <img src="./../images/Vector 1.png" alt="" />
                    </div>
                    <h2 className="medium font__size--48 text__48-1024 text__48-md text__48-sm text__48-xx play">{props.title ? props.title : "Latest Article"}</h2>
                </div>

                <div className="row mb-5">
                    {
                        blogData.map((obj) => {
                            return <div className="col-lg-4 mb-4 mb-lg-0">
                                <CardBlog data={obj} />
                            </div>
                        })
                    }
                </div>
                {
                    props.load ? <div className="text-center">
                        <NavLink
                      to="/blog" className="medium font__size--14 text__14-1024 btn btn__outlined--darkgreen color__darkgreen shadow text-capitalize rounded__50 h__white no__opacity pointer" >See All Article</NavLink>
                    </div>
                        : ""
                }

            </div>
        </section>
    )
}

export default Blog