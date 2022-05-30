import React,{useEffect, useState} from 'react'
import axios from 'axios';

import '../css/dashboard.css';



const Dashboard = () => {

  const stringMounth = ['', 'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
  const [mounth, setMounth] = useState('')
  const [facture, setFacture] = useState([]);
  const [total1, setTotal1] = useState([]); // tableau regroupant [toutes les factures, factures pro format, factures définitive]

  const date = new Date();
  let t = date.getMonth()+1;
  let y = date.getFullYear();

useEffect(()=>{
  GET_FACTURE();
},[]);

const GET_FACTURE = () =>{
  setMounth(stringMounth[t]);
  axios.get("/api/factu/get-factu").then((res)=>{
    const response = res.data;
    setFacture(response)
    GET_TOTAL(response, t, y)// t = mois , y = annnée, response = data
  })
}

const GET_TOTAL = (data, mounth, year) =>{
    let arrayAll = [0,0] // pour que le reducer s'active automatiquement 
    let arrayNotEnd = [0,0] 
    let arrayEnd = [0,0]
    for(let i = 0; i < data.length;i++){ 
      const target = data[i].date_of_creation 
      let n1 = target.charAt(3) // select "0"
      let n2 = target.charAt(4); // select "1"
      let yearData = parseInt(target.charAt(6)+target.charAt(7)+target.charAt(8)+target.charAt(9)); // select "2022" et transforme str -> nb
      let result = 0
      if(n1 != 1){
        result = parseInt(n2) // si le mois et plus petit que 10 alors garde que le deuxieme chiffre et transforme str -> nb  ex= 08 -> 8
      }
      result = parseInt(n1+n2) // si le mois et plus grand que 10 alors garde que le deuxieme chiffre et transforme str -> nb ex= 12 -> 12
      if(!data[i].canceled && yearData === year ){ // vérification que l'année soit correcte et que la facture ne soit pas annulé
          if(result === mounth){
          arrayAll.push(data[i].total) // toutes les factures 
          if(!data[i].definitive){ 
            arrayNotEnd.push(data[i].total) // facture en pro format
          }else{
            arrayEnd.push(data[i].total) // facture définitive
          }
        }
      }
    }
    const reducer = (accumulator, curr) => accumulator + curr; // reducer
    const totalAll = arrayAll.reduce(reducer)
    const totalNotEnd = arrayNotEnd.reduce(reducer)
    const totalEnd = arrayEnd.reduce(reducer)
    setTotal1([totalAll,totalNotEnd,totalEnd]);
}

const handleMounth = (e) =>{
  const value =parseInt(e.target.value); // parse la valeur str -> nb
  GET_TOTAL(facture,value, y); // re-calcul selon le mois choisi 
}

  return (
   <> 
   <h2>Facturation totale du mois de {mounth} : {total1[0]}€</h2>
   <h2>Total en cours de facturation du mois de {mounth} : {total1[1]}€</h2>
   <h2>Total facturé du mois de {mounth} : {total1[2]}€</h2>
   <form action="">
     <select name="chooseMounth" id="chooseMounth" onChange={handleMounth} style={{float:"right"}}>
      <option defaultValue="">{mounth} {y}</option>
      <option value="1">Janvier {y}</option>
      <option value="2">Février {y}</option>
      <option value="3">Mars {y}</option>
      <option value="4">Avril {y}</option>
      <option value="5">Mai {y}</option>
      <option value="6">Juin {y}</option>
      <option value="7">Juillet {y}</option>
      <option value="8">Aout {y}</option>
      <option value="9">Septembre {y}</option>
      <option value="10">Octobre {y}</option>
      <option value="11">Novembre {y}</option>
      <option value="12">Décembre {y}</option>
    </select>
   </form>
   
   </>
  )
}

export default Dashboard