//structure
import React, {useState,useEffect} from 'react';
import {useLocation, Link} from 'react-router-dom';
import axios from 'axios';

//css & icons
import {AiOutlinePlus} from 'react-icons/ai'
import {GiTireIronCross} from 'react-icons/gi'
import {FiEdit} from 'react-icons/fi'
import {BsEye} from 'react-icons/bs'
import {IoIosArrowForward} from 'react-icons/io'
import '../css/general.css'
const Client = () => {

const [popUp, setPopUp] = useState(false); // ouvrir-fermer le formulaire 
const [messageSuccess,setMessageSuccess] = useState("");// message dans l'URL après formulaire réussi
const [dataClient, setDataClient] = useState([]);
const [buttonName, SetButtonnName] = useState('');
const location = useLocation();

console.log(dataClient);
useEffect(()=>{
    decodeQuery();
    axios.get(`/api/clients`).then((res)=>{
        const response = res.data;
        setDataClient(response);
        
    })
},[])

const activePopUp = (e) =>{
    e.preventDefault();
    setPopUp(true);
}
const DesactivePopUp = (e) =>{
    e.preventDefault();
    setPopUp(false);
}
const decodeQuery = () =>{
    const decode = decodeURIComponent(location.search);
    const decode2 =  decode.split("=").pop()
    setMessageSuccess(decode2)
    console.log(decode2);
}
const NameButton= (e) =>{
    e.preventDefault();
    const value = e.target.value;
    SetButtonnName(value);
}

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">

            {popUp? 
            <div>
            <div className="header-page">
                <h3 className="header-title">Clients</h3>
                <button onClick={DesactivePopUp}> <GiTireIronCross/> Fermer formulaire </button>
              </div>
              <div className="form-content">
              <form action="/api/clients/new-doctor" method="POST" className="form-client">
                <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="username" className="form-control" name="username" placeholder="Prénom"/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <input onChange={NameButton} type="text" id="lastname" className="form-control" name="lastname" placeholder="Nom"/>
                    </div>
                </div>
                </div>
                <div className="form-outline mb-4">
                    <input type="text" id="n_siret" className="form-control" name="n_siret" placeholder="N° de siret du client"/>
                </div>
                <div className="form-outline mb-4">
                    <input type="text" id="address" className="form-control" name="address" placeholder="Adresse postal" />
                </div>
                <div className="form-outline mb-4">
                    <input type="email" id="email" className="form-control"  name="email" placeholder="Email"/>
                </div>
                <div className="form-outline mb-4">
                    <input type="number" id="phone" className="form-control" name="phone" placeholder="Téléphone"/>
                </div>
                <div className="form-outline mb-4">
                    <textarea className="form-control" id="infos"  name="infos" rows="4" placeholder="Informations complémentaires"></textarea>
                </div>
                    <button type="submit" className="btn-form">Enregistrer le Dr. {buttonName}</button>
            </form>
               
                </div>
            </div>
            : 
            <div>
                <div className="header-page">
                    <h3 className="header-title">Clients</h3>
                    <div>
                        <h3 className={messageSuccess===""?"message-success":"message-success active"}>{messageSuccess}</h3>
                    </div>
                    <button onClick={activePopUp}> <AiOutlinePlus/> Ajouter Client</button>
                   
                </div>
                <div className="table-content">
                <div className="row table-list">
                    <div className="col-lg-3">Docteur</div>
                    <div className="col-lg-3">email</div>
                    <div className="col-lg-3">téléphone</div>
                    <div className="col-lg-3">actions</div>
                </div>
                {dataClient.map((client,index)=>{
                        return(
                     
                                <div className="row table-item" key={index}>
                                   
                                    <div className="col-lg-3">Dr. {client.lastname} {client.username}</div>
                                 
                                    <div className="col-lg-3 email-col"><p>{client.email}</p></div>
                                    <div className="col-lg-3 phone-col"><p>{client.phone}</p></div>
                                   
                                    <div className="col-lg-2 action-col"><a href="/client"><FiEdit/></a> <a href="#"><GiTireIronCross/></a> <a href="#"><BsEye/></a></div>
                                    <div className="col-lg-1 arrow-col"><Link to={{pathname:`/client/${client._id}`}}><IoIosArrowForward/></Link></div>
                                </div>
                        )
                    })}
                </div>
            </div>
            }
        </div>
    </div>
    </div>
  )
}

export default Client