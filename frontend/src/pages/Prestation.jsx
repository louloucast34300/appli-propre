import React, {useState, useEffect} from 'react';
import {useLocation, Link} from 'react-router-dom';
import axios from 'axios';

import '../css/prestation.css'
import {AiOutlinePlus} from 'react-icons/ai';
import {VscDash} from 'react-icons/vsc';
import {FiEdit} from 'react-icons/fi';
import {GiTireIronCross} from 'react-icons/gi';
const Prestation = () => {

  const [popUpForm, setPopUpForm] = useState(false); // ouvrir-fermer le formulaire 
  const [dataPresta, setDataPresta] = useState([]); // data des prestations
  const [messageSuccess, setMessageSuccess] = useState(""); //message d'ajout d'une prestation
  const location = useLocation();// pour récupèrer le message de réussite de l'ajout d'un client dans les paramètres de l'url

  console.log(dataPresta);

useEffect(()=>{
  decodeQuery();
  axios.get('/api/prestations').then((res)=>{
    const response = res.data
    setDataPresta(response);
  })
},[])

const activePopUp = (e) =>{ // event au click pour switch entre la liste et le formulaire (opération ternaire au niveau du rendu.)
    e.preventDefault();
    setPopUpForm(true);
}
const DesactivePopUp = (e) =>{ //event au click pour switch entre la liste et le formulaire (opération ternaire au niveau du rendu.)
    e.preventDefault();
    setPopUpForm(false);
}
const decodeQuery = () =>{ // pour récupérer le message dans l'url après validationn du formulaire
  const decode = decodeURIComponent(location.search);
  const decode2 =  decode.split("=").pop()
  setMessageSuccess(decode2)
  console.log(decode2);
}



const addFields = () => {
  const survey_options = document.getElementById('survey_options');
  const newField = document.createElement('input');
    newField.setAttribute('type','text');
    newField.setAttribute('name','product_used');
    newField.setAttribute('class','form-control input-suppl');
    newField.setAttribute('type','text');
    newField.setAttribute('placeholder','Un autre produit');
    survey_options.appendChild(newField);
}
const removeFields = () =>{
  const survey_options = document.getElementById('survey_options');
  const input_tags = survey_options.getElementsByTagName('input');
  if(input_tags.length > 1){
    survey_options.removeChild(input_tags[(input_tags.length)-1])
  }
}
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          {popUpForm?
          <div>
            <div className="header-page">
              <h3 className="header-title">Mes prestations</h3>
              <button onClick={DesactivePopUp}> <AiOutlinePlus/>Fermer formulaire</button>
            </div>
            <div className="form-content-new">
            <form action="/api/prestations/new-prestation" method="POST" className="form-client">
                <div className="row mb-4">
                <div className="col">
                    <div className="form-outline">
                        <select name="category" id="category">
                          <option value="prothèse adjointe résine">Prothèse adjointe résine</option>
                          <option value="prothèse adjointe métallique">Prothèse adjointe métallique</option>
                          <option value="réparations">Réparations</option>
                          <option value="divers">Divers</option>
                          <option value="prothèse fixe">Prothèse fixe</option>
                          <option value="céramique">Céramique</option>
                          <option value="zircone">Zircone</option>
                          <option value="céramique pure">Céramique pure</option>
                          <option value="implants">Implants</option>
                          <option value="soudures">Soudures</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <input type="text" id="title_presta" className="form-control" name="title_presta" placeholder="Nom de la prestation"/>
                    </div>
                </div>
                </div>
                <div className="row mb-4">
                <div className="col">
                <div className="form-outline mb-4" id="survey_options">
                    <input type="text" id="survey_options[]" className="form-control" name="product_used" placeholder="Produit utilisé"/>
                </div>
                <div className="controls">
                  <a className="btn-add-input" href="#" id="add_more_fields" onClick={addFields}> <AiOutlinePlus/> Ajouter un produit</a>
                  <a className="btn-remove-input" href="#" id="removefields" onClick={removeFields}><VscDash/> Enlever un produit</a>
                </div>
                </div>
                <div className="col">
                  <div className="form-outline mb-4">
                      <input type="number" id="price_presta" className="form-control" name="price_presta" placeholder="Prix de la prestation" />
                  </div>
              </div>
              </div>
                <div className="form-outline mb-4">
                    <textarea className="form-control" id="info_supp"  name="info_supp" rows="4" placeholder="Informations complémentaires"></textarea>
                </div>
                    <button type="submit" className="btn-form">Enregistrer la prestation.</button>
            </form>
            </div>
          </div>
          :
          <div>
            <div className="header-page">
              <h3 className="header-title">Mes prestations</h3>
              <div>
                <h3 className={messageSuccess===""?"message-success":"message-success active"}>{messageSuccess}</h3>
              </div>
              <button onClick={activePopUp}> <AiOutlinePlus/>Ajouter une prestation</button>
            </div>
              {/* PROTHESE ADJOINTE RESINE*/}
              <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Prothèse adjointe résine</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "prothèse adjointe résine")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/* PROTHESE ADJOINTE METALLIQUE*/}
              <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Prothèse adjointe métallique</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "prothèse adjointe métallique")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/* REPARATIONS*/}
              <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Réparations</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "réparations")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/*DIVERS*/}
              <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Divers</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "divers")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/* PROTHESE FIXE*/}
              <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Prothèse fixe</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "prothèse fixe")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
                {/* CERAMIQUE */}
                <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Céramique</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "céramique")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
                {/* ZIRCONE */}
                <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Zircone</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "zircone")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
                {/* Céramique pure */}
                <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Céramique pure</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "céramique pure")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
                {/* Implants */}
                <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Implants</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "implants")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
                {/* Soudure */}
                 <div className="row table-presta">
                <div className="col-lg-12">
                  <h4>Soudure</h4>
                  <div className="line-presta"></div>
                  <div className="presta-bloc">
                    <div className="row">
                    {dataPresta.filter((item)=>item.category === "soudures")
                        .map((item,index)=>{
                          return(
                            <div className="col-lg-2">
                              <div key={index} className="presta-card-bloc">
                              <Link className="link-presta-card" to="#">
                                <p className="title-presta-card">{item.title_presta}</p>
                                <p className="price-presta-card">{item.price_presta}€</p>
                              </Link>
                                <div className="crud-bloc">
                                  <Link className="link-crud-presta-card" to={`/prestation/edit/${item._id}`}><FiEdit/></Link>
                                  <Link className="link-crud-presta-card" to="#"><GiTireIronCross/></Link>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Prestation