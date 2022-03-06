import React from 'react'
import PieChart from '../charts/pieChart';

import '../css/general.css';
const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="header-content">
            <h3>Tableau de Bord</h3>
          </div>
          <div className="row row-content">
            <div className="col-lg-3">
            <div className="bloc-content">
              <h5>Success rate 82%</h5>
              <PieChart/>
            </div>
          </div>
          </div>
        </div>
      </div>


    </div>
    
  )
}

export default Dashboard