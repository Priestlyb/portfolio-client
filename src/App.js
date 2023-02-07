import React from 'react'
import Homepage from './components/homepage';
import { Routes, Route } from 'react-router-dom';
import PortfolioUpdate from './components/portfolio/portfolioUpdate';
import AddProject from './components/add_project/add_project';
import Portfolios from './components/portfolio/portfolios';
import PortfolioPage from './page/portfoliopage/portfoliopage';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path="/para32satalaya" element={<AddProject />} exact />
          <Route path='/portfolioUpdate/:id' element={<PortfolioUpdate />} />
          <Route path='/portfolios' element={<Portfolios />} />
          <Route path='/portfolio/:id' element={<PortfolioPage />} />
        </Routes>
    </>
  )
}

export default App