import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Startpage from './components/Startpage/Startpage';
import Menu from './components/Startpage/Menu/Menu'
import Salepage from './components/Myynti-ilmoitus/Salepage';
import { userContext } from './userContext';
import { useState, useEffect } from 'react';
import { IUser } from '../server/models/userModel';
import axios from 'axios';

function App() {
  const [user, setUser] = useState<IUser>()

   useEffect(() => {
       axios.get(`/auth/user`)
         .then(response => {
           console.log(response.data)
           setUser(response.data);
         })
         .catch(err => console.log(err));
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/kirjaudu">
          <Login />
          <Menu />
        </Route>
        <Route path="/rekisteroidy">
          <Registration />
          <Menu />
        </Route>
        <Route path="/myynti/:listingid">
          <Salepage />
          <Menu />
        </Route>
        <userContext.Provider value={user}>
          <Route path="/">
            <Startpage />
            <Menu />
          </Route>
        </userContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
