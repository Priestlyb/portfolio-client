import React from 'react';
import './portfolio.css';
import { useNavigate } from "react-router-dom";
import {axiosInstance } from '../../config';

const Portfolio = (props) => {

    const history = useNavigate();
    const { _id, project_img, project_location, project_role, project_description } = props.portfolio;

    const deleteHandler = async () => {
        await axiosInstance.delete(`/portfolios/${_id}`)
            .then((res) => res.data)
            .then(() => history("/"));
    }

    return (

        <div className="portfolio-card" >
            <div className="portfolio-header">
                <img src={project_img} alt='portfolio_img' className='portfolio_img' />
            </div>

            <div className="portfolio-content">
                <h4>{project_location}</h4>
                <p>{project_role}</p>
                <p>{project_description}</p>

            
                <a className='css_buttons' href={`/portfolio/${_id}`} >
            <button class="cssbuttons-io-button"> View more!
                <div class="icon">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
            </button>
            </a>

            <div>

                {/* <button> <a href={`/portfolioUpdate/${_id}`}>Update</a></ button>
                <br /> <br />
                
                <button onClick={deleteHandler}>Delete</button> */}
            </div>
        </div>
        </div >
    );
}

export default Portfolio;
