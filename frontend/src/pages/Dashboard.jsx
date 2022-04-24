import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

import '../css/dashboard.css';
import {GiTireIronCross} from 'react-icons/gi'
import {AiOutlineCheck} from 'react-icons/ai'
import LineChart from '../charts/lineChart'


const Dashboard = () => {
  const [dataNote, setDataNote] = useState([])
  const [priceFlux,setPriceFlux] = useState(0);
  const [numberFLux, setNumberFlux] = useState(0);
  const [numberOfProFormat,setNumberProForma] = useState(0);
  const [form, setForm] = useState([{
    title :'',
    message:'',
  }])


useEffect(()=>{
  getData();
  getFlux();
  getFactu();
})


const getData = () =>{
  axios.get('/api/notes/').then((res)=>{
    const response = res.data;
    setDataNote(response);
  })
}

const handleCheck = async (e) =>{
  const value = e.target.parentElement.id;
  await axios.get(`api/notes/check-note/${value}`);
  getData();
}
const handleDelete = async(e) =>{
  const value = e.target.parentElement.id
  console.log(value);
  await axios.delete(`api/notes/delete-note/${value}`);
  getData();
}
const getFlux = async () =>{
  await axios.get('/api/order').then((res)=>{
    const response = res.data;
    getPriceFLux(response);
    setNumberFlux(response.length);
  })
}
const getPriceFLux = (response) =>{
  let value = 0; 
  for(let i=0; i < response.length; i++){
    if(response[i].inside_facture === false){
      value += response[i].price;
    }
  };
  setPriceFlux(value);
}
const getFactu = async () =>{
  await axios.get('/api/factu/get-factu').then((res)=>{
    const response = res.data;
    getNumberProForma(response)
  })
}
const getNumberProForma = (response) =>{
  let value = 0;
  for (let i = 0; i < response.length; i++){
    if(response[i].definitive === false && response[i].canceled === false){
      value += 1;
    }
  }
  setNumberProForma(value);
}
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
                        <p className="text-bloc-dash">{priceFlux}€</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                  <div className="card-dashboard">
                      <div className="bloc-dashboard">
                        <p className="title-bloc-dash">Facture en attente</p>
                        <p className="subtitle-bloc-dash">Nombre de pro forma</p>
                      </div>
                        <p className="text-bloc-dash">{numberOfProFormat} non validées</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                  <div className="card-dashboard">
                      <div className="bloc-dashboard">
                        <p className="title-bloc-dash">En traitement</p>
                        <p className="subtitle-bloc-dash">bon de livraison en cours</p>
                      </div>
                        <p className="text-bloc-dash">{numberFLux} bons</p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="card-dashboard chart-dashboard">
                        <p className="title-bloc-dash">Vue d'ensemble de l'annéee 2022</p>
                        <p className="subtitle-bloc-dash">Aperçu mois par mois</p>
                        <LineChart/>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="note-form card-dashboard">
                      <form action="/api/notes/new-note/" method="POST">
                      <p className="title-bloc-dash" style={{textAlign:'center'}}>Prise de note</p>
                        <div className="note-bloc-form">
                          <label className="title-bloc-dash" htmlFor="title_note">Titre :</label>
                          <input type="text" id="title_note" name="title" />
                        </div>
                        <div className="note-bloc-form">
                          <label  className="title-bloc-dash" htmlFor="title_note">Note :</label>
                          <textarea name="message" id="" cols="30" rows="5" ></textarea>
                        </div>
                        <button type="submit" className="btn-form-note">Enregistrer</button>
                      </form>
                  </div>
                </div>
                  <div className="col-lg-12">
                      <div className="note-content card-dashboard">
                        <div className="overlfow">
                            {dataNote.map((item,index)=>{
                                return(
                                    <div key={index} className="row p-2">
                                  <div className="col-lg-6">
                                    {item.check===false?<p className="title-note">{item.title_note}</p>:<p className="title-note-check">{item.title_note}<AiOutlineCheck/></p>}
                                  </div>
                                  <div className="col-lg-6">
                                  {item.check===false?
                                    <div className="icon-content-note-dash">
                                     
                                      <button className="btn-note"id={item._id} onClick={handleCheck}><AiOutlineCheck/></button>
                                      <Link to="#"><GiTireIronCross/></Link>
                                      <p className="date-note">{item.date}</p>
                                      </div>
                                      :
                                      <div className="icon-content-note-dash">
                                      <button className="btn-note"id={item._id} onClick={handleCheck}></button>
                                      <button className="btn-note"id={item._id} onClick={handleDelete}><GiTireIronCross/></button>
                       
                                      <p className="date-note">{item.date}</p>
                                    </div>
                                    }
                                  </div>
                                  <div className="col-lg-12">
                                    <p className="message-note">{item.message}</p>
                                  </div>
                                </div>
                                )
                              })}
                        </div>
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