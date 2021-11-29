import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about';
import Profile from './pages/profile.js';
import SignUp from './pages/signup.js';
import SignIn from './pages/signin.js';
import Login from './pages/login.js';
import Filter from './pages/filter.js';
import RestaurantCard from './pages/rest_card.js';
import NotesCard from './pages/notes_card.js';
import LikedDisliked from './pages/profile_restaurants';

function App() {
  // Sample fetch from the backend API
  // fetch("http://localhost:3001/restaurants")
  //   .then((res) => res.json())
  //   .then((json) => {
  //       console.log(json);
  //       document.getElementById("test").innerHTML = json;
  // })
  const [filter, setFilter] = useState(" ");
  
  function setFilterValue(filter) {
    setFilter(filter);
    console.log(filter);
  }

  return (
    <Router>
      <Navbar isLoggedIn={true}/>
      <Routes>
        <Route path="/" exact element={<Login />} /><Route/>
        <Route path="/about" element={<About/>} /><Route/>
        <Route path="/profile" element={<Profile/>} /><Route/>
        <Route path="/signin" element={<SignIn/>} /><Route/>
        <Route path="/sign-up" element={<SignUp/>} /><Route/>
        <Route path="/login" element={<Login/>} /><Route/>
        <Route path="/filter" element={<Filter setFilterValue={setFilterValue}/>} /><Route/>
        <Route path="/rest_card" element={<RestaurantCard />} /><Route/>
        <Route path="/notes_card" element={<NotesCard />} /><Route/>
        <Route path="/profile_restaurants" element={<LikedDisliked />} /><Route/>
      </Routes>
    </Router>
  );
}

export default App;
