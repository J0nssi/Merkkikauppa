import axios from 'axios';
import { useState, useEffect, useContext, ChangeEvent, MouseEvent } from 'react';
import { IListing } from '../../../server/models/listingModel';
import useStyles from './gridstyles';
import './startpage.css';
import { Grid } from '@material-ui/core';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { userContext } from '../../userContext';
import { IUser } from '../../../server/models/userModel';




const Startpage = () => {
  const [listings, setListings] = useState<Array<IListing>>([])
  const [search, setSearch] = useState("");


  const history = useHistory();
  const navigateToSales = (listingID: any) => {
    history.push('/myynti/' + listingID);//navigoi painalluksesta myyntisivulle
  }

  const navigateToMain = () => {
    history.push('/');//navigoi painalluksesta etsivulle
  }


  useEffect(() => {
    axios.get(`/listings`)
      .then(response => {
        console.log(response.data)
        setListings(response.data);
      })
      .catch(err => console.log(err));
  }, [])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearchSubmit = (e: MouseEvent) => {
    e.preventDefault();
    if(search !== ""){
      axios.get('/listings/s/' + search)
      .then(response => {
        console.log(response.data)
        setListings(response.data);
      })
      .catch(err => console.log(err));
    } else {
      axios.get('/listings')
      .then(response => {
        console.log(response.data)
        setListings(response.data);
      })
      .catch(err => console.log(err));
    }
  }

  //Gridiin stylingit styles.js tiedostosta
  const classes = useStyles();
  const user: IUser | undefined = useContext(userContext);
  return (
    <>
      <div className="top">
        <a onClick={() => navigateToMain()} style={{ cursor: 'pointer' }}>
          {user &&
            <h1>kirjautunut</h1>
          }
        </a>
        <img src='/MerkkikauppaW.png' alt="MK" width="100px" height="100px"></img>
        <div style={{marginTop: "auto", marginBottom: "auto", width: "auto"}}>
            <input placeholder="Hae merkkejä" type="text" onChange={handleSearchChange} />
            <button type="submit" onClick={handleSearchSubmit}>Etsi</button>
        </div>
      </div><br /><br />
      <main>
        <Grid container justify="center" spacing={5}>
          {listings.map(listing => {
            return (
              //Grid layout myytäville tuotteille
              //CardMedia itse kuva merkille
              <Grid item key={listing.id} xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.root}>
                  <a onClick={() => navigateToSales(listing._id)}>
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
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Merkkikauppa
            </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Köykkä, Vaija, Tikkanen
            </Typography>
        </Container>
      </footer>
    </>
  );
}

export default Startpage;
