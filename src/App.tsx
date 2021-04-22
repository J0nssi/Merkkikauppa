import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Startpage from './components/Startpage/Startpage';
import Menu from './components/Startpage/Menu/Menu'
import Salepage from './components/Myynti-ilmoitus/Salepage';
import Profile from './components/Profile/Profile';
import { userContext } from './userContext';
import { useState, useEffect } from 'react';
import { IUser } from '../server/models/userModel';
import axios from 'axios';
import AddListing from './components/AddListing/AddListing';

const App = () => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    axios.get(`/auth/user`)
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(err => {
        console.log("User not found. Not logged in.");
        setUser(null);
    });
  }, [])

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
        <Route path="/profiili">
            <Profile/>
            <Menu />
          </Route>
          <Route path="/kirjaudu">
            <Login />
            <Menu />
          </Route>
          <Route path="/rekisteroidy">
            <Registration /> 
            <Menu />
          </Route>
          <Route path="/myynti/lisaa">
            <AddListing />
            <Menu />
          </Route>
          <Route path="/myynti/:listingid">
            <Salepage />
            <Menu />
          </Route>
          <Route path="/">
            <Startpage />
            <Menu />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
