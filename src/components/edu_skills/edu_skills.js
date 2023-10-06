import React from 'react'
import './edu_skills.css'

function Eduskills() {
    return (
        <div className='container education'>
            <h1 className='edu-title' data-aos="fade-right" data-aos-anchor-placement="bottom-bottom">EDUCATION & SKILLS.</h1>
            <div className='row'>
                <div className='edu_col col-lg-6'>

                    <div className="plan-card" data-aos="fade-left" data-aos-anchor-placement="bottom-bottom">
                        <h2>Baze University, Abuja</h2>
                        <p className='course'><strong>MSC</strong> Computer Science</p>
                        <div className="etiquet-price">
                            <p>2023-Present</p>
                            <div></div>
                        </div>
                    </div>

                    <br /> <br />

                    <div className="plan-card" data-aos="fade-left" data-aos-anchor-placement="bottom-bottom">
                        <h2>Gregory University, Uturu</h2>
                        <p className='course'><strong>BSC</strong> Computer Science Second class</p>
                        <div className="etiquet-price">
                            <p>2017-2021</p>
                            <div></div>
                        </div>
                        <div className="benefits-list">
                            <ul>
                                <li><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path>
                                </svg><span>Activity Member of Code Club
                                    (2018 - Present)
                                    </span></li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className='edu_col col-lg-6'>
                    <h2>My skills</h2>
                    <p>I am always eager to learn new technologies and stay up-to-date with the latest developments in the web development industry. I'm excited to continue to develop my skills and grow my career as a Software Engineer. If you're interested in working together, please feel free to connect with me on <a href='http://linkedin.com/in/priestly-bassey-486278175' className='edu_skills_link'>[LinkedIn]</a>.</p>

                    <div className='skills'>
                        <div className="box">
                            <h4>UI/UX Design</h4>
                            <div className="percent">
                                <div Style="width: 95%;" data-aos="fade-right" data-aos-delay="300" data-aos-offset="200"></div>
                            </div>
                        </div>

                        <div className="box">
                            <h4>JavaScript Frameworks and Libraries</h4>
                            <div className="percent">
                                <div Style="width: 90%;" data-aos="fade-right" data-aos-delay="300" data-aos-offset="200"></div>
                            </div>
                        </div>

                        <div className="box">
                            <h4>Responsive Design</h4>
                            <div className="percent">
                                <div Style="width: 97%;" data-aos="fade-right" data-aos-delay="300" data-aos-offset="200"></div>
                            </div>
                        </div>

                        <div className="box">
                            <h4>Performance Optimization</h4>
                            <div className="percent">
                                <div Style="width: 93%;" data-aos="fade-right" data-aos-delay="300" data-aos-offset="200"></div>
                            </div>
                        </div>

                        <div className="box">
                            <h4>Version Control</h4>
                            <div className="percent">
                                <div Style="width: 80%;" data-aos="fade-right" data-aos-delay="300" data-aos-offset="200"></div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Eduskills;