import React, { useState } from 'react'
import "./add_project.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddProject = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        project_img: '',
        project_location: '',
        project_role: '',
        project_description: '',
        view_link: '',
        github_link: '',
        technologies: ['']
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

        //  console.log(e.target.name, "value", e.target.value);
    };


    const sendRequest = async () => {
        axios.post("http://localhost:5000/portfolios", {
            project_img: String(inputs.project_img),
            project_location: String(inputs.project_location),
            project_role: String(inputs.project_role),
            project_description: String(inputs.project_description),
            view_link: String(inputs.view_link),
            github_link: String(inputs.github_link),
            technologies: Array(inputs.technologies)
        }).then(res => res.data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs,);
        sendRequest().then(() => history("/"));
    }

    return (
        <div className='container add_project'>
            <h1 className='edu-title'>ADD NEW PROJECT.</h1>
            <div className='row'>

                <form className='row col-lg-8' onSubmit={handleSubmit} >
                    <div className='col-lg-6'>
                        <input placeholder="Project_Location" className="input" value={inputs.project_location} onChange={handleChange} name="project_location" />
                    </div>
                    <div className='col-lg-6'>
                        <input placeholder="Project_Role" className="input" value={inputs.project_role} onChange={handleChange}
                            name="project_role" />
                    </div>
                    <div className='col-lg-12'>
                        <input placeholder="Project_Img" className="input" value={inputs.project_img} onChange={handleChange} name="project_img" />
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
                        <textarea placeholder="Project_Description" className="textarea" value={inputs.project_description} onChange={handleChange} name="project_description" />
                    </div>

                    <div className='col-lg-12'>
                        <button className='contact_btn' type="submit"><span className="text">Add_project</span><span>Nice!</span></button>

                        {/* {done &&
                                <img src={applause} alt='' className='animate__animated animate__fadeInRight deliver_message' />} */}

                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProject