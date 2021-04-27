import './Profile.css'
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useEffect } from 'react';
import { IUser } from "../../../server/models/userModel";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IListing } from '../../../server/models/listingModel';
import { Grid } from '@material-ui/core';



const Profilepage = () => {

    const history = useHistory();
    const [user, setUser] = useState<IUser>();
    const useStyles = makeStyles({
      paper: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
      maxWidth: '100%'
  },
  media: {
      height: 0,
      paddingTop: '70%', //16:9
  },
  cardActions: {
      display: 'flex',
      justifyContent: 'flex-end'
  },
  cardContent: {
      display: 'flex',
      justifyContent: 'space-between'
  },
  footer: {
      paddingTop: '70%',
  }
      
    });
    const classes = useStyles();

    useEffect(() => {
        const getUser = async () => {
          return await axios.get(`/auth/user`)
            .then(response => {
              console.log(response.data)
              const user = response.data;
              setUser(user);
            })
            .catch(err => console.log(err));
            history.push('/');
        }
        getUser();
      }, [])

      const [listings, setListings] = useState<Array<IListing>>([])

      useEffect(() => {
        const getListings = async () => {
          console.log('/listings/myListings')
          return await axios.get<Array<IListing>>(`/listings/myListings`)
            .then(response => {
              console.log(response.data)
              setListings(response.data);
            })
            .catch(err => console.log(err));
        }
        getListings();
      }, [])

    return(
      <div className={classes.paper}>
      <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="Profiili"
          height="400"
          image="/profilepic.png"
          title="Profiili"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Nimi: {user?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Kaupunki: {user?.city}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Puhelinnumero: {user?.phone_number}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Sähköposti: {user?.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          </Typography>
        </CardContent>
    </Card>
    <br/>
    <Grid container justify="center" spacing={5}>
          {listings.map(listing => {
              //Grid layout myytäville tuotteille
              //CardMedia itse kuva merkille
              return <Grid item key={listing.id} xs={4} sm={3} md={2} lg={1}>
                <Card className={classes.root}>
                    <CardMedia className={classes.media} image={listing.urls[0]} title={listing.title} />
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
                </Card>
              </Grid>
            
          })}
        </Grid>
    </div>
    )
}

export default Profilepage