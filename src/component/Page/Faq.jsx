import React from 'react'
import AccordionWrap from '../Other/AccordionWrap'

const Faq = () => {
    const faqData = [
        {
            title: "What is a wedding planner?",
            desc: 'A wedding planner is a person or team appointed to assist in preparing, organizing, and executing a wedding to run smoothly and in line with the wishes of the bride and groom.'
        },
        {
            title: "Why do I need a wedding planner?",
            desc: 'A wedding planner is a person or team appointed to assist in preparing, organizing, and executing a wedding to run smoothly and in line with the wishes of the bride and groom.'
        },
        {
            title: "What services are provided by a wedding planner? ",
            desc: 'A wedding planner is a person or team appointed to assist in preparing, organizing, and executing a wedding to run smoothly and in line with the wishes of the bride and groom.'
        },
        {
            title: "How much does it cost to hire a wedding planner?",
            desc: 'A wedding planner is a person or team appointed to assist in preparing, organizing, and executing a wedding to run smoothly and in line with the wishes of the bride and groom.'
        },
        {
            title: "When should I start looking for a wedding planner?",
            desc: 'A wedding planner is a person or team appointed to assist in preparing, organizing, and executing a wedding to run smoothly and in line with the wishes of the bride and groom.'
        },
        {
            title: "What information should I have prepared before meeting with a wedding planner?",
            desc: 'A wedding planner is a person or team appointed to assist in preparing, organizing, and executing a wedding to run smoothly and in line with the wishes of the bride and groom.'
        },
        {
            title: "Will the wedding planner take full control of the wedding planning?",
            desc: 'A wedding planner is a person or team appointed to assist in preparing, organizing, and executing a wedding to run smoothly and in line with the wishes of the bride and groom.'
        },
        {
            title: "Will the wedding planner be present on the wedding day? ",
            desc: 'A wedding planner is a person or team appointed to assist in preparing, organizing, and executing a wedding to run smoothly and in line with the wishes of the bride and groom.'
        },
    ]
    return (
        <section>
            <div className="container">
                <div className="mb-5">
                    <h2 className="medium font__size--48 text__48-1024 text__48-md text__48-sm play">Frequently
                        asked questions</h2>
                    <p className="normal font__size--18 text__18-1024 opacity__8">If you have questions that are not listed here, <br className='d-none d-md-block' />
                        send them to us via <a href="#!" className="wrapper__link-underline">email.</a>
                    </p>
                </div>
                {
                    faqData.map((obj) => {
                        return <AccordionWrap data={obj} />
                    })
                }

            </div>
        </section>
    )
}

export default Faq