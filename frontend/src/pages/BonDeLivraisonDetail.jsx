import React,{useState,useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import axios from 'axios';

import {Print_BonDeLivraison} from '../component/Print_BonDeLivraison'
import {AiFillPrinter} from 'react-icons/ai'
import '../css/propre.css'
const BonDeLivraisonDetail = () => {
    const id = useParams().orderId
    const componentRef = useRef();




    return (
      <div>
       
        <ReactToPrint
          documentTitle= "Bon de livraison"
          onAfterPrint={()=>window.location.reload()}
          trigger={() => <button className="btn-style-1"><AiFillPrinter/> Imprimer le bon de livraison</button>}
          content={() => componentRef.current}
        />
        <Print_BonDeLivraison ref={componentRef} id={id}  />
      </div>
    );
}

export default BonDeLivraisonDetail