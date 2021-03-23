import axios from 'axios';
import { useState, useEffect } from 'react';
import { IListing } from '../../../server/models/listingModel';
import useStyles from './gridstyles';
import './startpage.css';
import {Grid} from '@material-ui/core';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";




const Startpage = () => {
  const [listings, setListings] = useState<Array<IListing>>([])

  const history = useHistory();
  const navigateToSales = () => history.push('/myynti');//navigoi painalluksesta myyntisivulle


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

    //Gridiin stylingit styles.js tiedostosta
    const classes = useStyles();

    return (
      <>
      <div className="top">     
      <h1>MERKKIKAUPPA</h1>       
      <img src='/MerkkikauppaW.png' alt="MK" width="100px" height="100px"></img>
      </div><br/><br/>
        <main>
          <Grid container justify="center" spacing={5}>
            {listings.map(listing => {
              return (
                //Grid layout myytäville tuotteille
                //CardMedia itse kuva merkille
                <Grid item key={listing.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className={classes.root}>
                    <a onClick={navigateToSales}>
                    <CardMedia className={classes.media} image={listing.urls[0]} title={listing.title} />
                    </a>
                    <a onClick={navigateToSales}>
                    <CardContent>
                      <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                          {listing.title}
                        </Typography>
                        <Typography variant="h5">
                          {listing.price} €
                        </Typography>
                      </div>
                      <Typography variant="body2" color="textSecondary">{listing.description}</Typography>
                      <Typography variant="body2" color="textSecondary">Merkkejä jäljellä: {listing.item_count}</Typography>
                      <Typography variant="body2" color="textSecondary">{listing.seller.name}</Typography>
                    </CardContent>
                    </a>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </main>
      </>
    );
}

export default Startpage;
