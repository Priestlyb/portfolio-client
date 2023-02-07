import React from 'react';
import "./whatido.css";

function Whatido() {
    return (
        <div className='container whatido' id='services'>
            <h1 className='edu-title'>WHAT I DO?</h1>

            <div className='edu_title_row row'>

                <div className='edu_title_col row col-lg-6'>
                    <i className="whatido_img fa-solid fa-palette"></i>

                    <div className='col-lg-6'>
                        <h3>UI/UX Design</h3>
                        <p>
                            Creating visually appealing and user-friendly interfaces, taking into account design principles and user experience.
                        </p>
                    </div>
                </div>

                <div className='edu_title_col row col-lg-6'>
                    <i className="whatido_img fa-solid fa-code"></i>

                    <div className='col-lg-6'>
                        <h3>Web Design & Development</h3>
                        <p>
                            Creating visually appealing and user-friendly websites that are optimized for different devices and screen sizes.
                        </p>
                    </div>
                </div>

                <div className='edu_title_col row col-lg-6'>
                    <i className="whatido_img fa-solid fa-money-bill-trend-up"></i>

                    <div className='col-lg-6'>
                        <h3>SEO Marketing</h3>
                        <p>
                            Optimizing the website for search engine by implementing techniques such as meta tags, header tags, and schema markup.
                        </p>
                    </div>
                </div>

                <div className='edu_title_col row col-lg-6'>
                    <i className="whatido_img fa-solid fa-laptop-code"></i>

                    <div className='col-lg-6'>
                        <h3>Website Maintenance</h3>
                        <p>
                            Helping in maintaining the website, updating the content, fixing bugs, and ensuring that the website is secure.
                        </p>
                    </div>
                </div>

                <div className='edu_title_col row col-lg-6'>
                    <i className="whatido_img fa-solid fa-bug-slash"></i>

                    <div className='col-lg-6'>
                        <h3>Testing and Debugging</h3>
                        <p>
                            Using tools to test and debug code, ensuring that it works as expected.
                        </p>
                    </div>
                </div>

                <div className='edu_title_col row col-lg-6'>
                    <i className="whatido_img fa-solid fa-atom"></i>

                    <div className='col-lg-6'>
                        <h3>Backend Integration</h3>
                        <p>
                            Integrating the front-end with the backend and APIs.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Whatido;