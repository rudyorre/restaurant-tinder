import logo from './logo.svg';
import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact.js';
import SignUp from './pages/signup.js';
import SignIn from './pages/signin.js';
import Filter from './pages/filter.js';

function App() {
  // Sample fetch from the backend API
  fetch("http://localhost:3001/restaurants")
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
        document.getElementById("test").innerHTML = json;
  })


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} /><Route/>
        <Route path="/about" element={<About/>} /><Route/>
        <Route path="/contact" element={<Contact/>} /><Route/>
        <Route path="/signin" element={<SignIn/>} /><Route/>
        <Route path="/sign-up" element={<SignUp/>} /><Route/>
        <Route path="/filter" element={<Filter />} /><Route/>
      </Routes>
    </Router>
  );
}

export default App;
