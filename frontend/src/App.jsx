//import de structure
import react from 'react';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';

//components
import NavbarHori from './component/NavbarHori'
import NavbarVerti from './component/NavbarVerti'

//pages
import Dashboard from './pages/Dashboard'
import Client from './pages/Client'
import Prestation from './pages/Prestation';
import Order from './pages/Order';
import Facturation from './pages/Facturation';
//css
import './css/general.css'

function App() {
  return (
    <Router>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 color1">
          <NavbarVerti/>
        </div>
        <div className="col-lg-10 color2">
          <NavbarHori/>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-10">
              <Switch>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/client" element={<Client/>}/>
                <Route path="/prestation" element={<Prestation/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/facturation" element={<Facturation/>}/>
              </Switch>
        </div>
        </div>
    </div>
   </Router>
  );
}

export default App;
