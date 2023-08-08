import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Meteo from './pages/Meteo';
import Header from './components/Header'
import Header2 from './components/Header2';
import './index.css';       
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientForm from './components/Forms/ClientForm';
import FreelanceForm from './components/Forms/FreelanceForm';
import Pollution from './pages/Pollution';
import InstantReport from './pages/Pollution/InstantReport';
import HebdoReport from './pages/Pollution/HebdoReport';
import Error from './components/Error'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header/>
      <Header2/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/meteo" element={<Meteo />}/>
        <Route path="/pollution" element={<Pollution />}>
          <Route path="daily/:dayNumber?" element ={<InstantReport />}></Route>
          <Route path="hebdo" element ={<HebdoReport />}></Route>
        </Route>
        <Route path="/survey/:questionNumber?" element={<Survey />}>
          <Route path='client' element={<ClientForm />}></Route>
          <Route path='freelance' element={<FreelanceForm />}></Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
