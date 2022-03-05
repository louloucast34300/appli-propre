import React from 'react'
import '../css/general.css'
import {BsSearch,BsBell} from 'react-icons/bs';
import {IoPersonOutline} from 'react-icons/io5';


const NavbarHori = () => {
  return (
    <div className="navbar-hori">
    <div className="row">
      <div className="col-lg-3">
         <h3 className="title-cms">Smile Art. Gestion entreprise</h3>
       </div>
      <div className="col-lg-6">
         <div className="search-bloc">
           <input type="text" placeholder="Commencez à chercher..."/>
           <button><BsSearch/></button>
         </div>
     </div>
     <div className="col-lg-3">
       <div className="right-bloc">
       <button className="alert-bell"><BsBell/></button>
       <h3 className="title-cms"><span>Colette Cros</span><IoPersonOutline/></h3>
       </div>
     </div>
   </div>
 </div>
  )
}

export default NavbarHori;