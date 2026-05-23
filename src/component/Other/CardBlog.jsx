import React from 'react'
import { NavLink } from 'react-router-dom'

const CardBlog = (props) => {
    return (
        <div className="wrapper__card-blog">
            <img src={props.data.img} className='mb-4' alt="" />
            <h5 className='normal font__size--16 text__16-1024 color__gray-1 mb-0'>{props.data.date}</h5>
            <h3 className='medium font__size--24 text__24-1024 play my-2'>{props.data.title}</h3>
            <NavLink
                to="/blog/detail" className='d-inline-block normal font__size--16 text__16-1024 play color__gray-1'>Learn More →</NavLink>
        </div>
    )
}

export default CardBlog