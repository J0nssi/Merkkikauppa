import './salepage.css';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useParams, useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { IListing } from '../../../server/models/listingModel';
import axios from 'axios';
import useStyles from './gridstyles';

const Salepage = () => {

  //Gridiin stylingit styles.js tiedostosta
  const classes = useStyles();
  const { listingid } = useParams<{ listingid: string }>();


  const [myyntiData, setData] = useState<IListing>()

  useEffect(() => {
    const getListings = async () => {
      console.log('/listing/'+listingid)
      return await axios.get<IListing>(`/listing/`+listingid)
        .then(response => {
          console.log(response.data)
          setData(response.data);
        })
        .catch(err => console.log(err));
    }
    getListings();
  }, [])


  /*const tiers = [
    {
      title: 'MERKKINIMI PLACEHOLDER',
      price: '5e',
      description: 'DESCRIPTION',
      seller: 'ESSI ESIMERKKI',
      item_count: 0,
    },
  ];

  /*myyntiData.map(listing => {
    tiers[0].title = listing.title,
    tiers[0].price = listing.price.toString();
    tiers[0].description = listing.description,
    tiers[0].seller = listing.seller.name,
    tiers[0].item_count = listing.item_count;
  });*/

  const history = useHistory();
  const navigateToMain = () => {
    history.push('/');//navigoi painalluksesta etsivulle
  }
  console.log(myyntiData)
  return (
    <>
    <div className="top"> 
    <a onClick={() => navigateToMain()} style={{cursor:'pointer'}}>  
    <h1>MERKKIKAUPPA</h1>
    </a>
    <img src='/MerkkikauppaW.png' alt="MK" width="100px" height="100px"></img>
    </div><br/><br/>
      <main>
        <Grid container justify="center" spacing={5}>
              <Grid item key={myyntiData?._id} xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.root}>
                  <CardMedia className={classes.media} image={myyntiData?.urls[0]} title={myyntiData?.title} />
                  <CardContent>
                    <div className={classes.cardContent}>
                      <Typography variant="h5" gutterBottom>
                        {myyntiData?.title}
                      </Typography>
                      <Typography variant="h5">
                        {myyntiData?.price} €
                      </Typography>
                    </div>
                    <Typography variant="body2" color="textSecondary">{myyntiData?.description}</Typography>
                    <Typography variant="body2" color="textSecondary">Merkkejä jäljellä: {myyntiData?.item_count}</Typography>
                    <Typography variant="body2" color="textSecondary">{myyntiData?.seller.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{myyntiData?.seller.email}</Typography>
                    <Typography variant="body2" color="textSecondary">{myyntiData?.seller.phone_number}</Typography>
                  </CardContent>
                </Card>
              </Grid>
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
export default Salepage;
