import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {axiosInstance} from '../../config';

const PortfolioUpdate = (props) => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({})
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      await axiosInstance
        .get(`/portfolios/${id}`)
        .then((res) => res.data)
        .then(data => setInputs(data.portfolio));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    axiosInstance.put(`/portfolios/${id}`, {
      project_location: String(inputs.project_location),
      project_role: String(inputs.project_role),
      project_img: String(inputs.project_img),
      project_description: String(inputs.project_description),
      view_link: String(inputs.view_link),
      github_link: String(inputs.github_link),
      technologies: Array(inputs.technologies)
    }).then(res => res.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history(`/portfolio/${id}`));
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    //  console.log(e.target.name, "value", e.target.value);
  };


  return (
    <div className='container portfolio_update'>
      {inputs &&
        <form className='row col-lg-8' onSubmit={handleSubmit} >
          <div className='col-lg-6'>
            <input className="input" value={inputs.project_location} onChange={handleChange} name="project_location" />
          </div>
          <div className='col-lg-6'>
            <input className="input" value={inputs.project_role} onChange={handleChange}
              name="project_role" />
          </div>
          <div className='col-lg-12'>
            <input className="input" value={inputs.project_img} onChange={handleChange} name="project_img" />
          </div>
          <div className='col-lg-6'>
            <input placeholder="View_Link" className="input" value={inputs.view_link} onChange={handleChange} name="view_link" />
          </div>
          <div className='col-lg-6'>
            <input placeholder="Github_Link" className="input" value={inputs.github_link} onChange={handleChange}
              name="github_link" />
          </div>
          <div className='col-lg-12'>
            <input placeholder="Technologies" className="input" value={inputs.technologies} onChange={handleChange} name="technologies" />
          </div>
          <div className='col-lg-12'>
            <textarea className="textarea" value={inputs.project_description} onChange={handleChange} name="project_description" />
          </div>
          <div className='col-lg-12'>

            <button className='contact_btn' type="submit"><span className="text">Change_project</span><span>Nice!</span></button>

          </div>
        </form>
      }
    </div>
  )
}

export default PortfolioUpdate