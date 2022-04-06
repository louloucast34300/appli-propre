import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import '../css/propre.css';
import {AiOutlinePlus} from 'react-icons/ai';
import {GiTireIronCross} from 'react-icons/gi'
import {FiEdit} from 'react-icons/fi'
import {BsEye} from 'react-icons/bs'
const Facturation = () => {

const [data, setData] = useState([]);
console.log(data);

useEffect(()=>{
  getData();
},[])

const getData = () =>{
  axios.get('/api/factu/get-factu')
  .then((res)=>{
    const response = res.data;
    setData(response)
  })
}

const changeStatut = async (e) =>{
  const checked = e.target.checked;
  const id = e.target.value;
  const verifyCheck = checked ? "factu-def":"pro-format";
  await axios.get(`/api/factu/${verifyCheck}/${id}`);
  getData();

};



  return (
    <div>
      <div className="header-page">
        <h3 className="header-title">Factures</h3>
      </div>
      <div className="container-fluid commande-list m-100">
        <div className="row radius-top bg-1 p-10">
            <div className="col-lg-4 d-col-flex">
                <label className="label-style-1" htmlFor="n_facture">N° de facture :</label>
                <input className="input-style-1" type="text" id="n_facture"/>
            </div>
            <div className="col-lg-4 d-col-flex">
                <label  className="label-style-1" htmlFor="n_docteur">Docteur :</label>
                <input  className="input-style-1" type="text" id="n_docteur"/>
            </div>
            <div className="col-lg-4 d-col-flex">
                <label className="label-style-1" htmlFor="n_date">Date du bon :</label>
                <input className="input-style-1" type="text" id="n_date"/>
            </div>
        </div>
        {data.slice(0).reverse().map((item,index)=>{
          return(
            <div key={index}className="row row-list">
              <div className="col-lg-1">
                <p className="color-3 f-little">Facture</p>
                <p className="line-30">N°{item.number_order_facture}</p>
              </div>
              <div className="col-lg-2">
                <p className="color-3 f-little">Statut</p>
                <p className="color-1 f-medium line-30">{item.definitive?"Facture définitive": "Pro forma"}</p>
              </div>
              <div className="col-lg-2">
                <p className="color-5 f-little">Date de création</p>
                <p className="line-30 f-little">{item.date_of_creation}</p>
            </div>
              <div className="col-lg-2">
                <p className="color-3 f-little">Docteur</p>
                <p className="color-1 f-medium line-30">{item.doctor}</p>
              </div>
                <div className="col-lg-1">
                <p className="color-3 f-little">Prix total</p>
                <p className="color-1 f-medium line-30">120€</p>
              </div>
              <div className="col-lg-2">
                <p className="color-3 f-little">Options</p>
                <Link to='#'><FiEdit/></Link> <a  id='#'><GiTireIronCross/></a> <Link  to={{pathname:`/order/${item._id}`}}><BsEye/></Link>
              </div>
              <div className="col-lg-2">
              <p className="color-3 f-little">Valider la facture</p>
                <div class="demo">
                    <label class="toggle" for={`checkbox_${item._id}`}>
                        <input type="checkbox" class="toggle__input btn-checkbox" id={`checkbox_${item._id}`}  value={item._id} onChange={changeStatut} checked={item.definitive?'checked':''}/>
                        <span class="toggle-track">
                            <span class="toggle-indicator">
                                <span class="checkMark">
                                    <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                    </svg>
                                </span>
                            </span>
                        </span>
                    </label>
                    </div>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Facturation