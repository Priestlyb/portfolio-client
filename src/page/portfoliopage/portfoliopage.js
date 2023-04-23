import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../config';

const PortfolioPage = () => {
  const id = useParams().id;
  const [{ portfolio }, setPortfolio] = useState({})
  useEffect(() => {
    axiosInstance.get(`/portfolios/${id}`).then(res => {
      setPortfolio(res.data)
    })
  })


  return (
    <div>
      {portfolio &&
        <div className='portfolio_page'>
          <div className='row portfolio_body'>
            <div className='left_col col-lg-8'>

              <button className="cta Go_back_icon">
                <span className="hover-underline-animation"><a href='/#portfolios'> <i className="fa-solid fa-arrow-left-long"></i> Go Back
                </a> </span>
              </button>

              <h1>{portfolio.project_location}</h1>
              <h2>{portfolio.project_role}</h2>

              <div className="portfolio_page_card" Style="width: 18rem;">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list_header">Technologies:</li>
                </ul>
                <div className="card_footer">
                  {portfolio.technologies}
                </div>
              </div>
              <p>{portfolio.project_description}</p>

              {/* Demo Btn */}

              <button className="demo_btn">
                <a href={portfolio.view_link} target="blank" rel="nore
ferrer">
                  <i className="fa-regular fa-eye"></i> View Demo
                </a>
              </button>

              {/* Code Btn */}

              <button className="demo_btn">
                <a href={portfolio.github_link} target="blank" rel="nore
ferrer">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" fill="currentColor"></path></svg> View Code
                </a>
              </button>
            </div>

            <div className='col-lg-4 portfolio_page_header'>
              <img className='portfolio_page_img' src={portfolio.project_img} alt='' />
            </div>

          </div>
        </div>
      }
    </div>
  )
}

export default PortfolioPage