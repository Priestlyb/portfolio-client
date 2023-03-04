import React, { useState, useRef } from 'react'
import "./back_to_top.css"
import './back_to_top.scss';
import emailjs from '@emailjs/browser';
import applause from './applause.gif';
import mail from './envelope_mail.gif';
import phone from './telephone_call.gif';

function Backtotop() {
    const form = useRef();
    const [done, setDone] = useState(false)
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_bassey', 'template_bassey', form.current, 'user_Kr7iGuivtEP0uR57DsGBa')
        .then((result) => {
          console.log(result.text);
          setDone(true)
        }, (error) => {
          console.log(error.text);
        });
    };
    return (
        <div className="quick-contact">

            <button className="quick-contact-btn btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"><i className="fa-solid fa-message"></i></button>

            <div className="offcanvas offcanvas-bottom offcanvas-vertical-height" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">

                <div className="offcanvas-header">
                    <h5 className="offcanvas-title btt_btn" id="offcanvasBottomLabel">GET IN TOUCH.</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body large">

                <div className='contact' id='contact'>
      <div className='row'>
        
        <div className='col-lg-4'>
          <h3>What’s your story? <br /> Get in touch</h3>
          <p>Always available for freelancing if the right project comes along, Feel free to contact me.</p>
          <div className='contact_details'>
            <img src={mail} alt='' className='mail_icon' />
            <h5>pbassey30@gmail.com</h5>
          </div>
          <div className='contact_details'>
            <img src={phone} alt='' className='mail_icon' />
            <h5>+234 806 715 6986</h5>
          </div>
        </div>

        <form className='row col-lg-8' ref={form} onSubmit={sendEmail}>
          <h3>Say Something</h3>
          <div className='col-lg-6'>
            <input placeholder="Name*" className="input" name="user_name" type="text" />
          </div>
          <div className='col-lg-6'>
            <input placeholder="Email*" className="input" name="user_subject" type="email" />
          </div>
          <div className='col-lg-12'>
            <input placeholder="Subject*" className="input" name="user_email" type="text" />
          </div>
          <div className='col-lg-12'>
            <textarea placeholder="Your message" className="textarea" name="message" type="text" />
          </div>
          <div className='col-lg-12'>

            <button className='contact_btn'><span className="text">Send message</span><span>Thank you!</span></button>
            {done && 
              <img src={applause} alt='' className='animate__animated animate__fadeInRight deliver_message' />}
            </div>
        </form>
      </div>
    </div>
                </div>
            </div>
        </div>
    )
}

export default Backtotop;