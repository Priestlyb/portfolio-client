import React from 'react'
import './testimonials.css'

function Testimonials() {
    return (
        <div className='container testimonials'>
            <h1 className='edu-title'>TESTIMONAILS.</h1>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="1000">

                        <div className='testimonials_row'>

                            <div className='row col-lg-6'>

                                <div className='col-lg-6'>
                                    <img src='https://i.pinimg.com/564x/2f/38/43/2f3843f04589a40ef92cdb7f0d8e0e0a.jpg' alt='mr crib' className='testimonail_img' />
                                </div>

                                <div className='col-lg-6'>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <h3>Elon Musk</h3>
                                    <p>CEO of Tesla</p>
                                </div>
                            </div>


                            <div className='row col-lg-6'>

                                <div className='col-lg-6'>
                                    <img src='https://i.pinimg.com/564x/0e/29/ea/0e29ea314b86d5cbad67766a2de8f008.jpg' alt='small guy' className='testimonail_img' />
                                </div>

                                <div className='col-lg-6'>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <h3>Elon Musk</h3>
                                    <p>CEO of Tesla</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="carousel-item" data-bs-interval="2000">

                        <div className='testimonials_row'>

                            <div className='row col-lg-6'>

                                <div className='col-lg-6'>
                                    <img src='https://i.pinimg.com/564x/57/2d/76/572d7674106b6677ff0839b88d5f5077.jpg' alt='mr crib' className='testimonail_img' />
                                </div>

                                <div className='col-lg-6'>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <h3>Elon Musk</h3>
                                    <p>CEO of Tesla</p>
                                </div>
                            </div>


                            <div className='row col-lg-6'>

                                <div className='col-lg-6'>
                                    <img src='https://i.pinimg.com/564x/09/24/27/09242708f0f9c1c96cf3819538ac5333.jpg' alt='patrick' className='testimonail_img' />
                                </div>

                                <div className='col-lg-6'>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <h3>Elon Musk</h3>
                                    <p>CEO of Tesla</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="carousel-item" data-bs-interval="3000">

                        <div className='testimonials_row'>

                            <div className='row col-lg-6'>

                                <div className='col-lg-6'>
                                    <img src='https://i.pinimg.com/564x/02/28/e0/0228e077a2e1c64daf493024befe7201.jpg' alt='sponge_bob' className='testimonail_img' />
                                </div>

                                <div className='col-lg-6'>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <h3>Elon Musk</h3>
                                    <p>CEO of Tesla</p>
                                </div>
                            </div>


                            <div className='row col-lg-6'>

                                <div className='col-lg-6'>
                                    <img src='https://i.pinimg.com/564x/49/79/49/4979490ed991c70defc920d6721ee099.jpg' alt='squward' className='testimonail_img' />
                                </div>

                                <div className='col-lg-6'>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <h3>Elon Musk</h3>
                                    <p>CEO of Tesla</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Testimonials