import React from 'react'
import "./experience.css"
import imfi_logo from "./imfi_logo.jpg"
import fmoh_logo from "./fmoh_logo.jpg"

function Experience() {
    return (
        <div className='experience'>
            <h1 className='edu-title' data-aos="fade-right" data-aos-anchor-placement="bottom-bottom">EXPERIENCE.</h1>

            <div className='experience_row'>

                <div className='img_col'>
                    <img className='imfi-img' src={fmoh_logo} alt='' />
                </div>

                <div className=''>
                    <h4 className='job-title'>ICT technician</h4>
                    <p className='job-sub'>Federal Ministry of Health | Physical | (2021-2022)</p>

                    <ul>
                        <li>Provided direct knowledge and training on using Excel efficiently, improving staff members' skills.</li>
                        <li>Played a crucial role in the pension office, aiding in the retirement process of over 100+ staff members.</li>
                        <li>Worked closely with different departments to understand their technology needs and provide solutions.</li>
                        <li>Collaborated with network administrators (Galaxy Backbone) to ensure a stable and secure network environment.</li>
                    </ul>
                </div>

                <div className=''><p className='job_type'>NYSC</p></div>

            </div>
            
            <div className='experience_row'>
                <div className='img_col'>
                    <img className='imfi-img' src={imfi_logo} alt='' />
                </div>
                <div className=''>
                    <h4 className='job-title'>Software Engineer</h4>
                    <p className='job-sub'>IMFI Academy | Part-Remote | (2020)</p>

                    <ul>
                        <li>Collaborate with senior developers and designers to implement responsive and visually appealing user interfaces.</li>
                        <li>Contribute to the creation of new features and functionalities on the frontend. <a href='https://www.imfiacademy.edu.ng/'>https://www.imfiacademy.edu.ng/</a></li>
                        <li>Ensure web applications are optimized for speed, performance, and accessibility.</li>
                        <li>Gained experience in agile development methodologies and sprints.</li>
                    </ul>
                </div>

                <div className=''><p className='job_type'>Internship</p></div>
            </div>

        </div>
    )
}

export default Experience;