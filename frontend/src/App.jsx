//import de structure
import react from 'react';

//component

//css
import './css/general.css'
import Logo from './image/logo-crm-smile-color.png';
import {MdOutlineDashboard,MdOutlineWorkspaces} from 'react-icons/md';
import {IoPersonOutline} from 'react-icons/io5';
import {RiListOrdered} from 'react-icons/ri';
import {FaFileInvoice} from 'react-icons/fa';
import {AiOutlinePoweroff} from 'react-icons/ai';
import {BsSearch,BsBell} from 'react-icons/bs';
function App() {
  return (
   <div className="container-fluid">
     <div className="row">
       <div className="col-lg-2 color1">
        <div className="navbar-verti">
          <div className="navbar-content">
            <img src={Logo} alt="" />
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="" className="nav-link"><MdOutlineDashboard/><span>Tableau de bord</span></a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link"><IoPersonOutline/><span>Clients</span></a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link"><MdOutlineWorkspaces/><span>Prestations</span></a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link"><RiListOrdered/><span>Commandes</span></a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link"><FaFileInvoice/><span>Facturations</span></a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link"><AiOutlinePoweroff/><span>Déconnexion</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-10 color2">
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
      </div>
      </div>
   </div>

  );
}

export default App;
