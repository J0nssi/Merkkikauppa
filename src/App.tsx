import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IListing } from '../server/models/listingModel'
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Profilepage from './components/Profilepage/Profilepage';

function App() {



  return (
    <>
      <Profilepage></Profilepage>
      <Registration></Registration>
      <Login></Login>
    </>
  );
}

export default App;
