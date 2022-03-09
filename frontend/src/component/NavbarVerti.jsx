//structure
import React, {} from 'react'
import {Link,useLocation} from 'react-router-dom';


//css & icons
import Logo from '../image/logo-crm-smile-color.png';
import '../css/navbarVerti.css';
import {MdOutlineDashboard,MdOutlineWorkspaces} from 'react-icons/md';
import {IoPersonOutline} from 'react-icons/io5';
import {RiListOrdered} from 'react-icons/ri';
import {FaFileInvoice} from 'react-icons/fa';
import {AiOutlinePoweroff} from 'react-icons/ai';

const NavbarVerti = (props) => {

const deconnexion = props.delete;



const location = useLocation();
const {pathname} = location;
const splitLocation = pathname.split("/");



  return (
    <div className="navbar-verti">
          <div className="navbar-content">
            <img src={Logo} alt="" />
            <ul className="navbar-nav">
              <li className={splitLocation[1]===""?"nav-item active":"nav-item"}>
                <Link to="/" className="nav-link" ><MdOutlineDashboard/><span>Tableau de bord</span></Link>
              </li>
              <li className={splitLocation[1]==="client"?"nav-item active":"nav-item"}>
                <Link to="/client" className="nav-link"><IoPersonOutline/><span>Clients</span></Link>
              </li>
              <li className={splitLocation[1]==="prestation"?"nav-item active":"nav-item"}>
                <Link to="/prestation" className="nav-link"><MdOutlineWorkspaces/><span>Prestations</span></Link>
              </li>
              <li className={splitLocation[1]==="order"?"nav-item active":"nav-item"}>
                <Link to="/order" className="nav-link"><RiListOrdered/><span>Commandes</span></Link>
              </li>
              <li className={splitLocation[1]==="facturation"?"nav-item active":"nav-item"}>
                <Link to="/facturation" className="nav-link"><FaFileInvoice/><span>Facturations</span></Link>
              </li>
              <li className="nav-item">
                <button onClick={deconnexion} className="nav-link"><AiOutlinePoweroff/><Link to="/connexion">Deconnexion</Link></button>
              </li>
            </ul>
          </div>
        </div>
  )
}

export default NavbarVerti