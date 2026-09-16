import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./quickContact.css";

import applause from "./applause.mp4";
import mail from "./envelope_mail.gif";
import phone from "./telephone_call.gif";

const QuickContact = () => {
  const form = useRef();

  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    setSending(true);
    setDone(false);
    setError(false);

    try {
      const result = await emailjs.sendForm(
        "service_bassey",
        "template_bassey",
        form.current,
        "user_Kr7iGuivtEP0uR57DsGBa",
      );

      console.log(result.text);

      setDone(true);
      form.current.reset();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="quick-contact">
      {/* Floating trigger */}
      <button
        className="quick-contact-trigger"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#quickContactPanel"
        aria-controls="quickContactPanel"
        aria-label="Open contact panel"
      >
        <span className="quick-contact-trigger_text">LET&apos;S TALK</span>

        <span className="quick-contact-trigger_icon">
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </span>
      </button>

      {/* Contact panel */}
      <div
        className="offcanvas offcanvas-end quick-contact-panel"
        tabIndex="-1"
        id="quickContactPanel"
        aria-labelledby="quickContactTitle"
      >
        <div className="quick-contact-panel_inner">
          {/* Decorative elements */}
          <div className="quick-contact-orbit quick-contact-orbit_one"></div>
          <div className="quick-contact-orbit quick-contact-orbit_two"></div>
          <div className="quick-contact-glow"></div>

          {/* Top bar */}
          <div className="quick-contact-topbar">
            <span className="quick-contact-status">
              <i></i>
              AVAILABLE FOR WORK
            </span>

            <button
              type="button"
              className="quick-contact-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close contact panel"
            >
              <span></span>
              <span></span>
            </button>
          </div>

          {/* Main heading */}
          <div className="quick-contact-main">
            <p className="quick-contact-kicker">GOT AN IDEA?</p>

            <h1 id="quickContactTitle">
              LET&apos;S
              <br />
              <span>MAKE</span>
              <br />
              SOMETHING.
            </h1>

            <div className="quick-contact-star">✦</div>
          </div>

          {/* Intro */}
          <div className="quick-contact-message">
            <p>
              Have a website, application, or digital product in mind? Drop me a
              message and let&apos;s turn the idea into something real.
            </p>
          </div>

          {/* Direct contact */}
          <div className="quick-contact-direct">
            <a
              href="mailto:pbassey30@gmail.com"
              className="quick-contact-direct_item"
            >
              <div className="quick-contact-direct_icon">
                <img src={mail} alt="" />
              </div>

              <div className="quick-contact-direct_content">
                <span>EMAIL ME</span>
                <strong>pbassey30@gmail.com</strong>
              </div>

              <span className="quick-contact-direct_arrow">↗</span>
            </a>

            <a href="tel:+2348067156986" className="quick-contact-direct_item">
              <div className="quick-contact-direct_icon">
                <img src={phone} alt="" />
              </div>

              <div className="quick-contact-direct_content">
                <span>CALL ME</span>
                <strong>+234 806 715 6986</strong>
              </div>

              <span className="quick-contact-direct_arrow">↗</span>
            </a>
          </div>

          {/* Form */}
          <form className="quick-contact-form" ref={form} onSubmit={sendEmail}>
            <div className="quick-contact-form_title">
              <span>OR SEND A MESSAGE</span>
              <span>01 — 04</span>
            </div>

            <div className="quick-contact-field">
              <span>01</span>
              <input
                name="user_name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>

            <div className="quick-contact-field">
              <span>02</span>
              <input
                name="user_email"
                type="email"
                placeholder="Your email"
                required
              />
            </div>

            <div className="quick-contact-field">
              <span>03</span>
              <input
                name="user_subject"
                type="text"
                placeholder="What are we working on?"
                required
              />
            </div>

            <div className="quick-contact-field quick-contact-field_message">
              <span>04</span>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="quick-contact-submit"
              disabled={sending}
            >
              <span>{sending ? "SENDING..." : "SEND MESSAGE"}</span>

              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>

            {done && (
              <div className="quick-contact-feedback quick-contact-feedback_success">
                <video
                  src={applause}
                  autoPlay
                  muted
                  playsInline
                  aria-hidden="true"
                />

                <div>
                  <strong>MESSAGE SENT</strong>
                  <span>I&apos;ll get back to you shortly.</span>
                </div>
              </div>
            )}

            {error && (
              <div className="quick-contact-feedback quick-contact-feedback_error">
                Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="quick-contact-footer">
            <span>PRIestly PATRICK BASSEY</span>
            <span>✦</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickContact;
