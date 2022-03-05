//structure
import React, {useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

//css & icons
import {AiOutlinePlus} from 'react-icons/ai'
import {GiTireIronCross} from 'react-icons/gi'
import '../css/general.css'
const Client = () => {

const [popUp, setPopUp] = useState(false); // ouvrir-fermer le formulaire 
const [messageSuccess,setMessageSuccess] = useState("");// message dans l'URL après formulaire réussi
const [dataClient, setDataClient] = useState([]);
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


  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
            {popUp? 
            <div>
            <div className="header-page">
                <h3>Clients</h3>
                <button onClick={DesactivePopUp}> <GiTireIronCross/> Fermer formulaire </button>
              </div>
              <div>
                <form action="/api/clients/new-doctor" method="POST">
                        <label htmlFor="username">username</label>
                        <input type="text" id="username" name="username" />
                        <label htmlFor="lastname">lastname</label>
                        <input type="text" id="lastname" name="lastname" />
                        <label htmlFor="email">email</label>
                        <input type="text" id="email" name="email" />
                        <label htmlFor="address">adresse</label>
                        <input type="text" id="address" name="address" />
                        <label htmlFor="phone">phone</label>
                        <input type="number" id="phone" name="phone"/>
                        <label htmlFor="n_siret">n°siret</label>
                        <input type="text" id="n_siret" name="n_siret" />
                        <button type="submit">Création d'un nouveau client</button>
                    </form>
               
                </div>
            </div>
            : 
            <div>
                <div className="header-page">
                    <h3>Clients</h3>
                    <div>
                        <h3>{messageSuccess}</h3>
                    </div>
                    <button onClick={activePopUp}> <AiOutlinePlus/> Ajouter Client</button>
                   
                </div>
                {dataClient.map((client,index)=>{
                        return(
                           <div key={index}>
                               <p>{client.username}</p>
                            </div>
                        )
                    })}
            </div>
            }
        </div>
    </div>
    </div>
  )
}

export default Client