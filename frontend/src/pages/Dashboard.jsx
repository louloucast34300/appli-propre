import React,{useEffect, useState} from 'react'
import axios from 'axios';

import '../css/dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const verticalOptions = {
  layout:{
    padding:30
  },
  responsive: true,
  plugins: {
    tooltip:{
      enabled:true,
      textDirection:'rtl',
      caretPadding:30,
      bodyFont:{
        size:44
      },
      footerFont:{
        size:24
      }

    },
    legend: {
      position: 'top',
    },
  },
  elements:{
    bar:{
      backgroundColor: 'rgba(41, 41, 41,1)',
      borderRadius:15,
    }
  }
}

export const options = {
  events: ['click','mousemove'],
  layout:{
    padding:30
  },
  responsive: true,
  plugins: {
    tooltip:{
      enabled:true,
      textDirection:'rtl',
      caretPadding:30,
      bodyFont:{
        size:44
      },
      footerFont:{
        size:24
      }

    },
    legend: {
      maxWidth:10,
      labels :{
        font:{
          size:24
        }
      },
      position: 'top',
    },
    responsive: true,
    maintainAspectRatio:true,
    aspectRatio:2,
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
  elements:{
    bar:{
    backgroundColor: 'rgba(184, 50, 162,1)',
    borderRadius:15,

    }
  }
};

const Dashboard = () => {

  const labels = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];

  const CDC2021 = [0,0,0,0,0,0,5770,2001,4954,5500,5890,3874]

  const stringMounth = ['', 'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
  const [mounth, setMounth] = useState('')
  const [facture, setFacture] = useState([]);
  const [total1, setTotal1] = useState([]); // tableau regroupant [toutes les factures, factures pro format, factures définitive]
  const [graphData, setGraphData] = useState([])
  const [toggleCA, setToggleCA] = useState(false);

  const date = new Date();
  let t = date.getMonth()+1;
  let y = date.getFullYear();

  const verticalData = {
    labels,
    datasets: [
      {
        label: `€`,
        data: labels.map((item,index) => CDC2021[index]),
        hoverBackgroundColor: 'rgba(184, 50, 162,1)',
   
      }
    ],
  }

  const data = {
    labels,
    datasets: [
      {
        barPercentage:0.9,
        label: `€`,
        data: labels.map((item, index) =>  `${graphData[index]}`),
        hoverBackgroundColor:'rgba(41,41,41,1)'
      },
    ],
  };

useEffect(()=>{
  GET_FACTURE();
},[]);

const GET_FACTURE = () =>{
  setMounth(stringMounth[t]);
  axios.get("/api/factu/get-factu").then((res)=>{
    const response = res.data;
    setFacture(response)
    GET_TOTAL(response, t, y)// t = mois , y = annnée, response = data
    GRAPH_DATA(response)
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
    setTotal1([Math.round(totalAll),Math.round(totalNotEnd),Math.round(totalEnd)]);
}

const handleMounth = (e) =>{
  const value =parseInt(e.target.value); // parse la valeur str -> nb
  GET_TOTAL(facture,value, y); // re-calcul selon le mois choisi 
  setMounth(stringMounth[value]);
  setToggleCA(false)
}
const handleCA = () => {
  setToggleCA(!toggleCA);
}
const GRAPH_DATA = (data) =>{
  const a = data; // la data
  const m = [1,2,3,4,5,6,7,8,9,10,11,12] // les mois
  let arr = []
  for(let i = 0; i <= m.length; i++){
    let total = 0
    for(let j = 0; j < a.length; j++){
     const target = a[j].date_of_creation
     let n1 = target.charAt(3);
     let n2 = target.charAt(4);
     let r = 0
     if(n1 != 1){
       r = parseInt(n2)
     }
     r = parseInt(n1+n2)
     if(m[i] === r && !a[j].canceled ){
       total += a[j].total
     }
    }
    arr.push(total)
  }
  setGraphData(arr)
}

  return (
   <> 
   <div className="container-fluid dash-container">
     <div className="row">
       <div className="col-lg-12">
         <div className="row">
           <div className="col-3">
             <div className="bloc-info-dash">
               <p className="title-price">Facturation totale <br/> du mois de {mounth} {y} :</p>
               <p className="dash-price">{total1[0]}€</p>
             </div>
           </div>
           <div className="col-3">
             <div className="bloc-info-dash">
               <p className="title-price">Facturation en cours (pro format) <br/> du mois de {mounth} {y} :</p>
               <p className="dash-price">{total1[1]}€</p>
             </div>
           </div>
           <div className="col-3">
             <div className="bloc-info-dash">
               <p className="title-price">Facturation définitive <br/> du mois de {mounth} {y} :</p>
               <p className="dash-price">{total1[2]}€</p>
             </div>
           </div>
           <div className="col-3">
             <div className="bloc-info-dash">
             <p className="title-price">Choisir un autre mois en {y} :</p>
             <form action="">
               <select name="chooseMounth" id="chooseMounth" className="form-select" onChange={handleMounth}style={{color:"rgba(184, 50, 162,1)",fontWeight:"bold"}}>
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
            {toggleCA?<button className='disconnect-btn' onClick={handleCA} style={{backgroundColor:'rgba(41,41,41,1)'}}>Voir le chiffre d'affaire 2022</button>:<button className='disconnect-btn' onClick={handleCA}>Voir le chiffre d'affaire 2021</button>}
             </div>
           </div>
         </div>
         <div className="row">
         <div className="col-lg-12">
           {toggleCA?  <Bar options={verticalOptions} data={verticalData} />:<Bar options={options} data={data} />}
           </div> 
     
        
         </div>
       </div>
     </div>
   </div>
   </>
  )
}

export default Dashboard