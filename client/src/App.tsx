import axios from 'axios';
import { useState, useEffect } from 'react';

import { IListing } from '../../models/listingModel'


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
    <>
      {listings.map(listing => {
        return (
          <div style={{width: "min-content",margin: "auto"}}>
            {listing.urls.map(url => {return <img src={url} alt="" />})}
            <h3>
              {listing.title} <br/> {listing.price} € 
            </h3>
            <h4>{listing.seller.name}</h4>
          </div>
        )
      })}
    </>
  );
}

export default App;
