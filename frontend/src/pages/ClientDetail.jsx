import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

//css
import '../css/clientDetail.css';
import {MdOutlineMessage} from 'react-icons/md';
import {AiOutlinePhone} from 'react-icons/ai';
import {FiEdit} from 'react-icons/fi';

const ClientDetail = () => {
const nf = "non fournie"
const client = useParams().clientId;
const [clientData, setClientData] = useState([{
    username:nf,
    lastname:nf,
    email:nf,
    phone:nf,
    n_siret:nf,
    address:nf,
}]);

console.log(clientData);

useEffect(()=>{
    GetData();
},[])

const GetData = () =>{
    axios.get(`/api/clients/detail/${client}`).then((res)=>{
        const response = res.data;
        setClientData(response);
    }).catch((err)=>{
        console.log("Erreur", err);
    })
}




  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <div className="header-client-detail">
                    <h3>Fiche Client</h3>
                    <div>
                        <button className="btn-client-detail"><MdOutlineMessage/> Envoyer un message</button>
                        <button className="btn-client-detail"><AiOutlinePhone/> Appeler le client</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="left-content-client-detail">
                    <div className="left-bloc-cd">
                        <h3>{clientData.lastname} {clientData.username}</h3>
                        <p className="text-color-client-detail mt-30"><span>N°siret : </span> {clientData.n_siret}</p>
                        <p className="text-color-client-detail mt-30"><span>Email : </span> {clientData.email}</p>
                        <p className="text-color-client-detail mt-30"><span>Numéro tel 1 : </span> {clientData.phone}</p>
                        <p className="text-color-client-detail mt-30"><span>Numéro tel 2 : </span> non fournie</p>
                        <p className="text-color-client-detail mt-30"><span>Adresse : </span> {clientData.address}</p>
                        <p className="text-color-client-detail mt-30"><span>Heure locale : </span> 12:30 pm</p>
                        <div className="btn-left-bloc-cd">
                            <Link className="link-left-bloc" to={`/client/edit/${clientData._id}`}><FiEdit/> Modifier</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="right-content-client-detail">
 
  <div class="row justify-content-center ">
    <div class="col-lg-12">
      <ul class="nav nav-tab-pan-client-detail">
        <li class="nav-item">
          <a class="nav-link link-secondary" id="commandes-tab" data-bs-toggle="tab" data-bs-target="#commande" href="#">Commandes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link-secondary" id="attente-tab" data-bs-toggle="tab" data-bs-target="#attente" href="#">En attente</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link-secondary" id="patient-tab" data-bs-toggle="tab" data-bs-target="#patient" href="#">Patients</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link-secondary active" id="facture-tab" data-bs-toggle="tab" data-bs-target="#facture" href="#">Factures</a>
        </li>
      </ul>

      <div class="tab-content" id="tabContent">
        <div class="tab-pane fade" id="commande" role="tabpanel" aria-labelledby="commandes-tab">
          <p>liste des commandes</p>
        </div>
        <div class="tab-pane fade" id="attente" role="tabpanel" aria-labelledby="attente-tab">
          <p>liste des factures non classée</p>
        </div>
        <div class="tab-pane fade" id="patient" role="tabpanel" aria-labelledby="patient-tab">
          <p>Listes des patients</p>
        </div>
        <div class="tab-pane fade show active" id="facture" role="tabpanel" aria-labelledby="patient-tab">
          <p>Listes des factures</p>
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

export default ClientDetail