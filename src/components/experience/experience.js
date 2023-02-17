import React from 'react'
import "./experience.css"

function Experience() {
    return (
        <div className='container experience'>
            <h1 className='edu-title'>EXPERIENCE.</h1>

            <div className='row experience-row'>
                <div className='img_col col-lg-2'>
                    <img className='imfi-img' src='https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/277574054_366220465518703_3263121156935156957_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=N0zCo9Sa37EAX9-bgJ0&_nc_ht=scontent-ams4-1.xx&oh=00_AfAnPMkx6uXUDY2-DJxe72sGH7hTbxkO8Zn959tsB5xWYg&oe=63F3067D' alt='' />
                </div>
                <div className='col-lg-8'>
                    <h4 className='job-title'>ui/ux Designer</h4>
                    <p className='job-sub'>IMFI Academy | Part-Remote | (2020)</p>

                    <ul>
                        <li>I was thought basic skills in designing a website and App with the use of
                            Figma for six months.</li>
                        <li>Assist in resolving computer challenges by troubleshooting and helping staff with their
                            database.</li>
                        <li>Supported the collation and review of monthly reports and provided feedback to the program site</li>
                    </ul>
                </div>
                <div className='col-lg-2'><p className='job-type'>Internship</p></div>
            </div>

            <div className='row experience-row'>
                <div className='img_col col-lg-2'>
                    <img className='imfi-img' src='https://www.health.gov.ng/images/FMOH-logo-lg.jpg' alt='' />
                </div>
                <div className='col-lg-8'>
                    <h4 className='job-title'>IT technician</h4>
                    <p className='job-sub'>Federal Ministry of Health | Physical | (2021-2022)</p>

                    <ul>
                        <li>Impacted fellow staff with immediate knowledge of Excel.</li>
                        <li>Worked as a contract worker from the IT Department and assisted the pension office with retiring over 100+ staff.</li>
                        <li>Prep Several Meetings (Zoom)</li>
                    </ul>
                </div>
                <div className='col-lg-2'><p className='job-type'>NYSC</p></div>
            </div>

        </div>
    )
}

export default Experience;