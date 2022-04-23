import React from 'react'
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {AiOutlineUser} from 'react-icons/ai';
import Logo from '../../image/logo-crm-smile-color.png';
import {AiOutlinePoweroff} from 'react-icons/ai';
const variants = {
    open:{
        y: 0,
        opacity:0,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
          }
    },
    closed:{
        y: 0,
        opacity:1,
        transition: {
            delay:1,
            y: { stiffness: 1000 }
          }
    }
}
const variantsText ={
    open:{
        x:"0vw",
        margin:"10px",
        color:"transparent"
    },
    closed:{
        margin:"10px",
        x:"-10vw",
        color:"white",
        transition: {
            delay:1,
            duration:.5,
          }
      
    }
}
const variantText2 = {
    open:{
        x:"0vw",
        margin:"10px",
        color:"transparent",
    },
    closed:{
  
        margin:"10px",
        x:"15vw",
        color:"white",
        transition: {
            delay:1,
            duration:.5,
          }
      
    }
}

const Navbar_hori = (props) => {

const deconnexion = props.delete;
  return (
    <motion.div className ="navbar-hori" variants={variants}>
        <div className="flex">
        <motion.h4 className="elem-nav-hori" variants={variantText2}>Smile Art Gestion - 18/04/2022 </motion.h4>
        <motion.h4 className="elem-nav-hori" variants={variantsText}>Colette Cros  <AiOutlineUser/> </motion.h4>
        <button onClick={deconnexion} className="disconnect-btn"><AiOutlinePoweroff/><Link class="disconnect-link" to="/connexion">Deconnexion</Link></button>
        </div>
      
    </motion.div>
  )
}

export default Navbar_hori