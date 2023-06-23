import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Data from './components/Data';
import "./components/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SubdivisionPage from './pages/SubditisionPage';
import Company from './pages/Company';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Header />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="main" element={<Data />}/>
        <Route path='/employees/all' element={<SubdivisionPage />}/>
        <Route path='/subdivision/all' element={<Company />}/>
        <Route path="" element={<Footer />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
