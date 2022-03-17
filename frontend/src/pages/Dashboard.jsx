import React from 'react'
import PieChart from '../charts/pieChart';

import '../css/dashboard.css';
const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="header-content">
            <h3>Bienvenue Mme Cros</h3>
          </div>
          <div className="row row-content">
            <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card-dashboard">
                      <div className="bloc-dashboard">
                        <p className="title-bloc-dash">Flux de production</p>
                        <p className="subtitle-bloc-dash">Flux de production actuel</p>
                      </div>
                        <p className="text-bloc-dash">1203€</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                  <div className="card-dashboard">
                      <div className="bloc-dashboard">
                        <p className="title-bloc-dash">Facture en attente</p>
                        <p className="subtitle-bloc-dash">Nombre de facture</p>
                      </div>
                        <p className="text-bloc-dash">14</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                  <div className="card-dashboard">
                      <div className="bloc-dashboard">
                        <p className="title-bloc-dash">En traitement</p>
                        <p className="subtitle-bloc-dash">bon de livraison en cours</p>
                      </div>
                        <p className="text-bloc-dash">63</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="note-form card-dashboard">
                   
                      <form action="">
                      <p className="title-bloc-dash" style={{textAlign:'center'}}>Prise de note</p>
                        <div className="note-bloc-form">
                          <label className="title-bloc-dash" htmlFor="title_note">Titre :</label>
                          <input type="text" id="title_note"/>
                        </div>
                        <div className="note-bloc-form">
                          <label  className="title-bloc-dash" htmlFor="title_note">Note :</label>
                          <textarea name="" id="" cols="30" rows="5"></textarea>
                        </div>
                        <button className="btn-form-note">Enregistrer</button>
                      </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
    
  )
}

export default Dashboard