import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IListing } from '../../models/listingModel'
import Login from './components/login/login';
import Registration from './components/registration/registration';

function App() {
  const [listings, setListings] = useState<Array<IListing>>([])

  useEffect(() => {
    const getListings = async () => {
      return await axios.get(`/listings`)
        .then(response => {
          console.log(response.data)
          setListings(response.data);
        })
        .catch(err => console.log(err));
    }

    getListings();
  }, [])

  return (
    <Router>
      <Switch>
       
        <Route path="/kirjaudu">
          <Login />
        </Route>
        <Route path="/rekisteroidy">
          <Registration />
        </Route>
        <Route path="/">
          {listings.map(listing => {
            return (
              <div style={{ width: "min-content", margin: "auto" }}>
                {listing.urls.map(url => { return <img src={url} alt="" /> })}
                <h3>
                  {listing.title} <br /> {listing.price} €
            </h3>
                <h4>{listing.seller.name}</h4>
              </div>
            )
          })}
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
