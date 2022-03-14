import React, {useState,useEffect} from 'react';
import axios from 'axios';


import '../css/commande.css'

const Commande = () => {

const [presta, setPresta] = useState([])
const [client, setClient] = useState([]);
const [patient, setPatient] = useState("");
const [doctorName, setDoctorName] = useState([])

const [inputField, setInputField] = useState([
    {firstname:'',lastname:''},
    {firstname:'',lastname:''},
])
const [flux, setFlux] = useState([
    {  presta:'',teintier:'', teinte:'', nbr_teeth:[], price_presta:'', remise_presta:''}
]);
console.log(flux);
useEffect(()=>{

    getClient();
    getPresta();
},[]);


const getPresta = () =>{
    axios.get('/api/prestations').then((res)=>{
        const response = res.data;
        setPresta(response);
    })
}
const getClient = ()=>{
    axios.get('/api/clients').then((res)=>{
        const response = res.data;
        setClient(response)
    })
}
const handleSubmit = (e) =>{
    axios.post('/api/order/new-order',inputField);
}
const handleCurrentDoctor = (e) =>{
    e.preventDefault()
    const value = e.target.value;
    const getData = client.filter((item)=>item.lastname === value)
    setDoctorName(getData)
}
const handleAddSelect = ()=>{
    setFlux([...flux,{presta:'',teintier:'', teinte:'', nbr_teeth:[],price_presta:'',remise_presta:''}])
}
const handleCurrentPresta = (index, e) =>{
e.preventDefault();
const element = e.target.value
console.log(element);
const getData = presta.filter((item)=>item.title_presta === element);
const data = getData[0].price_presta
flux[index].price_presta = data
const values = [...flux];
flux[index][e.target.name] = e.target.value;
setFlux(values);
}
const handleCurrentTeintier = (index,e) =>{
    e.preventDefault();
    const values = [...flux];
    flux[index][e.target.name] = e.target.value;
    setFlux(values);
}
const handleCurrentTeinte = (index,e) =>{
    e.preventDefault();
    const values = [...flux];
    flux[index][e.target.name] = e.target.value;
    setFlux(values);
}
const handleTeeth = (index,e) =>{
    const array = flux[index][e.target.name]
    const arrayLocal = []
    const value = e.target.value
    if(e.target.checked){
        arrayLocal.push(value)
        array.push(arrayLocal[0])
    }else if(!e.target.checked ){
        for(var i = 0; i < array.length; i++){
            if ( array[i] === value) { 
                array.splice(i, 1); 
            }
        
        }
    }
setFlux([...flux],array)
}
const handleChangePrice = (index,e) =>{
    e.preventDefault();
    const values = [...flux];
    flux[index][e.target.name] = e.target.value;
    setFlux(values);
}
const handleRemise = (index, e) =>{
    e.preventDefault();
    const values = [...flux];
    const price = flux[index].price_presta
    const afterRemise = Math.round(parseFloat(price)*e.target.value)/100
    const newPrice = price - afterRemise
    console.log(newPrice);
    flux[index].price_presta = newPrice;
    flux[index][e.target.name] = e.target.value;
    setFlux(values)
}

  return (
      <>   
       <div>Commande</div>
        <form onSubmit={handleSubmit}>

            {/*DOCTEUR*/}
            <select name="doctor" id="doctor" onChange={handleCurrentDoctor}>
                <option value="Choisir un docteur"  >Choisir un docteur </option>
                {client.map((item,index)=>{
                    return(
                        <option key={index}  value={item.lastname}>Dr. {item.lastname}</option>
                    )
                })}
            </select>


            {/*PATIENT*/}
            <input type="text" placeholder="nom ou code du patient" />

            {/*PRESTATION*/}
                {flux.map((item,index)=>{
                    return(
                        <div className="presta-part">
                            <div className="presta-content-flex" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <select key={index} name="presta" id="presta" onChange={(e)=>handleCurrentPresta(index,e)}>
                                <option  value="">Choisir une prestation</option>
                                {presta.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.title_presta}>{item.title_presta}</option>
                                    )
                                })}
                            </select>
                            <p className="price-info">{item.price_presta}€</p>
                            </div>
                            <div className="input-pesta-part">
                                <div>
                                <label className="label-input" htmlFor="teintier">Teintier</label>
                                <input className="input-presta" name="teintier" type="text" placeholder="Teintier" onChange={(e) =>handleCurrentTeintier(index,e)}/>
                                </div>
                                <div>
                                <label className="label-input" htmlFor="teinte">Teintes</label>
                                <input className="input-presta" name="teinte" type="text" placeholder="Teinte" onChange={(e) =>handleCurrentTeinte(index,e)}/>
                                </div>
                                <div>
                                <label className="label-input" htmlFor="quantity">Quantité</label>
                                <input className="input-presta" name="quantity" type="text" placeholder="Quantité" defaultValue="1"/>
                                </div>
                                <div>
                                <label className="label-input" htmlFor="prix">Prix unitaire </label>
                                <input  className="input-presta" type="number" name="price_presta" placeholder="prix" defaultValue={flux.price_presta} onChange={(e)=>handleChangePrice(index,e)} />
                                </div>
                               <div>
                                <label className="label-input" htmlFor="prix">Remise (%)</label>
                                 <input className="input-presta" type="number"  name="remise_presta" placeholder="remise" onChange={(e)=>handleRemise(index,e)}/>
                               </div>
                           
                            </div>
                            <div className="teeth-part">
                               
                                <input type="checkbox" id={`t1-${index}`} name="nbr_teeth" value="1" onChange={(e) =>handleTeeth(index,e)}/>
                                <label htmlFor={`t1-${index}`} className="teeth bgt1">01</label>

                                <input  type="checkbox" id={`t2-${index}`} name="nbr_teeth" value="2" onChange={(e) =>handleTeeth(index,e)}/>
                                <label htmlFor={`t2-${index}`} className="teeth">02</label>
                             
                                <input type="checkbox" id={`t3-${index}`} name="nbr_teeth" value="3" onChange={(e) =>handleTeeth(index,e)}/>
                                <label htmlFor={`t3-${index}`} className="teeth">03</label>
                           
                                <input type="checkbox" id={`t4-${index}`} name="nbr_teeth" value="4" onChange={(e) =>handleTeeth(index,e)}/>
                                <label htmlFor={`t4-${index}`} className="teeth">04</label>
                        
                                <input type="checkbox" id={`t5-${index}`} name="nbr_teeth" value="5" onChange={(e) =>handleTeeth(index,e)}/>
                                <label htmlFor={`t5-${index}`} className="teeth">05</label>

                            </div>
                            <div>
                                
                            </div>
                        </div> 
                    )
                })}
                <div className="add-presta">
                    <button type="button" onClick={handleAddSelect}>Ajouter une prestation</button>
                </div>
            <button onClick={handleSubmit}>send</button>
        </form>
      
      </>

  )
}

export default Commande