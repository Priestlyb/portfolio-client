import React, { useState, useEffect, useContext } from 'react';
import "./admin.css"
import Adminsingle from './admin-single';
import { axiosInstance } from '../config';
import { Context } from "../context/Context";

function Adminpage() {

    //Axios Request
    const URL = "/portfolios";
    const fetchHandler = async () => {
        return await axiosInstance.get(URL).then((res) => res.data)
    }

    const [portfolios, setPortfolios] = useState();


    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    useEffect(() => {

        fetchHandler().then((data) => setPortfolios(data.portfolios));

    }, []);

    const [search,] = useState('');
    console.log(search)

    return (
        <>

            <div className='container navbar-dark bg-light'>
                <nav className="navbar navbar-expand-md navbar-primary bg-light">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav" Style="margin-left: auto;">

<a href='/' className="nav-item active  nav-link">{user && "Home"}
</a>

                            <a href='./admin' className="nav-item active  nav-link">{user && "Admin"}
                            </a>

                            <li className="nav-item active  nav-link logout_btn" onClick={handleLogout}>{user && "Logout"}
                            </li>

                        </ul></div>
                </nav>
            </div>


            <div className='container portfolio'>
                <h1 className='edu-title'>WEB DEVELOPMENT DATA.</h1>

                <a href='/para32satalaya' className='admin_add_btn'>
                    <button class="admin_btn">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
  <span>Add</span>
</button>
</a>

                <div className='portfolio_item'>
                    {portfolios &&
                        portfolios
                            .filter((portfolio) => {
                                return search.toLowerCase() === '' ? portfolio : portfolio.name.toLowerCase().includes(search);
                            })
                            .map((portfolio, id) => (
                                <div key={id}>
                                    <Adminsingle portfolio={portfolio} />
                                </div>
                            ))}
                </div>
            </div>
        </>
    )
}

export default Adminpage